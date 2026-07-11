---
name: beadwriter
description: Decompose parent beads, PRDs, issue briefs, plans, and grill-with-docs output into evidence-backed, commit-sized childbeads with explicit execution packets. Use when the user asks to beadwrite, split work into atomic commits, prepare work for Looper, or turn docs and ADRs into implementation units.
---

# Beadwriter

Turn an accepted outcome or plan into childbeads another agent can execute without inventing scope. A childbead normally represents one logical change, proof surface, and commit sentence.

## Role Policy

- Every implementation or fix packet prefers **GPT-5.6 Luna xhigh**.
- Prefer Luna max only when the active runtime explicitly makes max selectable; otherwise xhigh is the expected path and work continues without a blocker.
- Every review packet prefers **GPT-5.6 Sol low**. Findings return to Luna xhigh for correction and then to Sol low for re-review.

Keep model configuration outside the task prose where the surface supports explicit runtime selection. Record the preferred and verified runtime separately, and do not claim max ran unless it was selectable and verified.

## Workflow

1. **Pin intent**: outcome, non-goals, constraints, authoritative sources, and completion condition.
2. **Inspect reality**: relevant files, modules, APIs, schemas, tests, docs, migrations, and unknowns. Mark uninspected guesses `inferred`.
3. **Split atomically**: divide by behavior, interface, lifecycle, integration boundary, risk, rollback path, or proof. Keep inseparable code and tests together.
4. **Packetize**: give each childbead clear scope, success criteria, validation steps, and only the context needed to execute it.
5. **Sequence**: order beads so every commit leaves the repository coherent and reduces uncertainty.
6. **Critic**: trace every parent requirement to a childbead; remove overlaps, orphan chores, invented scope, and vague proof.

Use a spike only when evidence cannot support an implementation packet. It returns a decision, evidence, file map, proof plan, and revised childbeads.

Atomicity outranks LOC. As a secondary sizing signal, target 20-150 meaningful changed lines, scrutinize above 200, and split above 500 unless the work is mechanical or inherently coupled.

## Executor Packet

```text
<id> - <title>
Commit sentence:
Outcome:
Context refs:
Scope and allowed actions:
Invariants:
Success criteria:
Validation steps:
Depends on:
Stop or escalate when:
Executor role:
Preferred runtime:
```

All fields are required. Reference authoritative sources instead of copying them, keep wording stable across beads, and add review focus, size, migration notes, or rollback detail only when they change execution or acceptance.

`Executor role` is semantic (`implementor`, `reviewer`, or `planner`). Implementation and fix packets use `GPT-5.6 Luna xhigh (max when available)`; review packets use `GPT-5.6 Sol low`. `Preferred runtime` must not imply that runtime actually ran. Validation is mandatory. A failed or widened implementation returns a revised, evidence-enriched packet to Luna; it does not block because an optional helper skill or exact skill alias is unavailable.

Name the capability a packet benefits from (implementation, TDD, debugging, or code review), not one mandatory package-qualified skill. At execution time, use a matching installed skill when it resolves cleanly. If it does not, the complete packet remains executable directly and the lane continues with the fallback recorded.

## Output

Return parent outcome and non-goals, source/constraint summary, ordered childbeads, requirement coverage, risks or open decisions, and `Ready for Looper`.

Say `Ready for Looper: yes` only when every requirement is covered and the packets can execute without scope invention. Otherwise name the exact missing source, decision, inspection, or proof.
