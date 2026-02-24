---
name: Gameplay State Consistency
description: Ensure mode switches and generated-word flows keep gameplay state consistent and type-safe.
---

# Gameplay State Consistency

## Context

Core gameplay state is managed in `src/app/home.tsx` and depends on query params, generated words, and per-attempt validation. Regressions here can break input validation, row progression, and answer reveal behavior.

## What to Check

### 1. Generated word shape is always a string

When updating word generation logic (`random-words`, hard mode generator, or daily seed), confirm `generatedWord` always receives a single lowercase string, not arrays/objects/`any` values.

Bad pattern (runtime shape drift):

```ts
const newWord: any = generate({ minLength: wordLength, maxLength: wordLength })
setGeneratedWord(newWord)
```

Good pattern (explicit single-word extraction):

```ts
const [newWord] = generate({ minLength: wordLength, maxLength: wordLength, exactly: 1 })
setGeneratedWord(newWord)
```

### 2. Mode or word-setting changes reset all dependent state

When `wordType`, `times`, or length controls change, verify `activeUserWord`, `completedUserWords`, `activeRow`, and `showAnswer` are reset together to avoid stale attempts across games.

### 3. Input and validation constraints remain aligned

If keyboard/input behavior changes, ensure validation still enforces:
- alphabetic-only characters,
- max length equal to current word length,
- no duplicate submit while async validation is in flight,
- answer reveal only after final failed attempt.

## Key Files to Check

- `src/app/home.tsx`
- `src/components/InputBox.tsx`
- `src/components/Keyboard.tsx`

## Exclusions

- Cosmetic-only UI changes (spacing, typography, color) that do not alter gameplay logic.
- Refactors that preserve current state transitions and type guarantees.
