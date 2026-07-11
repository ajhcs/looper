import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { validateChildbeadSet } from "./looper-contracts.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const evalDir = resolve(root, "evals/wayfinder-routing");
const scratchDir = resolve(root, ".scratch/routing-eval");
const casesPath = resolve(evalDir, "cases.yaml");
const schemaPath = resolve(root, "schemas/childbead.schema.json");
const skillPath = resolve(root, "skills/beadwriter/SKILL.md");
const vocabularyPath = resolve(root, "references/compatibility-vocabulary.yaml");
const efforts = ["high", "xhigh"];
const repetitions = 2;

export function scoreRun(output, expected) {
  const validation = validateChildbeadSet(output);
  const actualRequirements = output?.requirements?.map(({ id }) => id).sort() ?? [];
  const expectedRequirements = [...expected.requirement_ids].sort();
  const intentionallyNotReady = expected.ready_for_looper === false && expected.childbead_count === 0 && output?.childbeads?.length === 0;
  const traceability = validation.ok && (intentionallyNotReady || expectedRequirements.every((id) =>
    output.childbeads.some(({ requirement_refs }) => requirement_refs.includes(id))
  ));
  const deliveryText = JSON.stringify({
    requirements: output?.requirements ?? [],
    commits: output?.childbeads?.map(({ title, commit_sentence }) => ({ title, commit_sentence })) ?? []
  });
  const riskText = JSON.stringify(output?.risks_or_open_decisions ?? []);
  const scopeFidelity = (intentionallyNotReady || JSON.stringify(actualRequirements) === JSON.stringify(expectedRequirements)) &&
    expected.forbidden_terms.every((term) => !deliveryText.toLowerCase().includes(term.toLowerCase())) &&
    (expected.required_risk_terms ?? []).every((term) => riskText.toLowerCase().includes(term.toLowerCase()));
  const dependencyCorrectness = validation.ok &&
    (expected.minimum_frontier === undefined || validation.frontier.length >= expected.minimum_frontier) &&
    (expected.childbead_count === undefined || output.childbeads.length === expected.childbead_count) &&
    (expected.required_id_terms ?? []).every((term) => output.childbeads.some(({ id }) => id.includes(term)));
  const readinessCorrectness = output?.ready_for_looper === expected.ready_for_looper;
  const requiredFieldCompleteness = validation.ok;
  const qualityPass = requiredFieldCompleteness && traceability && scopeFidelity && dependencyCorrectness && readinessCorrectness;
  return {
    required_field_completeness: requiredFieldCompleteness,
    traceability,
    scope_fidelity: scopeFidelity,
    dependency_correctness: dependencyCorrectness,
    readiness_correctness: readinessCorrectness,
    schema_validity: validation.ok,
    quality_pass: qualityPass,
    diagnostics: validation.diagnostics
  };
}

export function selectWinner(results) {
  const byEffort = Object.fromEntries(efforts.map((effort) => [effort, summarizeEffort(results.filter((result) => result.effort === effort))]));
  const qualityMatches = byEffort.high.total > 0 && byEffort.high.passed === byEffort.high.total &&
    byEffort.xhigh.total > 0 && byEffort.xhigh.passed === byEffort.xhigh.total;
  const highMoreEfficient = lowerFinite(byEffort.high.median_total_tokens, byEffort.xhigh.median_total_tokens) ||
    lowerFinite(byEffort.high.median_elapsed_ms, byEffort.xhigh.median_elapsed_ms);
  return {
    selected_effort: qualityMatches && highMoreEfficient ? "high" : "xhigh",
    reason: qualityMatches && highMoreEfficient
      ? "High matched every xhigh quality gate and used fewer median tokens or elapsed time."
      : "High did not satisfy the quality-first replacement rule; ties and incomplete evidence retain xhigh.",
    quality_matches: qualityMatches,
    high_more_efficient: highMoreEfficient,
    efforts: byEffort
  };
}

function summarizeEffort(results) {
  return {
    total: results.length,
    passed: results.filter(({ scores }) => scores.quality_pass).length,
    runtime_verified: results.every(({ verified_runtime }) => Boolean(verified_runtime)),
    median_total_tokens: median(results.map(({ usage }) => usage?.total_tokens).filter(Number.isFinite)),
    median_elapsed_ms: median(results.map(({ elapsed_ms }) => elapsed_ms).filter(Number.isFinite))
  };
}

function lowerFinite(a, b) {
  return Number.isFinite(a) && Number.isFinite(b) && a < b;
}

function median(values) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function buildPrompt(testCase) {
  const skill = readFileSync(skillPath, "utf8");
  const vocabulary = readFileSync(vocabularyPath, "utf8");
  return `${skill}\n\nCompatibility vocabulary:\n${vocabulary}\n\nEvaluation case ${testCase.id}:\n${testCase.input}\n\nReturn only a childbead set matching the supplied output schema. Use preferred_runtime \"routing-policy:implementor\" for implementation packets. Do not inspect or modify the repository.`;
}

