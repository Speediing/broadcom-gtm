import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignored = new Set([".git", ".next", "node_modules"]);
const textExtensions = new Set([
  ".css",
  ".example",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".wgsl",
]);
const banned = ["ZGF0YWRvZw==", "c2VhZ2F0ZQ=="].map((value) =>
  Buffer.from(value, "base64").toString("utf8"),
);
const failures = [];
const files = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute);
    if (banned.some((term) => relative.toLowerCase().includes(term))) {
      failures.push(`banned term in filename: ${relative}`);
    }
    if (entry.isDirectory()) {
      await walk(absolute);
    } else if (
      entry.name === ".env.example" ||
      textExtensions.has(path.extname(entry.name))
    ) {
      files.push({ absolute, relative });
    }
  }
}

await walk(root);

let corpus = "";
for (const file of files) {
  const text = await readFile(file.absolute, "utf8");
  corpus += `\n${text}`;
  const lower = text.toLowerCase();
  for (const term of banned) {
    if (lower.includes(term)) {
      failures.push(`banned term "${term}" in ${file.relative}`);
    }
  }
  if (text.includes("\u2014")) {
    failures.push(`em dash in ${file.relative}`);
  }
  if (/#[0-9a-f]{3,8}\b/i.test(text)) {
    failures.push(`hex color in ${file.relative}`);
  }
}

const required = [
  ["Broadcom x SpaceXAI", "page title"],
  ["Biz Eshetu", "footer owner"],
  ["biz.eshetu@cursor.com", "footer email"],
  [
    "https://www.broadcom.com/company/news/resources#assets",
    "official wordmark source",
  ],
  ["--brand-h: 16px", "wordmark height"],
  ['"next": "15.5.24"', "Next 15.5"],
  ['"geist": "^1.7.2"', "Geist"],
  ['"vgpu": "^0.3.1"', "vgpu"],
];

for (const [needle, label] of required) {
  if (!corpus.includes(needle)) failures.push(`missing ${label}`);
}

const forbiddenDependency = Buffer.from(
  "bHVjaWRlLXJlYWN0",
  "base64",
).toString("utf8");
if (corpus.includes(forbiddenDependency)) {
  failures.push("forbidden dependency found");
}

const envExample = await readFile(path.join(root, ".env.example"), "utf8");
if (envExample.trim() !== "SITE_PASSWORD=") {
  failures.push(".env.example must not contain a password");
}

const [homePage, heroDemo, heroJobs, stylesheet, quoteWall] =
  await Promise.all([
    readFile(path.join(root, "src/app/(protected)/page.tsx"), "utf8"),
    readFile(path.join(root, "src/components/HeroDemo.tsx"), "utf8"),
    readFile(path.join(root, "src/data/hero-jobs.ts"), "utf8"),
    readFile(path.join(root, "src/app/globals.css"), "utf8"),
    readFile(path.join(root, "src/components/QuoteWall.tsx"), "utf8"),
  ]);

if (!homePage.includes("<HeroDemo />")) {
  failures.push("hero section must render HeroDemo");
}
if (!homePage.includes("<QuoteWall />")) {
  failures.push("quote wall must remain on the protected page");
}
if ((heroJobs.match(/^\s{4}name:/gm) || []).length !== 8) {
  failures.push("hero job registry must contain eight jobs");
}

const phoneClasses = [
  "hero-copy",
  "hero-phone-jobs",
  "hero-bot-demo",
  "hero-phone",
  "hero-phone-notch",
  "hero-phone-header",
  "hero-phone-thread",
  "hero-phone-composer",
];
for (const className of phoneClasses) {
  if (!heroDemo.includes(className)) {
    failures.push(`missing ${className} in HeroDemo`);
  }
  if (!stylesheet.includes(`.${className}`) && className !== "hero-copy") {
    failures.push(`missing ${className} styles`);
  }
}
if (!quoteWall.includes("PUBLIC_QUOTES")) {
  failures.push("quote wall must use the public quote registry");
}

if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`audit ok: ${files.length} text files checked`);
