---
name: ask-standard
description: Balanced planning interview for service planning, web pages, apps, education content, product features, and implementation work. Use when the user wants the agent to ask clarifying questions before building and produce a practical implementation prompt.
---

# Ask Standard

## Overview

Use this skill as the default "ask before build" workflow.
Interview the user in their language, reduce ambiguity, and produce an implementation-ready prompt.

## Interview Shape

Ask 8-12 questions across 2-4 short rounds. Do not dump every question at once unless the user asks for a form.

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

## Output

Return a concise planning brief:

- Goal
- Users
- Scope
- User flow
- Features
- Visual direction
- Data/content needs
- Non-goals
- Risks or assumptions
- Acceptance criteria
- Implementation prompt

End by asking whether the user wants to start implementation only if `ask-build` is in scope.
