import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import YAML from "yaml";

const rootSkill = readFileSync("SKILL.md", "utf8");
const looperSkill = readFileSync("skills/looper/SKILL.md", "utf8");
const beadwriter = readFileSync("skills/beadwriter/SKILL.md", "utf8");
const vocabulary = YAML.parse(readFileSync("references/compatibility-vocabulary.yaml", "utf8"));
const routing = YAML.parse(readFileSync("references/model-routing-policy.yaml", "utf8"));

describe("Compatibility vocabulary", () => {
  it("defines the stable planning-to-execution terms", () => {
    assert.deepEqual(Object.keys(vocabulary.terms), [
      "decision_map", "decision_ticket", "accepted_spec", "tracker_ticket", "childbead", "looper_slice"
    ]);
    assert.ok(vocabulary.terms.accepted_spec.accepted_aliases.includes("PRD"));
    assert.ok(vocabulary.terms.decision_map.accepted_aliases.includes("Wayfinder map"));
  });

  it("keeps upstream aliases at the ingestion boundary", () => {
    assert.match(beadwriter, /compatibility-vocabulary\.yaml/);
    assert.match(beadwriter, /Use Matt's `to-tickets` for lightweight tracker-native tracer bullets/);
    assert.match(beadwriter, /Do not decompose the same accepted spec with both workflows/);
  });
});

describe("Central routing policy", () => {
  it("is the only skill source of concrete model defaults", () => {
    assert.match(rootSkill, /references\/model-routing-policy\.yaml/);
    for (const skill of [looperSkill, beadwriter]) {
      assert.match(skill, /\.\.\/\.\.\/references\/model-routing-policy\.yaml/);
      assert.doesNotMatch(skill, /GPT-5\.6 Luna xhigh|GPT-5\.6 Sol low/);
    }
    assert.equal(routing.roles.implementor.model, "gpt-5.6-luna");
    assert.equal(routing.roles.reviewer.model, "gpt-5.6-sol");
    assert.match(routing.selection_rule, /ties retain xhigh/i);
  });

  it("keeps direct and plugin-native Looper behavior identical except resource paths", () => {
    assert.equal(rootSkill, looperSkill.replaceAll("../../references/", "references/"));
  });
});
