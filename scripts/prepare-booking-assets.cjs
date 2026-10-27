// Deterministic preparation of real Sunny Booking captures. Never modifies raw files.
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
// Rectangles use original pixels, before browser/OS chrome is cropped.
const files = [
  [
    "platform-desktop",
    "desktop",
    "2026-10-27_19-11-12.png",
    [[90, 972, 177, 20]],
  ],
  ["settings-desktop", "desktop", "2026-10-27_19-11-40.png"],
  ["timetable-desktop", "desktop", "2026-10-27_19-11-54.png"],
  [
    "request-detail-desktop",
    "desktop",
    "2026-10-27_19-12-36.png",
    [
      [346, 829, 144, 24],
      [394, 858, 108, 22],
    ],
  ],
  ["requests-desktop", "desktop", "2026-10-27_19-12-39.png"],
  ["fleet-desktop", "desktop", "2026-10-27_19-13-00.png"],
  ["storefront-desktop", "desktop", "2026-10-27_19-13-23.png"],
  ["dates-desktop", "desktop", "2026-10-27_19-13-29.png"],
  ["platform-mobile", "mobile", "photo_2026-10-27_19-37-34.jpg"],
  ["settings-mobile", "mobile", "photo_2026-10-27_19-37-39.jpg"],
  ["timetable-mobile", "mobile", "photo_2026-10-27_19-37-42.jpg"],
  ["handovers-mobile", "mobile", "photo_2026-10-27_19-37-47.jpg"],
  [
    "request-detail-mobile",
    "mobile",
    "photo_2026-10-27_19-37-52.jpg",
    [
      [81, 848, 104, 30],
      [103, 889, 147, 26],
    ],
  ],
  ["tariffs-mobile", "mobile", "photo_2026-10-27_19-37-59.jpg"],
  ["storefront-mobile", "mobile", "photo_2026-10-27_19-38-05.jpg", [], true],
  ["booking-mobile", "mobile", "photo_2026-10-27_19-38-07.jpg", [], true],
  ["requests-mobile", "mobile", "photo_2026-10-27_19-38-10.jpg"],
];
(async () => {
  const manifest = {};
  for (const [
    name,
    device,
    source,
    regions = [],
    publicPage = false,
  ] of files) {
    const input = path.join(
      root,
      "screenshots/sunny-rentals",
      device,
      "new",
      source,
    );
    const overlays = await Promise.all(
      regions.map(async ([left, top, width, height]) => {
        const collapsed = await sharp(input)
          .extract({ left, top, width, height })
          .resize(3, 1, { fit: "fill" })
          .png()
          .toBuffer();
        const w = width + 16,
          h = height + 16;
        const mask = Buffer.from(
          `<svg width="${w}" height="${h}"><defs><filter id="soft"><feGaussianBlur stdDeviation="2"/></filter></defs><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="6" fill="white" filter="url(#soft)"/></svg>`,
        );
        return {
          input: await sharp(collapsed)
            .resize(w, h, { fit: "fill" })
            .blur(8)
            .ensureAlpha()
            .composite([{ input: mask, blend: "dest-in" }])
            .png()
            .toBuffer(),
          left: left - 8,
          top: top - 8,
        };
      }),
    );
    const safe = await sharp(input).composite(overlays).png().toBuffer();
    const crop =
      device === "desktop"
        ? { left: 0, top: 215, width: 1898, height: 815 }
        : {
            left: 0,
            top: publicPage ? 56 : 138,
            width: 576,
            height: publicPage ? 1154 : 1072,
          };
    let image = sharp(safe).extract(crop);
    if (device === "desktop") image = image.resize({ width: 1280 });
    const info = await image
      .webp({ quality: 88 })
      .toFile(path.join(root, "public/cases/sunny-booking", `${name}.webp`));
    manifest[name] = {
      src: `/cases/sunny-booking/${name}.webp`,
      width: info.width,
      height: info.height,
    };
  }
  fs.writeFileSync(
    path.join(root, "lib/booking-assets.ts"),
    "// Real Sunny Booking captures from screenshots/sunny-rentals/*/new only.\nexport const bookingAssets = " +
      JSON.stringify(manifest, null, 2) +
      " as const;\n",
  );
  console.log(`Prepared ${files.length} reviewed screenshots`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
