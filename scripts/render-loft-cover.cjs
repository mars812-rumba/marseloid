/** Capture the existing devices, without changing geometry or screenshot content.
 * Local preview only. PLAYWRIGHT_MODULE and BROWSER_EXECUTABLE may be supplied.
 */
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE || "playwright-core",
);
const sharp = require("sharp");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.BROWSER_EXECUTABLE,
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1400 },
      reducedMotion: "reduce",
    });
    await page.goto("http://127.0.0.1:3103/cases/loft-fire/");
    await page.locator(".case-gallery").scrollIntoViewIfNeeded();
    await page.addStyleTag({
      content:
        'html,body{background:transparent!important} [data-laptop-viewport] > [aria-hidden="true"], [data-phone-scene] > [aria-hidden="true"]{visibility:hidden}',
    });
    await page.locator("[data-phone-rig] img").evaluate((img) => img.decode());
    const phone = await page
      .locator("[data-phone-rig]")
      .screenshot({ omitBackground: true });
    await page.getByRole("button", { name: "Ноутбук", exact: true }).click();
    await page.locator("[data-laptop-rig] img").evaluate((img) => img.decode());
    await page.waitForTimeout(400);
    const laptop = await page
      .locator("[data-laptop-viewport]")
      .screenshot({ omitBackground: true });
    const left = await sharp(laptop)
      .trim()
      .resize({ width: 1000, height: 720, fit: "inside" })
      .png()
      .toBuffer();
    const right = await sharp(phone)
      .trim()
      .resize({ height: 560 })
      .png()
      .toBuffer();
    await sharp({
      create: {
        width: 1280,
        height: 853,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: left, left: 28, top: 70 },
        { input: right, left: 900, top: 200 },
      ])
      .webp({ quality: 90 })
      .toFile("public/projects/loft-fire-devices.webp");
  } finally {
    await browser.close();
  }
})();
