import { chromium } from "playwright";
import fs from "fs";

const out = "/tmp/slideshots";
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

await page.goto(
  "https://docs.google.com/presentation/d/1NtAzNN60sQHLP394Zr3c8Evr790rZhpj_BLu00WBNCk/edit?usp=sharing",
  { waitUntil: "domcontentloaded", timeout: 45000 },
);
await page.waitForTimeout(5000);

// Try to dismiss any dialogs
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

// Click the first filmstrip thumbnail if possible
const thumbs = page.locator('[id*="filmstrip"] [role="option"], .punch-filmstrip-thumbnail, [aria-label*="Slide"]');
const n = await thumbs.count();
console.log("thumbs", n);

// Also try numbered buttons in filmstrip
for (let i = 1; i <= 7; i++) {
  // Click the filmstrip item with this number
  const item = page.locator(`text="${i}"`).first();
  try {
    await item.click({ timeout: 3000 });
  } catch {
    await page.keyboard.press("Home");
    for (let k = 1; k < i; k++) await page.keyboard.press("ArrowDown");
  }
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/slide-${i}.png` });
  console.log("shot", i);
}

// Try entering slideshow
try {
  await page.keyboard.press("Control+Enter");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${out}/slideshow-1.png` });
  for (let i = 2; i <= 7; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}/slideshow-${i}.png` });
  }
} catch (e) {
  console.log("slideshow fail", e.message);
}

await browser.close();
console.log("files", fs.readdirSync(out));
