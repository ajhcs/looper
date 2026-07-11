import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  loadMapSource,
  renderHtml,
  renderMermaid,
  runPreflight,
  validateMapSource,
  validateFile
} from "../scripts/system-map.mjs";

describe("System Map Source validation", () => {
  it("accepts valid fixtures", () => {
    for (const filePath of [
      "maps/examples/minimal.map.yaml",
      "maps/examples/analytics.map.yaml"
    ]) {
      const result = validateFile(resolve(filePath));
      assert.equal(result.ok, true, result.diagnostics.join("\n"));
    }
  });

  it("rejects invalid fixtures with actionable diagnostics", () => {
    const cases = [
      ["maps/examples/invalid/unknown-node-type.map.yaml", "must be equal to one of the allowed values"],
      ["maps/examples/invalid/unknown-relationship-type.map.yaml", "must be equal to one of the allowed values"],
      ["maps/examples/invalid/missing-edge-endpoint.map.yaml", "relationship missing-target target absent-node does not match any node id"],
      ["maps/examples/invalid/invalid-layer-type.map.yaml", "node product-code type Code Area is not allowed in layer Product"],
      ["maps/examples/invalid/invalid-evidence-status.map.yaml", "must be equal to one of the allowed values"],
      ["maps/examples/invalid/invalid-subtype.map.yaml", "must be object"],
      ["maps/examples/invalid/unresolved-drilldown.map.yaml", "node product-surface child_map_ref absent-child does not match any child_maps id"],
      ["maps/examples/invalid/duplicate-relationship-id.map.yaml", "relationship duplicated-edge is duplicated"],
      ["maps/examples/invalid/non-map-child-path.map.yaml", "child_map source-doc path must point to a local map YAML file"]
    ];

    for (const [filePath, expected] of cases) {
      const result = validateFile(resolve(filePath));
      assert.equal(result.ok, false, `${filePath} should fail`);
      assert.match(result.diagnostics.join("\n"), new RegExp(escapeRegExp(expected)));
    }
  });

  it("rejects legacy relationship endpoint pairs outside their controlled definition", () => {
    const fixture = loadMapSource(resolve("maps/examples/minimal.map.yaml")).data;
    fixture.relationships[0] = {
      ...fixture.relationships[0],
      from: "user-surface",
      to: "app-code"
    };

    const result = validateMapSource(fixture);
    assert.equal(result.ok, false);
    assert.match(result.diagnostics.join("\n"), /implements does not allow Surface -> Code Area/);
  });
});

