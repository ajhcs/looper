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

describe("Generated loop coordination contract", () => {
  it("requires event-driven waiting without status polling", () => {
    assert.match(rootSkill, /at most one event-driven wait outstanding/i);
    assert.match(rootSkill, /longest timeout allowed by the governing runtime/i);
    assert.match(rootSkill, /must not ask for status or poll worker state without new evidence/i);
  });

  it("makes unchanged timeouts coordination-silent", () => {
    assert.match(rootSkill, /wait expires with no new event or evidence, wait again directly/i);
    assert.match(rootSkill, /do not call `list_agents`, send a worker message, synthesize a status update/i);
  });

  it("requires proactive worker completion and explicit delegation authority", () => {
    assert.match(rootSkill, /Workers must report completion, failure, or escalation proactively/i);
    assert.match(rootSkill, /delegation_authority/);
    assert.match(rootSkill, /must not spawn or coordinate subagents otherwise/i);
  });

  it("gates redispatch on material new evidence", () => {
    assert.match(rootSkill, /Redispatch or follow up only when material new evidence changes the worker packet/i);
    assert.match(rootSkill, /timeout, elapsed time, unchanged status.+is not material evidence/i);
    assert.match(rootSkill, /material_evidence_since_last_dispatch/);
  });

  it("requires every delegated generated loop to carry the coordination rules", () => {
    assert.match(rootSkill, /Every generated loop that delegates work must include.+event-driven wait.+unchanged-timeout.+proactive completion.+nested-delegation.+evidence-gated redispatch/is);
  });

  it("preserves Sol Medium for substantive escalation without spending it on unchanged waits", () => {
    assert.match(rootSkill, /Sol Medium for difficult diagnosis, consequential errors, replanning, final synthesis, or UI design judgment/i);
    assert.match(rootSkill, /unchanged waits must not trigger a fresh reasoning pass/i);
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
