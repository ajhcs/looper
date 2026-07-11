import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const rootSkill = readFileSync("SKILL.md", "utf8");
const pluginSkill = readFileSync("skills/looper/SKILL.md", "utf8");
const beadwriter = readFileSync("skills/beadwriter/SKILL.md", "utf8");
const readme = readFileSync("README.md", "utf8");

describe("Looper implementation and review routing", () => {
  it("keeps direct and plugin-native Looper instructions identical", () => {
    assert.equal(rootSkill, pluginSkill.replaceAll("../../references/", "references/"));
  });

  it("routes runtime metadata through one shared policy", () => {
    for (const text of [rootSkill, beadwriter]) {
      assert.match(text, /references\/model-routing-policy\.yaml/i);
    }
    assert.match(readme, /shared routing policy/i);
  });

  it("preserves semantic implementation and review roles", () => {
    assert.match(rootSkill, /implementor role/i);
    assert.match(rootSkill, /reviewer role/i);
    assert.match(beadwriter, /implementor.+reviewer.+planner/is);
  });

  it("does not make exact helper skill names a blocking dependency", () => {
    for (const text of [rootSkill, beadwriter, readme]) {
      assert.match(text, /skill/i);
      assert.match(text, /fallback|falls back|continue directly|never hard blockers?/i);
    }
    assert.doesNotMatch(rootSkill, /Report a missing required skill/);
    assert.doesNotMatch(beadwriter, /matt-pocock-skills:implement/);
  });
});

describe("Beadwriter planning-artifact compatibility", () => {
  it("understands the Wayfinder to-spec boundary", () => {
    assert.match(beadwriter, /Wayfinder journey.+one decision map.+to-spec.+one accepted spec/is);
    assert.match(beadwriter, /closed child ticket's resolution comment/i);
    assert.match(beadwriter, /no decision tickets or in-scope fog remain/i);
    assert.match(beadwriter, /Split one map into multiple specs only when its destination explicitly defines independently ownable outcomes/i);
  });

  it("prefers vertical slices and handles wide refactors", () => {
    assert.match(beadwriter, /end-to-end tracer bullets/i);
    assert.match(beadwriter, /expand, bounded migrate batches, then contract/i);
  });
});
