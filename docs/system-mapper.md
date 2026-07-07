# System Mapper

System Mapper creates System Understanding Maps from a typed Map Source. The Map Source is canonical; the Interactive Map View is the primary generated renderer.

System Mapper creates Current-State Maps by default. Create a Future-State Map only when the user explicitly asks for prospective design or planning.

## Map Source

Map Sources are YAML files validated by `schemas/system-map.schema.json` and semantic checks in `scripts/system-map.mjs`.

Required core layers:

- `Product`
- `Knowledge`
- `Data`
- `System`
- `Code`

Optional overlays:

- `Business`
- `Work`

Use `npm run maps:validate -- <path>` to validate a specific map. When no path is passed, the command validates every `maps/examples/*.map.yaml` file.

## Renderer Workflow

Generate an Interactive Map View:

```powershell
npm run maps:render:html -- <map-source> <output.html>
```

Generated HTML files are review artifacts, not sources of truth. Use them to inspect clickable nodes, relationship explanations, trace mode, detail panels, evidence quality, and generated child-map navigation.

Optionally generate a rough Mermaid preview:

```powershell
npm run maps:render:mermaid
```

Mermaid output is only a lightweight compatibility preview for chat or docs. It must not constrain the Map Source schema or replace the Interactive Map View workflow.

## Preflight

Run:

```powershell
npm run maps:preflight
```

The preflight checks Node.js, installed npm dependencies, and renderer prerequisites for validating Map Sources and generating Interactive Map Views. Treat preflight failures as local tooling issues, not map-schema failures.

## Map Brief

After creating or updating a map, return a compact Map Brief instead of renderer jargon. It should read like a useful map handoff: what was mapped, what can be opened, what the map says, where the evidence is weak, where deeper mapping would help, and what should happen next.

Use this response shape:

- `Mapped Domains`: the domain or domains covered by the Current-State Map.
- `Interactive Map View`: an openable generated HTML path.
- `Map Source`: the canonical typed YAML or JSON path.
- `Validation`: the validation command and result.
- `Key Findings`: the most important operational understanding from the map.
- `Important Traces`: one or more cross-layer paths through product, knowledge, data, system, and code nodes.
- `Evidence Gaps`: unknown, inferred, or under-supported claims that affect confidence.
- `Deepening Recommendations`: focused follow-up maps that would improve understanding.
- `Next Action`: the single best next step for the user or agent.

Deepening Recommendations belong in the Map Brief after analysis. Do not persist them into the Map Source unless the user asks System Mapper to create the deeper map.

Example brief for `maps/examples/analytics.map.yaml`:

```markdown
**Map Brief**

- `Mapped Domains`: Analytics.
- `Interactive Map View`: `maps/examples/generated/analytics.html`.
- `Map Source`: `maps/examples/analytics.map.yaml`.
- `Validation`: `npm run maps:validate -- maps/examples/analytics.map.yaml` passed.
- `Key Findings`: The Analytics Dashboard depends on tracked interactions, the collection path, local analytics server validation, the event schema, and the reporting store. Pricing insight is only partially supported because the fixture marks the relationship from tracked interactions to pricing insight as partial.
- `Important Traces`: Analytics Dashboard -> Collection Path -> Local Analytics Server -> Event Schema -> Reporting Store -> Analytics Dashboard; Data Quality Coverage -> Tracked Interactions -> Pricing Insights.
- `Evidence Gaps`: Most analytics implementation claims are inferred from `implementation-inference`; Security Coverage Unknowns still needs verification for auth, retention, and privacy coverage around the collection path.
- `Deepening Recommendations`: Create a child map for the Analytics Event Pipeline if the next decision depends on payload validation, edge mediation, or reporting-store behavior.
- `Next Action`: Verify the inferred implementation evidence against real analytics code before planning instrumentation or reporting changes.
```
