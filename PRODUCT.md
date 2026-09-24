# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Guests of Areli Edith's XV años.** They receive the link over WhatsApp and open it once or twice on their phones, usually in the in-app browser, and sometimes in bright daylight. About 95% view it on a phone. Their job: learn when and where the event is, get directions to the church and the reception hall, save the date, and ask a question if they have one. The audience spans ages, from teenagers to grandparents, so the page must stay readable and obvious for older relatives.
- **Areli's family (the client).** Hugo builds the site for them. They approve the content and the look, and they own the pending decisions below.

## Product Purpose

A one-page digital invitation for the XV años (quinceañera) of **Areli Edith**, shared as a link. It replaces or accompanies the printed invitation and adds what paper can't: a live countdown, one-tap directions to each venue, an add-to-calendar file and a WhatsApp contact. Success means a guest opens the link from the chat, feels invited to something special, and reaches the date, time, places and route with no confusion.

## Positioning

It continues the family's physical invitation. The quinceañera illustration and the floral bouquet were cut from the original printed design, and the palette and centered layout come from it too. The site should feel like the printed piece come alive, not like a generic invitation template.

## Operating Context

- It is opened from WhatsApp, so the Open Graph preview card is the first impression and must look finished.
- **Event:** Sábado 05 Diciembre 2026.
  - Ceremony at 6:00 PM, San Antonio de Padua, Morelia.
  - Reception at 7:00 PM, Salón Sol y Luna, Morelia.
  - The two venues are about 5 minutes apart.
- **Time zone:** Michoacán has used UTC−6 year-round since 2022, so the countdown target is fixed at `2026-12-05T18:00:00-06:00`.
- **Language:** all guest-facing copy is in Spanish. All code (identifiers, file names, comments) is in English.
- **Future sections:** the layout is structured so that the Phase 2 sections (an itinerary timeline and a photo gallery) can be added as components without restructuring.

## Capabilities and Constraints

- **Deploy:** Vercel at https://xv-areli-edith.vercel.app (domain root; `site` set in `astro.config.mjs`). Pushes to `main` publish to production; other branches get preview URLs.
- **Stack:** Astro + TypeScript. No UI framework; interactive parts use vanilla JS islands. Fonts are self-hosted through @fontsource (Cinzel, Jost).
- **Features:**
  - countdown
  - Google Maps "Cómo llegar" for the church and for the hall (Maps URL API, no API key)
  - church → hall route
  - static `.ics` for add-to-calendar
  - WhatsApp contact for questions (**not** RSVP)
  - godparents list driven by `src/data/godparents.ts`
- **Data:** all event data lives in `src/data/event.ts`. Keys are in English, values in Spanish.
- **Performance target:** loads in under 1 s on 4G; images are WebP.
- **Appearance:** forced light appearance (`color-scheme: light`), so a viewer's dark mode never inverts the palette.
- **Source of truth:** the full brief is in `docs/spec-project.md`. Its data, palette, contrast rules and feature list are non-negotiable.
- **Open decisions (the family decides; none of these block design work):**
  - Dress code: undecided. Leave room for one line.
  - Gift table or envelope shower ("lluvia de sobres"): undecided. Leave room for a short block.
  - The WhatsApp number and godparent names in the data files are **placeholders** and must be replaced before publishing.

## Brand Commitments

- **Binding palette and type from the brief:**
  - rose-strong `#BF777F`, rose `#D28990`, rose-soft `#E7B3B8`, cream `#F7F1E8`, gold `#C8A96B`, ink `#65423E`
  - Cinzel for titles; Jost for body text
- **Contrast rules (strict):**
  - Ink is the only color for small or running text.
  - Rose-strong is allowed only for large, bold text.
  - Rose, rose-soft and gold are decorative only, never text.
- **Protagonists:** the name "Areli Edith" and the quinceañera illustration.
- **Voice:** warm, first person from Areli ("Te espero para celebrar juntos este gran día"), brief.

## Evidence on Hand

- `public/celebrant.webp` / `.png`: the quinceañera illustration, taken from the printed design.
- `public/bouquet.webp` / `.png`: the floral bouquet.
- `public/event.ics`: the calendar file.
- `public/favicon.svg`: the favicon.
- `public/og.jpg` (1200×630 WhatsApp share preview), `public/apple-touch-icon.png`, and the petal favicon.
- **Placeholders:** the WhatsApp number and godparent names are not real data. Never invent other names, numbers, dress codes or gift details.

## Product Principles

1. **Phone first, WhatsApp first.** Design every decision for a phone opened from a chat, including the share card.
2. **Readable facts before decoration.** Anything a guest needs (time, place, address) must be legible in daylight for every age.
3. **One focal moment.** The name and the illustration carry the emotion. Everything else stays disciplined and quiet.
4. **Faithful to the printed invitation.** Extend the family's physical design; don't replace it.
5. **Clear actions.** Each function (directions, route, calendar, WhatsApp) is one obvious tap.

## Accessibility & Inclusion

- Keep the contrast rules above.
- Keyboard focus is visible.
- The illustration has descriptive `alt` text; ornaments use `alt=""` or `aria-hidden`.
- `prefers-reduced-motion` turns off the hero entrance and the petals.
- Honor the safe-area insets (`viewport-fit=cover`).
- Text must stay comfortable for older guests.
