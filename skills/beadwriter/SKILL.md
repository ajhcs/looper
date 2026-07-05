---
name: beadwriter
description: Beadwriter decomposes parent beads, PRDs, issue briefs, and grill-with-docs output into commit-sized childbeads. Use when the user asks to beadwrite, split work into atomic commits, prepare a bead list for Looper, or turn docs/ADRs into implementation units.
---

# Beadwriter

Decompose a parent bead into childbeads that a strong coding agent can implement and review cleanly.

A childbead is usually one atomic commit: one logical change, one proof surface, one commit sentence.

## Workflow

1. **Pin the parent bead**: name the user-visible outcome, non-goals, constraints, source docs, and completion condition.
2. **Map work surfaces**: list likely files, modules, APIs, schemas, tests, docs, migrations, and unknowns. Mark uninspected guesses as `inferred`.
3. **Find the atomic changes**: split by behavior, contract, state lifecycle, integration boundary, risk class, or proof surface. Keep tightly coupled code and tests together.
4. **Size each childbead**: apply the Size Contract; resize only when it preserves atomicity.
5. **Merge or split**: merge tiny dependent chores into their behavioral bead. Split unrelated concerns even when they are small. Isolate large mechanical changes, generated files, migrations, or formatting only when they would hide review signal.
6. **Sequence for proof**: order beads so each completed bead leaves the repo coherent and reduces uncertainty for the next bead. Put spikes before implementation when unknowns block sizing.
7. **Return bead packets**: each childbead must be implementable without inventing scope, reviewable without reading the whole plan, and commit-ready in one sentence.

Completion criterion: every parent-bead requirement is covered by at least one childbead, no childbead mixes unrelated concerns, and each childbead names its proof.

## Size Contract

Treat LOC as a sizing signal, not the rule that beats atomicity.

- Commit-sized childbead: target 20-150 meaningful changed LOC; soft cap around 200.
- PR-sized bundle: target 100-300 meaningful changed LOC; soft cap 400; scrutinize 500-800 unless the work is mechanical or inherently coupled.
- Authority: one atomic logical change beats the numeric target.

## Splitting Rules

Prefer one childbead when:

- the change is one behavior with nearby tests
- refactor and behavior are inseparable for review
- splitting would create dead intermediate code
- the expected size is above target but still one atomic change

Prefer multiple childbeads when:

- different users, workflows, services, or APIs are affected
- data/model/schema work can be proven before UI or integration work
- a refactor can land before behavior change
- tests, fixtures, or harness work unlock several later beads
- one part can be reverted without reverting the rest
- the bead contains more than one commit sentence

Use a spike bead only when the implementation path cannot be sized from current evidence. A spike returns a decision, file map, proof plan, and revised childbeads; it does not ship production behavior unless explicitly scoped.

## Output

Use this shape unless the user asks for another format:

```text
Parent Bead:
Outcome:
Sources:
Assumptions:

Childbeads:
1. <id> - <title>
   Commit sentence:
   Scope:
   Likely files:
   Proof:
   Size:
   Depends on:
   Review focus:

Order:
Risks / Unknowns:
Merge / Split Notes:
Ready for Looper:
```

For `Size`, use `small`, `target`, `large-but-atomic`, `split-required`, or `spike`.

For `Ready for Looper`, say `yes` only when the childbeads can be handed directly to an implementation loop. Otherwise name the exact missing decision, source, or inspection step.

## Style

Write like an engineer preparing clean commits for another engineer. Be practical, not precious. Prefer a slightly larger atomic bead over an artificial split, and prefer a split over a bead whose proof or rollback story is muddy.
