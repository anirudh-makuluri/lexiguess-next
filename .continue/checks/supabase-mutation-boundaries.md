---
name: Supabase Mutation Boundaries
description: Ensure gameplay and profile mutations are performed through server-authorized paths, not only client-side logic.
---

# Supabase Mutation Boundaries

## Context

LexiGuess uses Supabase for auth and persistent stats. In this codebase, some updates are triggered from client components (for example in `src/app/home.tsx`). This check exists to prevent trust of browser-controlled state for profile or streak updates.

## What to Check

### 1. Mutations for user stats are server-authorized

Review any new `insert`, `update`, `upsert`, or `delete` call against `profiles`, `daily_streak`, or future stats tables.

Bad pattern (client-controlled mutation logic in a `"use client"` component):

```ts
const supabase = createClient()
await supabase
  .from('profiles')
  .update({ completed_words: nextWords })
  .eq('id', session?.id)
```

Good pattern (server route/action validates identity and applies update):

```ts
const supabase = await createClient() // from utils/supabase/server
const {
  data: { session },
} = await supabase.auth.getSession()

if (!session?.user?.id) throw new Error('Unauthorized')

await supabase
  .from('profiles')
  .update({ completed_words: nextWords })
  .eq('id', session.user.id)
```

### 2. Session and target-user consistency is explicit

When updates depend on a user id, ensure the write target is derived from the authenticated server session, not from request body, query params, or client props without verification.

### 3. Error handling does not silently drop critical write failures

If a write fails, ensure behavior is explicit (user feedback, retry strategy, or a clear logged error with enough context). Avoid patterns that swallow failures during win/streak updates.

## Key Files to Check

- `src/app/home.tsx`
- `src/app/page.tsx`
- `src/utils/supabase/server.ts`
- `src/utils/supabase/client.ts`
- `src/app/auth/callback/route.ts`

## Exclusions

- Pure read-only Supabase queries.
- Anonymous, non-persistent gameplay state that never affects stored user stats.
