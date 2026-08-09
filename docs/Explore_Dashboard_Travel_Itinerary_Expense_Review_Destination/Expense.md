# Roam Meridian — Feature Documentation
 
**Modules covered:** Expense Page
 
**Live site:** https://roam-meridian.vercel.app
**Repo:** https://github.com/gourav-godara/Roam-Meridian (branch: `main`)
 
This document covers the features built by this contributor, following
the same per-module format as `client/docs/Explore_Dashboard_Travel_Itinerary_Expense_Review_Destination/Expense.md`.
 
---

## 4. Expense Split
 
**Route:** `/expenses`
**Frontend:** `client/src/pages/Expenses/Expenses.jsx`,
`client/src/hooks/useExpenses.js`
**Backend:** `server/src/routes/expense.routes.js` →
`server/src/controllers/expense.controller.js`
 
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/expenses` | Create an expense |
| GET | `/api/expenses` | List the user's expenses |
| GET | `/api/expenses/:id` | Get one expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| PATCH | `/api/expenses/:id/settle` | Mark a settlement as paid |
 
### What it does
Group expense tracking and splitting for a trip — record who paid for
what, who was involved, and let the app work out who owes whom.
 
### Key features
- **Add Expense** — title, amount, category (Accommodation, Transport,
  Food, Shopping, Activities, Other), which **trip** it belongs to, who
  paid, and which participants split the cost.
- **Summary cards** — Total Expenses, You Paid, You Owe, Settlements —
  computed client-side from the full expense list plus the settlement
  calculation (see below).
- **Filters** — search by title, filter by category, filter by status
  (Pending / Settled).
- **Settlement calculation** — `utils/calculateSettlements` works out net
  amounts owed between participants across all expenses, so instead of
  five separate IOUs it shows the minimal set of payments needed to
  settle up.
- **Mark Settled** — only the person who is *owed* money (the `to` side
  of a settlement) can mark it settled, matching the backend's
  permission check.
- **Edit/Delete permissions** — only the original payer can edit or
  delete an expense; the card shows a disabled state with an explanatory
  note for everyone else instead of a button that would just 403.
### A bug worth documenting
Early on, submitting "Add Expense" always failed with **"Trip is
required"** even when a trip was selected. Root cause: the backend
validation middleware (`expenseValidation.js`) was checking
`req.body.itinerary`, a stale field name, while the frontend correctly
sent `req.body.trip`. Fixed by aligning the validator to check `trip`,
matching the model field and the controller. Worth knowing if a similar
"field required" error appears elsewhere — check for this exact kind of
frontend/backend field-name mismatch first.
 
---
 