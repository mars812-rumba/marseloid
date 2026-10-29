# Three service pages

Existing routes are preserved:
- `/services/manufacturer-catalogs/`: product choices, variants, catalog maintenance,
  real Chimneys product/admin screenshots, and a short catalog-to-estimate flow.
- `/services/product-configurators/`: manual-calculation scenario, the existing
  interactive canopy demo, Chimneys configuration/scheme/PDF, and LoftFire sets.
- `/services/quote-automation/`: client CRM, estimate editing and PDF in Chimneys; CRM/calendar/booking in Sunny Rentals, its reviewed
  AI controls, Sunny Booking onboarding and Food Market menu/order operations.

## Editing and reuse

`lib/service-pages.ts` owns the page copy, metadata and selection of screenshots.
It reuses reviewed CaseStudy image objects without changing the original cases.
`components/detailed-services.tsx` gives each page its own composition and shares
small helpers for headings, capabilities, galleries, internal links and contact CTA.
`components/detailed-services.module.css` is scoped to these pages.

The route still renders WebsitesService for websites-and-improvements, unchanged.
Other service index titles/short descriptions are updated in `lib/content.ts` to
match the broader service names. Homepage content is not modified.

Reused components: PageIntro, Reveal, MotionLink, CaseImageViewer (adaptive image
pairs, screenshot selection, native zoom and original-size view), and CanopyDemo.
No 3D models, images, libraries, calculator formulas or backend code were added or
changed. Text is from the independent developer's perspective.

## Evidence and limits

All images come from the existing public case assets. CRM names/IDs are already
irreversibly blurred. No raw uploads or customer records are published. Existing
captions distinguish different real mobile and desktop captures of the same task.
The pipe card on desktop corresponds to a deflector card on mobile; the copy and
alt text retain this distinction. Catalog/admin and photography controls are shown
as separate captures, not fabricated new product screens.

Sunny Rentals calendars and AI controls have real mobile captures; those portrait
screens are also available on desktop, rather than replaced by invented wide UI.
Sunny Booking's fleet module uses tariff editing on mobile and fleet cards on
desktop, with original captions. Its status is testing/onboarding. Food Market is
explicitly a demo product, with no payment-processing or adoption claims added.

The canopy demo remains an illustrative calculation (not a commercial quotation):
width 3–6, depth 2–5; area × (3200 + 1200/1900). Local updates and server-verification
fallback remain intact. In Chimneys, technical decisions stay subject to a
specialist's review. No new sales metrics, reviews, SEO guarantees or clients.

Metadata is unique per service: title, description, canonical, Open Graph and
Twitter fields. No ratings or offer structured data were introduced.

## Changed files

- `app/services/[slug]/page.tsx`
- `components/detailed-services.tsx`
- `components/detailed-services.module.css`
- `lib/service-pages.ts`
- `lib/content.ts` (two service names and their short descriptions only)
- `docs/SERVICE_PAGES.md`

## Validation

- `npm run build`, `npm run typecheck`, `npm run test:backend`: passed; four backend
  tests include all supported canopy parameter combinations and invalid inputs.
- Chromium at 360/390/430/768/1440 px: all three service pages, readable layout,
  one H1 each and no horizontal overflow. Inspected mobile and desktop screenshots.
- All screenshot selectors and native zoom dialogs at 390 and 1440 px: images
  load, captions/alt remain present, Escape closes the viewer. Internal case/contact
  links and public image links return success.
- Unique page titles/descriptions, canonical URLs and matching og:url: passed.
- Canopy demo: one instance only; 52,800 default, 153,000 at 6×5/metal, 76,500 at
  3×5/metal. Parameters and visualization update; forced API failure preserves
  the local calculation. The illustrative-price notice is visible.
- Axe WCAG 2 A/AA: no violations on the three pages at 390 px. No browser JavaScript
  errors detected. `git diff --check`: clean.

