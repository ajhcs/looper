import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateArtifactState } from "../scripts/artifacts.mjs";

function fixture(name) {
  return JSON.parse(readFileSync(resolve(`schemas/fixtures/${name}`), "utf8"));
}

function diagnostics(result) {
  return result.diagnostics.join("\n");
}

describe("Artifact State authority", () => {
  it("accepts evidence-backed Current State without human acceptance", () => {
    const result = validateArtifactState(fixture("artifact-state.current.valid.json"));

    assert.deepEqual(result.diagnostics, []);
    assert.deepEqual(result.reviewGates, []);
  });

  it("keeps Candidate Future State explicitly proposed and rejects acceptance metadata", () => {
    const valid = validateArtifactState(fixture("artifact-state.candidate.valid.json"));
    const invalid = validateArtifactState(fixture("artifact-state.candidate.invalid-acceptance.json"));

    assert.deepEqual(valid.diagnostics, []);
    assert.match(diagnostics(invalid), /Candidate Future State must not include acceptance metadata/);
  });

  it("requires explicit human authority, UTC time, and decision or evidence reference for Accepted Future State", () => {
    const invalid = validateArtifactState(fixture("artifact-state.accepted.invalid-acceptance.json"));
    const valid = validateArtifactState(fixture("artifact-state.accepted.valid.json"));

    assert.match(diagnostics(invalid), /accepting authority/);
    assert.match(diagnostics(invalid), /UTC acceptance time/);
    assert.match(diagnostics(invalid), /decision or evidence reference/);
    assert.deepEqual(valid.diagnostics, []);
  });

  it("rejects mixed Current and accepted future-state meaning", () => {
    const result = validateArtifactState(fixture("artifact-state.current.invalid-acceptance.json"));

    assert.match(diagnostics(result), /Current State must not include acceptance metadata/);
  });

  it("preserves unresolved credible Current State conflicts behind a human review gate", () => {
    const result = validateArtifactState(fixture("artifact-state.current.unresolved-conflict.json"));

    assert.deepEqual(result.diagnostics, []);
    assert.deepEqual(result.reviewGates, [{
      code: "current-state-conflict",
      message: "Credible Current State evidence conflicts and requires human adjudication.",
      conflictIds: ["ingestion-mode-conflict"]
    }]);
  });
});
