# LoftFire: evidence and maintenance

The fifth independent case is `/cases/loft-fire/`. Shared CaseStudyPage, CaseModules,
CaseImageViewer and CaseGallery provide the layout, tabs, zoom and existing devices.
Only LoftFire uses DeferredCaseGallery, which loads the existing scene as the reader
approaches it. No device geometry/materials changed. Reduced motion, background and
visibility handling remain in the original components.

## Evidence

Owner screenshots: `screenshots/loft-fire/{desktop,mobile}` (private, not published).
Reviewed all six desktop and seven mobile captures. `scripts/prepare-loft-assets.cjs`
removes desktop browser rows and Windows taskbar, Android status/browser/navigation
bars. Site header, cart and contact controls are retained. No personal customer data
appears in these public storefront captures. Public WebP output has no EXIF metadata.
No invented UI, before/after image, business metric or customer quote is used.

Source checked read-only: `/home/loft_fire/loft-app/artifacts/loftfire`:
- `src/components/OfferBlock.tsx`: three presets, quantity bounds, line totals,
  subtotal/discount/total calculation and lead payload; constructor anchor `#offer`.
- `src/lib/kit.ts`: shared preset state.
- `src/components/IncludedBlock.tsx`: product galleries and color selection.
- `src/components/ProductionProcess.tsx`: four video stages.
- `src/lib/lead.ts`: request submission to `/api/lead` (no real lead submitted).
- `package.json`: React, TypeScript, Vite and Tailwind CSS.

The live homepage returned HTTP 200 during verification. No form was submitted.
No payment, CRM, SEO-performance or sales-conversion claims are made. Prices shown
inside the screenshots are historical UI values, not a portfolio price list.
The production component has no dedicated anchor; the module links to the live site
instead of inventing a production URL. Large videos remain on the product site.

## Device sets

Desktop: home, ready sets, constructor, product presentation, colors, production.
Phone: home, ready sets, constructor, colors, production. There is no separate mobile
capture of the table/bench presentation: the demo omits that phone topic. The product
module uses the real mobile grill presentation, within the same product category.
The order-detail capture shows the selected composition and total in the constructor
module. The advantages capture is prepared but not repeated in the case.

The active preview `public/projects/loft-fire-mockup.webp` is the owner's supplied
Telegram mockup (2026-10-29), optimized to WebP at its original 1280×853 dimensions.
The full composition, background and real interface content are preserved without
cropping or redrawing. It is shared by the homepage, /cases and the websites service.
The earlier rendered `loft-fire-devices.webp` remains available as a fallback;
`scripts/render-loft-cover.cjs` only regenerates that earlier asset, not the active
owner-supplied mockup. The interactive case gallery is unchanged.

## Service and calculator

`/services/websites-and-improvements/` reuses pricing and work-process components
from the homepage, adds LoftFire as an example and explicitly welcomes small tasks.
All prices remain in `lib/pricing.ts`, supplied by the owner, and carry a preliminary
non-offer note. Website-service content lives in `lib/websites-service.ts`.

The existing canopy Demo is mounted only near the viewport on
`/services/product-configurators/`, through CanopyDemo. Its formulas and server API
were preserved: area × (3200 + 1200/1900), width 3–6, depth 2–5. Server failure keeps
the local result available. The estimate is clearly illustrative, not a quotation.
The homepage does not duplicate the calculator.

## Files changed for this iteration

- Routes/presentation: `app/page.tsx`, `app/home.module.css`,
  `app/cases/page.tsx`, `app/cases/[slug]/page.tsx`,
  `app/services/page.tsx`, `app/services/[slug]/page.tsx`.
- Shared existing components: `components/shared.tsx` (new cover mapping),
  `components/case-study.tsx` (optional case label),
  `components/case-modules.tsx` (optional module link). Existing case data and
  device components are preserved.
- New reusable components: `components/commercial-details.tsx` and its CSS module;
  `components/websites-service.tsx` and its CSS module;
  `components/canopy-demo.tsx` and its CSS module;
  `components/deferred-case-gallery.tsx`.
- Data: `lib/content.ts`, `lib/case-studies.ts`, `lib/home-content.ts`,
  `lib/loft-case.ts`, `lib/loft-assets.ts`, `lib/websites-service.ts`.
- Assets: `public/cases/loft-fire/*.webp`,
  `public/projects/loft-fire-devices.webp`; preparation/render scripts in `scripts`.
- Documentation: this file, `docs/DESIGN.md`, `docs/HOMEPAGE.md`.

Existing pending Sunny Booking screenshot changes and header changes were not
reverted or included in unrelated refactoring. No commits, pushes, deployments or
production restarts were performed.

## Validation (2026-10-29)

- `npm run build`, `npm run typecheck`, `npm run test:backend`: pass (4 backend
  tests, including all supported parameter combinations and invalid input).
- Chromium: homepage, LoftFire, websites service and configurator service at 360,
  390, 430, 768, 1280 and 1440 px; no horizontal overflow, single H1.
- New routes, canonical/description, internal links/images and five-project order:
  verified. Existing four case links also return success.
- LoftFire: all six laptop/five phone topics, stable phone height, four module tabs,
  native image dialogs, Escape close, laptop hinge slider: pass at 390 and 1440 px.
- Normal-motion pass: gallery deferred before approaching, autoplay, keyboard body
  rotation, screenshot swipe, hinge and zoom. Reduced-motion checks passed separately.
- Calculator: 52,800 default, 153,000 at 6×5/metal, 76,500 at 3×5/metal; real Python
  API verification and forced network-failure fallback both passed. Formulas unchanged.
- Axe WCAG 2 A/AA: no violations on the four checked surfaces at 390 px.
- Mechanical design detector: no findings; `git diff --check`: clean.

Manual follow-up: physical iPhone/Safari gestures and viewport behavior; actual
LoftFire lead submission/receipt and production video playback. These were not
triggered during read-only product verification. No deployment was performed.
