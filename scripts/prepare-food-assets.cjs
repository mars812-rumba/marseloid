// Real Food Market captures only; no generated UI. Raw screenshots stay private.
const fs = require("node:fs"),
  path = require("node:path"),
  sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const crmRegions = [];
for (const x of [508, 956, 1404])
  for (const y of [457, 601, 745, 889])
    crmRegions.push(
      [x + 32, y + 12, 146, 22],
      [x + 286, y + 10, 116, 26],
      [x + 346, y + 35, 80, 23],
    );
const crmMobile = [];
for (const y of [479, 668, 857, 1042])
  crmMobile.push(
    [142, y + 12, 125, 27],
    [372, y + 10, 139, 30],
    [464, y + 42, 80, 27],
  );
const orderRows = [400, 523, 646, 769, 892, 1015].map((y, i) => [
  i === 5 ? 162 : 229,
  y + 23,
  i === 5 ? 172 : 155,
  32,
]);
const files = [
  ["menu-desktop", "desktop", "2026-10-27_23-15-55.png"],
  ["dish-desktop", "desktop", "2026-10-27_23-16-12.png"],
  [
    "crm-desktop",
    "desktop",
    "2026-10-27_23-16-34.png",
    crmRegions,
    { left: 508, top: 457, width: 1329, height: 570 },
  ],
  [
    "orders-desktop",
    "desktop",
    "2026-10-27_23-17-01.png",
    [752, 847, 943].map((y) => [170, y, 120, 25]),
  ],
  ["storefront-desktop", "desktop", "2026-10-27_23-17-55.png"],
  [
    "payment-desktop",
    "desktop",
    "2026-10-27_23-18-55.png",
    [[810, 411, 117, 25]],
  ],
  [
    "checkout-desktop",
    "desktop",
    "2026-10-27_23-19-54.png",
    [
      [692, 640, 42, 24],
      [692, 703, 42, 24],
      [932, 665, 110, 26],
    ],
  ],
  [
    "order-detail-desktop",
    "desktop",
    "2026-10-27_23-20-48.png",
    [
      [173, 559, 115, 26],
      [40, 719, 178, 26],
    ],
  ],
  ["menu-mobile", "mobile", "photo_2026-10-27_23-26-06.jpg"],
  ["categories-mobile", "mobile", "photo_2026-10-27_23-26-30.jpg"],
  ["dish-mobile", "mobile", "photo_2026-10-27_23-26-33.jpg"],
  [
    "restaurant-mobile",
    "mobile",
    "photo_2026-10-27_23-26-36.jpg",
    [[50, 760, 202, 32]],
  ],
  [
    "crm-mobile",
    "mobile",
    "photo_2026-10-27_23-26-38.jpg",
    crmMobile,
    { left: 0, top: 475, width: 576, height: 735 },
  ],
  ["orders-mobile", "mobile", "photo_2026-10-27_23-26-41.jpg", orderRows],
  [
    "order-detail-mobile",
    "mobile",
    "photo_2026-10-27_23-26-43.jpg",
    [
      [228, 422, 155, 31],
      [56, 629, 168, 29],
      [229, 1088, 154, 29],
    ],
  ],
  [
    "payment-mobile",
    "mobile",
    "photo_2026-10-27_23-26-46.jpg",
    [[162, 235, 159, 31]],
  ],
  ["storefront-mobile", "mobile", "photo_2026-10-27_23-26-48.jpg"],
];
(async () => {
  const manifest = {};
  for (const [name, device, file, regions = [], customCrop] of files) {
    const input = path.join(root, "screenshots/food-market", device, file);
    const overlays = await Promise.all(
      regions.map(async ([left, top, width, height]) => {
        const tiny = await sharp(input)
          .extract({ left, top, width, height })
          .resize(3, 1, { fit: "fill" })
          .png()
          .toBuffer();
        const w = width + 16,
          h = height + 16;
        const mask = Buffer.from(
          `<svg width="${w}" height="${h}"><defs><filter id="s"><feGaussianBlur stdDeviation="2"/></filter></defs><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="6" fill="white" filter="url(#s)"/></svg>`,
        );
        return {
          input: await sharp(tiny)
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
    let image = sharp(safe).extract(
      customCrop ||
        (device === "desktop"
          ? { left: 0, top: 215, width: 1898, height: 815 }
          : { left: 0, top: 56, width: 576, height: 1154 }),
    );
    if (device === "desktop") image = image.resize({ width: 1280 });
    const info = await image
      .webp({ quality: 88 })
      .toFile(path.join(root, "public/cases/food-market", name + ".webp"));
    manifest[name] = {
      src: "/cases/food-market/" + name + ".webp",
      width: info.width,
      height: info.height,
    };
  }
  fs.writeFileSync(
    path.join(root, "lib/food-assets.ts"),
    "// Reviewed real Food Market screenshots; privacy edits are baked into the files.\nexport const foodAssets = " +
      JSON.stringify(manifest, null, 2) +
      " as const;\n",
  );
  console.log("Prepared " + files.length + " real Food Market assets");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
