---
name: system-mapper
description: Inspect, create, validate, render, and deepen System Understanding Maps from typed Map Sources before planning or implementation work.
---

# System Mapper

Use System Mapper when the user needs to understand the current system before planning work, decomposing beads, or making implementation decisions.

System Mapper creates Current-State Maps by default. Create a Future-State Map only when the user explicitly asks for prospective design or planning.

The canonical artifact is a typed Map Source. Interactive Map Views, Mermaid previews, markdown summaries, and AI context packets are renderers or derivatives. Do not treat renderer syntax as model state.

## Required Setup

Run setup preflight before validating or rendering maps:

```powershell
npm run maps:preflight
```

If preflight fails, keep working on typed Map Source inspection when possible and report the missing local Node.js or npm dependency. Do not assume Codex plugin install hooks can repair project dependencies.

## Evidence Contract

Every mapped claim must carry evidence from the Map Source `sources` list.

Use evidence confidence honestly:

- `verified`: backed by inspected docs, code, runtime output, tests, or source material.
- `inferred`: likely from inspected evidence but not directly proven.
- `unknown`: deliberately marked gap.

Unknowns and risks are first-class nodes, not hidden commentary.

## Workflow

1. Inspect the current system first: docs, code, runtime output, tests, decisions, and user-provided context.
2. Create or update a typed Map Source using `schemas/system-map.schema.json`.
3. Keep Product, Knowledge, Data, System, and Code as the core layers.
4. Validate with `npm run maps:validate -- <map-source>`.
5. Generate an Interactive Map View with `npm run maps:render:html -- <map-source> <output.html>` or `node scripts/system-map.mjs render-html <map-source> <output.html>`.
6. Generate Mermaid only as an optional rough compatibility preview with `npm run maps:render:mermaid` or `node scripts/system-map.mjs render-mermaid <map-source> <output.mmd>`.
7. Create deeper maps only when progressive visual disclosure helps: a crowded node, unclear relationship, risky subsystem, or user request. Declare the child map in `child_maps` and reference it with `child_map_ref`.
8. Return a compact Map Brief that includes mapped domains, the typed Map Source path, validation result, openable Interactive Map View path, key findings, important traces, evidence gaps, Deepening Recommendations, and next action.

## Map Brief Output Contract

The Map Brief is the chat handoff after mapping. It must read like system understanding, not a renderer artifact dump.

Include these fields:

- `Mapped Domains`: the domain or domains covered by the Current-State Map.
- `Interactive Map View`: the generated HTML path the user can open.
- `Map Source`: the canonical typed YAML or JSON path.
- `Validation`: the validation command and result.
- `Key Findings`: the most important operational understanding from the map.
- `Important Traces`: one or more cross-layer paths through mapped nodes.
- `Evidence Gaps`: unknown, inferred, or under-supported claims that affect confidence.
- `Deepening Recommendations`: focused follow-up maps that would improve understanding.
- `Next Action`: the single best next step.

Keep Deepening Recommendations in the Map Brief. Do not persist them into the Map Source unless the user asks you to create the deeper map.

## Map Source Rules

- Allowed core layers: `Product`, `Knowledge`, `Data`, `System`, `Code`.
- Optional overlays: `Business`, `Work`.
- Controlled node types: `Surface`, `Workflow`, `Concept`, `Metric`, `Data Source`, `Transformation`, `System Component`, `Interface`, `Code Area`, `Risk`, `Unknown`.
- Controlled relationship types: `contains`, `uses`, `feeds`, `transforms`, `implements`, `exposes`, `measures`, `depends_on`, `protects`, `risks`, `unknown`.
- `subtype` may refine a node, but it must be an object with `namespace` and `value`.
- Relationships must resolve to existing node ids.
- `child_map_ref` must resolve to a declared `child_maps` entry.

## Prompt Fixture

User: "Map the analytics area before we plan changes."

Expected behavior:

1. Run `npm run maps:preflight`.
2. Inspect current docs/code evidence.
3. Produce a typed Map Source such as `maps/examples/analytics.map.yaml`.
4. Validate the Map Source.
5. Generate an Interactive Map View from the Map Source.
6. Generate Mermaid only as an optional rough preview.
7. Add a child map only for dense or risky areas, not by default.
8. Return a compact Map Brief with mapped domains, the openable view, Map Source, validation result, key findings, important traces, evidence gaps, Deepening Recommendations, and next action.
