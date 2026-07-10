# GPT-5.6 orchestration model policy research

**Research date:** 2026-07-09
**Scope:** Validate a proposed Codex hierarchy in which GPT-5.6 Sol plans, Terra orchestrates everyday work, and Luna executes bounded tasks, with a default effort pattern of Sol Medium, Terra High, and Luna Max.
**Sources:** Current first-party OpenAI documentation only.

## Bottom line

The proposed hierarchy is directionally useful as a custom workflow, but its effort defaults should change.

- **Keep Sol Medium as the planning and high-stakes default.** This matches Codex's default Power setting and is appropriate for ambiguous, difficult, or high-value work. Sol is not limited to planning, however; OpenAI also recommends it for demanding execution, deep research, and polished deliverables.
- **Use Terra Medium, not Terra High, as the everyday default.** Terra is the documented everyday workhorse. Raise it to High when the actual task has difficult multi-step reasoning, multiple sources, meaningful tradeoffs, or a failed Medium attempt.
- **Use Luna Low or Medium for bounded execution, not Luna Max by default.** Luna is positioned for clear, repeatable, high-volume work. Max is reserved for the hardest quality-first problems, so making Luna Max the routine executor spends extra reasoning on the tier selected for efficiency and defeats much of the intended routing benefit.
- **Do not reserve High reasoning only for planning or frontend work.** Official guidance associates High and Extra High with difficult multi-step work, sources, and tradeoffs in any domain. GPT-5.6 has stronger frontend judgment, but the docs do not define frontend as an exclusive reason for High.
- **Do not make every bead traverse Sol → Terra → Luna.** OpenAI documents task-fit selection and selective subagent delegation, not a required three-stage pipeline. Mandatory handoffs add context, latency, token use, and coordination risk even when a task is already well specified.

## Documented facts

### Models, names, and access

OpenAI publicly documents all three names and model IDs:

| Tier | Model ID | OpenAI's documented fit |
| --- | --- | --- |
| Sol | `gpt-5.6-sol` | Flagship capability; complex, open-ended, ambiguous, difficult, or high-value work needing analysis, judgment, or polish |
| Terra | `gpt-5.6-terra` | Balanced everyday work requiring strong reasoning and tool use without Sol's full depth |
| Luna | `gpt-5.6-luna` | Fast, affordable, clear, repeatable, and high-volume work with an explicit success shape |

The unqualified `gpt-5.6` alias routes to `gpt-5.6-sol`. Codex's models page supplies CLI examples for all three model IDs and says the default Power setting is Sol with Medium reasoning. It also says to start with Sol when uncertain. Sources: [Codex models](https://developers.openai.com/codex/models), [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model).

Availability is not safe to assume from the model names alone. OpenAI's Help Center describes GPT-5.6 as a limited preview whose API and Codex access is scoped separately to approved organizations and workspaces. The skill should therefore treat model availability as an environment capability and provide a fallback rather than claiming universal access. Source: [GPT-5.6 preview availability](https://help.openai.com/en/articles/20001325-a-preview-of-gpt-5-6-sol-terra-and-luna).

### Reasoning controls

For the GPT-5.6 API family, OpenAI documents `none`, `low`, `medium`, `high`, `xhigh`, and `max`. It recommends Medium as the balanced start, High or Extra High only when more reasoning produces a measured gain, and Max for the hardest quality-first workloads. It specifically recommends comparing configurations on representative work rather than assuming the highest effort is the best tradeoff. Source: [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model).

Codex's model selector documents Sol at Low, Medium, High, Extra High, Max, and Ultra. Max gives one selected model more reasoning time; Ultra adds automatic subagent delegation. Most tasks do not need Max or Ultra. Source: [Codex models](https://developers.openai.com/codex/models).

