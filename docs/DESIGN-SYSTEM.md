# Design system

This is the Q-Con theme. It is defined once in [`src/styles/tokens.css`](../src/styles/tokens.css) and every component reads from it. **If you need a color, size or shadow, use a token. Never type a raw hex value into a component.** If no token fits, add one to `tokens.css` and document it here.

## Where the theme comes from

| Element | Source |
| --- | --- |
| Near-black background, raised dark surfaces, grey text scale | Q-Con 2026 Wix theme (`#141416`, `#1B1C1E`, `#3F4349`, `#8A8A8A`, `#B0B0B0`) |
| Steel-blue accent `#3994C8`, light blue `#9ACDEA` | Q-Con 2026 buttons and highlights |
| IEEE blue `#006098`, maroon `#500000` | Sampled from the official Q-Con logo |
| Maroon glow `#BE4A4A` | Q-Con's red particle imagery |
| Eyebrow + title + accent bar headings, rounded cards, logo tiles | IECON 2026 |

The result is **Q-Con's dark identity with IECON's richer page furniture.** IECON's orange and light theme are intentionally *not* used; the accent bar and highlights use the Q-Con blue→maroon gradient instead.

## Color

### Brand & accents

| Token | Hex | Use |
| --- | --- | --- |
| `--brand-blue` | `#006098` | Logo wordmark. Headings and links on the light band. |
| `--brand-maroon` | `#500000` | Logo "Q". Theme icon gradients. |
| `--blue-500` / `--accent` | `#3994C8` | **Primary action color.** Buttons, icons, active states. |
| `--blue-400` / `--accent-strong` | `#5AA9D6` | Button hover. |
| `--blue-300` / `--accent-soft` | `#9ACDEA` | Links, card titles, small highlighted phrases, times. |
| `--maroon-400` / `--accent-2` | `#BE4A4A` | Secondary accent: keynote markers, "live" dots, speaker slots. |
| `--maroon-300` | `#E58A8A` | Particle glow, deadlines, closed states. |
| `--gradient-brand` | blue → maroon | Heading accent bar, milestone borders, avatar rings. **Decoration only; never behind text.** |

### Neutrals

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#141416` | Page background |
| `--bg-deep` | `#0D0D0F` | Alternate section band, footer |
| `--surface` | `#1B1C1E` | Cards, panels |
| `--surface-hover` | `#232428` | Hovered cards and menu items |
| `--line` | `#3F4349` | Hairline borders (the Q-Con split panels) |
| `--line-soft` | 8% white | Subtle card borders and dividers |
| `--text` | `#FFFFFF` | Headings |
| `--text-body` | `#D9DCE1` | Body copy |
| `--text-muted` | `#B0B0B0` | Secondary copy |
| `--text-subtle` | `#8A8A8A` | Captions, meta. Keep to 13px and up. |
| `--paper` | `#F4F6F8` | The single light band (Conference Themes) and sponsor logo tiles |

### Contrast rules

- Body text on `--bg` meets WCAG AA or better. `--text-subtle` is about 5.3:1, so keep it for small meta text only.
- **Primary buttons use dark text (`--on-accent`) on blue** (about 5.5:1). White on `#3994C8` fails AA, so don't switch it.
- Particle visuals sit behind text only when masked or shaded (see `mask` on `ParticleField`).

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display & headings | **Poppins** 200–600 | The Q-Con hero font. "Student Conference" uses 200. |
| Body, UI, labels | **Barlow** 300–600 | A free stand-in for the paid Formata and DIN Next fonts used on the Wix site. |

Both fonts are self-hosted through `@fontsource`, with no requests to Google Fonts.

**Scale** (fluid, via `clamp`): `--text-xs` 13 → `--text-sm` 15 → `--text-base` 17 → `--text-lg` → `--text-xl` → `--text-2xl` → `--text-3xl` → `--text-4xl` → `--text-hero`.

**Signature styles:**
- `.eyebrow`: 13px uppercase label with 0.2em tracking, placed above section titles (IECON).
- `.smallcaps`: Q-Con's small-caps headings ("When and Where?", schedule titles, "Research Presentations").
- `.lead`: 300-weight intro paragraph.
- `.highlight`: light-blue emphasis for the conference name inside copy (Q-Con).

## Space, shape, depth

