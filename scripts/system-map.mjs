import Ajv2020 from "ajv/dist/2020.js";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import YAML from "yaml";

const require = createRequire(import.meta.url);
const schemaPath = resolve("schemas/system-map.schema.json");
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true });
const validateSchema = ajv.compile(schema);

const allowedLayerTypes = new Map([
  ["Product", new Set(["Surface", "Workflow", "Risk", "Unknown"])],
  ["Knowledge", new Set(["Concept", "Metric", "Risk", "Unknown"])],
  ["Data", new Set(["Data Source", "Transformation", "Metric", "Risk", "Unknown"])],
  ["System", new Set(["System Component", "Interface", "Transformation", "Risk", "Unknown"])],
  ["Code", new Set(["Code Area", "Interface", "System Component", "Risk", "Unknown"])],
  ["Business", new Set(["Concept", "Metric", "Risk", "Unknown"])],
  ["Work", new Set(["Workflow", "Risk", "Unknown"])]
]);

const shapeByType = {
  Surface: "rectangle",
  Workflow: "step",
  Concept: "oval",
  Metric: "circle",
  "Data Source": "cylinder",
  Transformation: "queue",
  "System Component": "hexagon",
  Interface: "cloud",
  "Code Area": "package",
  Risk: "diamond",
  Unknown: "callout"
};

const classByLayer = {
  Product: "product",
  Knowledge: "knowledge",
  Data: "data",
  System: "system",
  Code: "code",
  Business: "business",
  Work: "work"
};

const d2ClassBlocks = {
  product: { fill: "#D8F3DC", stroke: "#2D6A4F" },
  knowledge: { fill: "#FFF3B0", stroke: "#9A6700" },
  data: { fill: "#D7E8FF", stroke: "#2457A6" },
  system: { fill: "#E8DDFF", stroke: "#6741D9" },
  code: { fill: "#E9ECEF", stroke: "#495057" },
  business: { fill: "#FFE8CC", stroke: "#D9480F" },
  work: { fill: "#FFE3E3", stroke: "#C92A2A" }
};

const htmlLayerStyles = {
  Product: { background: "#D8F3DC", border: "#2D6A4F", text: "#123B2A" },
  Knowledge: { background: "#FFF3B0", border: "#9A6700", text: "#4D3300" },
  Data: { background: "#D7E8FF", border: "#2457A6", text: "#173B70" },
  System: { background: "#E8DDFF", border: "#6741D9", text: "#3B237F" },
  Code: { background: "#E9ECEF", border: "#495057", text: "#252A2E" },
  Business: { background: "#FFE8CC", border: "#D9480F", text: "#6E2407" },
  Work: { background: "#FFE3E3", border: "#C92A2A", text: "#761616" }
};

const htmlStatusStyles = {
  active: { borderStyle: "solid", opacity: 1 },
  planned: { borderStyle: "dotted", opacity: 0.92 },
  partial: { borderStyle: "dashed", opacity: 0.92 },
  deprecated: { borderStyle: "dotted", opacity: 0.62 },
  at_risk: { borderStyle: "dashed", opacity: 1 },
  unknown: { borderStyle: "dashed", opacity: 0.78 }
};

export function loadMapSource(filePath) {
  const text = readFileSync(filePath, "utf8");
  const data = YAML.parse(text);
  return { data, text };
}

export function validateMapSource(data) {
  const diagnostics = [];
  const schemaOk = validateSchema(data);

  if (!schemaOk) {
    for (const error of validateSchema.errors ?? []) {
      diagnostics.push(formatAjvError(error));
    }
  }

  if (!data || typeof data !== "object") {
    return { ok: false, diagnostics };
  }

  const nodeIds = new Set();
  const sourceIds = new Set();
  const childMapIds = new Set();

  for (const source of data.sources ?? []) {
    if (source?.id) {
      if (sourceIds.has(source.id)) {
        diagnostics.push(`source ${source.id} is duplicated`);
      }
      sourceIds.add(source.id);
    }
  }

  for (const childMap of data.child_maps ?? []) {
    if (childMap?.id) {
      if (childMapIds.has(childMap.id)) {
        diagnostics.push(`child_map ${childMap.id} is duplicated`);
      }
      childMapIds.add(childMap.id);
    }
  }

  for (const node of data.nodes ?? []) {
    if (!node?.id) {
      continue;
    }
    if (nodeIds.has(node.id)) {
      diagnostics.push(`node ${node.id} is duplicated`);
    }
    nodeIds.add(node.id);

    const allowedTypes = allowedLayerTypes.get(node.layer);
    if (allowedTypes && node.type && !allowedTypes.has(node.type)) {
      diagnostics.push(`node ${node.id} type ${node.type} is not allowed in layer ${node.layer}`);
    }

    for (const evidenceId of node.evidence ?? []) {
      if (!sourceIds.has(evidenceId)) {
        diagnostics.push(`node ${node.id} evidence ${evidenceId} does not match any source id`);
      }
    }

    if (node.child_map_ref && !childMapIds.has(node.child_map_ref)) {
      diagnostics.push(`node ${node.id} child_map_ref ${node.child_map_ref} does not match any child_maps id`);
    }
  }

  for (const relationship of data.relationships ?? []) {
    if (!relationship?.id) {
      continue;
    }
    if (relationship.from && !nodeIds.has(relationship.from)) {
      diagnostics.push(`relationship ${relationship.id} source ${relationship.from} does not match any node id`);
    }
    if (relationship.to && !nodeIds.has(relationship.to)) {
      diagnostics.push(`relationship ${relationship.id} target ${relationship.to} does not match any node id`);
    }
    for (const evidenceId of relationship.evidence ?? []) {
      if (!sourceIds.has(evidenceId)) {
        diagnostics.push(`relationship ${relationship.id} evidence ${evidenceId} does not match any source id`);
      }
    }
  }

  return {
    ok: diagnostics.length === 0,
    diagnostics
  };
}

