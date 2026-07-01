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
- Is visual or UI direction likely to matter?
- Is this an education, learning, or student-facing product?
- Would getting this wrong be costly to redo?

If the user's first message already answers these implicitly (for example, a one-line request for a small, well-understood page), do not re-ask — infer the route and confirm it in one short sentence instead of running the triage questions.

## Routing Table

| Signal | Route to |
| --- | --- |
| Small task, few unknowns, user wants speed | `ask-light` |
| Normal service, page, app, or feature | `ask-standard` |
| Complex, ambiguous, or high-stakes project | `ask-deep` |
| UI, design, or image style matters | also use `ask-visual` |
| Learning, teaching, student, or curriculum product | also use `ask-educator` |
| Plan feels underspecified, or rework would be costly | also use `ask-risk` |
| Interview is complete and needs a handoff prompt | `ask-prompt` |
| Plan is approved and ready to implement | `ask-build` |

## Opt-Out

If the user declines triage or planning entirely (for example: "no questions, just build", "skip planning"), do not run the triage questions. State the smallest reasonable assumption set for goal, users, and scope, mark it clearly as assumptions, and route straight to `ask-build` (or implement directly if no build skill is available).

## Output

State the chosen route and why in one or two sentences, then continue the conversation as that skill. Do not produce a separate planning brief here — the routed skill owns that output.
