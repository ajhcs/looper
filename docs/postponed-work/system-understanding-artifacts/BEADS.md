# System Understanding Artifacts Implementation Beads

Parent outcome: Replace the universal graph-first System Mapper contract with a modular System Understanding Artifact pipeline that preserves typed-source truth, evidence, generated views, traceability, and token-efficient agent context.

Parent source: [PRD](./PRD.md)

## Non-goals

- Do not build a human visual editor or a custom annotation system.
- Do not generate every altitude artifact by default.
- Do not add automatic end-to-end trace ranking or recursive default context.
- Do not turn generated views or the Trace Index into canonical state.
- Do not remove legacy map compatibility before the replacement seam is proven.

## Source and constraint summary

- `CONTEXT.md` is the authoritative vocabulary.
- ADR-0002 preserves typed canonical sources and generated interactive views.
- The current validation/rendering seam is `scripts/system-map.mjs` plus output-level tests.
- The current map schema and fixtures provide the legacy compatibility surface.
- Current-State Default, evidence confidence, Luna-first routing, progressive disclosure, and no renderer fields in source schemas remain invariant.
- Pre-existing worktree changes to the Looper Plugin map and its generated HTML are outside these beads unless the final dogfood bead explicitly adopts them.

## Ordered childbeads

1. [sua-001 — Add shared artifact envelope definitions](./issues/01-shared-artifact-envelope.md)
2. [sua-002 — Add the artifact registry and validation façade](./issues/02-artifact-registry-validation.md)
3. [sua-003 — Enforce artifact-state authority](./issues/03-artifact-state-authority.md)
4. [sua-004 — Add controlled semantic relationship definitions](./issues/04-controlled-relationships.md)
5. [sua-005 — Generate the cross-artifact Trace Index](./issues/05-trace-index.md)
6. [sua-006 — Project one-hop Artifact Context Packets](./issues/06-context-packets.md)
7. [sua-007 — Add evidence escalation and freshness policy](./issues/07-evidence-escalation.md)
8. [sua-008 — Extract the shared Interactive Artifact View shell](./issues/08-interactive-artifact-shell.md)
9. [sua-009 — Show immediate semantic relationships](./issues/09-immediate-relationships.md)
10. [sua-010 — Add explicit drill-down and scoped findings](./issues/10-drilldown-findings.md)
11. [sua-011 — Add the Ecosystem Source Model contract](./issues/11-ecosystem-contract.md)
12. [sua-012 — Render Mission and Market Context](./issues/12-mission-market-view.md)
13. [sua-013 — Render the C4 System Landscape](./issues/13-c4-landscape-view.md)
14. [sua-014 — Render focused C4 System Context](./issues/14-c4-context-view.md)
15. [sua-015 — Add Operational Concept and ConOps](./issues/15-operational-concept.md)
16. [sua-016 — Add Requirements Model and Specification](./issues/16-requirements-specification.md)
17. [sua-017 — Generate the Requirements Traceability Matrix](./issues/17-requirements-matrix.md)
18. [sua-018 — Add Logical Decomposition and structural Reality Checks](./issues/18-logical-decomposition.md)
19. [sua-019 — Add Use Case Model and focused diagrams](./issues/19-use-case-model.md)
20. [sua-020 — Add Domain Model and view](./issues/20-domain-model.md)
21. [sua-021 — Add Software Architecture and C4 Container view](./issues/21-software-architecture-container.md)
22. [sua-022 — Add C4 Component view](./issues/22-c4-component-view.md)
23. [sua-023 — Add risk-triggered Code Structure artifacts](./issues/23-code-structure.md)
24. [sua-024 — Add the Artifact Expert Skill contract](./issues/24-artifact-expert-framework.md)
25. [sua-025 — Add the Ecosystem Source Model expert](./issues/25-ecosystem-expert.md)
26. [sua-026 — Add the Operational Concept expert](./issues/26-operational-expert.md)
27. [sua-027 — Add the Requirements expert](./issues/27-requirements-expert.md)
28. [sua-028 — Add the Logical Decomposition expert](./issues/28-logical-expert.md)
29. [sua-029 — Add the Use Case expert](./issues/29-use-case-expert.md)
30. [sua-030 — Add the Domain Model expert](./issues/30-domain-expert.md)
31. [sua-031 — Add the Software Architecture expert](./issues/31-software-architecture-expert.md)
32. [sua-032 — Add the Code Structure expert](./issues/32-code-structure-expert.md)
33. [sua-033 — Add the integrity-loop orchestrator](./issues/33-integrity-loop-orchestrator.md)
34. [sua-034 — Migrate System Mapper docs and legacy compatibility](./issues/34-migration-docs.md)
35. [sua-035 — Dogfood and evaluate the complete vertical slices](./issues/35-dogfood-evaluation.md)

## Requirement coverage

| PRD area | Beads |
| --- | --- |
| Shared envelope, modular contracts, registry | sua-001, sua-002 |
| Current/Candidate/Accepted state and conflict gates | sua-003, sua-028 |
| Controlled relationships and inverse labels | sua-004, sua-009 |
| Artifact-owned traces and Trace Index | sua-005, sua-017 |
| One-hop context and evidence escalation | sua-006, sua-007 |
| Shared shell, selection, drill-down, findings, annotations | sua-008, sua-009, sua-010 |
| Altitude 0A/0B and Ecosystem Source Model | sua-011, sua-012, sua-013 |
| Altitude 1 System Context and ConOps | sua-014, sua-015 |
| Altitude 2 Requirements and RTM | sua-016, sua-017 |
| Altitude 3 Logical Decomposition, Reality Check, Use Cases | sua-018, sua-019 |
| Altitude 4 Domain, Container, Component | sua-020, sua-021, sua-022 |
| Optional Altitude 5 | sua-023 |
| Artifact Expert Skills and model routing | sua-024 through sua-032 |
| Integrity loop, conditional artifacts, review gates, integration | sua-033 |
| Legacy compatibility, docs, prompt posture | sua-002, sua-034 |
| End-to-end proof, token/accuracy evaluation | sua-035 |

## Risks and open decisions

- Exact visual styling is intentionally deferred; visualization beads prove understandable behavior and accessibility through the shared shell.
- Numeric thresholds for context budgets and risk-triggered depth remain evaluation outputs in sua-030, not invented constants in earlier beads.
- If extracting the current renderer exposes a larger-than-expected coupling seam, sua-008 must stop and return a narrower file map rather than combining shell extraction with feature work.
- If a contract cannot fit with its fixtures and semantic tests in one coherent commit, split that bead by schema versus view; do not exceed the bead's stated ownership.

Ready for Looper: yes
