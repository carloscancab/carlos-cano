import { chromium } from "playwright";
import fs from "fs";

const out = "/tmp/slideshots";
fs.mkdirSync(out, { recursive: true });

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
await page.keyboard.press("Escape");

const thumbs = page.locator(".punch-filmstrip-thumbnail");
const n = await thumbs.count();
console.log("thumbs", n);

for (let i = 0; i < n; i++) {
  await thumbs.nth(i).click({ force: true });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: `${out}/canvas-${i + 1}.png`,
    clip: { x: 240, y: 100, width: 1100, height: 760 },
  });
  // also full for safety
  await page.screenshot({ path: `${out}/full-${i + 1}.png` });
  console.log("clicked", i + 1);
}

await browser.close();
console.log("ok");
