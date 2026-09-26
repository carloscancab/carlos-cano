/**
 * Pre-generates per-page share images from each page's own cover into
 * public/og/v2/<route-slug>.jpg (2400x1260 = 1200x630 at 2x, JPEG q92 4:4:4),
 * and writes the manifest src/lib/og/covers.json that route head() reads.
 * Pages missing from the manifest fall back to the default card.
 *
 *   OG_PYTHON=/path/to/python-with-pillow node scripts/og/render-page-covers.mjs
 *
 * Re-run after adding a brand, audience, or content category, or changing a
 * cover. Bump the output folder (v3, …) when the images change so LinkedIn/X
 * refetch instead of serving their cached copies.
 *
 * Covers are drawn from their full-resolution files and never upscaled: the
 * whole cover is fitted at up to 1:1 and the rest of the frame is filled with
 * the cover's own edge (paper) color. /studio's series cover only exists as a
 * small YouTube thumbnail, so it gets a title card (like the default card)
 * with the largest available copy (scripts/og/sources/rwv-8-sd.jpg, 640x480
 * letterboxed = 640x360 of picture) at a modest size instead of a blown-up
 * full-bleed crop.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { chromium } from "playwright";
import {
  CARD_CSS_HEIGHT,
  CARD_CSS_WIDTH,
  CARD_SCALE,
  dataUrl,
  renderPng,
  titleCardHtml,
} from "./card-template.mjs";
import { writeJpeg } from "./encode-jpeg.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const VERSION = "v2";

// src/lib/content.ts has no imports, so a plain transpile is enough to read it.
const contentJs = ts.transpileModule(readFileSync(join(root, "src/lib/content.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const content = await import(
  `data:text/javascript;base64,${Buffer.from(contentJs).toString("base64")}`
);

const series = content.studio.find((s) => s.featured) ?? content.studio[0];

/** manifest key (route-slug) → how to draw it */
const pages = [
  ...content.contentCategories.map((c) => ({ key: `c-${c.slug}`, cover: c.image })),
  ...content.audiences.map((a) => ({ key: `audience-${a.slug}`, cover: a.image })),
  ...content.brands.map((b) => ({ key: `brands-${b.slug}`, cover: b.cover })),
  {
    key: "studio",
    card: {
      source: "scripts/og/sources/rwv-8-sd.jpg",
      imageWidth: 480,
      imageHeight: 270,
      heading: "Podcasts",
      headingSize: 104,
      subline: series.title,
    },
  },
];

function imageSize(file) {
  // Minimal JPEG/PNG header reader (no image deps in the repo).
  const b = readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error(`cannot read size of ${file}`);
}

function fitHtml(file) {
  const { w, h } = imageSize(file);
  const W = CARD_CSS_WIDTH * CARD_SCALE;
  const H = CARD_CSS_HEIGHT * CARD_SCALE;
  const s = Math.min(1, W / w, H / h); // device px per source px, never > 1
  const cssW = (w * s) / CARD_SCALE;
  const cssH = (h * s) / CARD_SCALE;
  const fade = (dir) =>
    `linear-gradient(${dir},transparent,#000 6%,#000 94%,transparent)`;
  return {
    scale: s,
    html:
      `<!doctype html><html><head><style>*{margin:0}html,body{width:${CARD_CSS_WIDTH}px;height:${CARD_CSS_HEIGHT}px;overflow:hidden;background:#f3f2ee}` +
      `img{position:absolute;left:50%;top:50%;width:${cssW}px;height:${cssH}px;transform:translate(-50%,-50%);` +
      `-webkit-mask-image:${fade("to right")},${fade("to bottom")};-webkit-mask-composite:source-in;` +
      `mask-image:${fade("to right")},${fade("to bottom")};mask-composite:intersect}` +
      `</style></head><body><img src="${dataUrl(file)}" alt=""></body></html>`,
  };
}

const outDir = join(root, "public/og", VERSION);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: process.env.OG_CHROME_CHANNEL || "chrome" });
const page = await browser.newPage({
  viewport: { width: CARD_CSS_WIDTH, height: CARD_CSS_HEIGHT },
  deviceScaleFactor: CARD_SCALE,
});
const manifest = {};
for (const p of pages) {
  let png;
  let note;
  if (p.card) {
    const { source, ...card } = p.card;
    png = await renderPng(page, titleCardHtml({ ...card, image: dataUrl(join(root, source)) }));
    note = `${source} (title card)`;
  } else {
    const file = join(root, "public", p.cover);
    const { html, scale } = fitHtml(file);
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(async () => {
      const img = document.images[0];
      await img.decode();
      // Median of the cover's border pixels = its paper (or frame) tone.
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, 64, 64);
      const d = ctx.getImageData(0, 0, 64, 64).data;
      const px = [];
      for (let y = 0; y < 64; y++) {
        for (let x = 0; x < 64; x++) {
          if (x < 2 || x > 61 || y < 2 || y > 61) px.push((y * 64 + x) * 4);
        }
      }
      const med = (k) => px.map((i) => d[i + k]).sort((a, b) => a - b)[px.length >> 1];
      document.body.style.background = `rgb(${med(0)},${med(1)},${med(2)})`;
    });
    png = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: CARD_CSS_WIDTH, height: CARD_CSS_HEIGHT },
    });
    note = `${p.cover} @${scale.toFixed(2)}x`;
  }
  const out = join(outDir, `${p.key}.jpg`);
  const bytes = writeJpeg(png, out);
  manifest[p.key] = `/og/${VERSION}/${p.key}.jpg`;
  console.log(`${note} → public/og/${VERSION}/${p.key}.jpg (${bytes} bytes)`);
}
await browser.close();

writeFileSync(join(root, "src/lib/og/covers.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`wrote src/lib/og/covers.json (${Object.keys(manifest).length} pages)`);
