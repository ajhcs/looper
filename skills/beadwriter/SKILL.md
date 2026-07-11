---
name: beadwriter
description: Decompose parent beads, specs, plans, completed Wayfinder maps, and grill-with-docs output into evidence-backed, commit-sized childbeads with explicit execution packets. Use when the user asks to beadwrite, split work into atomic commits, prepare work for Looper, or turn planning artifacts into implementation units.
---

# Beadwriter

Turn an accepted outcome or plan into childbeads another agent can execute without inventing scope. A childbead normally represents one logical change, proof surface, and commit sentence.

## Inputs And Grounding

Load `references/compatibility-vocabulary.yaml` and use its canonical terms in childbeads. Prefer one accepted spec as the source of truth. A Wayfinder journey normally clears one decision map, hands it to `to-spec` for one accepted spec, then hands that spec here for decomposition; it does not create one spec per decision ticket.

When the user passes a Wayfinder map directly, load the map plus every closed child ticket's resolution comment and linked decision asset. Treat the map as an index, not the decision store. Continue only when no decision tickets or in-scope fog remain and the destination is an implementation outcome. If the map is incomplete, or its destination is only a decision, return `Ready for Looper: no` with the unresolved frontier or required handoff. Split one map into multiple specs only when its destination explicitly defines independently ownable outcomes; do not infer that split from the number of decision tickets.

## To-Tickets Boundary

Use Matt's `to-tickets` for lightweight tracker-native tracer bullets. Use Beadwriter instead when Looper needs commit boundaries, executor packets, validation commands, dependencies, stop conditions, and runtime metadata. Do not decompose the same accepted spec with both workflows. Existing tracker tickets may be imported only when the user asks Beadwriter to enrich them into childbeads.

Load `references/model-routing-policy.yaml` only when assigning `Preferred runtime`. Keep model configuration outside task prose, record preferred and verified runtime separately, and never claim an unverified runtime ran.

## Workflow

1. **Pin intent**: outcome, non-goals, constraints, authoritative sources, and completion condition.
2. **Inspect reality**: relevant files, modules, APIs, schemas, tests, docs, migrations, and unknowns. Mark uninspected guesses `inferred`.
3. **Split atomically**: prefer thin, end-to-end tracer bullets that leave one independently verifiable behavior working. Keep inseparable code and tests together. For a wide mechanical refactor that cannot stay green as vertical slices, use expand, bounded migrate batches, then contract.
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

All fields are required. Machine-consumed packets must validate against `schemas/childbead.schema.json`; Markdown remains the human-facing form. Reference authoritative sources instead of copying them, keep wording stable across beads, and add review focus, size, migration notes, or rollback detail only when they change execution or acceptance.

`Executor role` is semantic (`implementor`, `reviewer`, or `planner`). Resolve `Preferred runtime` from the shared routing policy; it must not imply that runtime actually ran. Validation is mandatory. A failed or widened implementation returns a revised, evidence-enriched packet to the implementor role; it does not block because an optional helper skill or exact skill alias is unavailable.

Name the capability a packet benefits from (implementation, TDD, debugging, or code review), not one mandatory package-qualified skill. At execution time, use a matching installed skill when it resolves cleanly. If it does not, the complete packet remains executable directly and the lane continues with the fallback recorded.

## Output

Return parent outcome and non-goals, source/constraint summary, ordered childbeads, requirement coverage, risks or open decisions, and `Ready for Looper`.

Say `Ready for Looper: yes` only when every requirement is covered and the packets can execute without scope invention. Otherwise name the exact missing source, decision, inspection, or proof.