describe("System Map renderers", () => {
  const analytics = loadMapSource(resolve("maps/examples/analytics.map.yaml")).data;

  it("generates readable Mermaid compatibility output", () => {
    const mermaid = renderMermaid(analytics);
    assert.match(mermaid, /^flowchart TD/m);
    assert.match(mermaid, /dashboard_surface -->\|"displays"\| tracked_interactions/);
    assert.doesNotMatch(mermaid, /tooltip:/);
    assert.doesNotMatch(mermaid, /shape:/);
  });

  it("generates a self-contained Cytoscape HTML view from typed source", () => {
    const html = renderHtml(analytics);
    assert.match(html, /Generated from analytics-domain\. Do not edit by hand\./);
    assert.match(html, /<script id="system-map-data" type="application\/json">/);
    assert.match(html, /<div id="system-map-graph"/);
    assert.match(html, /<aside id="map-detail-panel"/);
    assert.match(html, /cytoscape\(\{/);
    assert.match(html, /renderNodeDetails\(node\.id\(\)\)/);
    assert.match(html, /"id": "dashboard-surface"/);
    assert.match(html, /"id": "dashboard-measures-interactions"/);
    assert.match(html, /"layer": "Product"/);
    assert.match(html, /"status": "at_risk"/);
    assert.doesNotMatch(html, /href="\.\.\/\.\.\/CONTEXT\.md"/);
    assert.doesNotMatch(html, /href="\.\.\/\.\.\/docs\//);
  });

  it("adds operational node detail data without exposing repository file anchors", () => {
    const html = renderHtml(analytics);
    assert.match(html, /Map Detail Panel/);
    assert.match(html, /Evidence quality/);
    assert.match(html, /Verified/);
    assert.match(html, /Inferred/);
    assert.match(html, /Looper context language/);
    assert.match(html, /Generic analytics implementation inference/);
    assert.match(html, /Readable evidence reference text/);
    assert.doesNotMatch(html, /href="[^"]*(?:CONTEXT\.md|docs\/adr|\.map\.yaml)"/);
  });

  it("adds relationship summaries, related risks and unknowns, and generated child map links", () => {
    const html = renderHtml(analytics);
    const rendererData = extractRendererData(html);
    const dashboard = rendererData.nodes.find((node) => node.id === "dashboard-surface");
    const collection = rendererData.nodes.find((node) => node.id === "collection-path");
    const outgoing = dashboard.outgoingRelationships.find((relationship) => relationship.id === "dashboard-uses-collection");
    const incoming = collection.incomingRelationships.find((relationship) => relationship.id === "dashboard-uses-collection");
    assert.match(html, /Depended On By/);
    assert.match(html, /Depends On/);
    assert.match(html, /Related risks and unknowns/);
    assert.match(html, /Data Quality Coverage/);
    assert.match(html, /Security Coverage Unknowns/);
    assert.match(html, /"generatedHtmlPath": "\.\/analytics-events\.html"/);
    assert.match(html, /href="' \+ escapeDetailAttribute\(childMap\.generatedHtmlPath\)/);
    assert.doesNotMatch(html, /href="\.\/analytics-events\.map\.yaml"/);
    assert.doesNotMatch(html, /"generatedHtmlPath": "[^"]*\.map\.ya?ml"/);
    assert.doesNotMatch(html, /"generatedHtmlPath": "[^"]*docs\//);
    assert.doesNotMatch(html, /"generatedHtmlPath": "(?:https?:|javascript:|\/\/)/);
    assert.equal(outgoing.directionalLabel, "uses");
    assert.deepEqual(outgoing.dependencyDirection, { group: "Depends On", relatedElementId: "collection-path" });
    assert.equal(incoming.directionalLabel, "is used by");
    assert.deepEqual(incoming.dependencyDirection, { group: "Depended On By", relatedElementId: "dashboard-surface" });
  });

  it("adds relationship explanation UI hooks and inspectable edge data", () => {
    const html = renderHtml(analytics);
    const rendererData = extractRendererData(html);
    const relationship = rendererData.relationships.find((item) => item.id === "dashboard-measures-interactions");
    const edge = rendererData.elements.find((item) => item.group === "edges" && item.data.id === "dashboard-measures-interactions");

    assert.match(html, /Relationship Explanation/);
    assert.match(html, /renderRelationshipDetails\(edge\.id\(\)\)/);
    assert.match(html, /window\.systemMapView = \{ mapData, cy, renderNodeDetails, renderRelationshipDetails, highlightTrace \}/);
    assert.equal(relationship.type, "measures");
    assert.equal(relationship.label, "displays");
    assert.equal(relationship.status, "active");
    assert.deepEqual(relationship.evidenceQualityLabels, ["Inferred"]);
    assert.match(relationship.why, /Analytics Dashboard displays Tracked Interactions/);
    assert.equal(edge.data.why, relationship.why);
  });

  it("adds trace controls and highlighted path data derived from existing relationships", () => {
    const html = renderHtml(analytics);
    const rendererData = extractRendererData(html);
    const trace = rendererData.derivedTraces.find((item) => item.id === "trace-dashboard-surface");

    assert.match(html, /id="trace-mode-panel"/);
    assert.match(html, /class="trace-controls"/);
    assert.match(html, /function highlightTrace\(traceId\)/);
    assert.match(html, /trace-highlight/);
    assert.ok(trace, "expected a derived Dashboard trace");
    assert.deepEqual(trace.layerPath, ["Product", "System", "Code", "Data", "Knowledge"]);
    assert.deepEqual(
      trace.relationshipIds,
      [
        "dashboard-uses-collection",
        "collection-uses-server",
        "code-implements-server",
        "store-feeds-dashboard",
        "dashboard-measures-interactions",
        "data-quality-risks-metrics"
      ]
    );
    assert.ok(trace.nodeIds.includes("analytics-code"));
    assert.ok(trace.nodeIds.includes("data-quality-risk"));
    assert.match(trace.description, /Data Quality Coverage/);
  });

  it("reports preflight state", () => {
    const preflight = runPreflight();
    assert.match(preflight, /System Mapper preflight/);
    assert.match(preflight, /node: v/);
    assert.match(preflight, /schema: ok/);
    assert.match(preflight, /schema runtime:/);
    assert.match(preflight, /html renderer:/);
  });
});

describe("Map Source schema", () => {
  it("does not include renderer-specific Cytoscape fields", () => {
    const schemaText = readFileSync(resolve("schemas/system-map.schema.json"), "utf8");
    assert.doesNotMatch(schemaText, /cytoscape/i);
    assert.doesNotMatch(schemaText, /position/i);
    assert.doesNotMatch(schemaText, /layout/i);
    assert.doesNotMatch(schemaText, /renderer/i);
  });
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractRendererData(html) {
  const match = html.match(/<script id="system-map-data" type="application\/json">(?<json>[\s\S]*?)<\/script>/);
  assert.ok(match?.groups?.json, "expected embedded renderer data");
  return JSON.parse(match.groups.json);
}
