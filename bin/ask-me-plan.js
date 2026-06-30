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

Install Ask Me Plan Codex skills.

Usage:
  ask-me-plan install [--target <path>] [--skills <names>] [--dry-run]
  ask-me-plan list
  ask-me-plan --help

Examples:
  npx github:kakio426/ask-me-plan
  npx github:kakio426/ask-me-plan install --skills ask-standard,ask-visual
  npx github:kakio426/ask-me-plan install --target ~/.codex/skills

Options:
  --target <path>       Install target. Defaults to \${CODEX_HOME:-~/.codex}/skills.
  --skills <names>      Comma-separated skill names to install.
  --dry-run             Print what would be installed without copying files.
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

function defaultTarget() {
  const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
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
    target: defaultTarget()
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
  const selectedSkills = requestedSkills.length > 0 ? requestedSkills : availableSkills;

  for (const skillName of selectedSkills) {
    if (!availableSkills.includes(skillName)) {
      throw new Error(`Unknown skill: ${skillName}`);
    }
  }

  return selectedSkills;
}

function installSkills(options) {
  const selectedSkills = resolveSkills(options.skills);
  const target = path.resolve(options.target);

  if (!options.dryRun) {
    fs.mkdirSync(target, { recursive: true });
  }

  for (const skillName of selectedSkills) {
    const source = path.join(skillsRoot, skillName);
    const destination = path.join(target, skillName);

    if (!options.dryRun) {
      fs.cpSync(source, destination, { recursive: true, force: true });
    }
  }

  const action = options.dryRun ? "Would install" : "Installed";
  printInstallSummary(action, selectedSkills, target);
}

function printInstallSummary(action, selectedSkills, target) {
  const title = `${action} ${selectedSkills.length} skills`;
  const rule = "-".repeat(Math.max(42, title.length + 6));

  console.log("");
  console.log(color("cyan", rule));
  console.log(`${color("bold", "Ask Me Plan")} ${color("dim", "Codex skill suite")}`);
  console.log(color("green", title));
  console.log(color("cyan", rule));
  console.log(`${color("bold", "Target")}  ${target}`);
  console.log(`${color("bold", "Skills")}  ${selectedSkills.join(", ")}`);
  console.log("");

  for (const skillName of selectedSkills) {
    console.log(`  ${color("green", "[ok]")} ${skillName}`);
  }

  console.log("");
  console.log(color("bold", "Next steps"));
  console.log(`  1. Restart Codex if the skills do not appear immediately.`);
  console.log(`  2. Try: ${color("yellow", "Use $ask-standard to help me plan this service before building.")}`);
  console.log(`  3. For visual direction: ${color("yellow", "Use $ask-visual to compare A/B/C UI styles.")}`);
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

  throw new Error(`Unknown command: ${options.command}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
