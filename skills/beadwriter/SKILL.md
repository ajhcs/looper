---
name: beadwriter
description: Decompose parent beads, PRDs, issue briefs, plans, and grill-with-docs output into evidence-backed, commit-sized childbeads with explicit execution packets. Use when the user asks to beadwrite, split work into atomic commits, prepare work for Looper, or turn docs and ADRs into implementation units.
---

# Beadwriter

Turn an accepted outcome or plan into childbeads another agent can execute without inventing scope. A childbead normally represents one logical change, proof surface, and commit sentence.

## Role Policy

- Terra High owns normal inspection and decomposition.
- Sol Medium receives a decision packet when ambiguity, architecture, consequence, or failed decomposition requires replanning.
- Luna xhigh may execute a sealed childbead or collect bounded evidence; it does not define requirements, architecture, or proof.

Treat these as preferred roles. Record the verified runtime separately, and do not require every bead to traverse all three models.

## Workflow

1. **Pin intent**: outcome, non-goals, constraints, authoritative sources, and completion condition.
2. **Inspect reality**: relevant files, modules, APIs, schemas, tests, docs, migrations, and unknowns. Mark uninspected guesses `inferred`.
3. **Split atomically**: divide by behavior, interface, lifecycle, integration boundary, risk, rollback path, or proof. Keep inseparable code and tests together.
4. **Packetize**: give each childbead the minimum context and complete execution contract below.
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
Required proof:
Depends on:
Stop or escalate when:
Executor role:
Preferred runtime:
```

Required fields are outcome, context refs, scope, invariants, proof, dependencies, stop/escalate condition, and commit sentence. Add review focus, size, migration notes, or rollback detail only when they change execution or acceptance.

`Executor role` is semantic (`focused_executor`, `judgment_worker`, or `planner`). `Preferred runtime` names the desired model/effort and must not imply that runtime was actually selected.

## Output

Return parent outcome and non-goals, source/constraint summary, ordered childbeads, requirement coverage, risks or open decisions, and `Ready for Looper`.

Say `Ready for Looper: yes` only when every requirement is covered and the packets can execute without scope invention. Otherwise name the exact missing source, decision, inspection, or proof.
