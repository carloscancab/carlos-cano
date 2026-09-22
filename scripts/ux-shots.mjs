import { chromium } from "playwright";
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://127.0.0.1:8081/brands/universal-x", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

for (const id of [
  "the-sentence",
  "the-bet",
  "the-launch",
  "the-film",
  "the-desk",
  "the-campaigns",
  "the-speed",
  "the-cut",
]) {
  const el = page.locator(`#${id}`);
  if (await el.count()) {
    await el.evaluate((n) => n.scrollIntoView({ block: "start" }));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `/workspace/screenshots/ux-${id}.png` });
  }
}

const named = [
  ["launch-band", "text=Welcome to UniversalX"],
  ["product-cols", "text=The account"],
  ["phone", "text=The first session"],
  ["desk-band", "text=UniversalX V2"],
  ["radar", "text=The Radar"],
  ["campaigns-band", "text=UniversalX V3"],
  ["v3-poster", "text=V3 is a new beginning"],
  ["diamonds", "text=Time to trade"],
  ["speed-cols", "text=The product"],
  ["parti-band", "text=Introducing $PARTI"],
  ["cut-band", "text=Lessons from a chain-agnostic app"],
  ["end", "text=Differentiation did the rest"],
];
for (const [name, sel] of named) {
  const loc = page.locator(sel).first();
  if (await loc.count()) {
    await loc.evaluate((n) => n.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `/workspace/screenshots/ux-${name}.png` });
  } else {
    console.log("missing", name);
  }
}
await browser.close();
console.log("ok");
