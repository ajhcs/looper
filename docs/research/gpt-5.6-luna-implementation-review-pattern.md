# GPT-5.6 Luna implementation / Sol review pattern

Research date: 2026-07-11. Sources are limited to current official OpenAI documentation and the OpenAI Codex manual/docs.

## Recommendation

Use a two-pass pipeline:

1. **Implementation: `gpt-5.6-luna`, `xhigh`.** Give the implementer a complete execution packet: objective, scope, acceptance criteria, repository constraints, relevant evidence, verification commands, and a concrete completion contract. Tell it to inspect, implement, test, and refine autonomously; permit reasonable assumptions; reserve escalation for a genuine blocker.
2. **Review: `gpt-5.6-sol`, `low`.** Give the reviewer the fixed-point diff plus the same acceptance criteria. Ask for findings first, ordered by severity and grounded in file/line evidence. Require it to distinguish actionable defects from uncertainty, verify cheap questions itself, and return “no findings” when appropriate.
3. **Repair loop:** Send actionable review findings back to Luna, then run one fresh Sol review of the repaired diff. Stop on a clean review or a small explicit retry bound; do not let either role repeatedly reinterpret the whole assignment.

This matches OpenAI's documented direction even though the Luna and Sol aliases themselves are not publicly documented. The current [Codex prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide) recommends medium for ordinary interactive coding and `high` or `xhigh` for the hardest long-running tasks. It also recommends a bias to action, autonomy and persistence, repository exploration, batched/parallel reads, named editing tools, conformance to existing patterns, end-to-end verification, and a concrete edit or explicit blocker.

## Prompting the implementer

Prefer one structured, scoped prompt over many exhortations. A useful shape is:

```text
<role>Implementer</role>
<objective>...</objective>
<scope>Files/modules in scope; explicitly excluded work.</scope>
<evidence>Issue, accepted plan, relevant paths, prior findings.</evidence>
<acceptance_criteria>Observable requirements.</acceptance_criteria>
<workflow>
Inspect relevant context, implement the smallest coherent solution, run proportional
verification, fix failures caused by the change, and report the resulting diff/tests.
</workflow>
<autonomy>
Make reasonable assumptions and continue. Escalate only when a missing choice would
materially change the intended behavior or required authority.
</autonomy>
<capabilities>
Discover applicable installed skills/tools from the current environment. A preferred
skill is guidance, not a prerequisite: if unavailable or mismatched, use the closest
available workflow or direct repository tools and continue.
</capabilities>
<completion_contract>
Do not stop at a plan. Finish implementation and verification, or return one concrete
blocker with evidence and the smallest question needed to proceed.
</completion_contract>
```

Why this shape:

- The [GPT-5 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide#system-prompt-and-parameter-tuning) says GPT-5 responds well to direct, explicit, structured, scoped prompts. It reports that structured XML sections improved instruction adherence.
- That guide also warns that older “maximize thoroughness” language can cause repetitive tool use. State the desired workflow and stop condition precisely instead of stacking words such as “meticulous,” “exhaustive,” and “never stop.”
- The [Codex prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide) advises starting from the standard Codex prompt and making tactical additions, especially around autonomy, persistence, exploration, and tool use. It specifically discourages unnecessary upfront-plan/status prompting in harnesses where that can interrupt completion.
- Keep persistent repository conventions in [`AGENTS.md`](https://developers.openai.com/codex/guides/agents-md), while keeping bead-specific objective, evidence, and acceptance criteria in the execution packet. Codex loads `AGENTS.md` instructions root-to-leaf, with nearer files taking precedence.

### Avoid brittle skill gating

Do not encode “must use skill X or stop.” Skill selection is a means, not an acceptance criterion. Use this policy instead:

```text
If the named skill is installed and applicable, follow it. Otherwise inspect the
currently available skills/tools, choose the closest applicable workflow, state the
substitution briefly, and continue. Treat absence as a blocker only when the missing
capability is necessary to satisfy an acceptance criterion and no direct tool path exists.
```

This is an orchestration recommendation inferred from OpenAI's bias-to-action and tool-use guidance, not a documented Luna-specific rule. It prevents stale skill names or discovery mismatches from turning an otherwise executable bead into a false blocker.

## Prompting the reviewer

Low reasoning can work well when review input is narrow and the output contract is strict:

```text
Review the diff from <fixed point> against the supplied acceptance criteria and repo
instructions. Inspect relevant surrounding code and run cheap targeted checks when they
resolve uncertainty. Report only actionable correctness, regression, security, or
missing-test findings. Order findings by severity; include file and line, triggering
scenario, impact, and the smallest credible fix direction. Do not block merely because a
preferred skill is absent; use available repository tools. If there are no findings, say
so and list only material residual test gaps.
```

The findings-first contract follows the review behavior in the [Codex prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide): prioritize bugs, risks, behavioral regressions, and missing tests; order findings by severity with file/line references; state explicitly when no findings exist. Keeping Sol's assignment to a fixed diff and explicit spec reduces the amount of open-ended planning demanded at `low` effort.

## Operational guardrails

- **Use xhigh by default for implementation, not an undocumented fallback ladder.** Public OpenAI guidance establishes `xhigh` for hardest Codex tasks. It does not establish a `max` reasoning-effort value for GPT-5.6 Luna. If the local runtime advertises and accepts `max`, it may be attempted as a capability-dependent preference, but the deterministic fallback should be `xhigh`.
- **Separate model roles from prompt roles.** Model settings select Luna/Sol and effort; prompts define implementer/reviewer responsibilities. This keeps orchestration legible and makes fallback behavior testable.
- **Pass evidence, not conversational residue.** The reviewer should receive the accepted spec, fixed-point diff, relevant test output, and repository instructions. Avoid a long transcript that may bias it toward the implementer's conclusions.
- **Bound the loop.** One implementation, one review, one repair, and one confirmation review is a sensible default. Further cycles should require new evidence or a genuinely new finding.
- **Verify instruction discovery independently.** OpenAI's [`AGENTS.md` guide](https://developers.openai.com/codex/guides/agents-md#verify-your-setup) recommends asking Codex to summarize loaded instructions and inspecting logs when guidance appears stale. Apply the same principle to installed-skill discovery before declaring a capability absent.

## Bounded uncertainty

The public OpenAI documentation searched for this note does not define the private/local labels **GPT-5.6 Luna** or **GPT-5.6 Sol**, compare their capabilities, or promise that either accepts every reasoning-effort value exposed by a particular Codex build. The recommendation therefore treats the user's requested aliases as runtime-provided model identifiers and derives the prompting pattern from current general GPT-5/Codex guidance. Public docs support `xhigh`; they do not currently support claiming that `max` is available for Luna. Runtime capability metadata and an actual invocation are authoritative for this installation.
