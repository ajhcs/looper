import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const definitionsPath = resolve("schemas/artifact-definitions.schema.json");
const envelopePath = resolve("schemas/artifact-envelope.schema.json");

function loadValidator() {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  ajv.addSchema(JSON.parse(readFileSync(definitionsPath, "utf8")));
  return ajv.compile(JSON.parse(readFileSync(envelopePath, "utf8")));
}

function formatDiagnostics(validate) {
  return (validate.errors ?? [])
    .map((error) => `${error.instancePath || "/"} ${error.message}`)
    .join("\n");
}

describe("Artifact Envelope schemas", () => {
  it("compiles the versioned shared definitions and envelope through AJV2020", () => {
    assert.doesNotThrow(() => loadValidator());
  });

  it("accepts the valid envelope fixture", () => {
    const validate = loadValidator();
    const fixture = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.valid.json"), "utf8"));

    assert.equal(validate(fixture), true, formatDiagnostics(validate));
  });

  it("rejects an incomplete envelope with actionable diagnostics", () => {
    const validate = loadValidator();
    const fixture = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.invalid-metadata.json"), "utf8"));

    assert.equal(validate(fixture), false);
    const diagnostics = formatDiagnostics(validate);
    assert.match(diagnostics, /must have required property 'artifact_state'/);
    assert.match(diagnostics, /must have required property 'source_model_revision'/);
    assert.match(diagnostics, /must have required property 'freshness'/);
  });

  it("rejects renderer-specific fields in the envelope", () => {
    const validate = loadValidator();
    const fixture = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.invalid-renderer-field.json"), "utf8"));

    assert.equal(validate(fixture), false);
    assert.match(formatDiagnostics(validate), /must NOT have additional properties/);
  });

  it("rejects a shared-definition version mismatch", () => {
    const validate = loadValidator();
    const fixture = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.invalid-definitions-version.json"), "utf8"));

    assert.equal(validate(fixture), false);
    assert.match(formatDiagnostics(validate), /shared_definitions_version/);
    assert.match(formatDiagnostics(validate), /must be equal to constant/);
  });

  it("rejects ambiguous numeric altitude zero", () => {
    const validate = loadValidator();
    const fixture = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.invalid-altitude-zero.json"), "utf8"));

    assert.equal(validate(fixture), false);
    assert.match(formatDiagnostics(validate), /altitude/);
  });

  it("accepts the distinct pipeline altitude values", () => {
    const validate = loadValidator();
    const fixture = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.valid.json"), "utf8"));

    for (const altitude of ["0A", "0B", "1", "2", "3", "4", "5"]) {
      const candidate = { ...fixture, altitude };
      assert.equal(validate(candidate), true, `${altitude}: ${formatDiagnostics(validate)}`);
    }
  });

  it("enforces state-specific acceptance metadata in the shared envelope", () => {
    const validate = loadValidator();
    const current = JSON.parse(readFileSync(resolve("schemas/fixtures/artifact-envelope.valid.json"), "utf8"));
    const accepted = {
      ...current,
      artifact_state: "Accepted Future State",
      acceptance: {
        accepting_authority: "Architecture Council",
        accepted_at: "2026-07-10T12:00:00Z",
        decision_or_evidence_ref: "decision-42"
      }
    };

    assert.equal(validate(accepted), true, formatDiagnostics(validate));
    assert.equal(validate({ ...current, artifact_state: "Accepted Future State" }), false);
    assert.match(formatDiagnostics(validate), /acceptance/);
    assert.equal(validate({ ...current, acceptance: accepted.acceptance }), false);
    assert.match(formatDiagnostics(validate), /acceptance/);
  });
});
