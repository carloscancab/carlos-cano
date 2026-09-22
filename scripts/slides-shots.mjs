import { chromium } from "playwright";
import fs from "fs";

const out = "/tmp/slideshots";
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 920 } });

const urls = [
  [
    "preview",
    "https://docs.google.com/presentation/d/1NtAzNN60sQHLP394Zr3c8Evr790rZhpj_BLu00WBNCk/preview?usp=sharing",
  ],
  [
    "edit",
    "https://docs.google.com/presentation/d/1NtAzNN60sQHLP394Zr3c8Evr790rZhpj_BLu00WBNCk/edit?usp=sharing",
  ],
];

for (const [name, url] of urls) {
  console.log("GOTO", name);
  try {
    const resp = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    console.log("status", resp?.status(), "final", page.url());
    await page.waitForTimeout(5000);
    console.log("title", await page.title());
    const text = await page.locator("body").innerText().catch(() => "");
    console.log("body", text.slice(0, 1200));
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  } catch (e) {
    console.log("ERR", e.message);
  }
}

await browser.close();
console.log("done files", fs.readdirSync(out));
