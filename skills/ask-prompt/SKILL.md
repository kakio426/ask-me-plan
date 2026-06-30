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

Ask follow-up questions only for blocking gaps. Otherwise make explicit assumptions and continue.

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

## Quality Bar

The final prompt must be:

- Specific enough to implement without re-interviewing the user.
- Honest about assumptions.
- Scoped to the first useful version.
- Written in the user's language unless they request another language.
- Ready for `ask-build` after user confirmation.

## Output

Return only the handoff prompt plus a short "Ready to build?" confirmation question when implementation may start next.
