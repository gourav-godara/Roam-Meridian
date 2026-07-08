# 🎨 Roam Meridian - UI Guidelines

Version: 1.0

---

# Design Philosophy

Roam Meridian is a modern travel planning platform.

The UI should feel:

• Premium
• Minimal
• Spacious
• Mobile First
• Fast
• Friendly

Think:

Airbnb
Apple
Linear
Notion

Not:

Over-designed
Too colorful
Heavy shadows
Too many borders

---

# Design Principles

1. Photos should always be the hero.

2. Use whitespace generously.

3. Every page should have one clear focus.

4. Avoid unnecessary decorations.

5. Every animation should feel natural.

---

# Color Palette

Primary Forest

#2C463A

Primary Dark

#1E3129

Background

#FFFFFF

Surface

#F8F9FA

Text

#1F2937

Muted Text

#6B7280

Border

#E5E7EB

Accent

#D9932E

Danger

#EF4444

Success

#22C55E

---

# Typography

Display Font

Fraunces

Used for

Logo

Large Hero Titles

Never use for paragraphs.

---

Body Font

Public Sans

Used for everything else.

---

# Border Radius

Buttons

rounded-full

Cards

rounded-2xl

Modal

rounded-3xl

Search Bar

rounded-full

---

# Shadows

Only subtle shadows.

Example

shadow-sm

Avoid

shadow-xl

unless opening a modal.

---

# Spacing

Use 8px spacing system.

Examples

8

16

24

32

48

64

---

# Buttons

Primary

Forest background

White text

Rounded Full

Secondary

White

Border

Forest text

Danger

Red

---

# Cards

Large Image

Minimal Text

No heavy borders

Small hover effect

Rounded corners

---

# Icons

Use

react-icons

Prefer

Feather Icons

Heroicons

Lucide

---

# Animations

Framer Motion

Duration

200ms–300ms

Use

Hover

Fade

Scale

Slide

Don't over animate.

---

# Mobile First

Every page should be designed for:

Mobile

↓

Tablet

↓

Desktop

Never the opposite.

---

# Responsive Breakpoints

sm

640px

md

768px

lg

1024px

xl

1280px

---

# Accessibility

Minimum touch size

44px

Buttons should always have hover state.

Forms should always have labels.

Images need alt text.

---

# Components

Shared Components

Button

Loader

Navbar

Footer

Logo

SearchBar

Card

Modal

Avatar

Badge

These belong inside

components/common

---

# Explore Components

DestinationCard

FilterSidebar

SortDropdown

DestinationGrid

Pagination

---

# Planner Components

Timeline

ExpenseCard

DayCard

TripHeader

BudgetWidget

---

# Dashboard Components

StatsCard

RecentTrips

ExpenseSummary

ActivityTimeline
