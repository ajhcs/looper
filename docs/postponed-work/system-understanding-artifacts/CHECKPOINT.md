# System Understanding Artifacts Checkpoint

Status: postponed

Goal: Execute the accepted System Understanding Artifacts PRD through `sua-001` to `sua-035`.

Plan revision: `PRD.md` + `BEADS.md` as of 2026-07-10.

Current slice: `sua-004` complete and saved with the deprecation checkpoint.

Next action: resume only after an explicit product-direction decision; if resumed, execute `sua-005`.

## Ledger

- `sua-001` — committed as `6533d3b` with versioned shared Artifact Envelope and definition schemas, valid/invalid fixtures, and focused AJV2020 proof.
- `sua-002` — committed as `3aa7a4b` with the Artifact Contract Registry, public validation façade and CLI, registry preflight, and explicit legacy System Understanding Map adapter.
- `sua-003` — committed as `4d56cff` with shared Artifact State authority semantics, acceptance/conflict definitions, review-gate results, and state fixtures.
- `sua-004` — saved with the deprecation checkpoint with controlled relationship definitions, validation, directional labels, and focused tests.

## Proof

- Bead packet validation: 35 packets complete; every dependency points backward.
- `sua-001` focused proof: `node --test tests/artifact-envelope.test.mjs` passes 7/7.
- `sua-001` cross-bead proof: `npm test` passes 24/24.
- `sua-001` renderer-boundary scan: no Cytoscape, renderer, layout, coordinate, position, or generated-view terms in the new schemas.
- `sua-001` two-axis review against `9cfa93090a55786f529eda18486c421b53de2eab`: Standards 0 findings; Spec 0 findings after one review-fix cycle.
- `sua-002` focused proof: `node --test tests/artifact-registry.test.mjs` passes 4/4; public valid CLI succeeds and unknown-type CLI fails explicitly with exit 1.
- `sua-002` cross-bead proof: `npm test` passes 28/28; registry preflight and legacy map validation pass.
- `sua-002` legacy rendering proof: HTML and Mermaid smoke outputs retained under `docs/postponed-work/system-understanding-artifacts/proof/`.
- `sua-002` two-axis review against `6533d3b96a23bc13ee412239335408f94efd55a0`: Standards 0 findings; Spec 0 findings after one review-fix cycle.
- `sua-003` focused proof: envelope, registry, and state suites pass 18/18; registry preflight passes.
- `sua-003` cross-bead proof: `npm test` passes 35/35; `git diff --check` passes.
- `sua-003` two-axis review against `3aa7a4bcd5cb83ac3030dad992f1c21df8401bb0`: Spec 0 findings; Standards 0 hard findings and one accepted semantic/schema timestamp duplication judgment call.

## Decisions carried

- Canonical typed sources and generated-view discipline remain invariant.
- One writer per bead; one integrator owns cross-artifact reconciliation.
- Artifacts are conditional; the Systems Engineering Integrity Loop is mandatory.
- Immediate one-hop relationships and reference-first evidence are the initial trace/context boundary.

## Open risks

- Exact visual styling and numeric context/risk thresholds remain deliberately unresolved until evaluation.
- The Looper Plugin map source and generated HTML contain pre-existing user changes and are protected from incidental edits.
- The accepted planning artifacts and this checkpoint are retained under `docs/postponed-work/system-understanding-artifacts/` as postponed work.
- `validateArtifactState` intentionally retains an independent UTC timestamp check so direct semantic validation returns authority-specific diagnostics without depending on AJV internals.
