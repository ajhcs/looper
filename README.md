<p align="center">
  <img src="assets/LooperIcon.png" alt="Looper icon" width="220">
</p>

<h1 align="center">Looper</h1>

<p align="center">
  My personal Codex skills for system mapping, bead planning and cleanup, model-aware agent loops, and senior SWE decision research.
</p>

Looper is the orchestration skill I use personally when work needs more structure than a single prompt, but less ceremony than a project management system. It helps Codex understand the current system first, break planned work into slices, choose useful subagent lanes, verify progress with evidence, and stop cleanly when the work is done, waiting, or genuinely blocked.

This plugin also includes System Mapper for typed current-state maps, Beadwriter for decomposing parent beads into commit-sized childbeads, Bead Cleaner for safely pruning a `bd` backlog, and Phone-A-SWE for technical decisions that need current sources, codebase context, and systems-engineering translation.

It is intentionally compact. The point is not to teach an agent how to think; it is to give a capable agent a reliable control loop that can keep working across pauses, fresh context windows, queued checks, and partial failures.

## What It Is For

### System Mapper

- Creating System Understanding Maps from typed YAML Map Sources.
- Validating Product, Knowledge, Data, System, and Code traceability before planning work.
- Rendering Interactive Map Views as the primary output and Mermaid only as an optional rough preview.
- Preserving the Map Source as canonical while generated renderer files stay disposable.
- Returning compact Map Briefs that summarize openable views, evidence gaps, and next action.
- Marking evidence quality, risks, unknowns, and drilldown child maps explicitly.

### Looper

- Turning a plan, bead list, or implementation brief into repeatable Codex cycles.
- Splitting work into small, reviewable slices.
- Dispatching implementor, reviewer, fixer, specialist, or parallel discovery lanes.
- Keeping the parent agent focused on synthesis and verification.
- Leading with the executable loop while preserving authority, proof, stop conditions, material caveats, and next action.
- Reporting progress without pretending that queued CI or in-progress external jobs are blocked.
- Choosing the cheapest model and reasoning level likely to succeed first try: Luna Medium/High for mechanical or bounded work, Terra Medium/High for ordinary through complex multi-file work and review, and Sol Medium for ambiguous or high-consequence work and final synthesis.
- Escalating failed, low-confidence, or unexpectedly broad work by one model tier instead of repeating the same configuration; reserving Sol High and xhigh/max reasoning for exceptional work.
- Checkpointing and compacting or starting fresh when work changes phases, so the orchestrator carries decisions and evidence instead of transcript history.

### Beadwriter

- Decomposing grill-with-docs output, PRDs, issue briefs, or parent beads into childbeads.
- Keeping each childbead close to one atomic commit: one logical change, one proof surface, one commit sentence.
- Using LOC as a sizing signal: 20-150 meaningful changed LOC per commit-sized childbead, with a soft cap around 200.
- Preparing stable executor packets with clear scope, success criteria, validation steps, dependencies, and stop/escalate conditions.
- Marking a bead list ready for Looper only when it can be handed to an implementation loop without inventing scope.
- Labeling execution fit and mandatory validation so failed, low-confidence, or widened work escalates cleanly.

### Bead Cleaner

- Auditing open `bd` beads against explicit plans, PRDs, ADRs, and current repository evidence.
- Classifying work as keep, rewrite, defer, duplicate, supersede, close, delete, or review.
- Preferring history-preserving cleanup over deletion.
- Requiring an exact ID list, dependency analysis, dry run, and explicit approval before deletion.
- Never using hard or cascading deletion by default.

### Phone-A-SWE

- Researching software engineering decisions using local codebase context and current web sources.
- Comparing architecture, framework, API, library, MCP, skill, or implementation options.
- Translating software tradeoffs into systems terms: interfaces, invariants, constraints, failure modes, blast radius, reversibility, proof, and residual risk.
- Forcing accuracy with evidence labels: `verified`, `inferred`, `unknown`, `not inspected`, and `not run`.
- Producing a small decision packet instead of a sprawling research report.

## How I Use It

I use Looper when I want Codex to keep moving through a plan with discipline:

1. Read just enough context to choose the next slice.
2. Send focused work to the right lane or subagent.
3. Compare the result against evidence, tests, and the original goal.
4. Adapt the loop by changing scope, evidence, lane mix, or checkpoint state when progress stalls.
5. Return a compact progress packet with `complete`, `waiting`, or `blocked`.

The skill is opinionated about momentum. CI that is queued, checks that are still running, and external jobs that are making progress should be reported as `waiting`, not `blocked`. A blocked state is reserved for required user/provider input or the same non-progressing condition repeating across three checks.

Looper assumes modern Codex agents can infer routine pathfinding. It focuses on the job, constraints, proof, stop conditions, and handoff shape rather than spelling out every ordinary engineering step.

## Install

Looper requires Matt Pocock Skills to be installed first. Its default implementation and review lanes call:

- `matt-pocock-skills:implement`
- `matt-pocock-skills:code-review`

Copy this folder into your Codex skills directory:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.codex\skills\looper"
Copy-Item -Recurse -Force .codex-plugin, skills, SKILL.md, agents, assets "$env:USERPROFILE\.codex\skills\looper\"
```

For plugin installs, use the plugin-native copy under `skills/looper/SKILL.md`; the root `SKILL.md` remains for direct local skill use.

Then invoke it in Codex with:

```text
$system-mapper
$looper
$beadwriter
$bead-cleaner
$phone-a-swe
```

## Repository

- `SKILL.md` contains the direct local Looper skill instructions.
- `skills/looper/SKILL.md` contains the plugin-native copy of the same skill.
- `skills/system-mapper/SKILL.md` contains the System Mapper skill.
- `skills/beadwriter/SKILL.md` contains the bead decomposition and childbead writing skill.
- `skills/bead-cleaner/SKILL.md` contains the preview-first `bd` backlog cleanup skill.
- `skills/phone-a-swe/SKILL.md` contains the Phone-A-SWE decision research skill.
- `schemas/system-map.schema.json`, `scripts/system-map.mjs`, and `maps/examples/` contain the typed map toolchain.
- `.codex-plugin/plugin.json` contains plugin metadata and documents the Matt Pocock Skills dependency.
- `agents/openai.yaml` contains the agent metadata for the plugin.
- `assets/LooperIcon.png` is the icon I use for the project.

## Status

This is a personal workflow tool, not a polished framework. I keep it small, practical, and close to the way I actually use Codex day to day.
