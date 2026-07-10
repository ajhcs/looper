import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";

describe("System Mapper skill and docs", () => {
  const skill = readFileSync("skills/system-mapper/SKILL.md", "utf8");
  const docs = readFileSync("docs/system-mapper.md", "utf8");
  const readme = readFileSync("README.md", "utf8");
  const plugin = JSON.parse(readFileSync(".codex-plugin/plugin.json", "utf8"));
  const agent = readFileSync("skills/system-mapper/agents/openai.yaml", "utf8");
  const requiredBriefFields = [
    "Mapped Domains",
    "Interactive Map View",
    "Map Source",
    "Key Findings",
    "Important Traces",
    "Evidence Gaps",
    "Deepening Recommendations",
    "Next Action",
  ];

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

  it("routes routine System Mapper work to Luna and makes larger models exceptional", () => {
    for (const text of [skill, docs]) {
      assert.match(text, /Luna Medium/);
      assert.match(text, /Luna High/);
      assert.match(text, /Terra Medium only/);
      assert.match(text, /Sol (?:only for|is an) exceptional/);
      assert.match(text, /final synthesis (?:is|required|do)/i);
      assert.match(text, /Sol -> Terra -> Luna/);
    }

    assert.match(agent, /Luna-first workflow/);
    assert.match(agent, /Escalate beyond Luna only/);
  });

  it("docs require a Map Brief and describe Mermaid as an optional preview", () => {
    assert.match(docs, /Interactive Map View/);
    assert.match(docs, /Current-State Maps by default/);
    assert.match(docs, /npm run maps:render:html -- <map-source> <output\.html>/);
    assert.match(docs, /Track the canonical Map Source/);
    assert.match(docs, /curated generated HTML examples/);
    assert.match(docs, /disposable local artifacts/);
    assert.match(docs, /Optionally generate a rough Mermaid preview/);
    assert.match(docs, /Map Brief/);
  });

  it("System Mapper output requires the Map Brief handoff fields", () => {
    for (const field of requiredBriefFields) {
      assert.match(docs, new RegExp(`\`${field}\``));
      assert.match(skill, new RegExp(`\`${field}\``));
    }

    assert.match(skill, /openable Interactive Map View path/);
    assert.match(skill, /important traces/);
    assert.match(skill, /evidence gaps/);
    assert.match(skill, /Keep Deepening Recommendations in the Map Brief/);
    assert.match(docs, /Do not persist them into the Map Source/);
  });

  it("docs include an analytics fixture Map Brief example", () => {
    assert.match(docs, /Example brief for `maps\/examples\/analytics\.map\.yaml`/);
    assert.match(docs, /`Mapped Domains`: Analytics/);
    assert.match(docs, /`Interactive Map View`: `maps\/examples\/generated\/analytics\.html`/);
    assert.match(docs, /`Map Source`: `maps\/examples\/analytics\.map\.yaml`/);
    assert.match(docs, /Analytics Dashboard -> Collection Path -> Local Analytics Server -> Event Schema -> Reporting Store -> Analytics Dashboard/);
    assert.match(docs, /Security Coverage Unknowns/);
    assert.match(docs, /Analytics Event Pipeline/);
    assert.match(docs, /Verify the inferred implementation evidence/);
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
