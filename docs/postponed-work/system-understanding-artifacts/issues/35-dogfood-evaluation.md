Status: ready-for-agent

sua-035 - Dogfood and evaluate the complete vertical slices

Commit sentence: Dogfood the artifact pipeline on reversible and high-consequence cases and record accuracy, traceability, usability, and token evidence.
Outcome: The implementation is proven against contrasting real workflows and yields calibrated follow-ups rather than assumed token savings.
Context refs: parent PRD Evaluation and acceptance tests; all implemented contracts/skills; existing analytics and Looper Plugin evidence; pre-existing map worktree caution.
Scope and allowed actions: Create two representative artifact sets, generate views/index/packets, run orchestrator dry runs, compare one-hop against zero-hop and recursive baselines, inspect UI, record metrics and follow-ups. Adopt map changes only after inspecting ownership.
Invariants: No benchmark result is invented; unresolved numeric thresholds remain findings; dogfood artifacts do not become canonical product requirements automatically.
Success criteria: Report supported-claim accuracy, missed dependencies, contradiction/staleness incidents, unnecessary fetches, tokens, latency, abstention, unnecessary artifacts, and user comprehension; all acceptance tests pass or exact blockers are recorded.
Validation steps: Run full `npm test`, artifact preflight/validation/rendering, browser smoke and accessibility checks where available, and reproducible evaluation commands; inspect git diff for generated-artifact policy.
Depends on: sua-034.
Stop or escalate when: Required browser/runtime measurement is unavailable or either case reveals a contract-level flaw; return evidence and revised bead(s) rather than papering over the failure.
Executor role: judgment_worker
Preferred runtime: Terra High
