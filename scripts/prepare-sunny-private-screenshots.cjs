// Run from the project root. Raw captures remain private and are never modified.
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const desktopRegions = [[62, 432], [508, 432], [956, 432], [1404, 432], [62, 576]]
  .flatMap(([x, y]) => [
    { left: x + 308, top: y + 12, width: 96, height: 18 },
    { left: x + 370, top: y + 35, width: 56, height: 12 },
  ]);
const mobileRegions = [290, 476, 662, 848, 1034].flatMap((y) => [
  { left: 380, top: y + 12, width: 132, height: 30 },
  { left: 474, top: y + 48, width: 68, height: 16 },
]);
const files = [
  {
    name: "crm-desktop-blurred",
    input: "desktop/old/2026-10-27_19-32-27.png",
    crop: { left: 0, top: 190, width: 1898, height: 840 },
    regions: desktopRegions,
  },
  {
    name: "crm-mobile-blurred",
    input: "mobile/old/photo_2026-10-27_19-36-05.jpg",
    regions: mobileRegions,
  },
  {
    name: "ai-mobile-blurred",
    input: "mobile/old/photo_2026-10-27_19-36-22.jpg",
    regions: [
      { left: 80, top: 76, width: 150, height: 22 },
      { left: 80, top: 102, width: 100, height: 18 },
    ],
  },
];

(async () => {
  for (const file of files) {
    const input = path.join(root, "screenshots/sunny-rentals", file.input);
    const overlays = await Promise.all(file.regions.map(async (region) => {
      // Collapse text detail before blurring, so the downloadable asset contains
      // no readable letters or digits. Keep the surrounding interface intact.
      const collapsed = await sharp(input).extract(region)
        .resize(3, 1, { fit: "fill" }).png().toBuffer();
      const padding = 8;
      const width = region.width + padding * 2;
      const height = region.height + padding * 2;
      const mask = Buffer.from(`<svg width="${width}" height="${height}">
        <defs><filter id="soft"><feGaussianBlur stdDeviation="2"/></filter></defs>
        <rect x="4" y="4" width="${width - 8}" height="${height - 8}"
          rx="6" fill="white" filter="url(#soft)"/>
      </svg>`);
      return {
        input: await sharp(collapsed)
          .resize(width, height, { fit: "fill" })
          .blur(8).ensureAlpha()
          .composite([{ input: mask, blend: "dest-in" }]).png().toBuffer(),
        left: region.left - padding,
        top: region.top - padding,
      };
    }));
    const redacted = await sharp(input).composite(overlays).png().toBuffer();
    let image = sharp(redacted).extract(file.crop || {
      left: 0, top: 56, width: 576, height: 1154,
    });
    if (file.crop) image = image.resize({ width: 1280 });
    await image.webp({ quality: 88 }).toFile(path.join(
      root, "public/cases/sunny-rentals", `${file.name}.webp`,
    ));
    console.log(`Prepared ${file.name}.webp`);
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
