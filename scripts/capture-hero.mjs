import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.VERIFY_BASE_URL;
const password = process.env.VERIFY_PASSWORD;
const outputDirectory = process.env.VERIFY_OUTPUT_DIR;
const width = Number(process.env.VERIFY_VIEWPORT_WIDTH || 1440);
const height = Number(process.env.VERIFY_VIEWPORT_HEIGHT || 1000);
const port = Number(process.env.VERIFY_CDP_PORT || 9224);

if (!baseUrl || !password || !outputDirectory) {
  throw new Error(
    "VERIFY_BASE_URL, VERIFY_PASSWORD, and VERIFY_OUTPUT_DIR are required",
  );
}

await mkdir(outputDirectory, { recursive: true });
const profile = `/tmp/hero-capture-${process.pid}`;
const chrome = spawn(
  "google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--ignore-certificate-errors",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const pause = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForEndpoint() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await pause(100);
  }
  throw new Error("Chrome debugging endpoint did not start");
}

await waitForEndpoint();
const target = await fetch(
  `http://127.0.0.1:${port}/json/new?${encodeURIComponent(`${baseUrl}/login`)}`,
  { method: "PUT" },
).then((response) => response.json());

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 1;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const callback = pending.get(message.id);
  if (!callback) return;
  pending.delete(message.id);
  if (message.error) callback.reject(new Error(message.error.message));
  else callback.resolve(message.result);
});

function command(method, params = {}) {
  const id = nextId;
  nextId += 1;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return result.result.value;
}

async function waitFor(expression) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (await evaluate(expression)) return;
    await pause(100);
  }
  throw new Error(`Timed out waiting for ${expression}`);
}

async function screenshot(filename) {
  const clip = await evaluate(`(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return null;
    const rect = hero.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
      scale: 1
    };
  })()`);
  if (!clip) throw new Error("Hero element not found");
  const capture = await command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip,
  });
  await writeFile(
    path.join(outputDirectory, filename),
    Buffer.from(capture.data, "base64"),
  );
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 700,
  });
  await command("Page.navigate", { url: `${baseUrl}/login` });
  await waitFor('document.readyState === "complete"');

  const loginStatus = await evaluate(`fetch("/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      password: ${JSON.stringify(password)},
      next: "/"
    })
  }).then(response => response.status)`);
  if (loginStatus !== 200) throw new Error(`Login returned ${loginStatus}`);

  await command("Page.navigate", { url: `${baseUrl}/` });
  await waitFor(
    'document.readyState === "complete" && Boolean(document.querySelector(".hero"))',
  );
  await pause(700);

  const jobCount = await evaluate(
    'document.querySelectorAll(".hero-phone-jobs button").length',
  );
  const captures = Math.max(jobCount, 1);
  for (let index = 0; index < captures; index += 1) {
    if (jobCount) {
      await evaluate(
        `document.querySelectorAll(".hero-phone-jobs button")[${index}].click()`,
      );
      await pause(900);
    }
    await screenshot(`hero-${String(index + 1).padStart(2, "0")}.png`);
  }

  const metrics = await evaluate(`(() => {
    const hero = document.querySelector(".hero")?.getBoundingClientRect();
    const phone = document.querySelector(".hero-phone")?.getBoundingClientRect();
    return {
      title: document.title,
      width: window.innerWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      jobs: document.querySelectorAll(".hero-phone-jobs button").length,
      hero: hero ? { width: hero.width, height: hero.height } : null,
      phone: phone ? { width: phone.width, height: phone.height } : null
    };
  })()`);
  await writeFile(
    path.join(outputDirectory, "metrics.json"),
    `${JSON.stringify(metrics, null, 2)}\n`,
  );
  console.log(JSON.stringify(metrics));
} finally {
  socket.close();
  chrome.kill("SIGTERM");
  if (chrome.exitCode === null) {
    await Promise.race([once(chrome, "exit"), pause(1000)]);
  }
  await rm(profile, { force: true, recursive: true });
}