async function runCase(testCase, effort, repetition) {
  mkdirSync(scratchDir, { recursive: true });
  const outputPath = resolve(scratchDir, `${testCase.id}-${effort}-${repetition}.json`);
  rmSync(outputPath, { force: true });
  const args = [
    "exec", "--ephemeral", "--skip-git-repo-check", "--ignore-user-config", "--ignore-rules",
    "--sandbox", "read-only", "--model", "gpt-5.6-luna",
    "--config", "approval_policy=\"never\"", "--config", `model_reasoning_effort=\"${effort}\"`, "--output-schema", schemaPath,
    "--output-last-message", outputPath, "--json", "-"
  ];
  const started = Date.now();
  const execution = await spawnCodex(args, buildPrompt(testCase));
  const elapsed = Date.now() - started;
  const events = parseJsonLines(execution.stdout);
  const output = execution.code === 0 && readJson(outputPath);
  const usage = findUsage(events);
  const verifiedRuntime = findVerifiedRuntime(events, "gpt-5.6-luna", effort);
  const scores = output ? scoreRun(output, testCase.expected) : failedScores(execution.stderr || execution.stdout || "missing model output");
  return {
    case_id: testCase.id,
    effort,
    repetition,
    requested_runtime: { model: "gpt-5.6-luna", effort },
    verified_runtime: verifiedRuntime,
    exit_code: execution.code,
    elapsed_ms: elapsed,
    usage,
    output_sha256: output ? createHash("sha256").update(JSON.stringify(output)).digest("hex") : null,
    scores,
    output
  };
}

function spawnCodex(args, input) {
  return new Promise((resolvePromise) => {
    const child = spawn("codex", args, { cwd: root, shell: true, windowsHide: true });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (code) => resolvePromise({ code, stdout, stderr }));
    child.stdin.end(input);
  });
}

function parseJsonLines(text) {
  return text.split(/\r?\n/).filter(Boolean).flatMap((line) => {
    try { return [JSON.parse(line)]; } catch { return []; }
  });
}

function readJson(path) {
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { return null; }
}

function findUsage(events) {
  const candidates = [];
  walk(events, (value) => {
    if (value && typeof value === "object" && Number.isFinite(value.input_tokens) && Number.isFinite(value.output_tokens)) {
      candidates.push({
        input_tokens: value.input_tokens,
        output_tokens: value.output_tokens,
        total_tokens: value.total_tokens ?? value.input_tokens + value.output_tokens
      });
    }
  });
  return candidates.at(-1) ?? null;
}

function findVerifiedRuntime(events, model, effort) {
  let modelSeen = false;
  let effortSeen = false;
  walk(events, (value) => {
    if (typeof value === "string" && value.toLowerCase() === model) modelSeen = true;
    if (typeof value === "string" && value.toLowerCase() === effort) effortSeen = true;
  });
  return modelSeen && effortSeen ? { model, effort } : null;
}

function walk(value, visit) {
  visit(value);
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => walk(item, visit));
}

function failedScores(message) {
  return {
    required_field_completeness: false,
    traceability: false,
    scope_fidelity: false,
    dependency_correctness: false,
    readiness_correctness: false,
    schema_validity: false,
    quality_pass: false,
    diagnostics: [message]
  };
}

async function runPool(tasks, concurrency = 2) {
  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < tasks.length) {
      const index = cursor++;
      results[index] = await tasks[index]();
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function main() {
  const cases = YAML.parse(readFileSync(casesPath, "utf8")).cases;
  if (process.argv.includes("--rescore")) {
    const previous = JSON.parse(readFileSync(resolve(evalDir, "latest-runs.json"), "utf8"));
    const expectedById = new Map(cases.map((testCase) => [testCase.id, testCase.expected]));
    const results = previous.results.map((result) => ({
      ...result,
      scores: result.output ? scoreRun(result.output, expectedById.get(result.case_id)) : result.scores
    }));
    writeReports(results, previous.generated_at);
    return;
  }
  const tasks = efforts.flatMap((effort) => cases.flatMap((testCase) =>
    Array.from({ length: repetitions }, (_, repetition) => () => runCase(testCase, effort, repetition + 1))
  ));
  const results = await runPool(tasks);
  writeReports(results, new Date().toISOString());
  process.exit(results.length === 20 ? 0 : 1);
}

function writeReports(results, runGeneratedAt) {
  const decision = selectWinner(results);
  const scoredAt = new Date().toISOString();
  const metadata = { version: 1, generated_at: runGeneratedAt, scored_at: scoredAt, run_count: results.length, results };
  const report = {
    version: 1,
    generated_at: runGeneratedAt,
    scored_at: scoredAt,
    model: "gpt-5.6-luna",
    runtime_verification: "The runner fixed model and effort in CLI arguments; current Codex JSONL usage traces did not echo them, so verified_runtime remains null.",
    selection_rule: "quality gate, then efficiency; ties retain xhigh",
    ...decision
  };
  writeFileSync(resolve(evalDir, "latest-runs.json"), `${JSON.stringify(metadata, null, 2)}\n`);
  writeFileSync(resolve(evalDir, "latest-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

if (import.meta.url === `file://${process.argv[1]?.replaceAll("\\", "/")}` || process.argv[1]?.endsWith("evaluate-routing.mjs")) {
  await main();
}
