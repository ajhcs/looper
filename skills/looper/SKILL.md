---
name: looper
description: Write compact Codex orchestration loops over accepted plans, beads, implementation slices, review/fix passes, and selective subagents. Use when the user asks for a loop, agent loop, workflow loop, Codex loop, retry loop, evaluator loop, multi-agent loop, or orchestration prompt.
---

# Looper

Turn an accepted plan into an executable control loop. Preserve authority, proof, stop conditions, material caveats, and next action; trim repetition and optional explanation first.

System Mapper is deprecated for now. When current-system evidence is insufficient, stop and ask for a narrower evidence-gathering step; use `beadwriter` when no provable slice exists. Do not invent implementation scope.

## Role Policy

Load `../../references/model-routing-policy.yaml` when assigning runtime metadata. It is the single local routing policy and evidence pointer, not a universal optimum. Keep semantic role, preferred runtime, and verified runtime separate; preserve the role and record the fallback when the preferred runtime is unavailable. The parent retains acceptance and synthesis.

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

Require the worker to run the packet's validation steps. If validation fails, confidence is low, or wider scope appears, narrow or revise the packet and return it to the implementor role. The reviewer role checks the pre-slice fixed point and originating childbead or accepted spec after each implementation or fix pass.

Skills assist a lane; they do not define whether the lane can run. Prefer an installed implementation skill for code work and an installed code-review skill for review, resolving the capability by purpose rather than requiring one exact package-qualified name. Check the available skill catalog once. If a useful skill cannot be resolved or loaded, continue directly from the worker packet or review contract and report the fallback; do not block merely because an alias, namespace, plugin version, or optional skill is missing.

Give the reviewer the originating acceptance criteria, repository instructions, fixed-point diff, and relevant test output. Ask for actionable correctness, regression, security, or missing-test findings first, ordered by severity with file/line evidence and a minimal fix direction. The reviewer should run cheap targeted checks to resolve uncertainty, say `no findings` when appropriate, and never block solely because a preferred review skill is unavailable. Default to one implementation, one review, one implementor repair, and one fresh confirmation review; continue only for genuinely new evidence.

Lane returns should contain only `changed_or_learned`, `validation`, `confidence`, `scope_change_or_blocker`, and `next_action`. Use a machine schema only when software parses the return.

## Output

Return the executable loop, cross-bead verification contract, uncovered residual risks, status rules, and commit or PR recommendation. Reference the accepted plan, bead IDs, and checkpoint artifacts; do not copy their scope, invariants, proof, or risk checklists into the loop. Emit a worker packet only when dispatching a worker. Name only the roles actually used; do not repeat the routing policy.

Aim for one screen and roughly 2,600 characters or less. Exceed that soft target only when authority, proof, adaptation, stop conditions, or a material caveat would otherwise be lost.