export function validateFile(filePath) {
  const { data } = loadMapSource(filePath);
  const result = validateMapSource(data);
  return { filePath, data, ...result };
}

export function renderD2(mapSource) {
  const childMaps = new Map((mapSource.child_maps ?? []).map((child) => [child.id, child]));
  const lines = [
    `# Generated from ${mapSource.id}. Do not edit by hand.`,
    "direction: right",
    "classes: {"
  ];

  for (const [className, style] of Object.entries(d2ClassBlocks)) {
    lines.push(`  ${className}: {`);
    lines.push("    style: {");
    lines.push(`      fill: "${style.fill}"`);
    lines.push(`      stroke: "${style.stroke}"`);
    lines.push("    }");
    lines.push("  }");
  }

  lines.push("}");
  lines.push("");
  lines.push(`${d2Id(mapSource.id)}_title: ${d2Quote(mapSource.title)} {`);
  lines.push("  shape: text");
  lines.push("  near: top-center");
  lines.push("}");
  lines.push("");

  for (const node of mapSource.nodes) {
    const nodeId = d2Id(node.id);
    const className = classByLayer[node.layer] ?? "knowledge";
    const label = [node.label, `${node.layer} / ${node.type}`, `status: ${node.status}`].join("\\n");
    lines.push(`${nodeId}: ${d2Quote(label)} {`);
    lines.push(`  shape: ${shapeByType[node.type] ?? "rectangle"}`);
    lines.push(`  class: ${className}`);
    lines.push(`  tooltip: ${d2Quote(node.description ?? `${node.layer} ${node.type}`)}`);
    if (node.child_map_ref) {
      const childMap = childMaps.get(node.child_map_ref);
      if (childMap) {
        lines.push(`  link: ${d2Quote(childMap.path)}`);
      }
    }
    if (node.status === "at_risk" || node.status === "unknown") {
      lines.push("  style.stroke-dash: 4");
    }
    lines.push("}");
    lines.push("");
  }

  for (const relationship of mapSource.relationships) {
    const label = relationship.label || relationship.type;
    lines.push(`${d2Id(relationship.from)} -> ${d2Id(relationship.to)}: ${d2Quote(label)} {`);
    lines.push(`  tooltip: ${d2Quote(`${relationship.type}; status: ${relationship.status}`)}`);
    if (relationship.status === "at_risk" || relationship.status === "unknown") {
      lines.push("  style.stroke-dash: 4");
    }
    lines.push("}");
  }

  return `${lines.join("\n")}\n`;
}

export function renderMermaid(mapSource) {
  const lines = [
    `%% Generated from ${mapSource.id}. Do not edit by hand.`,
    "flowchart TD"
  ];

  for (const node of mapSource.nodes) {
    lines.push(`  ${mermaidId(node.id)}["${mermaidText(`${node.label}\\n${node.layer} / ${node.type}\\n${node.status}`)}"]`);
  }

  for (const relationship of mapSource.relationships) {
    const label = relationship.label || relationship.type;
    lines.push(`  ${mermaidId(relationship.from)} -->|"${mermaidText(label)}"| ${mermaidId(relationship.to)}`);
  }

  lines.push("  classDef product fill:#D8F3DC,stroke:#2D6A4F");
  lines.push("  classDef knowledge fill:#FFF3B0,stroke:#9A6700");
  lines.push("  classDef data fill:#D7E8FF,stroke:#2457A6");
  lines.push("  classDef system fill:#E8DDFF,stroke:#6741D9");
  lines.push("  classDef code fill:#E9ECEF,stroke:#495057");
  lines.push("  classDef business fill:#FFE8CC,stroke:#D9480F");
  lines.push("  classDef work fill:#FFE3E3,stroke:#C92A2A");

  for (const node of mapSource.nodes) {
    const className = classByLayer[node.layer] ?? "knowledge";
    lines.push(`  class ${mermaidId(node.id)} ${className}`);
  }

  return `${lines.join("\n")}\n`;
}