- **Spacing** uses a 4px base, `--space-1` (4px) to `--space-9` (96px). Sections use `--section-y`, which scales with the screen.
- **Container** is 1300px of content with `--gutter` side padding (16px on phones). `.container--narrow` is 860px.
- **Radii:** `--radius-xs` 4px for buttons (Q-Con's square-ish buttons), `--radius-md` 12px for cards, `--radius-lg` 20px for large containers (IECON). **Split panels have square corners.** That's the Q-Con signature, so keep it.
- **Shadows:** `--shadow-card` for resting cards, `--shadow-pop` for menus, dialogs and floating cards, `--glow-accent` for the blue glow on primary hover and the "next deadline".

## Motion

- `--ease-out` with `--dur-fast` 150ms for color changes and `--dur` 280ms for hovers. Reveals take 520ms.
- **Scroll reveal:** add `data-reveal` to an element and it fades up the first time it enters view. Add `style="--reveal-delay:N"` to stagger a few sibling cards (60ms steps, capped at 5). Content already on screen at load is never hidden. **Put `data-reveal` on list and grid containers, not on every item** (see Performance in ARCHITECTURE.md).
- **Hover lift** uses the `translate` property, not `transform`, so it never fights the reveal animation.
- **Everything respects `prefers-reduced-motion`.** Animations collapse and particle fields render one still frame.

## Signature patterns

| Pattern | Component | Origin |
| --- | --- | --- |
| Particle fields (`wave`, `sphere`, `rings`) in `blue` / `cyan` / `maroon` tones | `ui/ParticleField.astro` + `scripts/particles.ts` | Q-Con's hero wave, globe and contour rings, drawn in code instead of stock images |
| Split panel: hairline box, visual + statement on one side, text on the other | `ui/SplitPanel.astro` | Q-Con home and about pages |
| Section heading: eyebrow, title, gradient bar | `ui/SectionHeading.astro` | IECON |
| Feature card with light-blue title and bottom bar that lights up on hover | `ui/FeatureCard.astro` | Q-Con |
| Calendar-badge timeline with past, next and milestone states | `ui/DateTimeline.astro` | IECON list + Q-Con date cards |
| Circular portrait with gradient ring | `ui/Avatar.astro`, `ui/PersonCard.astro` | IECON committee and keynotes |
| Logo tile (light tile so any sponsor logo reads on dark) | `ui/LogoTile.astro` | IECON partners |
| Submission row: action/status left, requirements right | `ui/SubmissionBlock.astro` | Q-Con submissions page |

## Components at a glance

| Component | Key props |
| --- | --- |
| `Button` | `href`, `variant` = `primary` \| `outline` \| `ghost`, `size` = `sm` \| `md` \| `lg`, `icon`, `iconStart`. External links get an ↗ icon and open in a new tab automatically. |
| `Icon` | `name` (see `components/ui/icons.ts`), `size`, `label` (only if meaningful) |
| `SectionHeading` | `eyebrow`, `title`, `lead`, `align`, `size`, `as` |
| `ParticleField` | `variant`, `tone`, `intensity`, `horizon`, `mask` |
| `SplitPanel` | `variant`, `tone`, `statement`, `reverse`, `columns`, slot `visual` |
| `StatusBadge` | `status` = `open` \| `soon` \| `closed`, `label` |
| `DateTimeline` | `dates`, `showTrack` |
| `PersonCard` | `name`, `role`, `session`, `affiliation`, `bio` (adds "Read more" dialog), `photo`, `tba` |
| `FactGrid` | `facts: {icon, label, value, href?}[]` |

## Do / don't

- ✅ One primary (blue) button per view. Pair it with `outline` or `ghost`.
- ✅ Use the light `section--paper` band sparingly. It's a rhythm break, currently used only for Conference Themes.
- ✅ New icons go in `icons.ts` in the same 24px stroke style.
- ❌ No new accent colors. If something needs to stand out, use `--accent-2` (maroon).
- ❌ No gradients behind body text. No white text on the blue button.
- ❌ Don't add photo backgrounds from stock libraries without checking the license. Particle fields are the house visual.
- ❌ No `backdrop-filter` blur on the header or on anything over a particle field. It's recomputed every frame. Use a ~95% opaque surface color.

## Responsive behavior

| Breakpoint | Change |
| --- | --- |
| < 1080px | Header collapses to the full-screen menu. Overview stacks. |
| < 960px | Important dates and the Call for Submissions sidebar stack. |
| < 860px | Split panels stack (visual on top). Theme cards stack. |
| < 760px | Page-hero Q mark hides. Submission rows stack. |
| < 640px | Hero buttons go full width. |
| < 480px | Header "Register" button hides (it stays in the menu). |

Tap targets are at least 44px. The layout is tested at 390px (iPhone) and 1440px.
