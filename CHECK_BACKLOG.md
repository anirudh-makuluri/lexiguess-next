# Check Backlog

Updated: 2026-02-23

This backlog tracks findings from `.agents/skills/check/run-checks.sh --mode diff`.

| Check | Result | Decision |
|---|---|---|
| Daily Streak Date Integrity | ❌ 1 error, 2 warnings | Add to backlog |
| Gameplay State Consistency | ❌ 2 errors, 1 warning | Add to backlog |
| Supabase Mutation Boundaries | ❌ 2 errors, 1 warning | Add to backlog |

## 1) Daily Streak Date Integrity

### Items
- Fix null-safe streak initialization in `incrementDailyStreak` when `streakData` is null.
- Canonicalize day calculation to one source of truth (server-authoritative preferred).
- Remove duplicated date-comparison logic drift between `src/app/page.tsx` and `src/app/home.tsx`.

### Acceptance
- First-time daily solve does not throw and initializes streak deterministically.
- Same-day replay is blocked consistently.
- Next-day increments and missed-day reset behavior are timezone-stable.

## 2) Gameplay State Consistency

### Items
- Remove `any` in generated-word flow and ensure a single string is set.
- Confirm invalid-word submit path applies intended state transition (row progression + feedback behavior) consistently.
- Re-check async submit guard to avoid duplicate validations during in-flight checks.

### Acceptance
- `generatedWord` remains `string`-typed end-to-end.
- Invalid submissions produce predictable state updates.
- Rapid submit does not cause duplicate processing.

## 3) Supabase Mutation Boundaries

### Items
- Move `profiles` and `daily_streak` writes from client component logic to server-authorized routes/actions.
- Derive write target user ID from server-verified session only.
- Improve mutation failure handling (user-visible fallback and/or structured logging).

### Acceptance
- Client no longer performs privileged stats/streak writes directly.
- Server validates identity before all profile/streak mutations.
- Failed writes are observable and handled intentionally.
