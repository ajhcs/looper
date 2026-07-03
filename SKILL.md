---
name: looper
description: Looper writes tight Codex orchestration loops over plans, beads, childbeads, implementation slices, review/fix passes, and parallel subagents. Use when the user asks for a loop, agent loop, workflow loop, Codex loop, retry loop, self-improvement loop, multi-agent loop, parallel subagent loop, evaluator loop, or orchestration prompt.
---

# Looper

Write loops for capable agents. Assume the model can reason, inspect artifacts, use tools, and recover from uncertainty. Do not write loops that spend tokens teaching the model how to think.

Looper is for planned work. If the bead list or plan is too vague to choose slices, lanes, and proof, the loop should stop and ask for planning instead of inventing implementation scope.

## Loop Shape

Every looper loop must include:

1. **State**: the compact variables the loop carries forward, such as `goal`, `plan`, `beads`, `slice`, `lanes`, `evidence`, `changes`, `risks`, `tests`, `open_questions`, and `stop_reason`.
2. **Cycle**: the repeated action, written as a short numbered loop or pseudocode block.
3. **Critic**: a check that compares the current result against the goal and evidence, not against vibes.
4. **Escalation**: what changes on the next pass when the critic fails.
5. **Stop**: exact success, budget, or blocked conditions.
6. **Output**: the artifact the loop returns.

Completion criterion: the loop can be executed by another Codex instance without inventing missing control flow.

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

1. Implementor subagent: use `/implement` with medium thinking.
2. Reviewer/fixer subagent: use `/codereview` with high thinking on the resulting diff and evidence.
3. Parent: merge the compact progress packet, verify only what is needed for the next decision, then continue, split, or stop.

Do not parallelize inside a normal slice. Add extra lanes only for unusual uncertainty, such as security, visual QA, architecture options, flaky tests, unclear ownership, or missing evidence.

When writing a parallel loop, include:

- worker count or lane names
- per-worker prompt shape
- return format
- merge rule
- conflict rule
- parent verification step

Worker returns should be compact and decision-useful, not full reasoning dumps: what changed or was learned, what evidence proves it, what remains risky or blocked, and the recommended next action. Reviewer/fixer returns should say whether the slice is merge-ready, what was fixed, and the highest-risk remaining concern.

## Skill Selection

Use specialized skills sparingly. First classify the bead with light reading or thinking; then choose the smallest lane set that can prove the slice.

Default code slice:

- implementor: `/implement`, medium thinking
- reviewer/fixer: `/codereview`, high thinking

Use specialist lanes only when the bead names the domain or the proof requires it:

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
- run focused verification before declaring success
- report `waiting` progress when CI, checks, or external jobs are queued or in progress and still making progress
- report blocked states only with the exact missing user/provider input, or with a non-progressing condition observed across three checks

Avoid loops that:

- ask for clarification before doing discoverable legwork
- split tiny tasks into many fake phases
- make subagents coordinate with each other
- treat consensus as proof
- use "reflect" as a substitute for a concrete critic

## Template

Use this skeleton unless the user asks for a different format:

```text
State:
- goal:
- plan:
- beads:
- slice:
- lanes:
- evidence:
- changes:
- risks:
- tests:
- stop_reason:

Loop:
1. Read the plan or bead list just enough to identify parent beads, childbeads, constraints, and proof needs.
2. Choose the next slice: one logical concern, preferably 50-250 changed lines.
3. Classify the slice and choose lanes. Default code lane is /implement medium, then /codereview high.
4. Dispatch subagents with the slice, constraints, proof needs, and compact return expectations.
5. Critic: compare returned progress, diff, tests, and risks to the goal, slice, and proof needs.
6. If the critic fails, change one of: slice boundary, lane selection, context, implementation, or test surface, then repeat.
7. If CI, checks, or external jobs are queued or in progress and still making progress, return a progress packet with status `waiting`; do not mark the goal blocked.
8. Stop when success is demonstrated, the planned slice budget is exhausted, the work needs replanning, user/provider input is required, or the same non-progressing condition repeats across three checks.

Parallel branch, when useful:
- Dispatch independent slices or advisory lanes with separate scopes and compact return expectations.
- Merge raw findings by evidence strength.
- Resolve conflicts by checking source artifacts, not by voting.
- Parent performs final verification.

Return:
- final artifact
- verification evidence
- residual risks or blockers
- progress packet status: `complete`, `waiting`, or `blocked`
- commit/PR slice recommendation
```

## Style

Write the loop as operational instructions, not motivational prose. Keep it compact enough to paste into a prompt or skill. Use concrete nouns for state, concrete verbs for steps, and checkable conditions for stops.
