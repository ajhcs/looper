import Ajv2020 from "ajv/dist/2020.js";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const schemaPath = resolve(root, "schemas/childbead.schema.json");
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateSchema = ajv.compile(schema);

export function loadContract(filePath) {
  const text = readFileSync(filePath, "utf8");
  return extname(filePath).toLowerCase() === ".json" ? JSON.parse(text) : YAML.parse(text);
}

export function validateChildbeadSet(source) {
  const diagnostics = [];
  if (!validateSchema(source)) {
    diagnostics.push(...(validateSchema.errors ?? []).map(formatAjvError));
    return { ok: false, diagnostics, frontier: [] };
  }

  const requirementIds = new Set(source.requirements.map(({ id }) => id));
  if (source.ready_for_looper && source.requirements.length === 0) diagnostics.push("ready_for_looper requires at least one requirement");
  if (requirementIds.size !== source.requirements.length) diagnostics.push("requirement ids must be unique");
  const beadIds = new Set();
  for (const bead of source.childbeads) {
    if (new Set(bead.depends_on).size !== bead.depends_on.length) diagnostics.push(`${bead.id} dependencies must be unique`);
    if (new Set(bead.requirement_refs).size !== bead.requirement_refs.length) diagnostics.push(`${bead.id} requirement references must be unique`);
    if (beadIds.has(bead.id)) diagnostics.push(`duplicate childbead id: ${bead.id}`);
    beadIds.add(bead.id);
  }
  for (const bead of source.childbeads) {
    for (const dependency of bead.depends_on) {
      if (!beadIds.has(dependency)) diagnostics.push(`${bead.id} depends on unknown childbead ${dependency}`);
      if (dependency === bead.id) diagnostics.push(`${bead.id} must not depend on itself`);
    }
    for (const requirement of bead.requirement_refs) {
      if (!requirementIds.has(requirement)) diagnostics.push(`${bead.id} references unknown requirement ${requirement}`);
    }
  }

  diagnostics.push(...findDependencyCycles(source.childbeads));
  const covered = new Set(source.childbeads.flatMap(({ requirement_refs }) => requirement_refs));
  const uncovered = [...requirementIds].filter((id) => !covered.has(id));
  if (source.ready_for_looper && uncovered.length > 0) {
    diagnostics.push(`ready_for_looper requires complete coverage; uncovered: ${uncovered.join(", ")}`);
  }
  if (!source.ready_for_looper && (source.risks_or_open_decisions?.length ?? 0) === 0) {
    diagnostics.push("not-ready childbead sets must name a risk or open decision");
  }

  return {
    ok: diagnostics.length === 0,
    diagnostics,
    frontier: source.childbeads.filter(({ depends_on }) => depends_on.length === 0).map(({ id }) => id),
    uncoveredRequirements: uncovered
  };
}

export function validateChildbeadFile(filePath) {
  return { filePath, ...validateChildbeadSet(loadContract(filePath)) };
}

function findDependencyCycles(childbeads) {
  const dependencies = new Map(childbeads.map(({ id, depends_on }) => [id, depends_on]));
  const visiting = new Set();
  const visited = new Set();
  const cycles = new Set();
  function visit(id, path) {
    if (visiting.has(id)) {
      cycles.add([...path.slice(path.indexOf(id)), id].join(" -> "));
      return;
    }
    if (visited.has(id) || !dependencies.has(id)) return;
    visiting.add(id);
    for (const dependency of dependencies.get(id)) visit(dependency, [...path, id]);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of dependencies.keys()) visit(id, []);
  return [...cycles].map((cycle) => `dependency cycle: ${cycle}`);
}

function formatAjvError(error) {
  return `${error.instancePath || "/"} ${error.message}`;
}

function main(args) {
  if (args[0] !== "validate" || args.length < 2) {
    console.error("usage: looper-contracts.mjs validate <childbead-file> [...childbead-file]");
    process.exit(2);
  }
  const results = args.slice(1).map((filePath) => validateChildbeadFile(resolve(filePath)));
  for (const result of results) {
    console.log(`${result.ok ? "OK" : "FAILED"} ${result.filePath}`);
    result.diagnostics.forEach((diagnostic) => console.log(`- ${diagnostic}`));
  }
  process.exit(results.every(({ ok }) => ok) ? 0 : 1);
}

if (import.meta.url === `file://${process.argv[1]?.replaceAll("\\", "/")}` || process.argv[1]?.endsWith("looper-contracts.mjs")) {
  main(process.argv.slice(2));
}
