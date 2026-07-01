---
name: ask-build
description: Start implementation from an approved Ask planning prompt. Use after ask-prompt or a completed Ask planning interview when the user has a concrete plan and wants Codex to build, preferably with builder, reviewer, and QA subagents when multi-agent tools are available.
---

# Ask Build

## Overview

Use this skill to move from plan to implementation without losing the planning decisions.
Always ask for final confirmation before starting: "Start implementation from this plan?"

## Gate

Do not implement until the user confirms. If the user has already explicitly said to start implementation from the approved plan, treat that as confirmation.

Before building:

- Restate the implementation target in one short paragraph.
- List any blocking unknowns.
- If no blocker exists, ask whether to start.

## Multi-Agent Mode

When multi-agent tools are available, use three roles:

- `builder`: implement the approved plan within scope.
- `reviewer`: inspect for requirement misses, bugs, regressions, UX mismatches, and missing tests.
- `qa`: drive the artifact through its matching surface and report observable pass/fail behavior.

Keep the prompt to subagents bounded:

- Include the approved implementation prompt.
- Include repo paths or files only when relevant.
- Do not include private reasoning.
- Do not ask subagents to invent requirements beyond the plan.

If multi-agent tools are unavailable, perform the same roles sequentially in the main agent.

## Build Workflow

1. Read the target codebase or artifact context.
2. Create or update the implementation plan only as needed for execution.
3. Implement the approved scope.
4. Run relevant checks.
5. Review changed files against the prompt.
6. Drive the artifact through the user's expected path.
7. If review or QA in steps 5-6 finds a mismatch, bug, or regression, fix it and repeat steps 4-6 before reporting. Do not report an unresolved failure as done.
8. Report what changed, what passed, and what could not be verified.

## Guardrails

- Stay inside the confirmed scope.
- Do not silently add major features.
- Do not ignore open questions; either ask or mark an assumption before building.
- Preserve user-provided visual, education, privacy, and QA decisions.
- If a `PLAN.md` file exists in the project, treat it as the source of truth for scope and confirmed decisions.
- If the plan conflicts with the codebase, explain the conflict and choose the smallest viable adjustment.
