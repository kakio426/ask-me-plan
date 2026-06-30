const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const binPath = path.join(repoRoot, "bin", "ask-me-plan.js");

function runCli(args, options = {}) {
  return spawnSync(process.execPath, [binPath, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    ...options
  });
}

test("installs all skills into a custom target", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-install-"));

  const result = runCli(["install", "--target", target]);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(target, "ask-standard", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(target, "ask-visual", "SKILL.md")));
  assert.match(result.stdout, /Installed 8 skills/);
  assert.match(result.stdout, /Next steps/);
  assert.match(result.stdout, /Use \$ask-standard/);
});

test("installs selected skills only", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-selected-"));

  const result = runCli(["install", "--target", target, "--skills", "ask-standard,ask-visual"]);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(target, "ask-standard", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(target, "ask-visual", "SKILL.md")));
  assert.equal(fs.existsSync(path.join(target, "ask-deep")), false);
  assert.match(result.stdout, /Installed 2 skills/);
  assert.match(result.stdout, /\[ok\] ask-standard/);
});

test("deduplicates selected skills", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-dedup-"));

  const result = runCli(["install", "--target", target, "--skills", "ask-standard,ask-standard,ask-visual"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Installed 2 skills/);
  assert.match(result.stdout, /Skills  ask-standard, ask-visual/);
});

test("marks dry runs separately from installed skills", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-dry-"));

  const result = runCli(["install", "--target", target, "--dry-run", "--skills", "ask-standard"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Would install 1 skill/);
  assert.match(result.stdout, /\[dry\] ask-standard/);
  assert.equal(fs.existsSync(path.join(target, "ask-standard")), false);
});

test("expands CODEX_HOME when it starts with a home shortcut", () => {
  const result = runCli(["install", "--dry-run", "--skills", "ask-standard"], {
    env: {
      ...process.env,
      CODEX_HOME: "~/.codex-test"
    }
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, new RegExp(`${os.homedir().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/.codex-test/skills`));
});

test("lists available skills", () => {
  const result = runCli(["list"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /ask-standard/);
  assert.match(result.stdout, /ask-educator/);
});

test("rejects unknown skills", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-unknown-"));

  const result = runCli(["install", "--target", target, "--skills", "ask-missing"]);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown skill: ask-missing/);
});
