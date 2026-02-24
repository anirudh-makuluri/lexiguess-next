---
name: Daily Streak Date Integrity
description: Catch daily-mode date and streak logic that can miscount streaks or allow duplicate solves.
---

# Daily Streak Date Integrity

## Context

Daily mode relies on calendar-day behavior and streak math in `src/app/home.tsx` and `src/app/page.tsx`. Small date-handling mistakes can create off-by-one streaks, duplicate increments, or resets at the wrong time.

## What to Check

### 1. One solve per day enforcement is stable

For daily completion logic, verify that duplicate solve checks compare normalized date values consistently and cannot be bypassed by local clock or formatting differences.

Bad pattern (mixing non-normalized date values):

```ts
if (streakData.recent_date == today.toString()) {
  return
}
```

Good pattern (consistent canonical day value):

```ts
const todayDay = new Date().toISOString().split('T')[0]
if (streakData.recent_date === todayDay) {
  return
}
```

### 2. Streak increment/reset logic handles edge cases

Check transitions for:
- first-ever solve,
- same-day replay,
- next-day continuation,
- missed-day reset,
- longest streak updates.

Review whether day-difference calculations use a stable day boundary and avoid timezone-driven false resets.

### 3. Daily word generation and streak updates use the same day model

If daily word seed and streak comparison use different date conventions, users can receive one day's word but another day's streak behavior. Flag mismatches and ask for one canonical day source.

## Key Files to Check

- `src/app/home.tsx`
- `src/app/page.tsx`

## Exclusions

- Non-daily modes (`normal`, `hard`) that do not affect `daily_streak`.
- UI-only formatting of dates in stats tables.