There is a current configuration-surface caveat: the general Codex configuration reference lists portable `model_reasoning_effort` values as `minimal | low | medium | high | xhigh`, while the newer model and subagent pages discuss model-dependent `max` and `ultra`. Skills should not assume that `max` or `ultra` is accepted as a literal in every agent file, Codex client version, or surface. Prefer semantic routing instructions, or verify the selected surface before emitting configuration. Sources: [Codex configuration reference](https://developers.openai.com/codex/config-reference), [Codex subagents](https://developers.openai.com/codex/multi-agent).

### Subagent orchestration

Codex supports custom agents with distinct models, reasoning effort, instructions, sandbox settings, and tools. Official guidance recommends parallel agents first for read-heavy exploration, tests, triage, and summarization, while warning that parallel write-heavy work can create conflicts and coordination overhead. Local Codex delegates after a direct request or applicable project or skill instruction; Ultra can delegate proactively where available. Source: [Codex subagents](https://developers.openai.com/codex/multi-agent).

OpenAI does **not** publish a canonical Sol-planner → Terra-orchestrator → Luna-executor pipeline. That is a workflow recommendation, not a documented product behavior.

### GPT-5.6 prompt implications

OpenAI recommends shorter prompts, explicit action boundaries, clear success criteria, and lightweight task-specific structure. Its migration guide reports that shorter internal system prompts outperformed longer explicit prompts in its evaluations, while heavy prompts encouraged redundant exploration, repeated validation, and larger accumulated context. It also warns that generic brevity instructions can make GPT-5.6 omit required work; prompts should instead preserve required facts, evidence, caveats, and next actions while trimming repetition. Source: [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model).

These are directly relevant to Beadwriter and Looper: encode the job, authorization boundary, evidence requirement, stop condition, and handoff shape once; remove repeated procedural reminders and broad global response templates.

## Assessment of the proposed assumptions

| Proposed assumption | Assessment | Reason |
| --- | --- | --- |
| Sol for overall planning | **Supported, with expansion** | Sol is a strong fit for ambiguous planning, but also for demanding implementation and validation. |
| Sol for sticky, challenging, or extremely important work | **Supported** | This matches the documented complex/difficult/high-value fit. |
| Terra as default for most work after a Sol plan | **Reasonable custom policy** | Terra is the documented everyday workhorse, but OpenAI's overall Codex default is Sol Medium when uncertain. |
| Terra as orchestrator/coordinator | **Reasonable inference** | Terra has the right everyday reasoning/tool-use profile; OpenAI does not assign orchestration exclusively to it. |
| Terra should use Luna as executor | **Useful only for bounded work** | Luna fits explicit, repeatable units; complex or ambiguous execution should stay on Terra or escalate to Sol. |
| Sol Medium → Terra High → Luna Max | **Not recommended as the default** | Medium is the general balance point; High requires task evidence; Max is reserved for the hardest work, not routine bounded execution. |
| High primarily for planning or frontend fallback | **Contradicted** | High applies to difficult multi-step work, sources, checking, and tradeoffs across domains. Frontend is an improved capability, not an exclusive routing rule. |

## Recommended policy for Beadwriter and Looper

Use this as a starting policy, then tune it against real bead outcomes:

1. **Sol Medium — architect and escalation lane**
   - Use for goal interpretation, initial/phase planning, ambiguous decomposition, cross-cutting architecture, high-impact decisions, and recovery after repeated non-progress.
   - Also use for quality-critical final synthesis or execution whose failure cost is high.
   - Escalate effort above Medium only when the task is demonstrably hard enough to benefit.

2. **Terra Medium — default orchestration and implementation lane**
   - Use for normal Looper coordination, implementation, review/fix cycles, and beads requiring judgment or tool use.
   - Move to Terra High for difficult multi-step reasoning, several interacting evidence sources, subtle edge cases, or an unsuccessful Medium pass.
   - Do not require a fresh Sol planning pass when an accepted plan or bead packet already defines the work.

3. **Luna Low/Medium — bounded executor lane**
   - Use for mechanical edits, extraction, classification, transformation, deterministic checks, structured summaries, and repetitive fan-out where `done` is objectively testable.
   - Give Luna a complete packet: exact scope, invariants, allowed files/actions, proof command or output schema, and stop condition.
   - Escalate to Terra when the executor must invent scope, reconcile conflicting evidence, make architectural tradeoffs, or fails a well-specified attempt.
   - Reserve Luna High/Max for eval-proven niches, not as a global default.

4. **Selective delegation**
   - Delegate only independent, bounded lanes whose parallelism improves wall-clock time or protects the parent context.
   - Prefer read-heavy fan-out. Assign one write owner per overlapping file or implementation slice.
   - Keep the parent responsible for acceptance against evidence rather than merely collecting subagent claims.

5. **Capability-aware fallback**
   - Express roles semantically (`planner`, `orchestrator`, `bounded_executor`) and map them to available models at runtime.
   - If GPT-5.6 or a reasoning level is unavailable, preserve the role and select the closest supported model/effort instead of failing the workflow.

## Suggested eval before hard-coding defaults

Run a small representative bead set through at least these variants:

- Terra Medium alone.
- Sol Medium plan → Terra Medium implementation.
- Sol Medium plan → Terra Medium orchestration → Luna Medium bounded execution.
- Terra High only on beads classified as reasoning-heavy.

Measure task acceptance, evidence completeness, fix/retry count, wall-clock time, tokens, and coordination failures. Adopt the cheapest configuration that preserves the acceptance bar. This follows OpenAI's recommendation to compare representative workloads rather than assume more reasoning always wins.

## Chosen local policy

After reviewing the tradeoffs, this plugin intentionally uses a custom usage-limit policy rather than the research baseline:

- Choose the cheapest model and reasoning level likely to succeed on the first attempt.
- Use Luna Medium for mechanical work and Luna High for bounded, well-specified implementation with clear validation.
- Use Terra Medium for ordinary multi-file implementation, research, and review; use Terra High for complex debugging, cross-module changes, and edge-case-heavy review.
- Keep ambiguous architecture, security-critical decisions, expensive-to-repeat work, and final synthesis on Sol Medium; use Sol High only for exceptionally difficult work.
- Prefer moving up one model tier over using xhigh or max. Require validation, and escalate failures, low confidence, or wider scope one tier instead of repeating the same configuration.

This is a user-selected operating policy, not an OpenAI-prescribed hierarchy. Tune it against first-attempt acceptance, retry count, wall-clock time, and model usage.
