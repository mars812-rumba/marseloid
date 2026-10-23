# Marseloid · visual system

Skills: ui-ux-pro-max (portfolio grid / technical minimalism), framer-motion-core + framer-motion-react.

The database recommendations mixed dark-only style with a light palette. Resolve deliberately as a warm light editorial website with dark demonstration surfaces, not two incomplete themes.

- Warm paper background, near-black typography, muted graphite, deep blue action color (#234bc4; hover #193997). Pale blue selection and light-surface hover, light blue focus on dark surfaces. This gives Marseloid an accent distinct from the orange used by the chimney project.
- Manrope, self-hosted Cyrillic/Latin; monospace labels for technical metadata only. Space Mono was suggested but lacks the required Cyrillic coverage.
- Wide asymmetric editorial hero, live illustrative configurator, numbered service rows, large evidence-first project cards.
- One primary action per section. No fabricated metrics, logos, headshots or testimonials.
- Spacing: 4/8 px scale, 24 px mobile gutter, 64 px desktop gutter, 1280 px maximum content width.
- Controls at least 44 px, visible keyboard focus, persistent labels, contrast-tested semantic tokens.
- Motion: Framer Motion entrance on the hero and sections (24 px, 400 ms, once), interactive links lift 3 px with spring feedback, buttons compress on press; demo state changes 180–250 ms and a one-time 600 ms drawing of the canopy supports. MotionConfig reducedMotion=user across the site; explicit reduced-motion guards for custom animations. Content is visible in server HTML and never waits hidden for scroll or JavaScript. No infinite decorative animation.
- Responsive check: 375, 768, 1440 px; keyboard, reduced motion, enlarged text and landscape.
