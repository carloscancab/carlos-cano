import { chromium } from "playwright";
import fs from "fs";

const out = "/tmp/slideshots";
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1800, height: 1100 } });
page.setDefaultTimeout(8000);

await page.goto(
  "https://docs.google.com/presentation/d/1NtAzNN60sQHLP394Zr3c8Evr790rZhpj_BLu00WBNCk/edit?usp=sharing",
  { waitUntil: "domcontentloaded", timeout: 45000 },
);
await page.waitForTimeout(6000);
await page.keyboard.press("Escape");

const thumbs = page.locator('[role="option"]');
const n = await thumbs.count();
console.log("role=option", n);

for (let i = 0; i < Math.min(n, 12); i++) {
  const t = thumbs.nth(i);
  const label = await t.getAttribute("aria-label").catch(() => "");
  console.log(i, label);
  await t.click({ force: true });
  await page.waitForTimeout(900);
  // clip the slide canvas — right of filmstrip (~220px)
  await page.screenshot({
    path: `${out}/nav-${i}.png`,
    clip: { x: 230, y: 90, width: 1200, height: 780 },
  });
}

await browser.close();
console.log("wrote", fs.readdirSync(out).filter((f) => f.startsWith("nav-")));