export function renderHtml(mapSource) {
  const rendererData = buildHtmlRendererData(mapSource);
  const cytoscapeSource = readFileSync(require.resolve("cytoscape/dist/cytoscape.min.js"), "utf8");
  const serializedData = escapeHtmlScriptJson(JSON.stringify(rendererData, null, 2));

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(mapSource.title)} - Interactive Map View</title>
  <style>
    :root {
      color-scheme: light;
      --page: #f7f8fa;
      --panel: #ffffff;
      --ink: #17202a;
      --muted: #5f6b7a;
      --line: #d5dae1;
      --accent: #0b7285;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background: var(--page);
      color: var(--ink);
      font: 14px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .map-shell {
      display: grid;
      grid-template-rows: auto 1fr;
      min-height: 100vh;
    }

    .map-body {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 360px;
      min-height: 0;
    }

    .map-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 20px;
      background: var(--panel);
      border-bottom: 1px solid var(--line);
    }

    .map-title {
      margin: 0;
      font-size: 18px;
      line-height: 1.2;
    }

    .map-meta {
      margin: 4px 0 0;
      color: var(--muted);
      font-size: 13px;
    }

    .map-counts {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;
      color: var(--muted);
      font-size: 12px;
    }

    .map-counts span {
      padding: 4px 8px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #fbfcfd;
      white-space: nowrap;
    }

    #system-map-graph {
      width: 100%;
      min-height: 620px;
      height: calc(100vh - 78px);
      background: #fbfcfd;
    }

    .map-detail-panel {
      height: calc(100vh - 78px);
      overflow: auto;
      padding: 18px;
      background: var(--panel);
      border-left: 1px solid var(--line);
    }

    .detail-eyebrow,
    .detail-meta,
    .detail-empty,
    .detail-source-meta {
      color: var(--muted);
      font-size: 12px;
    }

    .detail-title {
      margin: 4px 0 10px;
      font-size: 20px;
      line-height: 1.2;
    }

    .detail-description {
      margin: 0 0 14px;
    }

    .detail-section {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid var(--line);
    }

    .detail-section h3 {
      margin: 0 0 8px;
      font-size: 13px;
      text-transform: uppercase;
    }

    .detail-list {
      display: grid;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .detail-list li {
      padding: 8px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fbfcfd;
    }

    .detail-pill {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      margin: 0 6px 6px 0;
      padding: 3px 8px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #fbfcfd;
      font-size: 12px;
      font-weight: 650;
    }

    .detail-link {
      color: var(--accent);
      font-weight: 650;
      text-decoration-thickness: 1px;
    }

    .trace-controls {
      display: grid;
      gap: 8px;
      margin-top: 10px;
    }

    .trace-button {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fbfcfd;
      color: var(--ink);
      font: inherit;
      font-weight: 650;
      text-align: left;
      cursor: pointer;
    }

    .trace-button:hover,
    .trace-button:focus {
      border-color: var(--accent);
      outline: 2px solid rgba(11, 114, 133, 0.16);
    }

    .trace-path {
      margin-top: 8px;
      color: var(--muted);
      font-size: 12px;
    }

    @media (max-width: 900px) {
      .map-body {
        grid-template-columns: 1fr;
      }

      #system-map-graph,
      .map-detail-panel {
        height: auto;
        min-height: 420px;
      }

      .map-detail-panel {
        border-left: 0;
        border-top: 1px solid var(--line);
      }
    }
  </style>
</head>
<body>
  <!-- Generated from ${escapeHtml(mapSource.id)}. Do not edit by hand. -->
  <main class="map-shell" data-map-id="${escapeHtml(mapSource.id)}">
    <header class="map-header">
      <div>
        <h1 class="map-title">${escapeHtml(mapSource.title)}</h1>
        <p class="map-meta">${escapeHtml(mapSource.domain)} / ${escapeHtml(mapSource.kind)} / depth ${escapeHtml(mapSource.depth)}</p>
      </div>
      <div class="map-counts" aria-label="Map counts">
        <span>${rendererData.nodes.length} nodes</span>
        <span>${rendererData.relationships.length} relationships</span>
      </div>
    </header>
    <section class="map-body">
      <div id="system-map-graph" aria-label="Interactive system map graph"></div>
      <aside id="map-detail-panel" class="map-detail-panel" aria-live="polite">
        <p class="detail-eyebrow">Map Detail Panel</p>
        <h2 class="detail-title">Select a node</h2>
        <p class="detail-empty">Choose a mapped thing to inspect evidence quality, relationships, risks, unknowns, and generated child map navigation.</p>
      </aside>
    </section>
  </main>
  <script id="system-map-data" type="application/json">${serializedData}</script>
  <script>${cytoscapeSource}</script>
  <script>
    const mapData = JSON.parse(document.getElementById("system-map-data").textContent);
    mapData.nodesById = Object.fromEntries(mapData.nodes.map((node) => [node.id, node]));
    const cy = cytoscape({
      container: document.getElementById("system-map-graph"),
      elements: mapData.elements,
      wheelSensitivity: 0.22,
      layout: {
        name: "breadthfirst",
        directed: true,
        padding: 40,
        spacingFactor: 1.08
      },
      style: [
        {
          selector: "node",
          style: {
            "background-color": "data(backgroundColor)",
            "border-color": "data(borderColor)",
            "border-width": 2,
            "border-style": "data(borderStyle)",
            "color": "data(textColor)",
            "font-size": 12,
            "font-weight": 600,
            "label": "data(label)",
            "opacity": "data(opacity)",
            "shape": "round-rectangle",
            "text-halign": "center",
            "text-max-width": 128,
            "text-valign": "center",
            "text-wrap": "wrap",
            "width": 152,
            "height": 66
          }
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "line-color": "#7c8794",
            "line-style": "data(lineStyle)",
            "opacity": "data(opacity)",
            "target-arrow-color": "#7c8794",
            "target-arrow-shape": "triangle",
            "width": 2,
            "label": "data(label)",
            "font-size": 10,
            "text-background-color": "#fbfcfd",
            "text-background-opacity": 0.9,
            "text-background-padding": 3,
            "text-rotation": "autorotate"
          }
        },
        {
          selector: "node:selected",
          style: {
            "border-color": "#0b7285",
            "border-width": 4
          }
        },
        {
          selector: "edge:selected",
          style: {
            "line-color": "#0b7285",
            "target-arrow-color": "#0b7285",
            "width": 4
          }
        },
        {
          selector: ".trace-dim",
          style: {
            "opacity": 0.18
          }
        },
        {
          selector: "node.trace-highlight",
          style: {
            "border-color": "#c2410c",
            "border-width": 5,
            "opacity": 1
          }
        },
        {
          selector: "edge.trace-highlight",
          style: {
            "line-color": "#c2410c",
            "target-arrow-color": "#c2410c",
            "width": 5,
            "opacity": 1
          }
        }
      ]
    });

    const detailPanel = document.getElementById("map-detail-panel");
    mapData.relationshipsById = Object.fromEntries(mapData.relationships.map((relationship) => [relationship.id, relationship]));
    mapData.tracesById = Object.fromEntries(mapData.derivedTraces.map((trace) => [trace.id, trace]));
    renderEmptyDetails();

    cy.on("tap", "node", (event) => {
      const node = event.target;
      renderNodeDetails(node.id());
    });

    cy.on("tap", "edge", (event) => {
      const edge = event.target;
      renderRelationshipDetails(edge.id());
    });

    function renderEmptyDetails() {
      detailPanel.innerHTML = [
        '<p class="detail-eyebrow">Map Detail Panel</p>',
        '<h2 class="detail-title">Select a node or relationship</h2>',
        '<p class="detail-empty">Choose a mapped thing or connector to inspect evidence quality, relationship explanations, risks, unknowns, and generated child map navigation.</p>',
        renderTracePanel(null)
      ].join("");
      wireTraceButtons();
    }

    function renderNodeDetails(nodeId) {
      const node = mapData.nodesById[nodeId];
      if (!node) {
        return;
      }

      detailPanel.innerHTML = [
        '<p class="detail-eyebrow">Map Detail Panel</p>',
        '<h2 class="detail-title">' + escapeDetailHtml(node.label) + '</h2>',
        '<p class="detail-meta">' + escapeDetailHtml(node.layer) + ' / ' + escapeDetailHtml(node.type) + ' / ' + escapeDetailHtml(node.status) + '</p>',
        '<p class="detail-description">' + escapeDetailHtml(node.description || "No description provided.") + '</p>',
        renderDetailPills("Evidence quality", node.evidenceQualityLabels),
        renderSources(node.sources),
        renderRelationships("Incoming relationships", node.incomingRelationships, "fromLabel"),
        renderRelationships("Outgoing relationships", node.outgoingRelationships, "toLabel"),
        renderRelatedRisks(node.relatedRisksAndUnknowns),
        renderChildMap(node.childMap),
        renderTracePanel(null)
      ].join("");
      wireTraceButtons();
    }

    function renderRelationshipDetails(relationshipId) {
      const relationship = mapData.relationshipsById[relationshipId];
      if (!relationship) {
        return;
      }

      detailPanel.innerHTML = [
        '<p class="detail-eyebrow">Relationship Explanation</p>',
        '<h2 class="detail-title">' + escapeDetailHtml(relationship.fromLabel) + ' -> ' + escapeDetailHtml(relationship.toLabel) + '</h2>',
        '<p class="detail-meta">' + escapeDetailHtml(relationship.type) + ' / ' + escapeDetailHtml(relationship.label) + ' / ' + escapeDetailHtml(relationship.status) + '</p>',
        '<p class="detail-description">' + escapeDetailHtml(relationship.why) + '</p>',
        renderDetailPills("Evidence quality", relationship.evidenceQualityLabels),
        renderSources(relationship.sources),
        renderTracePanel(relationshipId)
      ].join("");
      wireTraceButtons();
    }

    function renderDetailPills(title, labels) {
      return '<section class="detail-section"><h3>' + title + '</h3>' +
        (labels.length > 0
          ? labels.map((label) => '<span class="detail-pill">' + escapeDetailHtml(label) + '</span>').join("")
          : '<p class="detail-empty">No evidence quality recorded.</p>') +
        '</section>';
    }

    function renderSources(sources) {
      return '<section class="detail-section"><h3>Evidence references</h3>' +
        renderList(sources, (source) => [
          '<strong>' + escapeDetailHtml(source.title) + '</strong>',
          '<div class="detail-source-meta">Readable evidence reference text: ' + escapeDetailHtml(source.type) + ' / ' + escapeDetailHtml(source.confidenceLabel) + '</div>',
          source.pathText ? '<div class="detail-source-meta">' + escapeDetailHtml(source.pathText) + '</div>' : ''
        ].join("")) +
        '</section>';
    }

    function renderRelationships(title, relationships, labelKey) {
      return '<section class="detail-section"><h3>' + title + '</h3>' +
        renderList(relationships, (relationship) => [
          '<strong>' + escapeDetailHtml(relationship[labelKey]) + '</strong>',
          '<div class="detail-source-meta">' + escapeDetailHtml(relationship.label) + ' / ' + escapeDetailHtml(relationship.type) + ' / ' + escapeDetailHtml(relationship.status) + '</div>',
          '<div>' + escapeDetailHtml(relationship.why) + '</div>'
        ].join("")) +
        '</section>';
    }

    function renderRelatedRisks(items) {
      return '<section class="detail-section"><h3>Related risks and unknowns</h3>' +
        renderList(items, (item) => [
          '<strong>' + escapeDetailHtml(item.label) + '</strong>',
          '<div class="detail-source-meta">' + escapeDetailHtml(item.type) + ' / ' + escapeDetailHtml(item.status) + '</div>',
          '<div>' + escapeDetailHtml(item.description) + '</div>'
        ].join("")) +
        '</section>';
    }

    function renderChildMap(childMap) {
      if (!childMap) {
        return "";
      }

      return '<section class="detail-section"><h3>Generated child map</h3>' +
        '<a class="detail-link" href="' + escapeDetailAttribute(childMap.generatedHtmlPath) + '">' + escapeDetailHtml(childMap.title) + '</a>' +
        '<div class="detail-source-meta">depth ' + escapeDetailHtml(childMap.depth) + '</div>' +
        '</section>';
    }

    function renderTracePanel(selectedRelationshipId) {
      const traces = mapData.derivedTraces || [];
      const matchingTraces = selectedRelationshipId
        ? traces.filter((trace) => trace.relationshipIds.includes(selectedRelationshipId))
        : traces;
      const buttons = matchingTraces.map((trace) => [
        '<button class="trace-button" type="button" data-trace-id="' + escapeDetailAttribute(trace.id) + '">',
        escapeDetailHtml(trace.title),
        '<div class="trace-path">' + escapeDetailHtml(trace.layerPath.join(" -> ")) + '</div>',
        '</button>'
      ].join("")).join("");

      return '<section id="trace-mode-panel" class="detail-section" data-trace-count="' + traces.length + '">' +
        '<h3>Trace Mode</h3>' +
        '<p class="detail-empty">Highlight a derived cross-layer path from existing relationships.</p>' +
        '<div class="trace-controls" aria-label="Trace controls">' +
        (buttons || '<p class="detail-empty">No derived traces include this relationship.</p>') +
        '</div>' +
        '</section>';
    }

    function wireTraceButtons() {
      for (const button of detailPanel.querySelectorAll("[data-trace-id]")) {
        button.addEventListener("click", () => highlightTrace(button.dataset.traceId));
      }
    }

    function highlightTrace(traceId) {
      const trace = mapData.tracesById[traceId];
      if (!trace) {
        return;
      }

      cy.elements().removeClass("trace-highlight trace-dim");
      cy.elements().addClass("trace-dim");
      let highlighted = cy.collection();
      for (const nodeId of trace.nodeIds) {
        highlighted = highlighted.union(cy.getElementById(nodeId));
      }
      for (const relationshipId of trace.relationshipIds) {
        highlighted = highlighted.union(cy.getElementById(relationshipId));
      }
      highlighted.removeClass("trace-dim").addClass("trace-highlight");

      const summary = document.createElement("p");
      summary.className = "trace-path";
      summary.textContent = trace.description;
      const panel = detailPanel.querySelector("#trace-mode-panel");
      panel?.querySelector(".trace-path[data-active-summary]")?.remove();
      summary.dataset.activeSummary = "true";
      panel?.append(summary);
    }

    function renderList(items, renderItem) {
      if (!items || items.length === 0) {
        return '<p class="detail-empty">None recorded.</p>';
      }

      return '<ul class="detail-list">' + items.map((item) => '<li>' + renderItem(item) + '</li>').join("") + '</ul>';
    }

    function escapeDetailHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    }

    function escapeDetailAttribute(value) {
      return escapeDetailHtml(value).replaceAll("'", "&#39;");
    }

    window.systemMapView = { mapData, cy, renderNodeDetails, renderRelationshipDetails, highlightTrace };
  </script>
