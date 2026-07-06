import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";

describe("System Mapper skill and docs", () => {
  const skill = readFileSync("skills/system-mapper/SKILL.md", "utf8");
  const docs = readFileSync("docs/system-mapper.md", "utf8");
  const readme = readFileSync("README.md", "utf8");
  const plugin = JSON.parse(readFileSync(".codex-plugin/plugin.json", "utf8"));
  const agent = readFileSync("skills/system-mapper/agents/openai.yaml", "utf8");

  it("prompt fixture requires current-state source validation and HTML renderer workflow", () => {
    assert.match(skill, /typed Map Source/);
    assert.match(skill, /Current-State Maps by default/);
    assert.match(skill, /npm run maps:preflight/);
    assert.match(skill, /npm run maps:validate -- <map-source>/);
    assert.match(skill, /npm run maps:render:html -- <map-source> <output\.html>/);
    assert.match(skill, /Interactive Map View/);
    assert.match(skill, /Generate Mermaid only as an optional rough compatibility preview/);
    assert.match(skill, /Create deeper maps only when progressive visual disclosure helps/);
  });

  it("docs require a Map Brief and describe Mermaid as an optional preview", () => {
    assert.match(docs, /Interactive Map View/);
    assert.match(docs, /Current-State Maps by default/);
    assert.match(docs, /npm run maps:render:html -- <map-source> <output\.html>/);
    assert.match(docs, /Optionally generate a rough Mermaid preview/);
    assert.match(docs, /Map Brief/);
  });

  it("README and plugin metadata expose System Mapper consistently", () => {
    assert.match(readme, /\$system-mapper/);
    assert.match(readme, /System Mapper/);
    assert.match(readme, /Interactive Map Views/);
    assert.match(readme, /Map Briefs/);
    assert.match(plugin.interface.longDescription, /System Mapper/);
    assert(plugin.interface.defaultPrompt.some((prompt) => prompt.includes("System Mapper")));
    assert.match(agent, /Interactive Map View/);
    assert.match(agent, /Map Brief/);
  });

  it("active docs and skill metadata do not present D2 or SVG as workflow outputs", () => {
    const activeText = [skill, docs, readme, agent, plugin.interface.longDescription].join("\n");

    assert.doesNotMatch(activeText, /\bD2\b/);
    assert.doesNotMatch(activeText, /\bSVG\b/);
    assert.doesNotMatch(activeText, /render:d2|render-d2|render:svg|render-svg/);
  });
});
