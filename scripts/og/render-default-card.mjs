/**
 * Renders the default share card (public/og-portfolio.jpg, 1200x630).
 *
 *   node scripts/og/render-default-card.mjs
 *
 * Uses the site's own palette (src/styles.css @theme) and fonts (Shippori
 * Mincho for display, Newsreader for text) and the circle mark from
 * src/components/mark.tsx. Needs Playwright with a Chromium/Chrome install.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const out = join(root, "public/og-portfolio.jpg");
const portrait = `data:image/jpeg;base64,${readFileSync(
  join(root, "public/images/portrait.jpg"),
).toString("base64")}`;

const MARK_PATH =
  "M18.4 12.4c-.5 4.4-4 7.5-7.9 6.8C6.2 18.4 3.4 14.4 4.1 10.1 4.8 5.9 8.8 3.1 13.4 4c2.9.6 5.1 2.8 5.6 5.6";

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Shippori+Mincho:wght@500;600&display=block">
<style>
  :root { --bg:#fbfbf9; --surface:#f3f2ee; --fg:#161412; --muted:#5a564e; --faint:#8a857c; --rule:#e6e2d9; }
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:1200px; height:630px; background:var(--bg); color:var(--fg); }
  body { font-family:"Newsreader", Georgia, serif; -webkit-font-smoothing:antialiased; }
  .card { position:relative; width:1200px; height:630px; display:flex; align-items:center; padding:0 88px 0 80px; gap:80px; }
  .photo { flex:none; width:376px; height:470px; overflow:hidden; background:var(--surface); outline:1px solid rgba(22,20,18,.08); outline-offset:-1px; }
  .photo img { width:100%; height:100%; object-fit:cover; object-position:50% 0%; transform:scale(1.16); transform-origin:50% 8%; display:block; }
  .copy { flex:1; display:flex; flex-direction:column; justify-content:center; height:470px; }
  .top { display:flex; align-items:center; gap:18px; }
  .top svg { width:58px; height:58px; }
  .name { font-family:"Shippori Mincho", serif; font-weight:600; font-size:40px; letter-spacing:.005em; }
  h1 { font-family:"Shippori Mincho", serif; font-weight:500; font-size:132px; line-height:1; letter-spacing:-.01em; margin-top:40px; }
  .rule { width:96px; height:2px; background:var(--fg); margin-top:40px; }
  .role { margin-top:28px; font-size:34px; line-height:1.3; color:var(--muted); }
  .url { margin-top:auto; font-size:24px; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); }
</style></head>
<body><div class="card">
  <div class="photo"><img src="${portrait}" alt=""></div>
  <div class="copy">
    <div class="top">
      <svg viewBox="0 0 24 24" fill="none"><path d="${MARK_PATH}" stroke="#161412" stroke-width="1.7" stroke-linecap="round"/></svg>
      <span class="name">Carlos Cano</span>
    </div>
    <h1>Portfolio</h1>
    <div class="rule"></div>
    <p class="role">Brands, narratives &amp; content in Web3</p>
    <p class="url">carlos-cano.vercel.app</p>
  </div>
</div></body></html>`;

const browser = await chromium.launch({
  channel: process.env.OG_CHROME_CHANNEL || "chrome",
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out, type: "jpeg", quality: 90, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`wrote ${out}`);
