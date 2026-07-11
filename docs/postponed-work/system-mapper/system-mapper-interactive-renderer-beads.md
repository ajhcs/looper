# System Mapper Interactive Renderer Beads

Parent Bead: Improve System Mapper output quality after dogfooding.

Outcome: System Mapper generates a Cytoscape-powered Interactive Map View and a useful Map Brief from the canonical typed Map Source, while removing D2/SVG as supported renderers and keeping Mermaid only as an optional rough preview.

Sources:
- `CONTEXT.md`
- `docs/adr/0002-use-interactive-map-view-as-primary-renderer.md`
- `docs/postponed-work/system-mapper/system-mapper-interactive-renderer.md`
- Phone-A-SWE renderer decision packet from the grill-with-docs session
- Existing System Mapper implementation in `scripts/system-map.mjs`, `package.json`, `tests/`, `docs/system-mapper.md`, and `skills/system-mapper/SKILL.md`

Assumptions:
- The typed YAML/JSON Map Source remains canonical.
- AI agents edit Map Sources; users inspect generated views and Map Briefs.
- Current-State Maps are the default.
- Cytoscape.js is the v1 graph renderer.
- The browser view should link only to generated HTML pages or components, not repository source files.
- Mermaid can remain only as a compatibility preview if it does not constrain the Map Source or Interactive Map View.

## Childbeads

1. `mapper-html-001` - Add HTML renderer foundation
   Commit sentence: Add a Cytoscape-backed HTML renderer command that generates a local Interactive Map View from a validated Map Source.
   Scope: Add Cytoscape dependency; add `render-html` CLI path; add `maps:render:html` package script; convert nodes and relationships into renderer data; generate a self-contained HTML file with Cytoscape initialization, layer/status styling, and a stable graph container.
   Likely files: `package.json`, `package-lock.json`, `scripts/system-map.mjs`, `tests/system-map.test.mjs`, `maps/examples/generated/analytics.html`.
   Proof: `npm run maps:render:html -- maps/examples/analytics.map.yaml maps/examples/generated/analytics.html` writes HTML; tests assert the generated marker, embedded map data, Cytoscape initialization, graph container, node ids, relationship ids, and no schema change.
   Size: target.
   Depends on: none.
   Review focus: Keep renderer-specific data in the adapter/template, not in the Map Source schema.

2. `mapper-html-002` - Add node detail panel and generated map navigation
   Commit sentence: Add node selection details to the Interactive Map View, including evidence quality, relationships, risks, unknowns, and generated child map navigation.
   Scope: Add Map Detail Panel behavior for selected nodes; display title, layer, type, status, description, evidence quality, evidence references, incoming/outgoing relationships, related risks/unknowns, and generated child HTML links when `child_map_ref` exists.
   Likely files: `scripts/system-map.mjs`, `tests/system-map.test.mjs`, `maps/examples/generated/analytics.html`.
   Proof: Tests assert detail panel markup/behavior hooks, evidence quality labels, readable source references without repository file anchors, relationship summaries, and child map navigation links that target generated HTML paths/components.
   Size: target.
   Depends on: `mapper-html-001`.
   Review focus: The panel should explain the mapped thing operationally, not expose raw YAML or graph metadata.

3. `mapper-html-003` - Add relationship explanations and trace mode
   Commit sentence: Add relationship explanation and derived trace highlighting to the Interactive Map View.
   Scope: Make relationships inspectable through edge selection, hover, trace panel, or an equivalent graphical treatment; show relationship type, label, status, evidence quality, and why the connected things belong together; derive one or more useful cross-layer traces from existing relationships without adding trace schema.
   Likely files: `scripts/system-map.mjs`, `tests/system-map.test.mjs`, `maps/examples/generated/analytics.html`.
   Proof: Tests assert relationship explanation UI hooks, edge/relationship data, trace controls or trace panel, and highlighted path data derived from existing nodes/relationships.
   Size: target.
   Depends on: `mapper-html-002`.
   Review focus: Trace Mode should help users follow Product, Knowledge, Data, System, Code, and risk paths without persisting new trace model state.

4. `mapper-html-004` - Replace D2/SVG support with HTML renderer support
   Commit sentence: Remove D2/SVG renderer commands and preflight behavior now that the HTML renderer is the primary generated view.
   Scope: Remove `render-d2`, `render-svg`, D2 command resolution, D2 shape/class mappings, D2 preflight checks, D2/SVG package scripts, and D2/SVG test expectations; keep validation and optional Mermaid preview intact.
   Likely files: `package.json`, `scripts/system-map.mjs`, `tests/system-map.test.mjs`, generated D2/SVG artifacts if tracked or referenced.
   Proof: `npm test` passes without D2 installed or referenced; `npm run maps:validate` still passes; `npm run maps:render:html` passes; `npm run maps:render:mermaid` still passes if Mermaid preview remains.
   Size: target.
   Depends on: `mapper-html-001`.
   Review focus: Remove the old renderer cleanly without disturbing validation, schema semantics, or Mermaid compatibility.

