import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const rootSkill = readFileSync("SKILL.md", "utf8");
const pluginSkill = readFileSync("skills/looper/SKILL.md", "utf8");
const beadwriter = readFileSync("skills/beadwriter/SKILL.md", "utf8");
const readme = readFileSync("README.md", "utf8");

describe("Looper implementation and review routing", () => {
  it("keeps direct and plugin-native Looper instructions identical", () => {
    assert.equal(rootSkill, pluginSkill);
  });

  it("routes implementation to Luna xhigh with max as an availability-only preference", () => {
    for (const text of [rootSkill, beadwriter, readme]) {
      assert.match(text, /Luna xhigh/i);
      assert.match(text, /max.+available|available.+max|runtime.+exposes it/is);
    }
  });

  it("routes review to Sol low and cycles findings back to Luna", () => {
    for (const text of [rootSkill, beadwriter, readme]) {
      assert.match(text, /Sol low/i);
      assert.match(text, /return.+Luna|returning.+Luna|return to Luna/is);
    }
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
