---
name: looper
description: Write compact Codex orchestration loops over accepted plans, beads, implementation slices, review/fix passes, and selective subagents. Use when the user asks for a loop, agent loop, workflow loop, Codex loop, retry loop, evaluator loop, multi-agent loop, or orchestration prompt.
---

# Looper

Turn an accepted plan into an executable control loop. Preserve authority, proof, stop conditions, material caveats, and next action; trim repetition and optional explanation first.

Use `system-mapper` when current-system evidence is insufficient and `beadwriter` when no provable slice exists. Do not invent implementation scope.

## Role Policy

This is the user's local routing policy, not a universal optimum:

- Terra High owns normal judgment, coordination, acceptance, and synthesis.
- Sol Medium receives a decision packet only when ambiguity, consequence, architecture, or repeated non-progress requires replanning.
- Luna xhigh receives sealed, focused execution packets only.

Record semantic role and preferred runtime separately. Verify that the active surface can select the requested model and effort; otherwise preserve the role, use the closest available runtime, and report what actually ran. Do not force a Terra-Sol-Luna chain or use Max by default.

## Loop Contract

Carry `goal`, accepted `plan_revision`, current `slice`, `proof`, `ledger`, `risks`, `next_action`, and `status`.

1. Re-enter from the checkpoint and choose one dependency-ready, provable slice.
2. Assign one write owner. Delegate only independent work that protects parent context or improves wall-clock time.
3. Merge lane returns into evidence, not raw transcript history.
4. Critic: compare the result with the goal, slice contract, tests, regressions, and open risks.
5. If the critic fails, narrow or split the slice, widen evidence, change the lane, or send a decision packet to Sol.
6. Checkpoint decisions, evidence references, changed surfaces, risks, and next action.

Stop with:

- `complete`: all requirements and proof pass.
- `waiting`: an external check or job is still progressing.
- `blocked`: required external input is unavailable or the same failure persists across three evidence-changing attempts.

## Delegation Contract

Use a manager pattern: Terra retains acceptance and final synthesis. Parallelize read-heavy exploration, tests, triage, or research when scopes are independent; avoid overlapping writers.

Give Luna only:

```text
outcome:
context_refs:
scope_and_allowed_actions:
invariants:
required_proof:
return_schema:
stop_or_escalate_when:
```

Give Sol the unresolved decision, goals, constraints, alternatives, consequences, failed evidence, and required planning artifact. Do not replay settled decisions or the full transcript.

For a bounded code slice, prefer `matt-pocock-skills:implement`, followed by `matt-pocock-skills:code-review` against the pre-slice fixed point and originating bead/spec. Report a missing required skill instead of silently substituting it.

Lane returns should contain only `changed_or_learned`, `evidence`, `risk_or_blocker`, and `next_action`. Use a machine schema only when software parses the return.

## Output

Return the executable loop, cross-bead verification contract, uncovered residual risks, status rules, and commit or PR recommendation. Reference the accepted plan, bead IDs, and checkpoint artifacts; do not list their descriptions or copy their scope, invariants, proof, or risk checklists into the loop. Emit the executor packet fields only when the loop actually dispatches Luna. Name only the roles actually used; do not repeat the routing policy.

Aim for one screen and roughly 2,600 characters or less. Exceed that soft target only when authority, proof, adaptation, stop conditions, or a material caveat would otherwise be lost.
