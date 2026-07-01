#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const packageRoot = path.resolve(__dirname, "..");
const skillsRoot = path.join(packageRoot, "skills");
const colorEnabled = Boolean(process.stdout.isTTY && !process.env.NO_COLOR);

const colors = {
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  reset: "\x1b[0m",
  yellow: "\x1b[33m"
};

function color(style, value) {
  if (!colorEnabled) {
    return value;
  }

  return `${colors[style]}${value}${colors.reset}`;
}

function printHelp() {
  console.log(`ask-me-plan

Install Ask Me Plan skills for Codex or Claude Code.

Usage:
  ask-me-plan install [--target <path>] [--tool <codex|claude>] [--skills <names>] [--dry-run]
  ask-me-plan uninstall [--target <path>] [--tool <codex|claude>] [--skills <names>] [--dry-run]
  ask-me-plan list
  ask-me-plan --help

Examples:
  npx github:kakio426/ask-me-plan
  npx github:kakio426/ask-me-plan install --tool claude
  npx github:kakio426/ask-me-plan install --skills ask-standard,ask-visual
  npx github:kakio426/ask-me-plan install --target ~/.codex/skills
  npx github:kakio426/ask-me-plan uninstall --skills ask-deep

Options:
  --target <path>       Install target. Defaults to \${CODEX_HOME:-~/.codex}/skills for --tool codex, or ~/.claude/skills for --tool claude.
  --tool <name>         Target tool: codex (default) or claude.
  --skills <names>      Comma-separated skill names to install, or to remove with uninstall.
  --dry-run             Print what would happen without changing files.
  --help                Show this help.
`);
}

function expandHome(inputPath) {
  if (inputPath === "~") {
    return os.homedir();
  }

  if (inputPath.startsWith("~/")) {
    return path.join(os.homedir(), inputPath.slice(2));
  }

  return inputPath;
}

function parseTool(value) {
  if (value !== "codex" && value !== "claude") {
    throw new Error(`Unknown tool: ${value}. Use codex or claude.`);
  }

  return value;
}

function defaultTargetForTool(tool) {
  if (tool === "claude") {
    return path.join(os.homedir(), ".claude", "skills");
  }

  const codexHome = expandHome(process.env.CODEX_HOME || path.join(os.homedir(), ".codex"));
  return path.join(codexHome, "skills");
}

function listAvailableSkills() {
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((skillName) => fs.existsSync(path.join(skillsRoot, skillName, "SKILL.md")))
    .sort();
}

