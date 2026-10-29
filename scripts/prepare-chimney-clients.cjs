/** Reviewed CRM captures. Private originals stay outside public; blur is baked in. */
const sharp = require("sharp");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const files = [
  {
    input: "screens-1793299105-8f0c123e-01.jpg",
    output: "clients-mobile-blurred",
    top: 140,
    regions: [
      { left: 35, top: 918, width: 450, height: 44 },
      { left: 73, top: 975, width: 190, height: 35 },
    ],
  },
  {
    input: "screens-1793299106-c020b62a-02.jpg",
    output: "client-estimates-mobile-blurred",
    top: 56,
    regions: [
      { left: 35, top: 519, width: 450, height: 39 },
      { left: 73, top: 573, width: 190, height: 35 },
    ],
  },
];
(async () => {
  for (const file of files) {
    const input = path.join(
      root,
      ".codex-telegram/uploads/374897465",
      file.input,
    );
    const patches = [];
    for (const region of file.regions) {
      const reduced = await sharp(input)
        .extract(region)
        .resize(2, 1, { fit: "fill" })
        .png()
        .toBuffer();
      const padding = 8,
        width = region.width + padding * 2,
        height = region.height + padding * 2;
      const mask = Buffer.from(
        `<svg width="${width}" height="${height}"><defs><filter id="soft"><feGaussianBlur stdDeviation="2"/></filter></defs><rect x="4" y="4" width="${width - 8}" height="${height - 8}" rx="6" fill="white" filter="url(#soft)"/></svg>`,
      );
      patches.push({
        input: await sharp(reduced)
          .resize(width, height, { fit: "fill" })
          .blur(8)
          .ensureAlpha()
          .composite([{ input: mask, blend: "dest-in" }])
          .png()
          .toBuffer(),
        left: region.left - padding,
        top: region.top - padding,
      });
    }
    const reviewed = await sharp(input).composite(patches).png().toBuffer();
    await sharp(reviewed)
      .extract({ left: 0, top: file.top, width: 576, height: 1210 - file.top })
      .webp({ quality: 88 })
      .toFile(
        path.join(root, "public/cases/dimohod-trade", file.output + ".webp"),
      );
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
