---
name: ask-standard
description: Balanced planning interview for service planning, web pages, apps, education content, product features, and implementation work. Use when the user wants the agent to ask clarifying questions before building and produce a practical implementation prompt.
---

# Ask Standard

## Overview

Use this skill as the default "ask before build" workflow.
Interview the user in their language, reduce ambiguity, and produce an implementation-ready prompt.

## Opt-Out

If the user explicitly declines the interview (for example: "no questions, just build", "skip planning"), first check whether the request is concrete enough to guess safely.

- If the goal, primary user, and platform are already clear enough from context, skip the interview: state the smallest reasonable assumption set for goal, users, scope, and platform, mark everything as an assumption rather than a confirmed decision, and produce the Output directly.
- If even one of those is unclear enough that a wrong guess would produce a fundamentally different result, ask exactly one question to resolve that single biggest unknown, then proceed without further questions.

## Interview Shape

Ask 8-12 questions across 2-4 short rounds. Do not dump every question at once unless the user asks for a form.
After each answer, update the working plan before asking the next question. The skill should feel like a guided conversation, not a static questionnaire.

Round 1: Define the job

- Goal
- Primary user
- Use case
- First-version scope

Round 2: Shape the product

- Core screens, pages, or content units
- Required features
- Exclusions and non-goals
- Platform: mobile, desktop, responsive web, native app, or other

Round 3: Confirm execution details

- Visual direction or reference apps
- Data, API, privacy, or content constraints
- Success criteria and QA checks
- Deadline or delivery format

## Routing

Use related Ask skills when they fit:

- Use `ask-visual` for UI, design, image style, brand, or reference-app decisions.
- Use `ask-educator` for education products, learning content, assessment, curriculum, student feedback, or teacher dashboards.
- Use `ask-risk` when the plan has hidden assumptions, contradictions, privacy risk, or unclear success criteria.
- Use `ask-prompt` after the interview to create the final implementation prompt.

## Persisting State

If the interview runs long or spans multiple sessions, write the plan to a `PLAN.md` file in the project root instead of relying on chat history alone, and keep it updated as answers come in.

## Output

Group the brief under the shared Ask Me Plan headers so `ask-visual`, `ask-educator`, `ask-risk`, and `ask-prompt` can build on it without re-asking:

- Confirmed Decisions — goal, users, scope, user flow, features, visual direction, data/content needs, acceptance criteria
- Assumptions
- Open Questions
- Non-Goals
- Implementation Prompt

End by naming which Ask skill fits best next (`ask-visual`, `ask-educator`, `ask-risk`, or `ask-prompt`), and ask whether the user wants to start implementation only if `ask-build` is in scope.
