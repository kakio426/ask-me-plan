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
  assert.ok(fs.existsSync(path.join(target, "ask-plan", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(target, "ask-architecture", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(target, "ask-ship", "SKILL.md")));
  assert.match(result.stdout, /Installed 11 skills/);
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

test("marks a fresh install as new and a repeat install as updated", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-markers-"));

  const first = runCli(["install", "--target", target, "--skills", "ask-standard"]);
  assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /\[ok\] ask-standard \(new\)/);

  const second = runCli(["install", "--target", target, "--skills", "ask-standard"]);
  assert.equal(second.status, 0, second.stderr);
  assert.match(second.stdout, /\[ok\] ask-standard \(updated\)/);
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

test("defaults to the Claude Code skills directory with --tool claude", () => {
  const result = runCli(["install", "--dry-run", "--tool", "claude", "--skills", "ask-standard"]);

  assert.equal(result.status, 0, result.stderr);
  const expectedTarget = path.join(os.homedir(), ".claude", "skills");
  assert.ok(result.stdout.includes(expectedTarget), result.stdout);
  assert.match(result.stdout, /Claude Code skill suite/);
});

test("skips the Codex-only agents directory when installing for Claude Code", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-claude-"));

  const result = runCli(["install", "--target", target, "--tool", "claude", "--skills", "ask-standard"]);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(target, "ask-standard", "SKILL.md")));
  assert.equal(fs.existsSync(path.join(target, "ask-standard", "agents")), false);
});

test("rejects an unknown --tool value", () => {
  const result = runCli(["install", "--dry-run", "--tool", "invalid"]);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown tool: invalid/);
});

test("uninstall removes an installed skill", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-uninstall-"));
  runCli(["install", "--target", target, "--skills", "ask-standard"]);

  const result = runCli(["uninstall", "--target", target, "--skills", "ask-standard"]);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.existsSync(path.join(target, "ask-standard")), false);
  assert.match(result.stdout, /Removed 1 skill/);
  assert.match(result.stdout, /\[ok\] ask-standard/);
});

test("uninstall --dry-run does not remove files", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-uninstall-dry-"));
  runCli(["install", "--target", target, "--skills", "ask-standard"]);

  const result = runCli(["uninstall", "--target", target, "--dry-run", "--skills", "ask-standard"]);

  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(target, "ask-standard", "SKILL.md")));
  assert.match(result.stdout, /Would remove 1 skill/);
});

test("uninstall reports skills that were never installed", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-uninstall-missing-"));

  const result = runCli(["uninstall", "--target", target, "--skills", "ask-standard"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Not installed \(skipped\)/);
  assert.match(result.stdout, /\[skip\] ask-standard/);
});

test("uninstall rejects unknown skills", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-uninstall-unknown-"));

  const result = runCli(["uninstall", "--target", target, "--skills", "ask-missing"]);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown skill: ask-missing/);
});

test("lists available skills", () => {
  const result = runCli(["list"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /ask-standard/);
  assert.match(result.stdout, /ask-educator/);
  assert.match(result.stdout, /ask-plan/);
  assert.match(result.stdout, /ask-architecture/);
  assert.match(result.stdout, /ask-ship/);
});

test("rejects unknown skills", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "ask-me-plan-unknown-"));

  const result = runCli(["install", "--target", target, "--skills", "ask-missing"]);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown skill: ask-missing/);
});
