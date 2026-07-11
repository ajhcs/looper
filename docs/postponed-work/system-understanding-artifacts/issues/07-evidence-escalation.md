Status: ready-for-agent

sua-007 - Add evidence escalation and freshness policy

Commit sentence: Add deterministic evidence verification triggers, minimum-excerpt retrieval contracts, and revision-aware freshness metadata.
Outcome: Reference-first context remains token-efficient without allowing consequential decisions to rely on unverified summaries.
Context refs: parent PRD Artifact Context Packet and evidence retrieval; `CONTEXT.md` Evidence Escalation Rule and Full-Evidence Exception.
Scope and allowed actions: Implement `needs_verification` policy behavior, immutable cache-key construction, stale/inaccessible/conflict outcomes, and excerpt/full-source escalation interfaces with fake providers in tests.
Invariants: Claim summaries are not proof; full-source loading is exceptional; access and sensitivity metadata are enforced; stale evidence is never silently current.
Success criteria: All mandatory triggers fetch the minimum excerpt; benign navigation avoids unnecessary fetches; whole-source exceptions are explicit; unavailable evidence produces unknown or blocked consequential action.
Validation steps: Run trigger table, cache invalidation, stale-source, authorization, excerpt-expansion, and full-source-exception tests; run `npm test`.
Depends on: sua-006.
Stop or escalate when: Real external credentialed retrieval is required; keep the bead provider-neutral and return the missing integration as follow-up scope.
Executor role: judgment_worker
Preferred runtime: Terra High
