<p align="center">
  <img src="assets/LooperIcon.png" alt="Looper icon" width="220">
</p>

<h1 align="center">Looper</h1>

<p align="center">
  My personal Codex skill for turning plans into tight agent loops.
</p>

Looper is the orchestration skill I use personally when work needs more structure than a single prompt, but less ceremony than a project management system. It helps Codex break planned work into slices, choose useful subagent lanes, verify progress with evidence, and stop cleanly when the work is done, waiting, or genuinely blocked.

It is intentionally compact. The point is not to teach an agent how to think; it is to give a capable agent a reliable control loop that can keep working across pauses, fresh context windows, queued checks, and partial failures.

## What It Is For

- Turning a plan, bead list, or implementation brief into repeatable Codex cycles.
- Splitting work into small, reviewable slices.
- Dispatching implementor, reviewer, fixer, specialist, or parallel discovery lanes.
- Keeping the parent agent focused on synthesis and verification.
- Producing compact loops, normally 1200-2000 characters and under 2600 unless more detail is requested.
- Reporting progress without pretending that queued CI or in-progress external jobs are blocked.

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
$looper
```

## Repository

- `SKILL.md` contains the Looper skill instructions.
- `skills/looper/SKILL.md` contains the plugin-native copy of the same skill.
- `.codex-plugin/plugin.json` contains plugin metadata and documents the Matt Pocock Skills dependency.
- `agents/openai.yaml` contains the agent metadata for the skill.
- `assets/LooperIcon.png` is the icon I use for the project.

## Status

This is a personal workflow tool, not a polished framework. I keep it small, practical, and close to the way I actually use Codex day to day.
