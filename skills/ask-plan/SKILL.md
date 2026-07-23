---
name: ask-plan
description: Entry point for the Ask Me Plan skill suite. Use when the user wants to plan something before building but has not said how deep the interview should be, or is not sure which Ask skill fits (quick, standard, deep, visual, education, risk, prompt, or build).
---

# Ask Plan

## Overview

Use this skill as the front door to the Ask Me Plan suite. It does not run the interview itself; it decides how deep the interview should go and which specialized Ask skills to bring in, states the route in one or two sentences, then continues as that skill.

## Triage

Ask at most one short round (1-3 questions) to size the request:

- How big or important is this build: a small task, a normal feature/page/app, or a complex or high-stakes product?
- Do you want a quick MVP to look at (light path), or the result done right in one committed pass (committed path)? This matters most when you cannot easily upgrade an MVP later.
- Is visual or UI direction likely to matter?
- Is this an education, learning, or student-facing product?

If the user's first message already answers these implicitly (for example, a one-line request for a small, well-understood page), do not re-ask — infer the route and confirm it in one short sentence instead of running the triage questions.

## Two Paths

The suite has two build paths. Pick one and route the whole chain accordingly.

- **Light path**: quick, MVP-shaped output. `... -> ask-prompt -> ask-build`. Right for small or throwaway builds, or when the user just wants to see something working.
- **Committed path**: above-MVP output in one pass — minimal feature set, but each core unit built to ship quality on a growth-shaped skeleton. `... -> ask-architecture -> ask-prompt (committed) -> ask-ship`. Right when the plan is confident, the build is large, or the user cannot easily deepen an MVP later. Front-loading depth raises the cost of a wrong plan, so run `ask-risk` before shipping.

## Routing Table

| Signal | Route to |
| --- | --- |
| Small task, few unknowns, user wants speed | `ask-light` |
| Normal service, page, app, or feature | `ask-standard` |
| Complex, ambiguous, or high-stakes project | `ask-deep` |
| UI, design, or image style matters | also use `ask-visual` |
| Learning, teaching, student, or curriculum product | also use `ask-educator` |
| Plan feels underspecified, or rework would be costly | also use `ask-risk` |
| Result must be above-MVP and hard to upgrade later | committed path: `ask-architecture` before the prompt |
| Interview is complete and needs a handoff prompt | `ask-prompt` |
| Plan is approved, quick MVP is fine | `ask-build` |
| Plan is approved, must be done right in one pass | `ask-ship` |

## Opt-Out

If the user declines triage or planning entirely (for example: "no questions, just build", "skip planning"), first check whether the request is concrete enough to route and guess safely.

- If the goal and scale of the request are already clear enough from context, state the smallest reasonable assumption set for goal, users, and scope, mark it clearly as assumptions, and route straight to `ask-build` (or implement directly if no build skill is available).
- If the goal or scale is unclear enough that a wrong guess would produce a fundamentally different result, ask exactly one question to resolve that single biggest unknown, then proceed without further questions.

## Output

State the chosen route and why in one or two sentences, then continue the conversation as that skill. Do not produce a separate planning brief here — the routed skill owns that output.
