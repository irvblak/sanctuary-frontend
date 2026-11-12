# Phone and print walkthrough — 12 November 2026

Baseline: `de2a3ee4b3b92fce265268faecb119bf9c52926c`.

## Isolation and scope

Used a separate local copy of the frontend. Its fetch implementation returned
invented residents, events, bookings and letters. A preview-only CSP blocked
external connections and images. No production account was used, and no live
member records were requested or changed. Preview fixtures are not deployed.

Inspected Chromium iframe viewports at 360, 390, 768 and 1280 CSS pixels:

- Home, Your Information, Members Hub and Your Organiser.
- Design Studio canvas (the Just for fun route exercises the shared editor).
- Members Directory, Role Register and Library.
- Calendar, Events List, Event Notice and Booking.
- Host State of Play with 18 synthetic household responses.
- Letters index/compose and an open letter thread with a Secretary reply.
- A Library publication (Welcome).

This checks layout and representative rendered content, not production sign-in
or a fresh backend permission audit. The real resident-selection gate was not
removed or modified. The shared canvas was opened via its existing non-publishing
creation route without publishing any work.

## Findings and corrections

| Area | Finding | Correction |
| --- | --- | --- |
| Home | Inline panel styles overrode the small-screen layout; title and narrative crowded one another. | Hide side panels at the existing small-screen breakpoint, fit the title and wrap route buttons. Give the footer a light backing. |
| Calendar | Seven day columns widened the document at phone sizes. | Keep the calendar in a labelled, keyboard-focusable horizontal scrolling region with a short swipe/Events List hint. |
| State of Play | The wide response table widened the whole page. | Give the table its own labelled scrolling region. Wrap long contact strings. |
| Studio | Desktop tool columns squeezed the phone canvas almost to zero. | Put the canvas above the tools on narrow screens and allow vertical scrolling. Keep action controls reachable. |
| Studio print | Screen viewport heights and overflow rules could constrain printed artwork. | Release fitted screen heights/overflow in print and remove view transforms. |
| State of Play print | A whole report card was marked indivisible; editor minimum widths also consumed paper. | Permit table pagination, repeat headings, keep individual rows together and release editor minimum width. |
| Long Event Notice print | The 82 mm narrative limit cut off long text. | Remove narrative clipping in print. Normal notices remain one page; long notices may span pages. |

The existing Events List already confines its table to a scrollable area.
The Directory has a pre-existing approximately one-pixel scrollbar-edge
overshoot in narrow desktop iframe views; this was not treated as a material
layout defect or changed in this pass.

## Verification

- Rechecked corrected phone views, including collapsed persistent letter notices.
- Measured the representative pages at all four widths. Wide grids remain
  inside their own scroll containers rather than widening their documents.
- Visually inspected Home, Calendar and the canvas side by side at 360 pixels.
- Rendered browser-populated synthetic DOM snapshots with WeasyPrint 70 and
  inspected the resulting PDF pages. Scripts were removed before PDF rendering.
- Event Notice, letter thread, Library note and single-page portrait/landscape
  artwork each produced one correctly oriented A4 page.
- A duplicated two-page Studio creation produced exactly two pages.
- The 18-household State of Play report produced three A4 landscape pages with
  repeated headings; all 18 rows and totals remained present.
- A deliberately long Event Notice retained its final text after the clipping fix.
- All five existing frontend suites passed: canvas view size, household
  attention, letter cases, Organiser gate and private Directory access.
- Original script blocks in the changed HTML files remain byte-for-byte unchanged.
- `git diff --check` passed.

## Practical limits

These are simulated phone/tablet widths, not physical iPhone/Android tests.
WeasyPrint is a separate print renderer: these checks do not certify every
browser print dialog, printer driver or physical printer. Browser-specific
printing and real touch gestures remain appropriate follow-up checks when a
suitable device/printer is available. Complex artwork and unusually long
content may paginate differently across engines.
