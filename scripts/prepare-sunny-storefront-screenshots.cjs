// Prepare the owner's real mobile storefront captures. Keep originals unchanged.
const path = require("node:path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
(async () => {
  for (const [name, file] of [
    ["home-mobile", "storefront-2026-10-27.jpg"],
    ["catalog-mobile", "catalog-2026-10-27.jpg"],
    ["dates-mobile", "dates-2026-10-27.jpg"],
  ]) {
    await sharp(path.join(root, "screenshots/sunny-rentals/mobile/old", file))
      .extract({ left: 0, top: 138, width: 576, height: 1072 })
      .webp({ quality: 88 })
      .toFile(path.join(root, "public/cases/sunny-rentals", name + ".webp"));
    console.log("Prepared " + name + ".webp");
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
