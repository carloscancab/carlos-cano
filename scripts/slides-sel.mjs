import { chromium } from "playwright";
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1800, height: 1100 } });
await page.goto(
  "https://docs.google.com/presentation/d/1NtAzNN60sQHLP394Zr3c8Evr790rZhpj_BLu00WBNCk/edit?usp=sharing",
  { waitUntil: "domcontentloaded", timeout: 45000 },
);
await page.waitForTimeout(6000);

const info = await page.evaluate(() => {
  const sels = [
    ".punch-filmstrip-thumbnail",
    "[id*='filmstrip']",
    ".sketchy-filmstrip-thumbnail",
    "[aria-label*='Slide']",
    ".punch-viewer-nav",
  ];
  const out = {};
  for (const s of sels) {
    out[s] = document.querySelectorAll(s).length;
  }
  const all = [...document.querySelectorAll("[aria-label]")].map((el) => el.getAttribute("aria-label")).filter((a) => /slide/i.test(a || ""));
  return { counts: out, slideLabels: all.slice(0, 30) };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
