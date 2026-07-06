import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  loadMapSource,
  renderD2,
  renderHtml,
  renderMermaid,
  runPreflight,
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
      ["maps/examples/invalid/unresolved-drilldown.map.yaml", "node product-surface child_map_ref absent-child does not match any child_maps id"]
    ];

    for (const [filePath, expected] of cases) {
      const result = validateFile(resolve(filePath));
      assert.equal(result.ok, false, `${filePath} should fail`);
      assert.match(result.diagnostics.join("\n"), new RegExp(escapeRegExp(expected)));
    }
  });
});

describe("System Map renderers", () => {
  const analytics = loadMapSource(resolve("maps/examples/analytics.map.yaml")).data;

  it("generates D2 from typed source without making D2 canonical", () => {
    const d2 = renderD2(analytics);
    assert.match(d2, /# Generated from analytics-domain\. Do not edit by hand\./);
    assert.match(d2, /dashboard_surface -> tracked_interactions: "displays"/);
    assert.match(d2, /link: "\.\/analytics-events\.map\.yaml"/);
    assert.match(d2, /class: product/);
  });

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
    assert.match(html, /cytoscape\(\{/);
    assert.match(html, /"id": "dashboard-surface"/);
    assert.match(html, /"id": "dashboard-measures-interactions"/);
    assert.match(html, /"layer": "Product"/);
    assert.match(html, /"status": "at_risk"/);
    assert.doesNotMatch(html, /href="\.\.\/\.\.\/CONTEXT\.md"/);
    assert.doesNotMatch(html, /href="\.\.\/\.\.\/docs\//);
  });

  it("reports preflight state", () => {
    const preflight = runPreflight();
    assert.match(preflight, /System Mapper preflight/);
    assert.match(preflight, /node: v/);
    assert.match(preflight, /schema runtime:/);
    assert.match(preflight, /d2 svg smoke: ok|Windows install:/);
  });
});

describe("Generated artifacts", () => {
  it("keeps generated D2 marked as non-canonical when present", () => {
    const generated = resolve("maps/examples/generated/analytics.d2");
    try {
      const text = readFileSync(generated, "utf8");
      assert.match(text, /Do not edit by hand/);
    } catch (error) {
      assert.equal(error.code, "ENOENT");
    }
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
