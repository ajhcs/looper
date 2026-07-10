---
name: looper
description: Write compact Codex orchestration loops over accepted plans, beads, implementation slices, review/fix passes, and selective subagents. Use when the user asks for a loop, agent loop, workflow loop, Codex loop, retry loop, evaluator loop, multi-agent loop, or orchestration prompt.
---

# Looper

Turn an accepted plan into an executable control loop. Preserve authority, proof, stop conditions, material caveats, and next action; trim repetition and optional explanation first.

Use `system-mapper` when current-system evidence is insufficient and `beadwriter` when no provable slice exists. Do not invent implementation scope.

## Role Policy

This is the user's local routing policy, not a universal optimum:

- Luna Medium handles mechanical work; Luna High handles bounded, well-specified implementation with clear validation.
- Terra Medium handles ordinary multi-file implementation, research, and review; Terra High handles complex debugging, cross-module changes, and edge-case-heavy review.
- Sol Medium handles ambiguous architecture, security-critical decisions, expensive-to-repeat work, and final synthesis; Sol High is only for exceptionally difficult work.

Choose the cheapest model and reasoning level likely to succeed on the first attempt. Prefer moving up one model tier over using xhigh or max; reserve xhigh and max for exceptional quality-first tasks. Record semantic role and preferred runtime separately. Verify that the active surface can select the requested model and effort; otherwise preserve the role, use the closest available runtime, and report what actually ran. Avoid Fast mode unless speed is essential to the outcome.

## Loop Contract

Carry `goal`, accepted `plan_revision`, current `slice`, `proof`, `ledger`, `risks`, `next_action`, and `status`.

1. Re-enter from the checkpoint and choose one dependency-ready, provable slice.
2. At a phase change, checkpoint and then compact the context or start fresh. Carry only the accepted goal and plan revision, decisions, evidence references, open risks, and next action.
3. Assign one write owner. Delegate only independent work that protects parent context or improves wall-clock time.
4. Merge lane returns into evidence, not raw transcript history.
5. Critic: compare the result with the goal, slice contract, tests, regressions, and open risks.
6. If the critic fails, narrow or split the slice, widen evidence, change the lane, or request a planning decision.
7. Checkpoint decisions, evidence references, changed surfaces, risks, and next action.

Stop with:

- `complete`: all requirements and proof pass.
- `waiting`: an external check or job is still progressing.
- `blocked`: required external input is unavailable or the same failure persists across three evidence-changing attempts.

## Delegation Contract

Use a manager pattern: the parent retains acceptance and final synthesis. Parallelize read-heavy exploration, tests, triage, or research when scopes are independent; avoid overlapping writers.

Use this stable worker packet for every delegated lane:

```text
outcome:
context_refs:
scope_and_allowed_actions:
invariants:
success_criteria:
validation_steps:
return_schema:
stop_or_escalate_when:
```

Keep the packet self-contained but lean: reference authoritative artifacts instead of copying them, omit settled decisions, and do not replay the transcript. For a planning lane, put the unresolved decision and required planning artifact in `outcome`, and the relevant alternatives, consequences, and failed evidence in `context_refs`.

Require the worker to run the packet's validation steps. If validation fails, confidence is low, or the worker discovers wider scope, escalate one model tier (`Luna → Terra → Sol`) with the new evidence instead of repeating the same configuration. Use `matt-pocock-skills:implement` for code work and `matt-pocock-skills:code-review` for review against the pre-slice fixed point and originating bead/spec. Report a missing required skill instead of silently substituting it.

Lane returns should contain only `changed_or_learned`, `validation`, `confidence`, `scope_change_or_blocker`, and `next_action`. Use a machine schema only when software parses the return.

## Output

Return the executable loop, cross-bead verification contract, uncovered residual risks, status rules, and commit or PR recommendation. Reference the accepted plan, bead IDs, and checkpoint artifacts; do not copy their scope, invariants, proof, or risk checklists into the loop. Emit a worker packet only when dispatching a worker. Name only the roles actually used; do not repeat the routing policy.

Aim for one screen and roughly 2,600 characters or less. Exceed that soft target only when authority, proof, adaptation, stop conditions, or a material caveat would otherwise be lost.
