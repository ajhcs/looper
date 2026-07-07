---
name: looper
description: Looper writes tight Codex orchestration loops over plans, beads, childbeads, implementation slices, review/fix passes, and parallel subagents. Use when the user asks for a loop, agent loop, workflow loop, Codex loop, retry loop, self-improvement loop, multi-agent loop, parallel subagent loop, evaluator loop, or orchestration prompt.
---

# Looper

Write loops for capable agents. Assume the model can reason, inspect artifacts, use tools, and recover from uncertainty. Do not teach the agent how to think.

Looper is for planned work. If the current system is not understood well enough to choose slices, invoke `system-mapper` first. If the bead list or plan is too vague to choose slices, lanes, and proof, the loop should stop and ask for planning instead of inventing implementation scope.

Default length: target 1200-2000 characters and stay under 2600 unless the user asks for more detail. Prefer outcome-first instructions, compact state, and evidence checks over process-heavy scaffolding.

Prompt for newer agents like an engineer: define the job, constraints, proof, stop conditions, and handoff shape; leave routine pathfinding to the lane agent. Omit rationale, motivation, and repeated cautions unless they change behavior.

Requirement: Matt Pocock Skills must be installed as the `matt-pocock-skills` plugin. Looper's default code lanes depend on `matt-pocock-skills:implement` and `matt-pocock-skills:code-review`; if those skills are unavailable, stop and report the missing dependency instead of falling back to generic implementation or review lanes.

## Loop Shape

Every looper loop must include, in compact form:

1. **State**: the compact variables the loop carries forward, such as `goal`, `plan`, `beads`, `slice`, `lanes`, `evidence`, `changes`, `risks`, `tests`, `open_questions`, and `stop_reason`.
2. **Cycle**: the repeated action, written as a short numbered loop or pseudocode block.
3. **Critic**: a check that compares the current result against the goal and evidence, not against vibes.
4. **Adaptation**: how the loop changes strategy, slice size, lane mix, proof surface, or checkpoint when progress stalls or evidence fails.
5. **Stop**: exact success, budget, or blocked conditions.
6. **Output**: the artifact the loop returns.

Completion criterion: the loop can be executed by another Codex instance without inventing missing control flow.

For long-running loops, add only the durable pieces needed: checkpoint state, progress ledger, heartbeat cadence, and re-entry rule.

## Beads And Slices

Treat epics and parent beads as planning containers by default. Use childbeads or explicit implementation tasks as candidate slices unless the parent bead itself contains a clear implementation task.

Default slice: one logical concern, ideally 50-250 changed lines.

Warning slice: 250-500 changed lines only with a clear description and tests.

Split required: unrelated concerns, vague proof surface, or expected size above 500 changed lines.

Commit rule: each commit must be atomic and explainable in one sentence. Squash "oops", typo, lint, and review-fix noise before merge.

## Use Parallel Subagents

The parent loop is an orchestrator, not the main worker. Keep parent context clean: read enough plan and result context to choose slices, lanes, and next actions; prefer subagents for deep implementation, review, investigation, or advice.

Use parallel subagents only for independent work:

- independent slices from different childbeads or concerns
- discovery across different files, sources, hypotheses, variants, or test surfaces
- adversarial review of a candidate answer or patch
- independent implementation sketches before choosing one
- reducer-style synthesis after workers return raw findings

Do not send subagents the intended answer. Give them the artifact, goal, constraints, and their lane. The parent loop owns synthesis and final judgment.

For a normal code slice, use a sequential lane:

1. Implementor subagent: use `matt-pocock-skills:implement` with medium thinking.
2. Reviewer/fixer subagent: use `matt-pocock-skills:code-review` with high thinking on the resulting diff and evidence.
3. Parent: merge the compact progress packet, verify only what is needed for the next decision, then continue, split, or stop.

Do not parallelize inside a normal slice. Add extra lanes only for unusual uncertainty, such as security, visual QA, architecture options, flaky tests, unclear ownership, or missing evidence.

When writing a parallel loop, include:

- worker count or lane names
- per-worker prompt shape
- return format
- merge rule
- conflict rule
- parent verification step

Worker returns should be decision-useful, not full reasoning dumps: changed/learned, evidence, risk/blocker, next action. Reviewer/fixer returns should say merge-ready or not, fixes made, and highest remaining risk.

## Skill Selection

Use specialized skills sparingly. Classify the bead quickly, then choose the smallest lane set that can prove the slice.

Default code slice:

- implementor: `matt-pocock-skills:implement`, medium thinking
- reviewer/fixer: `matt-pocock-skills:code-review`, high thinking

Use specialist lanes only when the bead names the domain or the proof requires it:

- current-system understanding, traceability, map validation, or progressive visual disclosure: `system-mapper`
- decomposing a parent bead, PRD, issue brief, or grill-with-docs output into commit-sized childbeads: `beadwriter`
- software decision, architecture option, library/API/framework choice, MCP/skill choice, current best practice, or codebase tradeoff research: `phone-a-swe`
- security boundary, exploit, auth, input, permission, secret, or data-flow work
- visual design, screenshots, UI polish, or rendered frontend proof
- CI, failing tests, flaky tests, or deployment failure
- ambiguous architecture, ownership, or planning decisions

If specialist work seems necessary but was not planned, stop and report the planning gap instead of silently expanding scope.

## Codex Loop Defaults

Prefer loops that:

- inspect local context before deciding
- use `rg` for search and `apply_patch` for manual edits
- preserve user changes
- checkpoint decisions, evidence, current slice, next action, and last-progress timestamp
- run focused verification before declaring success
- report `waiting` progress when CI, checks, or external jobs are queued or in progress and still making progress
- report blocked states only with the exact missing user/provider input, or with a non-progressing condition observed across three checks
- adapt by narrowing scope, widening evidence, changing lanes, or replanning the slice before declaring failure
- compress obvious mechanics into short imperatives

Avoid loops that:

- ask for clarification before doing discoverable legwork
- split tiny tasks into many fake phases
- make subagents coordinate with each other
- treat consensus as proof
- use "reflect" as a substitute for a concrete critic
- hard-code a fixed number of retries when progress can be measured
- explain why ordinary engineering steps matter

## Template

Use this skeleton unless the user asks for a different format. Keep fields one line when possible.

```text
State:
- goal / slice / proof:
- lanes:
- ledger / checkpoint / status:

Loop:
1. Re-enter from checkpoint; choose the next provable slice.
2. Default lanes: `matt-pocock-skills:implement` medium, then `matt-pocock-skills:code-review` high. Add specialists only for proof gaps.
3. Require compact returns: changed, evidence, risk, next_action.
4. Critic: compare result to goal, slice proof, regressions, and open risks.
5. If critic fails, narrow/split, widen evidence, change lanes, or replan; record the decision.
6. Checkpoint status, evidence, files, risks, next action, and timestamp.
7. Return `waiting` for queued/progressing checks; `blocked` only for required input or repeated non-progress.

Parallel branch, when useful:
- Dispatch independent lanes with separate scopes and compact returns.
- Merge by evidence strength; resolve conflicts from source artifacts.
- Parent performs final verification.

Return:
- final artifact
- verification evidence
- residual risks or blockers
- progress packet status: `complete`, `waiting`, or `blocked`
- commit/PR recommendation
```

## Style

Write the loop as operational instructions, not motivational prose. Keep it compact enough to paste into a prompt or skill, normally under 2600 characters. Use concrete nouns for state, concrete verbs for steps, and checkable stop conditions.