Browser checks used desktop Chromium with responsive viewports. Physical Safari/
iPhone behavior and actual contact submission were not exercised. No messages,
commits, pushes, deployments or production service restarts were performed.


## Chimneys client workspace

Client CRM is now the first proof example on the automation page, before Sunny
Rentals. The same two mobile captures also extend the existing «Клиенты и сметы»
case module, alongside the previous estimate-editor capture. The case demo devices
and other case modules are unchanged. The old small estimate teaser is replaced
by this substantive example, avoiding a duplicate closing description.

Reviewed source read-only: apps/web/components/AdminCustomerManager.tsx and
ManagerEstimateCard.tsx in /home/dimohod-trade. Confirmed customer/measurement
search, saved/previous calculations, notes, estimate editing, discount fields and
PDF preparation. Previous calculations are not described as a full edit-audit log.
No invented sales stages, reminders, automatic PDF delivery or messenger pipeline.

Public assets: clients-mobile-blurred.webp and client-estimates-mobile-blurred.webp
in public/cases/dimohod-trade. Prepared by scripts/prepare-chimney-clients.cjs from
the owner's two Telegram captures. Browser/status/navigation bars are cropped.
Names and phones are downsampled to 2×1, enlarged and blurred with feathered edges
before encoding; no unredacted public copy is created. Privacy is baked into the
files used by the image viewer, original-size view and download. The two screenshots
are real phone captures and are not falsely paired with desktop substitutes.

Additional files: lib/chimney-clients.ts, scripts/prepare-chimney-clients.cjs,
lib/case-studies.ts; service copy/composition/styles updated in the same existing
service files. No source changes were made to the actual manufacturer website.

Client-workspace validation: build/typecheck and four backend tests passed.
Chromium at 360/390/430/1440 px: no overflow; new CRM appears before Sunny Rentals;
all four service screenshots and all three case-module screenshots load and zoom.
Both normal and full-size views use the same blurred public files. Escape closes
image dialogs; case/contact link targets are preserved. Axe WCAG A/AA passed for
both affected routes, with no JavaScript errors. No deployment was performed.

## Arched canopy illustration

The existing calculator now uses components/canopy-illustration.tsx: a projected
arched roof with transverse ribs, four corner posts and dimension lines anchored
to the same footprint. Width/depth alter that shared geometry; roof material changes
surface opacity/color. No raster/generated image or 3D dependency is used. Existing
Framer Motion transitions respect reduced motion. The compact service wrapper gives
the diagram more room on phones. Price formulas, inputs and API logic are unchanged.

Validation: build, TypeScript, four backend tests; Chromium at 360/390/430/768/1440
px. All 32 width/depth/material combinations checked at 390 px: unchanged totals,
four posts, all diagram paths and labels inside the SVG viewport. Extreme dimensions
also checked at the other widths. Normal/reduced-motion rendering and Axe WCAG A/AA
passed. Mobile and desktop screenshots reviewed. No deployment performed.

## Automation page: clearer outcomes and platform model

Only `/services/quote-automation/` changed: shorter problem/Chimneys copy and
smaller headings in those two sections. A separate restrained result callout
emphasizes preparing an estimate and commercial proposal from a saved calculation,
including on a phone. No measured time savings are claimed. Sunny Booking now has
a responsive three-step diagram: platform → independent companies → each company's
vehicles, tariffs, requests and storefront. The testing/onboarding status remains
visible; the diagram does not invent customers or adoption counts.

Content lives in `lib/service-pages.ts`; presentation/styles in
`components/detailed-services.tsx` and `components/detailed-services.module.css`.
Other service routes, case content, screenshots and 3D components are unchanged.

Validation: npm run build, npm run typecheck, npm run test:backend (4 tests),
git diff --check. Local Chromium at 360/390/430/768/1440 px checked diagram layout,
result callout, all four CRM screenshots and zoom, links and horizontal overflow.
Axe WCAG A/AA and JavaScript error checks passed. Mobile/desktop screenshots reviewed.
No deployment performed.
