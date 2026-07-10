# GPT-5.6 prompt and orchestration structure research

**Research date:** 2026-07-09
**Scope:** System/developer instructions, Codex skills, Looper orchestration, Beadwriter execution packets, tool use, context management, and Sol/Terra/Luna handoffs.
**Source policy:** Current first-party OpenAI documentation only.

## Executive conclusion

The GPT-5.6 family merits a **prompt simplification and boundary-clarification pass**, not a new orchestration architecture.

The current Looper, Beadwriter, and Bead Cleaner skills have the right core ingredients: outcome, scope, invariants, authority, proof, stop conditions, and explicit escalation. The main opportunity is to say each thing once and move task-specific detail into the bead or handoff packet. OpenAI reports that, in its GPT-5.6 internal evaluations, minimal system prompts improved scores by roughly 10–15%, reduced total tokens by 41–66%, and reduced cost by 33–67% compared with long explicit prompts. Heavy prompts encouraged extra exploration, repeated validation, and larger accumulated context. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

Keep the chosen local routing policy—Terra High for everyday work, Sol Medium for justified escalation, and Luna xhigh for sealed execution—as an explicit **user policy**, but do not present it as an OpenAI-prescribed optimum. OpenAI says to start from the current reasoning setting, test the same setting and one level lower, and retain High or xhigh only when representative evaluations show a quality gain. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

## Source note

The OpenAI Docs skill requires the Codex manual helper first for broad Codex behavior. The helper was run, but its integrity check failed because the response lacked the required `x-content-sha256` header. This report therefore uses the prescribed narrow fallback: official OpenAI developer documentation and official ChatGPT Learn Codex pages. No secondary sources were used.

## Documented facts

### 1. Prompt length and instruction hierarchy

GPT-5.6 understands intent better and often needs fewer procedural instructions, but OpenAI still says to state important constraints, approval boundaries, and success criteria explicitly. Its guidance is to begin with the smallest prompt and tool set that reliably completes the task, then add instructions or examples only when evaluations identify a specific gap. Tool descriptions should also be concise and task-relevant. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

