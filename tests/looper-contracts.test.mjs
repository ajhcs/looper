import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import Ajv2020 from "ajv/dist/2020.js";
import YAML from "yaml";
import { loadContract, validateChildbeadFile, validateChildbeadSet } from "../scripts/looper-contracts.mjs";

const fixture = (name) => resolve(`tests/fixtures/${name}`);

describe("Childbead contract", () => {
  it("compiles the schema and accepts the golden chain", () => {
    const schema = JSON.parse(readFileSync(resolve("schemas/childbead.schema.json"), "utf8"));
    assert.doesNotThrow(() => new Ajv2020({ strict: true }).compile(schema));
    const result = validateChildbeadFile(fixture("wayfinder-chain/childbeads.valid.yaml"));
    assert.equal(result.ok, true, result.diagnostics.join("\n"));
    assert.deepEqual(result.frontier, ["auth-01"]);
  });

  it("accepts incomplete Wayfinder output only as not ready", () => {
    const result = validateChildbeadFile(fixture("childbeads.incomplete-wayfinder.yaml"));
    assert.equal(result.ok, true, result.diagnostics.join("\n"));
    const source = loadContract(fixture("childbeads.incomplete-wayfinder.yaml"));
    assert.equal(source.ready_for_looper, false);
    assert.match(source.risks_or_open_decisions.join("\n"), /decision ticket.+fog/i);
  });

  it("supports direct accepted specs without decision-map reconstruction", () => {
    const source = loadContract(fixture("childbeads.direct-spec.yaml"));
    assert.equal(validateChildbeadSet(source).ok, true);
    assert.equal(source.source_refs.some((ref) => /wayfinder|map/i.test(ref)), false);
  });

  it("exposes independent dependency-ready beads as the frontier", () => {
    const result = validateChildbeadFile(fixture("childbeads.independent-frontier.yaml"));
    assert.equal(result.ok, true, result.diagnostics.join("\n"));
    assert.deepEqual(result.frontier, ["parallel-a", "parallel-b"]);
  });

  it("represents wide refactors as expand, migrate, contract", () => {
    const source = loadContract(fixture("childbeads.wide-refactor.yaml"));
    assert.equal(validateChildbeadSet(source).ok, true);
    assert.deepEqual(source.childbeads.map(({ id }) => id), ["rename-expand", "rename-migrate", "rename-contract"]);
    assert.deepEqual(source.childbeads.map(({ depends_on }) => depends_on), [[], ["rename-expand"], ["rename-migrate"]]);
  });

  it("rejects malformed dependencies and requirement references", () => {
    const result = validateChildbeadFile(fixture("childbeads.invalid.yaml"));
    assert.equal(result.ok, false);
    assert.match(result.diagnostics.join("\n"), /unknown childbead missing-bead/);
    assert.match(result.diagnostics.join("\n"), /unknown requirement unknown-requirement/);
    assert.match(result.diagnostics.join("\n"), /uncovered: req-1/);
  });
});

describe("Wayfinder golden chain", () => {
  it("traces resolved decisions through one spec and into Looper", () => {
    const root = resolve("tests/fixtures/wayfinder-chain");
    const map = YAML.parse(readFileSync(resolve(root, "map.yaml"), "utf8"));
    const resolutions = YAML.parse(readFileSync(resolve(root, "resolutions.yaml"), "utf8"));
    const spec = YAML.parse(readFileSync(resolve(root, "spec.yaml"), "utf8"));
    const childbeads = YAML.parse(readFileSync(resolve(root, "childbeads.valid.yaml"), "utf8"));
    const checkpoint = YAML.parse(readFileSync(resolve(root, "looper-checkpoint.yaml"), "utf8"));

    assert.deepEqual(map.open_decision_tickets, []);
    assert.deepEqual(map.not_yet_specified, []);
    assert.deepEqual(new Set(resolutions.resolutions.map(({ decision_ticket_id }) => decision_ticket_id)), new Set(map.decisions_so_far.map(({ decision_ticket_id }) => decision_ticket_id)));
    assert.equal(spec.source_refs.includes("map.yaml"), true);
    assert.deepEqual(new Set(spec.requirements.map(({ id }) => id)), new Set(childbeads.requirements.map(({ id }) => id)));
    assert.deepEqual(spec.out_of_scope, map.out_of_scope);
    assert.equal(JSON.stringify(childbeads).includes("OAuth"), false, "out-of-scope work must not become a childbead");
    assert.equal(checkpoint.plan_revision, "childbeads.valid.yaml");
    assert.equal(checkpoint.current_slice, "auth-01");
    assert.deepEqual(checkpoint.frontier, validateChildbeadSet(childbeads).frontier);
  });
});

