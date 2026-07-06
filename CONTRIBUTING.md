# Contributing to Roam Meridian

Thanks for contributing!

This project is being built by a team of four, so the goal is to keep the codebase clean and avoid stepping on each other's work.

## Before you start

- Pull the latest changes from `develop`
- Create a new feature branch
- Make sure you're not editing files that someone else is actively working on

Example:

feature/explore-page
feature/navbar-redesign
feature/reviews-api

Don't commit directly to `develop`.

---

## Project Setup

Clone the repository

```bash
git clone <repo-url>
```

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm run dev
```

---

## Branch Workflow

Every feature should follow the same flow.

```
develop
    │
    ├── feature/explore
    ├── feature/backend-api
    ├── feature/dashboard
    └── feature/reviews
```

After completing a feature:

```
Commit
↓

Push

↓

Create Pull Request

↓

Review

↓

Merge into develop
```

---

## Commit Messages

Try to keep commit messages descriptive.

Good examples:

```
feat: add destination search

feat: build planner timeline

fix: navbar mobile overflow

refactor: extract SearchBar component

style: improve destination cards
```

Avoid commits like

```
update

changes

work

done

fixed
```

---

## Coding Style

A few conventions we're following across the project.

### Components

Use PascalCase.

```
Navbar.jsx

DestinationCard.jsx

SearchBar.jsx
```

### Variables

Use camelCase.

```
tripData

selectedDestination

searchQuery
```

### Constants

Use UPPER_CASE only when something is truly constant.

```
MAX_TRAVELERS
```

---

## Folder Structure

Shared components go inside

```
components/common
```

Feature-specific components stay inside their own folder.

```
components/explore

components/planner

components/dashboard
```

If a component can be reused later, don't keep it inside a page folder.

---

## Styling

We're using Tailwind CSS.

Please avoid inline styles unless absolutely necessary.

Before creating a new component, check if something similar already exists.

Consistency is more important than making every page look different.

---

## Responsive Design

Everything should work on:

- Mobile
- Tablet
- Laptop
- Desktop

Design mobile first whenever possible.

---

## Before Creating an API

If you're adding or changing any backend model:

1. Update `docs/API_CONTRACT.md`
2. Let the team know
3. Then implement the backend

This avoids frontend/backend mismatches.

---

## Before Merging

Quick checklist:

- Code runs without errors
- No console logs
- No commented-out code
- No unnecessary files
- Responsive layout checked
- Imports cleaned up
- Build passes

---

## Ask Questions Early

If you're unsure about a model, API, or UI decision, ask before implementing.

It's much easier to change a plan than rewrite finished code.

---

Happy coding 🚀