For Codex, durable repository guidance belongs in `AGENTS.md`; files are discovered from global scope through the project tree and concatenated so that nearer files override earlier guidance. The default combined project-instruction limit is 32 KiB. Skills are separately loaded through progressive disclosure: Codex initially sees their names, descriptions, and paths, then reads the full `SKILL.md` only when selected. Skill descriptions should therefore front-load concise trigger and boundary language. [AGENTS.md guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [Build skills](https://learn.chatgpt.com/docs/build-skills)

**Implication:** keep stable repository commands and conventions in `AGENTS.md`; keep reusable workflow logic in a focused skill; keep one-run constraints in the task or bead. Do not repeat the same permission, testing, and communication policy across all three layers.

### 2. Authority, evidence, and stopping

GPT-5.6 can be proactive and persistent. OpenAI recommends a compact authority policy that distinguishes read/review/diagnose/plan requests from change/build/fix requests and requires confirmation for destructive operations, external writes, purchases, or material scope expansion. It also recommends explicitly naming safe local actions. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

The same guide says a good outcome-focused prompt states the goal, relevant context, constraints, required evidence, success criteria, and output format. This supports keeping Beadwriter's invariants, proof, allowed surfaces, and stop/escalate conditions. Those fields should be compressed, not removed.

### 3. Response structure and brevity

GPT-5.6 is already biased toward shorter responses. Generic instructions such as “be concise” or “use minimal text” can make it substitute a shorter answer for the required artifact. OpenAI recommends prioritization language instead: lead with the conclusion; retain required evidence, caveats, decisions, and next actions; trim introductions, repetition, reassurance, and optional background first. It also recommends a lightweight task-specific outline rather than a global response template. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

**Implication:** Looper's hard character target is riskier than a completeness-aware budget. Use a soft target plus an explicit “do not omit required loop controls” rule.

### 4. Structured outputs and tool calling

Structured Outputs should be used for machine-consumed packets when the runtime exposes them. Structured Outputs enforce schema adherence; JSON mode guarantees only valid JSON. Function schemas are appropriate when the model calls application tools, while `text.format`/response-format schemas are appropriate for the model's returned artifact. [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

GPT-5.6 Programmatic Tool Calling is intended for bounded, predictable reduction work such as filtering, joining, ranking, deduplication, aggregation, and validation. It is not justified merely because calls are parallel or dependent. OpenAI says routing instructions should identify the bounded stage, eligible tools, exact output schema, evidence, concurrency/retry/stop limits, and the work that remains direct. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

**Implication:** Bead Cleaner inventory and comparison could be a programmatic stage if implemented through the API, but mutation approval and final classification judgment should remain direct. A skill prompt should describe the boundary, not prescribe programmatic calling when the active Codex surface does not expose it.

### 5. Context and checkpoints

OpenAI warns that heavy starting prompts and stale accumulated context can provoke unnecessary exploration and repeated validation. Codex subagents help by isolating noisy exploration, tests, triage, and logs, then returning distilled results. Parallel write-heavy work needs more caution because agents can conflict over shared files. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model), [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

The native Responses API Multi-agent feature gives each subagent a bounded task and independent context. It is best for concrete, independent workstreams; one agent is preferable for ordered dependency chains, small tasks, shared mutable resources, or fixed deterministic graphs. [Multi-agent guide](https://developers.openai.com/api/docs/guides/tools-multi-agent)

**Implication:** a checkpoint should carry decisions, current state, unresolved risks, next slice, and proof references—not raw logs or the full transcript. Replanning packets should carry the failed evidence and unresolved decision, not ask Sol to reread the entire history.

### 6. Delegation and ownership

Codex documentation says subagent prompts should explain how work is divided, whether to wait for all agents, and what summary or artifact to return. Subagents consume more tokens than comparable single-agent runs. Codex can choose a model/effort automatically, or custom agents can pin them. Official guidance calls Medium the balanced default, High for complex logic and edge cases, and xhigh/max for especially demanding reasoning. [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

OpenAI distinguishes two ownership patterns:

- **Handoff:** the specialist takes ownership of the next response.
- **Agent as tool / manager pattern:** the coordinator retains ownership and calls specialists as bounded capabilities.

Specialists should have narrow jobs and short, concrete descriptions; split agents only when instructions, tools, or policy genuinely differ. [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration)

**Implication:** Looper is primarily a manager pattern. Terra should own acceptance and synthesis. Luna should return a bounded artifact and evidence; it should not become the source of orchestration policy. Sol escalation is a planning handoff only when the plan itself must change.

### 7. GPT-5.6 family roles

OpenAI now officially documents all three models: Sol is the flagship for complex professional work, Terra balances intelligence and cost, and Luna is optimized for efficient, cost-sensitive/high-volume workloads. All three support `none`, `low`, `medium`, `high`, `xhigh`, and `max`. The unqualified `gpt-5.6` alias routes to Sol. [Model catalog](https://developers.openai.com/api/docs/models), [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

OpenAI does **not** document Terra High plus Luna xhigh as a universal best balance. The local policy is reasonable to test, but it needs bead-level evaluation against at least one lower-effort variant.

## Strong inferences

These conclusions follow from the official guidance but are not direct OpenAI prescriptions:

1. **Model routing should live in one policy block.** Repeating Terra/Sol/Luna philosophy in the skill introduction, workflow, lane definition, template, and every packet increases prompt weight without adding control.
2. **Luna packets need stronger boundaries, not more prose.** A sealed packet with outcome, scope, invariants, allowed actions, proof, return schema, and stop/escalate rules is better than a long description of Luna's role.
3. **Sol should receive a decision packet.** Escalation should name the decision, competing constraints, current evidence, failed approach, consequence, and required planning artifact.
4. **Terra should receive state, not history.** Resume from a compact checkpoint with accepted plan revision, current slice, evidence ledger, risks, and next action.
5. **Schemas are valuable at machine boundaries.** Human-facing bead Markdown can remain lightweight, but automated Looper/Beadwriter integration benefits from a canonical schema validated by code rather than repeated formatting reminders.
6. **Do not force a three-model chain.** A sealed Luna bead can execute directly; ordinary judgment can stay with Terra; Sol should appear only when replanning or consequence justifies it.

## Current repo observations

### Looper

The current `skills/looper/SKILL.md` repeats the model policy in “GPT-5.6 Routing,” “Slices And Lanes,” and the final template. It also repeats delegation fields in prose and again in the required return. The control model itself is sound: state, cycle, critic, adaptation, stop, and output are appropriate.

The main issue is density, not missing rigor:

- Keep the six-part loop contract.
- Keep one compact routing table.
- Remove model philosophy from the template; the generated loop should name only the roles actually used.
- Replace the hard `1200-2000` character default with a soft target tied to completeness.
- Consolidate “Selective Subagents” and the Luna/Terra code-lane recipe into one delegation contract.
- Keep the optional `matt-pocock-skills:implement` lane because it is present in the installed plugin; report the missing dependency if a future runtime does not expose it.

### Beadwriter

The current `skills/beadwriter/SKILL.md` is already close to the recommended form. Its execution packet has useful fields, but `Scope / Allowed surfaces`, `Review focus`, `Executor fit`, and surrounding model prose can become repetitive.

- Keep intent, reality inspection, atomic split, proof sequencing, and coverage critic.
- Make the canonical executor packet the center of the skill.
- Put the routing label in metadata; do not restate model behavior inside every childbead.
- Add a single explicit `Stop / Escalate when` field.
- Separate `Context refs` from scope so the executor receives only relevant files/sections, not a narrative dump.
- If packets are consumed programmatically, add a JSON Schema and validate it outside the prompt.

### Bead Cleaner

The current `skills/bead-cleaner/SKILL.md` has appropriate destructive-action safeguards. Its repetition is justified more than in the other skills because deletion safety is material, but the approval rules appear in the workflow, deletion section, and output description.

- Keep ID-specific approval, dependency inspection, dry run, audit reason, and post-write verification.
- Collapse mutation authority into one “Mutation gate.”
- Keep the classification contract as a reference table.
- Use Luna only for inventory/comparison; keep classification and mutation ownership with Terra.
- Require the cleaner to return a stable action-plan schema before any mutation.

## Concrete before/after recommendation

### Before: repeated orchestration policy

```text
Routing philosophy
Workflow routing reminder
Lane-specific routing reminder
Template routing reminder
Return-format routing reminder
```

### After: one policy plus task packets

```text
Role policy:
- Terra High owns normal judgment, coordination, acceptance, and synthesis.
- Sol Medium receives a decision packet only when replanning is justified.
- Luna xhigh receives sealed execution packets only.

Executor packet:
- outcome
- context_refs
- scope_and_allowed_actions
- invariants
- required_proof
- return_schema
- stop_or_escalate_when

Coordinator checkpoint:
- accepted_plan_revision
- completed_slices_and_evidence
- current_slice
- unresolved_risks
- next_action
```

### Recommended compact Looper structure

```text
Purpose and prerequisites
Authority boundary
Role policy
Loop contract: state -> dispatch -> merge -> critic -> adapt -> checkpoint/stop
Delegation contract
Return contract
```

### Recommended compact Beadwriter structure

```text
Purpose
Inputs and grounding rule
Atomicity/proof rules
Workflow: pin -> inspect -> split -> packetize -> sequence -> coverage critic
Canonical executor packet
Ready/not-ready condition
```

### Model-specific packet differences

| Lane | Give it | Do not give it |
| --- | --- | --- |
| Sol Medium | unresolved decision, goals, constraints, alternatives, consequences, failed evidence, required plan artifact | routine execution steps, full raw transcript, already-settled decisions |
| Terra High | accepted plan, current state/checkpoint, decision authority, relevant evidence, risks, acceptance contract | repeated general philosophy, every raw subagent log, mandatory Sol/Luna ceremony |
| Luna xhigh | one outcome, exact context refs, allowed writes/actions, invariants, objective proof, return schema, stop/escalate rule | open-ended planning, architecture invention, conflicting requirements to reconcile, unrelated repo context |

## Anti-patterns to remove or avoid

- Long system prompts that enumerate default competent behavior.
- Repeated “do not” statements across instruction layers.
- Generic “be concise” rules or hard brevity limits that can suppress required artifacts.
- Global response templates applied to every task.
- Giving every agent every tool.
- Delegating ordered work merely because multiple agents are available.
- Parallel writers on overlapping files without one write owner.
- Passing raw histories and logs instead of distilled checkpoints.
- Asking a model to “think harder” or narrating an execution mode in the task prompt; configure model and effort outside the task packet.
- Treating subagent agreement or test success alone as final acceptance.
- Treating Terra High or Luna xhigh as proven optimal without comparative measurements.

## Recommended eval

Before finalizing the rewritten skills, run a representative set of real beads through:

1. Current prompts and current routing.
2. Compressed prompts with current routing.
3. Compressed prompts with Luna High instead of xhigh for bounded work.
4. Compressed prompts with Terra Medium instead of High for ordinary coordination.

Measure final acceptance, required-evidence completeness, retries, incorrect scope expansion, parent intervention, input/output tokens, latency, and cost. The key comparison is not whether fewer turns were used, but whether the final artifact still meets the same acceptance bar. This matches OpenAI's GPT-5.6 migration guidance. [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

## Final recommendation

Proceed with a targeted rewrite of Looper, Beadwriter, and Bead Cleaner around one shared prompt contract:

**goal → relevant context → authority → scope/invariants → evidence → success → stop/escalate → return shape**

Preserve the chosen Terra High / Sol Medium / Luna xhigh routing for now, label it as a local policy, and test one lower effort level on representative beads. The strongest GPT-5.6 optimization is not more model-specific prompting; it is removing repeated instructions while making boundaries and proof more explicit at the exact handoff where they matter.
