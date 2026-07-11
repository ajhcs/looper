Status: ready-for-agent

sua-006 - Project one-hop Artifact Context Packets

Commit sentence: Generate provenance-complete one-hop Artifact Context Packets from selected elements and the Trace Index.
Outcome: Agents receive local system context with explicit completeness metadata instead of recursive artifact dumps.
Context refs: parent PRD Artifact Context Packet; `CONTEXT.md` One-Hop Context Default; Trace Index API.
Scope and allowed actions: Add packet projection, relationship budgets, shown/total/truncation metadata, findings and drill-down handles, and stable serialization; do not fetch evidence bodies yet.
Invariants: Packets derive from canonical artifacts and index data, not renderer state; one hop is the default; omission is always disclosed.
Success criteria: Packets contain all required identity, state, revision, relation, confidence-basis, evidence-reference, finding, access, and completeness fields; high fanout produces continuation handles.
Validation steps: Run one-hop, high-fanout, no-recursion, serialization, and renderer-independence tests; run `npm test`.
Depends on: sua-005.
Stop or escalate when: A required packet field has no canonical source in the shared envelope or Trace Index.
Executor role: focused_executor
Preferred runtime: Luna High
