import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolve } from "node:path";
import {
  artifactRegistry,
  preflightArtifactRegistry,
  validateArtifactFile,
  validateArtifactSource
} from "../scripts/artifacts.mjs";

describe("Artifact Contract Registry", () => {
  it("registers the legacy System Understanding Map with routing metadata", () => {
    const entry = artifactRegistry.get("system-understanding.map");

    assert.ok(entry);
    assert.equal(entry.contractSchema, "schemas/system-map.schema.json");
    assert.equal(entry.expertSkill, "system-mapper");
    assert.equal(entry.visualizationModule, "scripts/system-map.mjs#renderHtml");
    assert.deepEqual(entry.relationshipExtensions, ["system-map.relationships.v1"]);
    assert.deepEqual(entry.generatedViews, ["mermaid", "html"]);
    assert.equal(typeof entry.semanticValidator, "function");
  });

  it("validates a legacy map through the public artifact facade", () => {
    const result = validateArtifactFile(resolve("maps/examples/minimal.map.yaml"));

    assert.equal(result.ok, true, result.diagnostics.join("\n"));
    assert.equal(result.artifactType, "system-understanding.map");
    assert.equal(result.compatibilityAdapter, "legacy-system-understanding-map.v1");
    assert.deepEqual(result.validationStages, ["shared-envelope", "artifact-contract", "semantic"]);
  });

  it("fails unknown artifact types explicitly", () => {
    const result = validateArtifactSource({ artifact_type: "unknown.artifact" });

    assert.equal(result.ok, false);
    assert.match(result.diagnostics.join("\n"), /Unknown artifact type "unknown\.artifact"/);
  });

  it("reports missing registry dependencies with actionable preflight errors", () => {
    const diagnostics = preflightArtifactRegistry(new Map([
      ["broken.artifact", {
        contractSchema: "schemas/missing.schema.json",
        expertSkill: "broken-skill",
        visualizationModule: "scripts/missing.mjs#render",
        relationshipExtensions: [],
        generatedViews: [],
        semanticValidator: null
      }]
    ]));

    assert.equal(diagnostics.ok, false);
    assert.match(diagnostics.errors.join("\n"), /broken\.artifact contract schema is missing/);
    assert.match(diagnostics.errors.join("\n"), /broken\.artifact semantic validator is missing/);
    assert.match(diagnostics.errors.join("\n"), /broken\.artifact visualization module is missing/);
    assert.match(diagnostics.errors.join("\n"), /broken\.artifact relationship vocabulary is missing/);
  });
});
