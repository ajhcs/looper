import Ajv2020 from "ajv/dist/2020.js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import YAML from "yaml";
import { validateMapSource } from "./system-map.mjs";

const envelopeSchemaPath = resolve("schemas/artifact-envelope.schema.json");
const sharedDefinitionsPath = resolve("schemas/artifact-definitions.schema.json");

const legacySystemMapAdapter = {
  id: "legacy-system-understanding-map.v1",
  recognizes(source) {
    return source?.version === 1 && typeof source.id === "string" &&
      typeof source.title === "string" && Array.isArray(source.layers) &&
      Array.isArray(source.nodes) && Array.isArray(source.relationships);
  },
  adapt(source) {
    // This preserves the legacy source as-is. It intentionally does not infer
    // envelope fields such as artifact state, provenance, or confidence.
    return { source, envelope: null, compatibilityAdapter: this.id };
  }
};

export const artifactRegistry = new Map([
  ["system-understanding.map", {
    contractSchema: "schemas/system-map.schema.json",
    expertSkill: "system-mapper",
    visualizationModule: "scripts/system-map.mjs#renderHtml",
    relationshipExtensions: ["system-map.relationships.v1"],
    generatedViews: ["mermaid", "html"],
    compatibilityAdapter: legacySystemMapAdapter,
    semanticValidator: validateLegacySystemMap
  }]
]);

export function validateArtifactSource(source) {
  const artifactType = resolveArtifactType(source);
  const entry = artifactRegistry.get(artifactType);
  if (!entry) {
    return failed(artifactType, [`Unknown artifact type "${artifactType}". Register its contract before validating it.`]);
  }

  const adaptation = entry.compatibilityAdapter?.recognizes(source)
    ? entry.compatibilityAdapter.adapt(source)
    : { source, envelope: source, compatibilityAdapter: null };
  const diagnostics = [];

  // The adapter makes the legacy exception explicit: legacy map sources have
  // no envelope and are not silently reinterpreted as one.
  if (adaptation.envelope) {
    diagnostics.push(...validateSharedEnvelope(adaptation.envelope));
  }

  diagnostics.push(...validateContract(entry, adaptation.source));
  diagnostics.push(...normaliseValidatorResult(entry.semanticValidator(adaptation.source)));

  return {
    ok: diagnostics.length === 0,
    diagnostics: unique(diagnostics),
    artifactType,
    compatibilityAdapter: adaptation.compatibilityAdapter,
    validationStages: ["shared-envelope", "artifact-contract", "semantic"]
  };
}

export function validateArtifactFile(filePath) {
  const text = readFileSync(filePath, "utf8");
  const source = YAML.parse(text);
  return { filePath, ...validateArtifactSource(source) };
}

export function preflightArtifactRegistry(registry = artifactRegistry) {
  const errors = [];
  if (!existsSync(envelopeSchemaPath)) {
    errors.push("shared envelope schema is missing: schemas/artifact-envelope.schema.json");
  }
  if (!existsSync(sharedDefinitionsPath)) {
    errors.push("shared definitions schema is missing: schemas/artifact-definitions.schema.json");
  }
  for (const [artifactType, entry] of registry) {
    if (!entry?.contractSchema || !existsSync(resolve(entry.contractSchema))) {
      errors.push(`${artifactType} contract schema is missing: ${entry?.contractSchema ?? "(not configured)"}`);
    }
    if (typeof entry?.semanticValidator !== "function") {
      errors.push(`${artifactType} semantic validator is missing`);
    }
    const modulePath = entry?.visualizationModule?.split("#")[0];
    if (!modulePath || !existsSync(resolve(modulePath))) {
      errors.push(`${artifactType} visualization module is missing: ${entry?.visualizationModule ?? "(not configured)"}`);
    }
    if (!entry?.expertSkill) {
      errors.push(`${artifactType} expert skill is missing`);
    }
    if (!Array.isArray(entry?.relationshipExtensions) || entry.relationshipExtensions.length === 0 ||
      entry.relationshipExtensions.some((vocabulary) => typeof vocabulary !== "string" || vocabulary.length === 0)) {
      errors.push(`${artifactType} relationship vocabulary is missing or invalid`);
    }
    if (!Array.isArray(entry?.generatedViews)) {
      errors.push(`${artifactType} generated views must be an array`);
    }
  }
  return { ok: errors.length === 0, errors };
}

export function runArtifactPreflight() {
  const result = preflightArtifactRegistry();
  const lines = ["Artifact registry preflight", `registry: ${result.ok ? "ok" : "failed"}`];
  lines.push(...result.errors.map((error) => `- ${error}`));
  return lines.join("\n");
}

function resolveArtifactType(source) {
  if (typeof source?.artifact_type === "string") {
    return source.artifact_type;
  }
  if (legacySystemMapAdapter.recognizes(source)) {
    return "system-understanding.map";
  }
  return "(missing artifact_type)";
}

function validateSharedEnvelope(envelope) {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  ajv.addSchema(JSON.parse(readFileSync(sharedDefinitionsPath, "utf8")));
  const validate = ajv.compile(JSON.parse(readFileSync(envelopeSchemaPath, "utf8")));
  if (validate(envelope)) {
    return [];
  }
  return (validate.errors ?? []).map(formatAjvError);
}

function validateContract(entry, source) {
  const schemaPath = resolve(entry.contractSchema);
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const validate = ajv.compile(JSON.parse(readFileSync(schemaPath, "utf8")));
  if (validate(source)) {
    return [];
  }
  return (validate.errors ?? []).map(formatAjvError);
}

function validateLegacySystemMap(source) {
  return validateMapSource(source);
}

function normaliseValidatorResult(result) {
  return result?.diagnostics ?? [];
}

function formatAjvError(error) {
  const path = error.instancePath || "/";
  const detail = error.params?.allowedValues ? ` (${error.params.allowedValues.join(", ")})` : "";
  return `${path} ${error.message}${detail}`;
}

function failed(artifactType, diagnostics) {
  return {
    ok: false,
    diagnostics,
    artifactType,
    compatibilityAdapter: null,
    validationStages: ["shared-envelope", "artifact-contract", "semantic"]
  };
}

function unique(values) {
  return [...new Set(values)];
}

function printValidation(result) {
  if (result.ok) {
    console.log(`OK ${result.filePath} (${result.artifactType})`);
    return;
  }
  console.error(`FAILED ${result.filePath}`);
  for (const diagnostic of result.diagnostics) {
    console.error(`- ${diagnostic}`);
  }
}

function main(argv) {
  const [command, ...args] = argv;
  if (command === "validate") {
    if (args.length === 0) {
      console.error("usage: artifacts.mjs validate <artifact-file> [...artifact-file]");
      process.exit(2);
    }
    const results = args.map((filePath) => validateArtifactFile(resolve(filePath)));
    results.forEach(printValidation);
    process.exit(results.every((result) => result.ok) ? 0 : 1);
  }
  if (command === "preflight") {
    const result = preflightArtifactRegistry();
    console.log(runArtifactPreflight());
    process.exit(result.ok ? 0 : 1);
  }
  console.error("usage: artifacts.mjs <validate|preflight>");
  process.exit(2);
}

if (import.meta.url === `file://${process.argv[1]?.replaceAll("\\", "/")}` || process.argv[1]?.endsWith("artifacts.mjs")) {
  main(process.argv.slice(2));
}
