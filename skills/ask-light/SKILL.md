---
name: ask-light
description: Fast, low-friction planning interview for vague product, web page, app, education content, feature, or implementation requests. Use when the user wants a quick plan before building, wants only a few clarifying questions, or asks for a lightweight "ask before build" pass.
---

# Ask Light

## Overview

Use this skill to turn a vague request into a small, implementation-ready brief with minimal friction.
Ask in the user's language. 질문은 사용자의 언어를 따른다.

## Interview Rules

- Ask 3-5 essential questions total.
- Ask one compact round first; use one follow-up round only when the answer is ambiguous.
- Keep questions concrete, answerable, and tied to the next implementation step.
- Separate confirmed facts from assumptions.
- Stop asking when the user says to proceed, stop, build, or that the plan is enough.

## Question Set

Ask the smallest useful subset:

- What should the finished thing help the user accomplish?
- Who is the primary user or audience?
- What must be included in the first version?
- What should be excluded or avoided?
- Are there style, platform, deadline, data, or technology constraints?

If the request is visual, route to `ask-visual` before finalizing. If the request is education-related, route to `ask-educator` when one or two extra education questions would prevent rework.

## Output

Return:

- Confirmed plan
- Assumptions
- Out of scope
- Implementation prompt

Keep the implementation prompt short enough for direct handoff to a coding agent.
