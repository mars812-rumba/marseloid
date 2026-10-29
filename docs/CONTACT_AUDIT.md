# Contact and controls audit · 2026-10-29

The final contact destination is the owner's Telegram @marseloid. Existing
homepage anchors and service-to-contact routes stay intact. WhatsApp/MAX remain
available as the owner requested; existing project site links are preserved.

`lib/telegram-contact.ts` centralizes the public profile and UTF-8 draft link.
Direct Telegram actions prefill «Здравствуйте! Меня интересует:». The contact form
adds the visitor's sphere and task. It validates required/whitespace-only values,
shows a preview and explicit Telegram link, and clears prepared text when edited.
It never sends a message automatically. Copying is an optional fallback, including
manual selection when clipboard access is denied. No customer data is sent to the
site backend or stored. Privacy copy now explains passing text in the Telegram URL.
The schema.org sameAs profile stays a plain identity URL.

Telegram documents the public username text parameter at:
https://core.telegram.org/api/links#public-username-links
The app-specific handoff/draft display still needs a real phone check; this audit
does not claim to have sent a Telegram message or verified delivery.

## Checks

- Build, TypeScript, four backend tests, git diff --check.
- Chromium: all 18 sitemap pages, 52 distinct internal targets (pages/assets),
  25 same-page anchor links; no broken internal targets. Direct Telegram links
  have the correct recipient and encoded greeting.
- Form at 360/390/430/768/1440 px: required fields, whitespace validation,
  multiline Cyrillic and special characters, encoded draft equals preview,
  clipboard success/denial, manual selection and stale-draft reset. No horizontal
  overflow; Axe WCAG A/AA and JavaScript error checks pass.
- Homepage CTA reaches #contact; mobile navigation opens, selects and closes.
- Five cases at 390/1440 px: 54 module checks, 177 screen selections;
  device switches, screen tabs/arrows, native image zoom, original-size toggle,
  Escape/close, laptop lid range and keyboard tab navigation pass.
- Existing calculator: lazy mounting, parameter/roof changes, unchanged totals,
  formula disclosure, server success/failure/timeout; homepage and service retained.
- GET requests to LoftFire, Chimneys, Sunny Rentals, Sunny Booking example and
  Food Market demo return HTTP 200. Messenger links checked structurally only.
- Mobile contact form screenshot reviewed. No new dependencies or deployments.
