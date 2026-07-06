# Roam Meridian Design System (FROZEN — Final)

Single source of truth for both design and development. Nobody changes colors, spacing, typography, or these principles from here without full team sign-off.

## Colors

| Token | Hex | Usage |
|---|---|---|
| Primary (Forest) | `#2C463A` | Primary buttons, active states, brand color |
| Primary Hover | `#1F362C` | Hover/pressed state of primary elements |
| Primary Light | `#4F6E5D` | Subtle tints, secondary emphasis |
| Background | `#F8F7F4` | Page background |
| Surface | `#FFFFFF` | Cards, inputs, modals |
| Accent Gold | `#C89B3C` | Rare highlight only — never a primary action |
| Success | `#16A34A` | Confirmations, success toasts |
| Warning | `#F59E0B` | Warning states |
| Error | `#DC2626` | Error states, validation messages |

### Neutral scale

| Token | Hex |
|---|---|
| Gray 50 | `#F9FAFB` |
| Gray 100 | `#F3F4F6` |
| Gray 200 | `#E5E7EB` |
| Gray 300 | `#D1D5DB` |
| Gray 400 | `#9CA3AF` |
| Gray 500 | `#6B7280` |
| Gray 700 | `#374151` |
| Gray 900 | `#111827` |

## Typography

| Token | Font | Size | Line height |
|---|---|---|---|
| Display | Fraunces | 56 | 1.1 |
| H1 | Fraunces | 48 | 1.15 |
| H2 | Fraunces | 40 | 1.2 |
| H3 | Fraunces | 32 | 1.25 |
| H4 | Fraunces | 24 | 1.3 |
| Body Large | Public Sans | 18 | 1.6 |
| Body | Public Sans | 16 | 1.6 |
| Small | Public Sans | 14 | 1.5 |
| Caption | Public Sans | 12 | 1.4 |

