# System Mapper Interactive Renderer Brief

Parent Bead: Improve System Mapper output quality after dogfooding.

## Problem

The first System Mapper renderer produces static SVG/D2-style artifacts that are not a good user experience. The visual output is not meaningfully clickable, the chat response reads like an artifact dump, and agents can end up spending context on renderer mechanics instead of system understanding.

## Decision Summary

System Mapper keeps the typed YAML/JSON Map Source as the source of truth. AI agents edit the Map Source; users review generated views and Map Briefs.

The primary renderer becomes a generated Interactive Map View built from a maintained HTML/JS Renderer Template using Cytoscape.js. D2 and SVG support should be removed. Mermaid may remain only as a rough chat/docs preview if it continues to help.

System Mapper creates Current-State Maps by default. Future-State Maps are produced only when the user explicitly asks for prospective design or planning.

## V1 Product Contract

The generated Interactive Map View must support:

- Clickable nodes that open a Map Detail Panel.
- Relationship explanations through edge selection, hover, trace panel, or another graphical treatment.
- Generated-map navigation links to child HTML pages or components.
- Evidence quality shown inline as verified, inferred, or unknown.
- Trace Mode for highlighting important cross-layer paths.
- Readable evidence references without browser links into repository files.

The Map Detail Panel should explain the mapped thing in operational terms:

- title, layer, type, and status
- description
- evidence quality and references
- incoming and outgoing relationships
- related risks and unknowns
- generated child map navigation, when present

## Map Brief Contract

After mapping, System Mapper should return a compact Map Brief instead of renderer jargon. It should include:

- mapped domain or domains
- openable Interactive Map View path
- canonical Map Source path
- key findings
- one or more important traces
- evidence gaps
- Deepening Recommendations
- next action

Deepening Recommendations belong in the Map Brief after analysis. They should not be persisted in the Map Source unless the user asks System Mapper to create the deeper map.

## Non-Goals

- No human visual diagram editor.
- No React Flow app unless the product later becomes an editable React application.
- No D2/SVG renderer maintenance.
- No coordinates or library-specific rendering details in the Map Source schema.
- No clickable repository source-file links inside generated HTML.
- No persisted trace schema in v1.

## Implementation Slices

1. Replace D2/SVG renderer commands with `render-html`.
   Scope: `package.json`, `scripts/system-map.mjs`, generated fixture output.
   Proof: `npm run maps:render:html -- maps/examples/analytics.map.yaml maps/examples/generated/analytics.html`.

2. Add Cytoscape.js Renderer Template.
   Scope: renderer data adapter, embedded/generated HTML, CSS, JS behavior.
   Proof: generated HTML opens locally, initializes graph, supports node detail panel and child map navigation.

3. Update tests.
   Scope: renderer unit tests and generated HTML smoke assertions.
   Proof: HTML contains serialized map data, Cytoscape initialization, detail panel container, trace mode hooks, and no D2/SVG expectations.

4. Update System Mapper docs and skill contract.
   Scope: `docs/system-mapper.md`, `skills/system-mapper/SKILL.md`, README references, prompt fixture.
   Proof: docs instruct agents to validate Map Source, render HTML, optionally render Mermaid, and return a Map Brief.

5. Dogfood on existing maps.
   Scope: `maps/examples/analytics.map.yaml` and `maps/looper-plugin.map.yaml`.
   Proof: generated views are navigable, readable, and reveal gaps/deepening candidates without manual diagram correction.

## Proof Before Commit

Run:

```powershell
npm install cytoscape
npm run maps:validate
npm run maps:render:html -- maps/examples/analytics.map.yaml maps/examples/generated/analytics.html
npm test
```

If browser automation is available, add a smoke test that opens the generated HTML, clicks a node, verifies the Map Detail Panel updates, selects or highlights a relationship/trace, and confirms child map navigation links point to generated HTML pages or components.
