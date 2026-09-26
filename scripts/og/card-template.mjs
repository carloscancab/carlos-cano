/**
 * Shared share-card layout: an image on the left, the circle mark + name, a
 * large display word, a rule and a subline on the right. 1200x630 CSS pixels,
 * rendered at deviceScaleFactor 2 → 2400x1260.
 *
 * Palette = src/styles.css @theme; fonts = Shippori Mincho (display) and
 * Newsreader (text), the same Google Fonts the site loads. Mark path =
 * src/components/mark.tsx.
 */
import { readFileSync } from "node:fs";
import { extname } from "node:path";

export const CARD_CSS_WIDTH = 1200;
export const CARD_CSS_HEIGHT = 630;
export const CARD_SCALE = 2;

const MARK_PATH =
  "M18.4 12.4c-.5 4.4-4 7.5-7.9 6.8C6.2 18.4 3.4 14.4 4.1 10.1 4.8 5.9 8.8 3.1 13.4 4c2.9.6 5.1 2.8 5.6 5.6";

export function dataUrl(file) {
  const bytes = readFileSync(file);
  const mime =
    bytes[0] === 0x89 && bytes[1] === 0x50
      ? "image/png"
      : extname(file).toLowerCase() === ".webp"
        ? "image/webp"
        : "image/jpeg";
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/**
 * @param {{ image: string, imageWidth: number, imageHeight: number,
 *   imageCss?: string, heading: string, headingSize?: number,
 *   subline: string, footer?: string }} o
 */
export function titleCardHtml(o) {
  const headingSize = o.headingSize ?? 132;
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600&family=Shippori+Mincho:wght@500;600;700&display=block">
<style>
  :root { --bg:#fbfbf9; --surface:#f3f2ee; --fg:#161412; --muted:#5a564e; --faint:#8a857c; }
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:${CARD_CSS_WIDTH}px; height:${CARD_CSS_HEIGHT}px; background:var(--bg); color:var(--fg); overflow:hidden; }
  body { font-family:"Newsreader", Georgia, serif; -webkit-font-smoothing:antialiased; text-rendering:geometricPrecision; }
  .card { width:${CARD_CSS_WIDTH}px; height:${CARD_CSS_HEIGHT}px; display:flex; align-items:center; padding:0 80px; gap:72px; }
  .photo { flex:none; width:${o.imageWidth}px; height:${o.imageHeight}px; overflow:hidden; background:var(--surface); outline:1px solid rgba(22,20,18,.10); outline-offset:-1px; }
  .photo img { width:100%; height:100%; object-fit:cover; display:block; ${o.imageCss ?? ""} }
  .copy { flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; height:470px; }
  .top { display:flex; align-items:center; gap:18px; }
  .top svg { width:60px; height:60px; flex:none; }
  .name { font-family:"Shippori Mincho", serif; font-weight:700; font-size:44px; line-height:1; }
  h1 { font-family:"Shippori Mincho", serif; font-weight:600; font-size:${headingSize}px; line-height:1; letter-spacing:-.01em; margin-top:40px; white-space:nowrap; }
  .rule { width:104px; height:3px; background:var(--fg); margin-top:38px; }
  .sub { margin-top:26px; font-size:36px; line-height:1.25; font-weight:500; color:#3f3b35; }
  .foot { margin-top:auto; font-size:27px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
</style></head>
<body><div class="card">
  <div class="photo"><img src="${o.image}" alt=""></div>
  <div class="copy">
    <div class="top">
      <svg viewBox="0 0 24 24" fill="none"><path d="${MARK_PATH}" stroke="#161412" stroke-width="2.1" stroke-linecap="round"/></svg>
      <span class="name">Carlos Cano</span>
    </div>
    <h1>${esc(o.heading)}</h1>
    <div class="rule"></div>
    <p class="sub">${esc(o.subline)}</p>
    <p class="foot">${esc(o.footer ?? "carlos-cano.vercel.app")}</p>
  </div>
</div></body></html>`;
}

/** Render HTML to a PNG buffer at 2x (2400x1260) once fonts and images are ready. */
export async function renderPng(page, html) {
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode()));
  });
  return page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, width: CARD_CSS_WIDTH, height: CARD_CSS_HEIGHT },
  });
}
