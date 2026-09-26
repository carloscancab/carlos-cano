/**
 * Pre-generates per-page share images (1200x630 JPG) from each page's own
 * cover into public/og/<route-slug>.jpg, and writes the manifest
 * src/lib/og/covers.json that route head() reads. Pages missing from the
 * manifest fall back to the default card (public/og-portfolio.jpg).
 *
 *   node scripts/og/render-page-covers.mjs
 *
 * Re-run after adding a brand, audience, or content category, or changing a
 * cover. Needs Playwright with a Chromium/Chrome install.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

// src/lib/content.ts has no imports, so a plain transpile is enough to read it.
const contentJs = ts.transpileModule(readFileSync(join(root, "src/lib/content.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const content = await import(
  `data:text/javascript;base64,${Buffer.from(contentJs).toString("base64")}`
);

const series = content.studio.find((s) => s.featured) ?? content.studio[0];

/** manifest key (route-slug) → source cover under public/ */
const pages = [
  ...content.contentCategories.map((c) => [`c-${c.slug}`, c.image]),
  ...content.audiences.map((a) => [`audience-${a.slug}`, a.image]),
  ...content.brands.map((b) => [`brands-${b.slug}`, b.cover]),
  ["studio", series.cover],
];

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const outDir = join(root, "public/og");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: process.env.OG_CHROME_CHANNEL || "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const manifest = {};
for (const [key, cover] of pages) {
  const file = join(root, "public", cover);
  // Sniff by bytes: some covers are PNGs saved with a .jpg name.
  const bytes = readFileSync(file);
  const mime = bytes[0] === 0x89 && bytes[1] === 0x50 ? "image/png" : MIME[extname(file).toLowerCase()] ?? "image/jpeg";
  const src = `data:${mime};base64,${bytes.toString("base64")}`;
  // Fit the whole cover at full height (ink drawings and marks lose their
  // shape in a hard 1.9:1 crop), fade its side edges, and fill the rest with
  // the cover's own edge color so the paper tone runs edge to edge.
  await page.setContent(
    `<!doctype html><html><head><style>*{margin:0}html,body{width:1200px;height:630px;overflow:hidden;background:#f3f2ee}` +
      `.fg{position:absolute;top:0;left:50%;height:630px;width:auto;max-width:1200px;object-fit:cover;transform:translateX(-50%);` +
      `-webkit-mask-image:linear-gradient(to right,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(to right,transparent,#000 7%,#000 93%,transparent)}` +
      `</style></head><body><img class="fg" src="${src}" alt=""></body></html>`,
    { waitUntil: "load" },
  );
  await page.evaluate(async () => {
    const img = document.images[0];
    await img.decode();
    // Median of the left/right edge columns = the paper (or frame) tone.
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, 64, 64);
    const px = [];
    for (let y = 0; y < 64; y++) {
      for (const x of [0, 1, 62, 63]) px.push(ctx.getImageData(x, y, 1, 1).data);
    }
    const med = (i) => px.map((p) => p[i]).sort((a, b) => a - b)[px.length >> 1];
    document.body.style.background = `rgb(${med(0)},${med(1)},${med(2)})`;
  });
  const out = join(outDir, `${key}.jpg`);
  await page.screenshot({ path: out, type: "jpeg", quality: 85, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  manifest[key] = `/og/${key}.jpg`;
  console.log(`${cover} → public/og/${key}.jpg`);
}
await browser.close();

writeFileSync(join(root, "src/lib/og/covers.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`wrote src/lib/og/covers.json (${Object.keys(manifest).length} pages)`);
