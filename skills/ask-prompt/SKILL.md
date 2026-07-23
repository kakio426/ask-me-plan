---
name: ask-prompt
description: Convert an Ask planning interview, notes, product brief, or clarified idea into an implementation-ready prompt for Codex or another coding agent. Use after ask-light, ask-standard, ask-deep, ask-visual, ask-educator, or ask-risk when the user needs a precise handoff prompt.
---

# Ask Prompt

## Overview

Use this skill to turn planning conversation into a clean prompt that a coding agent can execute.
Do not add hidden requirements. Preserve the user's decisions and mark assumptions clearly.

## Input Handling

Accept:

- Interview transcript
- Planning notes
- User-provided idea
- Existing product document
- Visual brief
- Education brief
- Risk review

When the input already uses the shared Confirmed Decisions / Assumptions / Open Questions / Non-Goals headers, treat unresolved Open Questions as the first place to check for blocking gaps.

Ask follow-up questions only for blocking gaps. Otherwise make explicit assumptions and continue.

## Reconciling a Risk Review

When the input includes a risk review's change log (`Before -> After (addresses: <risk>)`), treat every entry as required in the final prompt, not optional context. Compare the change log against the draft prompt line by line before finalizing:

- If a change is already reflected in the prompt, leave it as is.
- If a change is missing from the prompt, add it.
- If a change conflicts with something the user confirmed after the risk review, keep the user's later decision and note the conflict under Open Questions and Assumptions instead of silently picking one.

Do not drop a risk-driven change without recording why.

## Prompt Structure

Produce a prompt with these sections:

- Role and objective
- Background
- Target users
- Platform and environment
- Scope for this version
- Non-goals
- Core user flow
- Functional requirements
- Content or data requirements
- Visual and UX direction
- Technical constraints
- Privacy and safety constraints
- Acceptance criteria
- QA path
- Open questions and assumptions

## Two Output Modes

There are two build paths, and the prompt should match the one the plan is headed for.

**Light path (default, feeds `ask-build`)**: the structure above, as prose. Right for small or throwaway builds where a working MVP is the goal.

**Committed path (feeds `ask-ship`)**: when the plan came through `ask-architecture`, or the user wants the result done right in one pass and cannot easily upgrade an MVP later, produce a thicker prompt so `ask-ship` has material to slice and verify against. Add, on top of the structure above:

- **Architectural backbone**: the data model, module seams and their contracts, real-vs-stub split, and extension points from `ask-architecture`.
- **Depth tags**: mark each major unit `core` (build to ship quality) or `scaffold` (stub acceptable, real seam required). Do not let everything default to one depth.
- **Definition of done per core unit**: what "finished" means beyond "it exists" — which edge/empty/error states are handled, that copy is real not placeholder, that data is computed not hardcoded. This is what lets a reviewer catch thinness.
- **Ordered implementation checklist**: number the functional requirements (R1, R2, ...) in dependency order, so `ask-ship` can build and reconcile item by item instead of lumping.

Separate the two axes: narrow the feature set, but do not make each feature shallow. "Fewer things, each finished" is the committed goal — not "everything, each half-built."

## Quality Bar

The final prompt must be:

- Specific enough to implement without re-interviewing the user.
- Honest about assumptions.
- Scoped to a minimal feature set — but on the committed path, deep on each feature it keeps, not uniformly thin.
- Written in the user's language unless they request another language.
- Ready for `ask-build` (light) or `ask-ship` (committed) after user confirmation.

## Output

Return only the handoff prompt plus a short confirmation question when implementation may start next: "Ready to build?" for the light path, or "Ready to ship this in one pass?" for the committed path.
