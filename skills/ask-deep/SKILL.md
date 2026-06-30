---
name: ask-deep
description: Detailed, multi-round planning interview for complex services, apps, websites, education products, AI workflows, or ambiguous projects where premature implementation would create rework. Use when the user wants many questions, deep clarification, or a full planning pass before implementation.
---

# Ask Deep

## Overview

Use this skill when the idea is important enough to deserve a careful interview.
Work like a product strategist: ask, summarize, challenge ambiguity, and turn the result into a precise implementation prompt.

## Principles

- Use the user's language.
- Ask in rounds, not one huge questionnaire.
- Ask 3-5 questions per round.
- Summarize after each round and identify what is still unclear.
- Treat the conversation itself as the planning artifact: each answer should become a decision, an assumption, an open question, or an implementation constraint.
- Probe vague words such as "simple", "pretty", "smart", "easy", "AI-powered", "dashboard", or "personalized".
- Keep confirmed decisions, assumptions, open questions, and non-goals separate.
- Stop when the user says to proceed, stop asking, or that the plan is enough.

## Conversation Loop

Repeat this loop until the plan is clear enough to hand off:

1. Ask 3-5 focused questions.
2. Read the user's answers for decisions, preferences, constraints, and contradictions.
3. Summarize what became clearer.
4. Name what is still ambiguous.
5. Ask the next round based on the user's answers, not a fixed checklist.
6. When enough is known, convert the conversation into a prompt with `ask-prompt`.

Do not skip the summary step. The summary is how the user catches misunderstandings before implementation.

## Interview Rounds

1. Intent: goal, audience, current pain, desired outcome.
2. Product shape: service type, core workflow, screens, content, data.
3. Scope: MVP, later work, explicit non-goals.
4. Users: personas, context, devices, accessibility needs.
5. Experience: user flow, states, edge cases, onboarding, errors.
6. Visual direction: route to `ask-visual` when UI or image style matters.
7. Domain depth: route to `ask-educator` for learning products or education content.
8. Risk: route to `ask-risk` for assumptions, contradictions, privacy, or feasibility.
9. Acceptance: success criteria, QA checks, demo path.
10. Handoff: route to `ask-prompt` for a final implementation prompt.

## Deep Follow-Up Patterns

When the user gives a broad answer, convert it into specific choices:

- If they say "for students", ask grade, subject, device, and learning context.
- If they say "AI analysis", ask input, output, confidence, review, and privacy boundaries.
- If they say "dashboard", ask primary decision, top three metrics, filters, and drill-down path.
- If they say "beautiful UI", ask reference apps, tone, color, density, and platform.
- If they say "MVP", ask what can be removed while preserving the core value.

## Output

Return:

- Interview summary
- Confirmed decisions
- Open questions
- Assumptions
- Scope and non-goals
- Implementation prompt
- Optional next step: ask whether to start implementation with `ask-build`
