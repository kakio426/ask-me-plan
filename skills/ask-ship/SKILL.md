---
name: ask-ship
description: Committed, above-MVP implementation from an approved plan in one pass. Use when the plan is confident, the build is large enough that lumping it would drop or shallow requirements, and the user cannot easily upgrade an MVP later so it must be done right the first time. Slices the work, builds each unit to a completion bar, verifies the seams, and reconciles against a checklist.
---

# Ask Ship

## Overview

Use this skill as the committed build step on the "do it right in one pass" path, in place of `ask-build`.
Where `ask-build` shows a working MVP, `ask-ship` delivers an above-MVP first result: minimal feature surface, but each core unit built to ship quality on a growth-shaped skeleton.

`ask-build` says "show it." `ask-ship` says "finish it."

## Preconditions

`ask-ship` needs material to slice and verify against: an architectural backbone, per-unit depth tags, definition-of-done for each core unit, and an ordered implementation checklist. This normally comes from `ask-architecture -> ask-prompt` (committed output).

If the incoming plan is thin — no architecture, no depth tags, no checklist — do not proceed to a shallow build. First pull the plan up: run or reconstruct `ask-architecture` and the committed `ask-prompt` output, confirm with the user, then build. Ask before doing this if it meaningfully expands scope.

## Two Problems, Two Mechanisms

A large build fails in two independent ways. Handle both; do not let one stand in for the other.

- **Dropped / disconnected (completeness + seams)**: slicing + checklist reconciliation + seam verification.
- **Shallow (depth)**: a definition-of-done per core unit + anti-stub rules + a completion gate between units.

Slicing alone prevents dropping but not shallowness. A sliced unit can still be built thin. Both mechanisms run together.

## Anti-Stub Rules

A `core` unit is not done when it merely exists. In `core` units, do not ship:

- Placeholder or lorem copy where real content was specified.
- `// TODO`, "this would normally...", or commented-out intent left in place of implementation.
- Hardcoded fake data where computed logic was specified.
- Unhandled empty, loading, error, or edge states.
- A happy path only, when the plan named other cases.

`scaffold` units may use stubs and mock data, but the seam around them must be real, so the real version can drop in later without a rewrite.

## Build Workflow

1. Read the target codebase or artifact context and the architectural backbone.
2. Turn the plan into an ordered implementation checklist if one does not already exist. Order by dependency: build the parts others rely on first.
3. Size check: if the build is large, do not build it all in one pass. Group the checklist into units along the module seams from `ask-architecture` — not by arbitrary item count — so units do not overlap in files or ownership.
4. Build one unit at a time. For each unit:
   - Build to its definition-of-done, honoring the anti-stub rules for `core` units.
   - Run relevant checks.
   - Do not move to the next unit until this one meets its completion bar. This gate is a quality check, not a presence check.
5. After the units are built, verify the seams: confirm the units connect as the architecture's contracts specified (data crossing a boundary matches the shape the other side expects). Seam defects are the main new risk of a sliced build; this step exists to catch them.
6. Reconcile against the checklist item by item. For each item, mark implemented or not, and for `core` items, whether it meets its definition-of-done or is only present. Anything missing or thin goes back to step 4.
7. If review or QA finds a mismatch, bug, regression, seam defect, or thin `core` unit, fix it and repeat the relevant steps before reporting. Do not report an unresolved failure, or a checklist with unmet items, as done.
8. Report: the checklist with each item's status, seam-verification result, what passed, and what could not be verified.

## Multi-Agent Mode

When multi-agent tools are available, use subagents to give each deep unit undivided attention — the point is attention isolation, not parallelism for its own sake.

- **Builders**: one per `core` unit (or per seam-bounded group of units). Split builders only along the seams from `ask-architecture`, so their files and ownership do not overlap. `scaffold` units can share one builder. **Each builder must carry its unit's definition-of-done and the anti-stub rules** — a subagent given only a task name will build shallowly just as happily. The bar is set by the prompt, not by the subagent.
- **Reviewer**: exactly one, never split. It sees the whole checklist and the whole result. Its job is precisely the seams between split builders and any thin `core` unit — the failures no single builder can see.
- **QA**: exactly one, never split. It drives the whole artifact through the user's expected path and reports observable pass/fail behavior end to end.

Treat multi-agent mode as unavailable when the tools are absent **or** when the session restricts spawning them — for example, a harness policy that only allows subagents on explicit user request. Seeing a spawn tool in the tool list is not permission to use it.

When multi-agent mode is unavailable for either reason, perform the same roles sequentially in the main agent, keeping the reviewer and QA passes whole rather than per-unit. Fall back directly rather than stalling to ask for permission to spawn, and say in the report that the roles ran sequentially.

## Guardrails

- Keep the feature set to the confirmed scope; depth is added per unit, not extra features.
- Send full effort to `core` units; keep `scaffold` units minimal but with real seams.
- If a `PLAN.md` file exists, treat it as the source of truth for scope, decisions, and depth tags.
- Do not silently downgrade a `core` unit to a stub to save effort; if a unit cannot meet its bar, say so and ask.
- If the plan conflicts with the codebase, explain the conflict and choose the smallest viable adjustment.