function parseArgs(argv) {
  const args = [...argv];
  const first = args[0];
  const command = first && !first.startsWith("-") ? args.shift() : "install";
  const options = {
    command,
    dryRun: false,
    help: false,
    skills: [],
    target: null,
    tool: "codex"
  };

  while (args.length > 0) {
    const arg = args.shift();

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--tool") {
      const value = args.shift();
      if (!value) {
        throw new Error("--tool requires a value: codex or claude");
      }
      options.tool = parseTool(value);
      continue;
    }

    if (arg && arg.startsWith("--tool=")) {
      options.tool = parseTool(arg.slice("--tool=".length));
      continue;
    }

    if (arg === "--target") {
      const value = args.shift();
      if (!value) {
        throw new Error("--target requires a path");
      }
      options.target = expandHome(value);
      continue;
    }

    if (arg && arg.startsWith("--target=")) {
      options.target = expandHome(arg.slice("--target=".length));
      continue;
    }

    if (arg === "--skills") {
      const value = args.shift();
      if (!value) {
        throw new Error("--skills requires a comma-separated list");
      }
      options.skills.push(...parseSkillList(value));
      continue;
    }

    if (arg && arg.startsWith("--skills=")) {
      options.skills.push(...parseSkillList(arg.slice("--skills=".length)));
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  if (!options.target) {
    options.target = defaultTargetForTool(options.tool);
  }

  return options;
}

function parseSkillList(value) {
  return value
    .split(",")
    .map((skillName) => skillName.trim())
    .filter(Boolean);
}

function resolveSkills(requestedSkills) {
  const availableSkills = listAvailableSkills();
  const selectedSkills = requestedSkills.length > 0 ? [...new Set(requestedSkills)] : availableSkills;

  for (const skillName of selectedSkills) {
    if (!availableSkills.includes(skillName)) {
      throw new Error(`Unknown skill: ${skillName}`);
    }
  }

  return selectedSkills;
}

function shouldCopyForTool(sourcePath, skillSourceRoot, tool) {
  if (tool !== "claude") {
    return true;
  }

  const relative = path.relative(skillSourceRoot, sourcePath);
  if (relative === "") {
    return true;
  }

  const [firstSegment] = relative.split(path.sep);
  return firstSegment !== "agents";
}

function installSkills(options) {
  const selectedSkills = resolveSkills(options.skills);
  const target = path.resolve(options.target);

  if (!options.dryRun) {
    fs.mkdirSync(target, { recursive: true });
  }

  const skillStatuses = [];

  for (const skillName of selectedSkills) {
    const source = path.join(skillsRoot, skillName);
    const destination = path.join(target, skillName);
    const updated = fs.existsSync(destination);

    if (!options.dryRun) {
      fs.cpSync(source, destination, {
        recursive: true,
        force: true,
        filter: (sourcePath) => shouldCopyForTool(sourcePath, source, options.tool)
      });
    }

    skillStatuses.push({ skillName, updated });
  }

  const action = options.dryRun ? "Would install" : "Installed";
  printInstallSummary(action, skillStatuses, target, options.dryRun, options.tool);
}

function uninstallSkills(options) {
  const selectedSkills = resolveSkills(options.skills);
  const target = path.resolve(options.target);
  const removed = [];
  const missing = [];

  for (const skillName of selectedSkills) {
    const destination = path.join(target, skillName);

    if (fs.existsSync(destination)) {
      if (!options.dryRun) {
        fs.rmSync(destination, { recursive: true, force: true });
      }
      removed.push(skillName);
    } else {
      missing.push(skillName);
    }
  }

  printUninstallSummary(removed, missing, target, options.dryRun);
}

function printInstallSummary(action, skillStatuses, target, dryRun, tool) {
  const skillLabel = skillStatuses.length === 1 ? "skill" : "skills";
  const title = `${action} ${skillStatuses.length} ${skillLabel}`;
  const rule = "-".repeat(Math.max(42, title.length + 6));
  const toolLabel = tool === "claude" ? "Claude Code" : "Codex";

  console.log("");
  console.log(color("cyan", rule));
  console.log(`${color("bold", "Ask Me Plan")} ${color("dim", `${toolLabel} skill suite`)}`);
  console.log(color("green", title));
  console.log(color("cyan", rule));
  console.log(`${color("bold", "Target")}  ${target}`);
  console.log(`${color("bold", "Skills")}  ${skillStatuses.map((entry) => entry.skillName).join(", ")}`);
  console.log("");

  for (const { skillName, updated } of skillStatuses) {
    const marker = dryRun ? color("yellow", "[dry]") : color("green", "[ok]");
    const statusLabel = dryRun ? "" : color("dim", updated ? " (updated)" : " (new)");
    console.log(`  ${marker} ${skillName}${statusLabel}`);
  }

  console.log("");
  console.log(color("bold", "Next steps"));
  console.log(`  1. Restart ${toolLabel} if the skills do not appear immediately.`);

  if (tool === "claude") {
    console.log(`  2. Try: ${color("yellow", "Use the ask-standard skill to help me plan this service before building.")}`);
    console.log(`  3. For visual direction: ${color("yellow", "Use the ask-visual skill to compare A/B/C UI styles.")}`);
  } else {
    console.log(`  2. Try: ${color("yellow", "Use $ask-standard to help me plan this service before building.")}`);
    console.log(`  3. For visual direction: ${color("yellow", "Use $ask-visual to compare A/B/C UI styles.")}`);
  }

  console.log("");
}

function printUninstallSummary(removed, missing, target, dryRun) {
  const action = dryRun ? "Would remove" : "Removed";

  console.log("");
  console.log(`${color("bold", "Ask Me Plan")} ${color("dim", "uninstall")}`);
  console.log(`${color("bold", "Target")}  ${target}`);
  console.log("");

  if (removed.length > 0) {
    console.log(color("green", `${action} ${removed.length} skill${removed.length === 1 ? "" : "s"}:`));
    for (const skillName of removed) {
      console.log(`  ${color("green", "[ok]")} ${skillName}`);
    }
  }

  if (missing.length > 0) {
    console.log(color("yellow", "Not installed (skipped):"));
    for (const skillName of missing) {
      console.log(`  ${color("yellow", "[skip]")} ${skillName}`);
    }
  }

  if (removed.length === 0 && missing.length === 0) {
    console.log(color("dim", "Nothing to remove."));
  }

  console.log("");
}

function listSkills() {
  for (const skillName of listAvailableSkills()) {
    console.log(skillName);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help || options.command === "help") {
    printHelp();
    return;
  }

  if (options.command === "list") {
    listSkills();
    return;
  }

  if (options.command === "install") {
    installSkills(options);
    return;
  }

  if (options.command === "uninstall") {
    uninstallSkills(options);
    return;
  }

  throw new Error(`Unknown command: ${options.command}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
