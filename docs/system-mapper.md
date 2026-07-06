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

After creating or updating a map, return a compact Map Brief instead of renderer jargon. Point to the canonical Map Source and openable Interactive Map View, summarize the most important understanding and evidence gaps, and state the next action.
