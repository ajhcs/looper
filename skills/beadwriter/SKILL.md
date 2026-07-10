---
name: beadwriter
description: Decompose parent beads, PRDs, issue briefs, plans, and grill-with-docs output into evidence-backed, commit-sized childbeads with explicit execution packets. Use when the user asks to beadwrite, split work into atomic commits, prepare work for Looper, or turn docs and ADRs into implementation units.
---

# Beadwriter

Turn an accepted outcome or plan into childbeads another agent can execute without inventing scope. A childbead normally represents one logical change, proof surface, and commit sentence.

## Role Policy

- Luna Medium handles mechanical work; Luna High handles bounded, well-specified implementation with clear validation.
- Terra Medium handles ordinary multi-file implementation, research, and review; Terra High handles complex debugging, cross-module changes, and edge-case-heavy review.
- Sol Medium handles ambiguous architecture, security-critical decisions, expensive-to-repeat work, and final synthesis; Sol High is only for exceptionally difficult work.

Choose the cheapest model and reasoning level likely to succeed on the first attempt. Prefer moving up one model tier over using xhigh or max; reserve xhigh and max for exceptional quality-first tasks. Avoid Fast mode unless speed is essential. Record the verified runtime separately, and do not claim a preferred runtime actually ran without verification.

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

`Executor role` is semantic (`focused_executor`, `judgment_worker`, or `planner`). `Preferred runtime` follows the role policy and must not imply that runtime was actually selected. Validation is mandatory. If execution fails, confidence is low, or wider scope is discovered, the packet escalates one model tier (`Luna → Terra → Sol`) with that evidence instead of retrying the same configuration.

## Output

Return parent outcome and non-goals, source/constraint summary, ordered childbeads, requirement coverage, risks or open decisions, and `Ready for Looper`.

Say `Ready for Looper: yes` only when every requirement is covered and the packets can execute without scope invention. Otherwise name the exact missing source, decision, inspection, or proof.
