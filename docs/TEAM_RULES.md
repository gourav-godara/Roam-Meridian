# 👥 Roam Meridian Team Rules

Version 1.0

---

# Git Workflow

Never push directly to develop.

Always create a feature branch.

Example

feature/navbar

feature/explore

feature/backend-api

feature/reviews

---

# Pull Requests

Every feature

↓

Commit

↓

Push

↓

PR

↓

Review

↓

Merge

---

# Commit Messages

Good

feat: add destination card

fix: navbar mobile overflow

refactor: extract SearchBar component

style: improve card spacing

Bad

update

changes

fixed

work

---

# Folder Rules

Shared components

components/common

Feature specific

components/explore

components/planner

components/dashboard

Never duplicate components.

---

# Naming

Components

PascalCase

Example

DestinationCard.jsx

Variables

camelCase

Functions

camelCase

Constants

UPPER_CASE

---

# Styling

Tailwind CSS only.

Avoid inline CSS.

Avoid custom CSS unless necessary.

---

# Responsive

Every feature must be checked on

Mobile

Tablet

Desktop

before merging.

---

# Code Rules

Keep components small.

Prefer reusable components.

No duplicated logic.

Keep API calls separate from UI.

---

# Before Merge Checklist

✔ No console.log

✔ No commented code

✔ Responsive

✔ Clean imports

✔ No warnings

✔ Build passes

✔ Tested

---

# Team Responsibilities

## Gourav

Frontend Architecture

Planner

Explore

Git Management

---

## Vinayak

Backend

Database

Weather API

Maps

Authentication

---

## Astha

UI

Figma

Responsive Design

Design System

---

## Jinal

Reviews

Expense Split

Frontend Integration

Testing

---

# Communication

If a model changes

↓

Update API_CONTRACT.md

↓

Inform Team

↓

Then implement

Never change APIs without updating the contract.

---

# Goal

Build one production-quality application.

Quality over speed.

Consistency over creativity.