**Font weights:** Regular 400, Medium 500, Semibold 600, Bold 700 only (= Tailwind's `font-normal/medium/semibold/bold`).

## Design Principles

- Follow the **8-point grid system** — every spacing value is a multiple of 8 (with 4 as the only half-step exception, for tight inline gaps).
- Avoid arbitrary spacing (`p-[13px]` etc.) — use spacing tokens only.
- Every component aligns to the grid — no visual element sits at an off-grid position.

## Spacing

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`

## Radius

| Token | Value | Tailwind class |
|---|---|---|
| Button | 16px | `rounded-2xl` |
| Card | 24px | `rounded-3xl` |
| Input | 16px | `rounded-2xl` |
| Image | 24px | `rounded-3xl` |
| Pill | 999px | `rounded-full` |

## Shadows

| Token | Value |
|---|---|
| Small | `0 1px 2px rgba(0,0,0,0.04)` |
| Medium | `0 4px 12px rgba(0,0,0,0.06)` |
| Large | `0 12px 32px rgba(0,0,0,0.08)` |
| Hover | `0 8px 20px rgba(44,70,58,0.12)` |

## Button Sizing

| Size | Height | Padding (x) |
|---|---|---|
| Small | 40px | 16px |
| Default | 48px | 24px |
| Large | 56px | 32px |

Icon size: 20px. Loading spinner size: 18px.

## Motion Tokens

| Token | Value |
|---|---|
| Fast | 150ms |
| Normal | 250ms |
| Slow | 400ms |
| Ease | ease-in-out |
| Hover Scale | 1.02 |
| Card Lift | translateY(-4px) |
| Button Press | scale(0.98) |

## Z-index Scale

| Layer | Value |
|---|---|
| Navbar | 100 |
| Dropdown | 200 |
| Modal | 500 |
| Toast | 600 |
| Loading | 700 |

## Layout

| Token | Value |
|---|---|
| Container Width | 1440px |
| Content Width | 1280px |
| Section Padding — Desktop | 96px |
| Section Padding — Tablet | 64px |
| Section Padding — Mobile | 24px |

## Grid

| Breakpoint | Columns |
|---|---|
| Desktop | 12 |
| Tablet | 8 |
| Mobile | 4 |

## Icons

Library: Lucide-style (via `react-icons`).

| Size | Value |
|---|---|
| Small | 16px |
| Default | 20px |
| Large | 24px |

Stroke width: 2.

## Responsive Breakpoints

| Name | Range | Tailwind prefix |
|---|---|---|
| Mobile | <640px | (no prefix) |
| Tablet | 640–1024px | `sm:` |
| Desktop | 1024px+ | `lg:` |

**Known inconsistency to clean up:** a few early components use `md:` (768px) instead of `sm:`/`lg:`. Sweep to match this scheme during the polish phase.

## Component Naming

```
components/    Button.jsx, DestinationCard.jsx, SearchBar.jsx, Navbar.jsx
hooks/          useAuth.js, usePlanner.js
context/        AuthContext.jsx, PlannerContext.jsx
```

PascalCase for components, `use`-prefixed camelCase for hooks, PascalCase + `Context` suffix for context files.

## Accessibility

- Minimum touch target: 44×44px
- Fully keyboard accessible
- Visible focus states on every interactive element
- Contrast ratio: WCAG AA minimum
- Buttons always have both hover and focus states
- Forms always show validation messages, not just color changes

## Images

| Context | Ratio |
|---|---|
| Destination Cards | 4:3 |
| Hero Images | 16:9 |
| Profile | 1:1 |

Border radius: 24px. Object fit: `cover`, always — never stretched.

## Empty States

Every empty state = **Illustration → Title → Description → Primary action button.** No exceptions, no bare "No results" text anywhere in the app.

## Loading Behavior

Cards, Navbar, Profile, Dashboard, and Planner all use **skeleton loaders**, not spinners, wherever content is being fetched. Spinners are reserved for short in-button actions only (e.g. a submit button mid-request).

## Git Commit Convention

| Prefix | Use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code change, no behavior change |
| `style:` | Visual/formatting only |
| `docs:` | Documentation |
| `chore:` | Maintenance |

Examples: `feat: add explore filters` · `fix: resolve navbar overlap` · `docs: update design system`

## PR Checklist

Before merging:
- [ ] `npm run dev` runs clean
- [ ] No console errors
- [ ] No unused imports
- [ ] Responsive checked
- [ ] Code reviewed
- [ ] Figma updated

## Don't

❌ Don't invent colors.
❌ Don't invent spacing.
❌ Don't create duplicate components.
❌ Don't use inline styles unless necessary.
❌ Don't push directly to develop/main.

## Component Definition of Done

A component is complete only when:
- [ ] React component finished
- [ ] Responsive
- [ ] Accessible
- [ ] Figma version created
- [ ] Reviewed
- [ ] Merged into develop

## Component Status

⬜ Button (in review) · ⬜ Input · ⬜ SearchBar · ⬜ Dropdown · ⬜ Badge · ⬜ Avatar · ⬜ Desktop Navbar · ⬜ Mobile Navbar · ⬜ Footer · ⬜ Sidebar · ⬜ Breadcrumb · ⬜ Pagination · ⬜ Destination Card · ⬜ Trip Card · ⬜ Hotel Card · ⬜ Experience Card · ⬜ Review Card · ⬜ Toast · ⬜ Modal · ⬜ EmptyState · ⬜ Skeleton · ⬜ Loading · ⬜ AI Timeline · ⬜ AI Bubble · ⬜ Planner Step · ⬜ Recommendation Card

## Page Status

⬜ Home · ⬜ Explore (search/filter/sort built, mock data) · ⬜ Destination Details (built, mock data) · ⬜ AI Planner · ⬜ Dashboard · ⬜ Wishlist · ⬜ Profile · ⬜ Login · ⬜ Signup

## Folder Structure

```
Roam-Meridian/
├── docs/            (Design-System.md, API-Contract.md, Branch-Workflow.md,
│                     Folder-Structure.md, Coding-Guidelines.md, Team-Roles.md)
├── client/src/
│   ├── components/{common,layout,explore,planner,dashboard,profile,auth}/
│   ├── pages/ hooks/ context/ utils/ services/ assets/
└── server/
```

## Internal Milestones

- **8 July** — Design system finalized (this document); core components (Button, Input, Navbar, Footer, Cards) complete in both React and Figma.
- **12 July** — Home, Explore, Destination Details, and Authentication pages functional.
- **15 July** — Complete clickable end-to-end demo ready for mentor review (mock data acceptable for advanced features).
- **15–19 July** — Backend API and AI Planner integration.
- **20–28 July** — Polish: animations, responsiveness, accessibility, bug fixes, demo prep.
- **29 July** — Final presentation.

## Changelog

- **v1.0** — Initial design tokens (colors, typography, spacing, radius, shadows)
- **v1.1** — Added motion, z-index, layout, grid, icons, breakpoints, component status
- **v1.2 (Final)** — Added design principles, accessibility, images, empty states, loading behavior, git convention, PR checklist, Don't rules, Definition of Done, page status, changelog. Frozen.
