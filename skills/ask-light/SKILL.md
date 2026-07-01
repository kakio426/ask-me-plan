---
name: ask-light
description: Fast, low-friction planning interview for vague product, web page, app, education content, feature, or implementation requests. Use when the user wants a quick plan before building, wants only a few clarifying questions, or asks for a lightweight "ask before build" pass.
---

# Ask Light

## Overview

Use this skill to turn a vague request into a small, implementation-ready brief with minimal friction.
Ask in the user's language.

## Interview Rules

- Ask 3-5 essential questions total.
- Ask one compact round first; use one follow-up round only when the answer is ambiguous.
- Keep questions concrete, answerable, and tied to the next implementation step.
- Separate confirmed facts from assumptions.
- Stop asking when the user says to proceed, stop, build, or that the plan is enough.

## Opt-Out

If the user explicitly declines questions (for example: "no questions, just build", "skip the interview"), first check whether the request is concrete enough to guess safely.

- If the goal, primary user, and first-version scope are already clear enough from context, skip the question set: state your best-guess assumptions for goal, users, first-version scope, and constraints as a short list, mark them clearly as assumptions rather than confirmed decisions, and go straight to Output.
- If even one of those is unclear enough that a wrong guess would produce a fundamentally different result, ask exactly one question to resolve that single biggest unknown, then proceed without further questions.

## Question Set

Ask the smallest useful subset:

- What should the finished thing help the user accomplish?
- Who is the primary user or audience?
- What must be included in the first version?
- What should be excluded or avoided?
- Are there style, platform, deadline, data, or technology constraints?

If the request is visual, route to `ask-visual` before finalizing. If the request is education-related, route to `ask-educator` when one or two extra education questions would prevent rework.

## Output

Use these section names so later Ask skills (and the user) can pick up the state without re-deriving it:

- Confirmed Decisions
- Assumptions
- Open Questions (omit if none remain)
- Non-Goals
- Implementation Prompt

Keep the implementation prompt short enough for direct handoff to a coding agent.