</body>
</html>
`;
}

function buildHtmlRendererData(mapSource) {
  const sourcesById = new Map((mapSource.sources ?? []).map((source) => [source.id, {
    id: source.id,
    type: source.type,
    title: source.title,
    confidence: source.confidence,
    confidenceLabel: evidenceQualityLabel(source.confidence),
    pathText: source.path ? `Reference: ${source.path}` : ""
  }]));
  const childMapsById = new Map((mapSource.child_maps ?? []).map((childMap) => [childMap.id, {
    id: childMap.id,
    title: childMap.title,
    depth: childMap.depth,
    generatedHtmlPath: generatedChildHtmlPath(childMap.path)
  }]));
  const rawNodesById = new Map((mapSource.nodes ?? []).map((node) => [node.id, node]));
  const rawRelationships = mapSource.relationships ?? [];

  const nodes = (mapSource.nodes ?? []).map((node) => {
    const layerStyle = htmlLayerStyles[node.layer] ?? htmlLayerStyles.Knowledge;
    const statusStyle = htmlStatusStyles[node.status] ?? htmlStatusStyles.unknown;
    const sourceRefs = (node.evidence ?? []).map((sourceId) => sourcesById.get(sourceId)).filter(Boolean);
    const incomingRelationships = rawRelationships
      .filter((relationship) => relationship.to === node.id)
      .map((relationship) => summarizeRelationship(relationship, rawNodesById, sourcesById));
    const outgoingRelationships = rawRelationships
      .filter((relationship) => relationship.from === node.id)
      .map((relationship) => summarizeRelationship(relationship, rawNodesById, sourcesById));
    const relatedRisksAndUnknowns = [...incomingRelationships, ...outgoingRelationships]
      .map((relationship) => relationship.from === node.id ? relationship.to : relationship.from)
      .map((relatedNodeId) => rawNodesById.get(relatedNodeId))
      .filter((relatedNode) => relatedNode?.type === "Risk" || relatedNode?.type === "Unknown")
      .map((relatedNode) => ({
        id: relatedNode.id,
        label: relatedNode.label,
        type: relatedNode.type,
        status: relatedNode.status,
        description: relatedNode.description ?? ""
      }));

    return {
      id: node.id,
      label: node.label,
      layer: node.layer,
      type: node.type,
      status: node.status,
      description: node.description ?? "",
      evidence: node.evidence ?? [],
      evidenceQualityLabels: uniqueLabels(sourceRefs.map((source) => source.confidenceLabel)),
      sources: sourceRefs,
      childMapRef: node.child_map_ref ?? null,
      childMap: node.child_map_ref ? childMapsById.get(node.child_map_ref) ?? null : null,
      incomingRelationships,
      outgoingRelationships,
      relatedRisksAndUnknowns,
      classes: [classByLayer[node.layer] ?? "knowledge", `status-${node.status}`],
      style: {
        backgroundColor: layerStyle.background,
        borderColor: layerStyle.border,
        textColor: layerStyle.text,
        borderStyle: statusStyle.borderStyle,
        opacity: statusStyle.opacity
      }
    };
  });

  const relationships = (mapSource.relationships ?? []).map((relationship) => {
    const statusStyle = htmlStatusStyles[relationship.status] ?? htmlStatusStyles.unknown;
    const summary = summarizeRelationship(relationship, rawNodesById, sourcesById);
    return {
      ...summary,
      classes: [`relationship-${relationship.type}`, `status-${relationship.status}`],
      style: {
        lineStyle: statusStyle.borderStyle === "solid" ? "solid" : statusStyle.borderStyle,
        opacity: statusStyle.opacity
      }
    };
  });

  return {
    id: mapSource.id,
    title: mapSource.title,
    kind: mapSource.kind,
    domain: mapSource.domain,
    depth: mapSource.depth,
    summary: mapSource.summary ?? "",
    layers: mapSource.layers ?? [],
    sources: [...sourcesById.values()],
    childMaps: [...childMapsById.values()],
    derivedTraces: deriveCrossLayerTraces(mapSource, rawNodesById, rawRelationships),
    nodes,
    relationships,
    elements: [
      ...nodes.map((node) => ({
        group: "nodes",
        data: {
          id: node.id,
          label: `${node.label}\n${node.layer} / ${node.type}\n${node.status}`,
          layer: node.layer,
          type: node.type,
          status: node.status,
          description: node.description,
          evidence: node.evidence,
          childMapRef: node.childMapRef,
          backgroundColor: node.style.backgroundColor,
          borderColor: node.style.borderColor,
          textColor: node.style.textColor,
          borderStyle: node.style.borderStyle,
          opacity: node.style.opacity
        },
        classes: node.classes.join(" ")
      })),
      ...relationships.map((relationship) => ({
        group: "edges",
        data: {
          id: relationship.id,
          source: relationship.from,
          target: relationship.to,
          label: relationship.label,
          type: relationship.type,
          status: relationship.status,
          description: relationship.description,
          evidence: relationship.evidence,
          why: relationship.why,
          lineStyle: relationship.style.lineStyle,
          opacity: relationship.style.opacity
        },
        classes: relationship.classes.join(" ")
      }))
    ]
  };
}

function summarizeRelationship(relationship, nodesById, sourcesById) {
  const sourceRefs = (relationship.evidence ?? []).map((sourceId) => sourcesById.get(sourceId)).filter(Boolean);
  const fromLabel = nodesById.get(relationship.from)?.label ?? relationship.from;
  const toLabel = nodesById.get(relationship.to)?.label ?? relationship.to;
  const label = relationship.label || relationship.type;
  return {
    id: relationship.id,
    from: relationship.from,
    to: relationship.to,
    fromLabel,
    toLabel,
    type: relationship.type,
    label,
    status: relationship.status,
    description: relationship.description ?? "",
    evidence: relationship.evidence ?? [],
    evidenceQualityLabels: uniqueLabels(sourceRefs.map((source) => source.confidenceLabel)),
    sources: sourceRefs,
    why: relationship.description || `${fromLabel} ${label} ${toLabel}, so the map treats them as connected when following ${relationship.type} behavior.`
  };
}

function deriveCrossLayerTraces(mapSource, nodesById, relationships) {
  const productNodes = (mapSource.nodes ?? []).filter((node) => node.layer === "Product");
  return productNodes
    .map((productNode) => deriveTraceForProductNode(productNode, nodesById, relationships))
    .filter(Boolean);
}

function deriveTraceForProductNode(productNode, nodesById, relationships) {
  const targetPredicates = [
    (node) => node.layer === "Code",
    (node) => node.layer === "System",
    (node) => node.layer === "Data",
    (node) => node.layer === "Knowledge",
    (node) => node.type === "Risk" || node.type === "Unknown"
  ];
  const orderedNodeIds = [productNode.id];
  const orderedRelationshipIds = [];

  for (const predicate of targetPredicates) {
    const path = findNearestPath(productNode.id, nodesById, relationships, predicate);
    if (!path) {
      continue;
    }
    for (const relationshipId of path.relationshipIds) {
      if (!orderedRelationshipIds.includes(relationshipId)) {
        orderedRelationshipIds.push(relationshipId);
      }
    }
    for (const nodeId of path.nodeIds) {
      if (!orderedNodeIds.includes(nodeId)) {
        orderedNodeIds.push(nodeId);
      }
    }
  }

  if (orderedRelationshipIds.length === 0) {
    return null;
  }

  const layerPath = uniqueLabels(orderedNodeIds.map((nodeId) => nodesById.get(nodeId)?.layer).filter(Boolean));
  const riskLabels = orderedNodeIds
    .map((nodeId) => nodesById.get(nodeId))
    .filter((node) => node?.type === "Risk" || node?.type === "Unknown")
    .map((node) => node.label);

  return {
    id: `trace-${productNode.id}`,
    title: `${productNode.label} cross-layer trace`,
    anchorNodeId: productNode.id,
    nodeIds: orderedNodeIds,
    relationshipIds: orderedRelationshipIds,
    layerPath,
    description: riskLabels.length > 0
      ? `Follows ${productNode.label} through ${layerPath.join(", ")} and includes risk/unknown coverage: ${riskLabels.join(", ")}.`
      : `Follows ${productNode.label} through ${layerPath.join(", ")} using existing relationships.`
  };
}

function findNearestPath(startNodeId, nodesById, relationships, predicate) {
  const adjacency = new Map();
  for (const relationship of relationships) {
    if (!adjacency.has(relationship.from)) {
      adjacency.set(relationship.from, []);
    }
    if (!adjacency.has(relationship.to)) {
      adjacency.set(relationship.to, []);
    }
    adjacency.get(relationship.from).push({ nodeId: relationship.to, relationshipId: relationship.id });
    adjacency.get(relationship.to).push({ nodeId: relationship.from, relationshipId: relationship.id });
  }

  const queue = [{ nodeIds: [startNodeId], relationshipIds: [] }];
  const seen = new Set([startNodeId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const currentNodeId = path.nodeIds.at(-1);
    const currentNode = nodesById.get(currentNodeId);
    if (currentNodeId !== startNodeId && predicate(currentNode)) {
      return path;
    }

    for (const next of adjacency.get(currentNodeId) ?? []) {
      if (seen.has(next.nodeId)) {
        continue;
      }
      seen.add(next.nodeId);
      queue.push({
        nodeIds: [...path.nodeIds, next.nodeId],
        relationshipIds: [...path.relationshipIds, next.relationshipId]
      });
    }
  }

  return null;
}

function generatedChildHtmlPath(childPath) {
  return String(childPath).replace(/(?:\.map)?\.ya?ml$/i, ".html");
}

function evidenceQualityLabel(value) {
  if (value === "verified") {
    return "Verified";
  }
  if (value === "inferred") {
    return "Inferred";
  }
  return "Unknown";
}

function uniqueLabels(labels) {
  return [...new Set(labels)];
}

export function discoverExampleMaps() {
  const examplesDir = resolve("maps/examples");
  return readdirSync(examplesDir)
    .filter((name) => name.endsWith(".map.yaml"))
    .map((name) => join(examplesDir, name));
}

export function runPreflight() {
  const lines = [];
  lines.push("System Mapper preflight");
  lines.push(`platform: ${process.platform}`);
  lines.push(`node: ${process.version}`);

  const npmCheck = runCommand("npm", ["--version"]);
  lines.push(npmCheck.status === 0 ? `npm: ${npmCheck.stdout.trim()}` : "npm: missing");

  const depsOk = existsSync(resolve("node_modules/ajv")) && existsSync(resolve("node_modules/yaml"));
  lines.push(depsOk ? "schema runtime: ok (ajv, yaml installed)" : "schema runtime: missing (run npm install)");

  const d2Command = resolveD2Command();
  const d2Check = d2Command ? runCommand(d2Command, ["--version"]) : { status: 1, stdout: "", stderr: "" };
  if (d2Command && d2Check.status === 0) {
    lines.push(`d2: ${d2Check.stdout.trim() || d2Check.stderr.trim()}`);
    const smokeDir = mkdtempSync(join(tmpdir(), "system-map-preflight-"));
    const smokeD2 = join(smokeDir, "preflight-smoke.d2");
    const smokeSvg = join(smokeDir, "preflight-smoke.svg");
    writeFileSync(smokeD2, "x: System Mapper\nx -> y: smoke\ny: SVG\n", "utf8");
    const smoke = runCommand(d2Command, [smokeD2, smokeSvg]);
    lines.push(smoke.status === 0 ? `d2 svg smoke: ok (${smokeSvg})` : `d2 svg smoke: failed (${smoke.stderr.trim()})`);
  } else {
    lines.push("d2: missing");
    lines.push("Windows install: winget install Terrastruct.D2 or use the installer from https://d2lang.com/");
    lines.push("Linux/plumbob install: install the d2 CLI in the image or bootstrap script before render smoke checks run.");
  }

  return lines.join("\n");
}

function formatAjvError(error) {
  const path = error.instancePath || "/";
  const detail = error.params?.allowedValues ? ` (${error.params.allowedValues.join(", ")})` : "";
  return `${path} ${error.message}${detail}`;
}

function d2Id(id) {
  return id.replaceAll("-", "_");
}

function d2Quote(value) {
  return JSON.stringify(String(value));
}

function mermaidId(id) {
  return id.replace(/[^A-Za-z0-9_]/g, "_");
}

function mermaidText(value) {
  return String(value).replaceAll('"', "'").replaceAll("\n", "<br/>");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeHtmlScriptJson(value) {
  return String(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
}

function writeOutput(filePath, contents) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents, "utf8");
}

function runCommand(command, args) {
  const useShell = process.platform === "win32" && !existsSync(command);
  return spawnSync(command, args, { encoding: "utf8", shell: useShell });
}

function resolveD2Command() {
  const candidates = ["d2"];

  if (process.env.D2_BIN) {
    candidates.unshift(process.env.D2_BIN);
  }

  if (process.platform === "win32") {
    candidates.push("C:\\Program Files\\D2\\d2.exe");
    candidates.push("C:\\Program Files (x86)\\D2\\d2.exe");
  }

  for (const candidate of candidates) {
    if (candidate.includes("\\") && !existsSync(candidate)) {
      continue;
    }

    const result = runCommand(candidate, ["--version"]);
    if (result.status === 0) {
      return candidate;
    }
  }

  return null;
}

function printValidation(result) {
  if (result.ok) {
    console.log(`OK ${result.filePath}`);
    return;
  }

  console.error(`FAILED ${result.filePath}`);
  for (const diagnostic of result.diagnostics) {
    console.error(`- ${diagnostic}`);
  }
}

async function main(argv) {
  const [command, ...args] = argv;

  if (command === "validate") {
    const files = args.length > 0 ? args.map((arg) => resolve(arg)) : discoverExampleMaps();
    const results = files.map(validateFile);
    for (const result of results) {
      printValidation(result);
    }
    process.exit(results.every((result) => result.ok) ? 0 : 1);
  }

  if (command === "render-d2" || command === "render-mermaid" || command === "render-html") {
    const [inputPath, outputPath] = args;
    if (!inputPath || !outputPath) {
      console.error(`usage: system-map.mjs ${command} <input.map.yaml> <output>`);
      process.exit(2);
    }

    const result = validateFile(resolve(inputPath));
    if (!result.ok) {
      printValidation(result);
      process.exit(1);
    }

    const output = command === "render-d2"
      ? renderD2(result.data)
      : command === "render-mermaid"
        ? renderMermaid(result.data)
        : renderHtml(result.data);
    writeOutput(resolve(outputPath), output);
    console.log(`WROTE ${outputPath}`);
    return;
  }

  if (command === "render-svg") {
    const [inputPath, outputPath] = args;
    if (!inputPath || !outputPath) {
      console.error("usage: system-map.mjs render-svg <input.d2> <output.svg>");
      process.exit(2);
    }

    const d2Command = resolveD2Command();
    if (!d2Command) {
      console.error("D2 CLI is missing. Run npm run maps:preflight for install guidance.");
      process.exit(1);
    }

    mkdirSync(dirname(resolve(outputPath)), { recursive: true });
    const result = runCommand(d2Command, [resolve(inputPath), resolve(outputPath)]);
    if (result.status !== 0) {
      console.error(result.stderr.trim() || result.stdout.trim());
      process.exit(result.status ?? 1);
    }

    console.log(result.stdout.trim() || `WROTE ${outputPath}`);
    return;
  }

  if (command === "preflight") {
    console.log(runPreflight());
    return;
  }

  console.error("usage: system-map.mjs <validate|render-d2|render-mermaid|render-html|render-svg|preflight>");
  process.exit(2);
}

if (import.meta.url === `file://${process.argv[1].replaceAll("\\", "/")}` || process.argv[1]?.endsWith("system-map.mjs")) {
  main(process.argv.slice(2));
}
