/**
 * Renders the default share card: public/og-portfolio-v3.jpg, 2400x1260
 * (1200x630 at 2x), JPEG q92 4:4:4.
 *
 *   OG_PYTHON=/path/to/python-with-pillow node scripts/og/render-default-card.mjs
 *
 * Portrait from the full-resolution public/images/portrait.jpg (1152x1728;
 * drawn at ~0.76x, never upscaled). Bump the file name (v3, …) when the card
 * changes so LinkedIn/X refetch instead of serving their cached copy, and
 * update DEFAULT_OG_IMAGE in src/lib/og/meta.ts.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { CARD_SCALE, dataUrl, renderPng, titleCardHtml } from "./card-template.mjs";
import { writeJpeg } from "./encode-jpeg.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const out = join(root, "public/og-portfolio-v3.jpg");

const html = titleCardHtml({
  image: dataUrl(join(root, "public/images/portrait.jpg")),
  imageWidth: 376,
  imageHeight: 470,
  imageCss: "object-position:50% 0%; transform:scale(1.16); transform-origin:50% 8%;",
  heading: "Portfolio",
  subline: "Brands, narratives & content in Web3",
  footer: null,
});

const browser = await chromium.launch({ channel: process.env.OG_CHROME_CHANNEL || "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: CARD_SCALE });
const bytes = writeJpeg(await renderPng(page, html), out);
await browser.close();
console.log(`wrote ${out} (${bytes} bytes)`);
