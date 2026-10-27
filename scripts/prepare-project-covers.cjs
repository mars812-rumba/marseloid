const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const uploads = path.join(root, ".codex-telegram/uploads/374897465");
const output = path.join(root, "public/projects");
const sources = [
  ["sunny-rentals", "screens-1793134886-94047804-01.jpg"],
  ["food-market", "screens-1793134887-891d4e56-02.jpg"],
  ["sunny-booking", "screens-1793134888-0fd03d34-03.jpg"],
  ["chimneys", "screens-1793134889-9ddbeb6c-04.jpg"],
];

(async () => {
  await fs.mkdir(output, { recursive: true });
  for (const [slug, file] of sources) {
    const source = path.join(uploads, file);
    let image = sharp(source);
    if (slug === "sunny-booking") {
      // Irreversibly obscure the Telegram ID in the superadmin account footer.
      const region = { left: 138, top: 617, width: 107, height: 20 };
      const blurred = await sharp(source).extract(region)
        .resize(2, 1).resize(region.width, region.height).blur(6)
        .png().toBuffer();
      image = image.composite([{ input: blurred, left: region.left, top: region.top }]);
    }
    await image.webp({ quality: 88 }).toFile(path.join(output, `${slug}-cover.webp`));
    // Retain original screen pixels; use only the reviewed imagegen silhouette.
    const mask = await sharp(path.join(root, "assets/project-cover-masks", `${slug}.png`))
      .extractChannel(0).raw().toBuffer();
    const { data, info } = await sharp(path.join(output, `${slug}-cover.webp`))
      .raw().toBuffer({ resolveWithObject: true });
    await sharp(data, { raw: info })
      .joinChannel(mask, { raw: { width: info.width, height: info.height, channels: 1 } })
      .webp({ quality: 90 }).toFile(path.join(output, `${slug}-cutout.webp`));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