5. `mapper-html-005` - Update System Mapper docs and skill contract
   Commit sentence: Update System Mapper documentation and skill instructions around Interactive Map Views, Map Briefs, and current-state-first mapping.
   Scope: Replace D2/SVG workflow language with HTML renderer workflow; describe Mermaid as optional rough preview; update setup/preflight guidance; update prompt fixture; update README/plugin/Looper references as needed.
   Likely files: `docs/system-mapper.md`, `skills/system-mapper/SKILL.md`, `tests/system-mapper-docs.test.mjs`, `README.md`, `SKILL.md`, `skills/looper/SKILL.md`, `.codex-plugin/plugin.json`, `agents/openai.yaml`.
   Proof: Docs tests pass; docs mention `render-html`, Interactive Map View, Map Brief, current-state default, optional Mermaid preview, and no D2/SVG workflow.
   Size: target.
   Depends on: `mapper-html-004`.
   Review focus: Keep the skill operational and concise; do not make agents reason about Cytoscape internals.

6. `mapper-html-006` - Add Map Brief output contract and example
   Commit sentence: Add a Map Brief contract and example so System Mapper reports mapped domains, openable views, gaps, traces, deepenings, and next action.
   Scope: Document the chat response shape; add or update tests that inspect the skill/docs for the required output contract; include an example brief for the analytics fixture.
   Likely files: `docs/system-mapper.md`, `skills/system-mapper/SKILL.md`, `tests/system-mapper-docs.test.mjs`, possibly `docs/postponed-work/system-mapper/system-mapper-interactive-renderer.md`.
   Proof: Docs tests assert mapped domains, Interactive Map View path, Map Source path, key findings, traces, evidence gaps, Deepening Recommendations, and next action are required in System Mapper output.
   Size: small.
   Depends on: `mapper-html-005`.
   Review focus: The brief should read like a useful map handoff, not a renderer artifact dump.

7. `mapper-html-007` - Dogfood interactive views on existing maps
   Commit sentence: Generate and inspect Interactive Map Views for the Analytics and Looper Plugin maps, then record any layout or deepening follow-ups.
   Scope: Generate HTML for `maps/examples/analytics.map.yaml` and `maps/looper-plugin.map.yaml`; inspect usability; record evidence gaps, deepening recommendations, and any layout limitations that should become follow-up beads rather than hidden TODOs.
   Likely files: `maps/examples/generated/analytics.html`, `maps/generated/looper-plugin.html`, `docs/postponed-work/system-mapper/system-mapper-checkpoint.md`, optional follow-up bead notes.
   Proof: Validation passes for both maps; HTML renders for both maps; manual or browser-smoke inspection confirms clickable nodes, relationship explanation, trace mode, detail panel, and generated map navigation.
   Size: target.
   Depends on: `mapper-html-006`.
   Review focus: Dogfood the user experience honestly and separate follow-up polish from the v1 renderer contract.

## Order

`mapper-html-001 -> mapper-html-002 -> mapper-html-003 -> mapper-html-004 -> mapper-html-005 -> mapper-html-006 -> mapper-html-007`

## Risks / Unknowns

- Cytoscape built-in layouts may be weak for dense real maps; dogfooding should decide whether a layout extension or deterministic layer layout becomes a follow-up bead.
- Browser automation availability is unknown; if unavailable, use generated HTML assertions plus manual inspection.
- The exact mapping from `child_map_ref` paths to generated child HTML paths needs a small convention in `mapper-html-002`.
- Generated HTML artifact policy should be confirmed: examples may be tracked for review, while ad hoc generated maps may belong in ignored output folders.

## Merge / Split Notes

- Keep `mapper-html-001` separate so the repo has a working HTML renderer before D2/SVG removal.
- Keep node detail, relationship explanation, and trace mode separate because each has its own proof surface and review focus.
- Keep D2/SVG removal after the HTML renderer foundation to avoid a renderer gap.
- Keep docs/skill updates after behavior changes so the skill points to real commands.
- Keep dogfooding last because it should evaluate the implemented experience, not the design intent.

Ready for Looper: yes. The implementation path is sized, sequenced, and each childbead has an independent proof surface.
