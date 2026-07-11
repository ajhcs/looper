import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scoreRun, selectWinner } from "../scripts/evaluate-routing.mjs";
import { loadContract } from "../scripts/looper-contracts.mjs";

const golden = loadContract("tests/fixtures/wayfinder-chain/childbeads.valid.yaml");

describe("Routing evaluation", () => {
  it("scores the golden childbead chain across every quality gate", () => {
    const score = scoreRun(golden, {
      ready_for_looper: true,
      requirement_ids: ["req-1", "req-2", "req-3"],
      forbidden_terms: ["OAuth"],
      minimum_frontier: 1
    });
    assert.equal(score.quality_pass, true, score.diagnostics.join("\n"));
    assert.equal(Object.values(score).filter((value) => value === false).length, 0);
  });

  it("selects High only after equal perfect quality and lower median cost", () => {
    const passing = { quality_pass: true };
    const results = [
      { effort: "high", scores: passing, verified_runtime: { model: "gpt-5.6-luna", effort: "high" }, usage: { total_tokens: 100 }, elapsed_ms: 1000 },
      { effort: "high", scores: passing, verified_runtime: { model: "gpt-5.6-luna", effort: "high" }, usage: { total_tokens: 120 }, elapsed_ms: 1100 },
      { effort: "xhigh", scores: passing, verified_runtime: { model: "gpt-5.6-luna", effort: "xhigh" }, usage: { total_tokens: 180 }, elapsed_ms: 1500 },
      { effort: "xhigh", scores: passing, verified_runtime: { model: "gpt-5.6-luna", effort: "xhigh" }, usage: { total_tokens: 200 }, elapsed_ms: 1600 }
    ];
    assert.equal(selectWinner(results).selected_effort, "high");
  });

  it("retains xhigh on a tie or failed High quality gate", () => {
    const tied = [
      { effort: "high", scores: { quality_pass: true }, verified_runtime: {}, usage: { total_tokens: 100 }, elapsed_ms: 1000 },
      { effort: "xhigh", scores: { quality_pass: true }, verified_runtime: {}, usage: { total_tokens: 100 }, elapsed_ms: 1000 }
    ];
    assert.equal(selectWinner(tied).selected_effort, "xhigh");
    tied[0].scores.quality_pass = false;
    assert.equal(selectWinner(tied).selected_effort, "xhigh");
  });
});

