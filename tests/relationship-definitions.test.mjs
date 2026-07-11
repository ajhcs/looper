import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  deriveDependencyDirection,
  getRelationshipDefinition,
  validateRelationship
} from "../scripts/relationship-definitions.mjs";
import { validateFile } from "../scripts/system-map.mjs";

describe("Controlled relationship definitions", () => {
  it("provides readable forward and inverse labels with universal dependency navigation", () => {
    const definition = getRelationshipDefinition("implements", ["system-map.relationships.v1"]);

    assert.equal(definition.forwardLabel, "implements");
    assert.equal(definition.inverseLabel, "implemented by");
    assert.deepEqual(deriveDependencyDirection({ from: "code", to: "surface" }, "code"), {
      group: "Depends On",
      relatedElementId: "surface"
    });
    assert.deepEqual(deriveDependencyDirection({ from: "code", to: "surface" }, "surface"), {
      group: "Depended On By",
      relatedElementId: "code"
    });
  });

  it("rejects unregistered types, invalid endpoint kinds, and mismatched inverse labels", () => {
    assert.match(
      validateRelationship({ relationshipType: "invents", sourceKind: "Code Area", targetKind: "Surface" }).join("\n"),
      /not registered/
    );
    assert.match(
      validateRelationship({ relationshipType: "implements", sourceKind: "Surface", targetKind: "Code Area" }, ["system-map.relationships.v1"]).join("\n"),
      /does not allow Surface -> Code Area/
    );
    assert.match(
      validateRelationship({ relationshipType: "risks", sourceKind: "Surface", targetKind: "Metric" }).join("\n"),
      /does not allow Surface -> Metric/
    );
    assert.match(
      validateRelationship({ relationshipType: "transforms", sourceKind: "Workflow", targetKind: "System Component" }, ["system-map.relationships.v1"]).join("\n"),
      /does not allow Workflow -> System Component/
    );
    assert.match(
      validateRelationship({ relationshipType: "uses", sourceKind: "Workflow", targetKind: "Concept", inverseLabel: "implemented by" }).join("\n"),
      /inverse label must be "is used by"/
    );
  });

  it("records explicit endpoint pairs rather than wildcard acceptance", () => {
    for (const relationshipType of ["contains", "uses", "flows_to", "derives_from", "satisfies", "implements", "verifies", "constrains", "protects", "risks", "depends_on", "feeds", "transforms", "exposes", "measures", "unknown"]) {
      const definition = getRelationshipDefinition(relationshipType, ["system-map.relationships.v1"]);
      assert.ok(definition);
      assert.equal(definition.endpointPairs.some((pair) => pair.sourceKind === "*" || pair.targetKind === "*"), false);
    }
  });

  it("keeps legacy map relationship types representable through the registered extension", () => {
    const result = validateFile(resolve("maps/examples/analytics.map.yaml"));

    assert.equal(result.ok, true, result.diagnostics.join("\n"));
  });

  it("validates envelope trace-reference kinds against the shared vocabulary", () => {
    const [traceLink] = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.valid.json"), "utf8")).trace_links;
    const diagnostics = validateRelationship({
      relationshipType: traceLink.relationship_type,
      sourceKind: traceLink.source_element_kind,
      targetKind: traceLink.target_element_kind,
      inverseLabel: traceLink.inverse_label
    });

    assert.deepEqual(diagnostics, []);
  });
});
