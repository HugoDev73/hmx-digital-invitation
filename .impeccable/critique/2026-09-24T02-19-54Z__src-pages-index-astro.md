---
target: index (microsite)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:E:\\Projects\\hmx-digital-invitation\\src\\pages\\index.astro"
target_fingerprint: "sha256:e33e3b802b911d4213b92e51460932965ff6d08cf2e06e6b3c4f60212c8aec6e"
target_path: "E:\\Projects\\hmx-digital-invitation\\src\\pages\\index.astro"
timestamp: 2026-09-24T02-19-54Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Countdown shows 00 before JS and stays at 0 forever after the event; no day-of state |
| 2 | Match System / Real World | 3 | Warm natural Spanish; forced lowercase on the quote reads as typos |
| 3 | User Control and Freedom | 3 | Nothing destructive; .ics has no fallback |
| 4 | Consistency and Standards | 3 | Contact heading breaks the section header pattern |
| 5 | Error Prevention | 2 | 12px horizontal scroll on mobile; placeholders ship silently; name is nowrap |
| 6 | Recognition Rather Than Recall | 3 | Date without time; calendar button 2.5 screens from the date |
| 7 | Flexibility and Efficiency | n/a | Single-pass invitation |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained; repeated eyebrow+divider template |
| 9 | Error Recovery | 1 | If Maps/.ics/WhatsApp fail in the in-app browser there is no fallback; dead post-event state |
| 10 | Help and Documentation | n/a | WhatsApp is the help |
| **Total** | | **20/32** | **Acceptable (63%)** |

## Design Specificity
Half authored: the illustration, bouquet and palette are Areli's; the skeleton (eyebrow + divider on every section, countdown boxes, tinted card, pill buttons) is the generic template. Missing on mobile: the rose frame from the printed piece; the illustration cropped to a 300px band; Astro favicon.
Detector: CLI 0 findings. Browser: low-contrast ×2 (venue__name #BF777F 20px/600, 3.0:1), cream-palette (intentional brand color, false positive), gpt-thin-border-wide-shadow on .u-shell desktop (intentional, design call).

## Priority Issues
1. [P0] No share image for WhatsApp: og.jpg does not exist and the path is relative (Base.astro:25,41); og:title differs from the spec; Astro favicon. -> polish
2. [P1] Horizontal scroll on mobile (402/390, 332/320) caused by the bouquet at right:-0.75rem (Hero.astro:42-50); .u-shell only clips at >=480px; bouquet collides with the eyebrow at 320. -> adapt
3. [P1] The facts are the smallest text: address 0.9rem, countdown labels 0.7rem, eyebrows 0.75rem, quote Jost 300 lowercase, venue name rose-strong 20px/600 at 3:1. -> typeset
4. [P2] Weak focus and ending: "05" (66px/700) outweighs "Areli Edith" (31px); no frame on mobile; ending without the illustration/bouquet/name. -> bolder, layout
5. [P2] Missing states: countdown before JS/after the event; name nowrap overflows at 200%; Cinzel 500 and Jost 600 not imported (faux/fallback); placeholders without a guard. -> harden

## Persona Red Flags
Casey: sideways scroll, 00 countdown on 4G, .ics download fails in the WhatsApp iOS webview. Grandparent: address and labels smallest, thin lowercase quote, name off-screen with large text, "05" is the most readable thing. Riley: 200% breaks the name, dead post-event state, 320 collision. Jordan: 3 near-duplicate map buttons; unclear that WhatsApp is not an RSVP.

## Minor
Bouquet rotated 180° (upside-down light); "→" read aloud; countdown has no heading; ragged button widths; .ics without VALARM and LOCATION only the church; no slot yet for dress code / gifts; unused PNGs (3.7MB) in public/.
