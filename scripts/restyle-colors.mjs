import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../src/app/globals.css", import.meta.url);
let css = await readFile(file, "utf8");

const rootStart = css.indexOf(":root {");
const rootEnd = css.indexOf("\n}", rootStart);

const root = `:root {
  --ink: oklch(0.23 0.025 38);
  --muted: oklch(0.47 0.025 54);
  --paper: oklch(0.96 0.028 82);
  --surface: oklch(0.985 0.012 82);
  --line: oklch(0.84 0.035 76);
  --accent: oklch(0.49 0.19 24);
  --accent-dark: oklch(0.37 0.14 24);
  --copper: oklch(0.62 0.12 56);
  --sage: oklch(0.52 0.055 148);
  --blue: oklch(0.46 0.07 246);
  --violet: oklch(0.47 0.10 315);
  --signal: oklch(0.61 0.12 154);
  --danger: oklch(0.53 0.19 24);
  --night: oklch(0.17 0.025 252);
  --bg: var(--paper);
  --bg-deep: var(--night);
  --ink-soft: var(--muted);
  --kicker: var(--accent);
  --panel: var(--surface);
  --line-strong: oklch(0.74 0.045 70);
  --shot: var(--surface);
  --shot-ink: var(--ink);
  --shot-muted: var(--muted);
  --shot-line: var(--line);
  --shot-radius: 3px;
  --shot-shadow: none;
  --mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  --imessage-blue: var(--blue);
  --imessage-gray: oklch(0.91 0.015 78);
  --phone: var(--night);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}`;

css = `${root}${css.slice(rootEnd + 2)}`;

function semanticColor(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (lightness > 0.94) return "var(--surface)";
  if (lightness < 0.12) return "var(--night)";
  if (delta < 0.08) {
    if (lightness > 0.78) return "var(--line)";
    if (lightness > 0.48) return "var(--muted)";
    return "var(--ink)";
  }

  let hue;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;
  hue = ((hue * 60) + 360) % 360;

  if (hue < 35 || hue >= 335) return "var(--accent)";
  if (hue < 88) return "var(--copper)";
  if (hue < 175) return "var(--signal)";
  if (hue < 285) return "var(--blue)";
  return "var(--violet)";
}

function withAlpha(color, alpha) {
  if (alpha >= 0.995) return color;
  const percent = Math.max(1, Math.round(alpha * 100));
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}

css = css.replace(
  /#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
  (_, raw) => {
    const full =
      raw.length <= 4
        ? raw
            .split("")
            .map((digit) => `${digit}${digit}`)
            .join("")
        : raw;
    const red = Number.parseInt(full.slice(0, 2), 16);
    const green = Number.parseInt(full.slice(2, 4), 16);
    const blue = Number.parseInt(full.slice(4, 6), 16);
    const alpha =
      full.length === 8 ? Number.parseInt(full.slice(6, 8), 16) / 255 : 1;
    return withAlpha(semanticColor(red, green, blue), alpha);
  },
);

css = css.replace(
  /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)/g,
  (_, red, green, blue, alpha) =>
    withAlpha(
      semanticColor(Number(red), Number(green), Number(blue)),
      alpha === undefined ? 1 : Number(alpha),
    ),
);

await writeFile(file, css);
