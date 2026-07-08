---
name: ask-risk
description: Planning risk interview for finding assumptions, contradictions, missing requirements, privacy issues, UX gaps, education-specific gaps, and implementation ambiguity before building. Use when a plan feels underspecified or when rework would be costly.
---

# Ask Risk

## Overview

Use this skill to find what the AI might misunderstand before implementation starts.
Focus on questions that prevent rework, not theoretical completeness.

## Risk Categories

Review the plan for:

- Goal mismatch
- User/audience ambiguity
- Scope creep
- Missing non-goals
- Unclear success criteria
- Unspecified platform or device
- Visual direction ambiguity
- Data, API, or integration uncertainty
- Privacy or safety risk
- Accessibility/readability risk
- Education-specific assessment or feedback gaps
- QA path missing

## Interview

Ask only high-impact questions. Prefer 3-7 targeted questions.

Use this pattern:

1. State the risk in plain language.
2. Explain what could go wrong if unanswered.
3. Ask one concrete question or offer A/B/C choices.

## Output

Return:

- Risk ledger
- Blocking questions
- Non-blocking assumptions
- Recommended changes to the implementation prompt
- Change log: one line per changed decision, in the form `Before -> After (addresses: <risk>)`. Include only what actually changed, not the full plan.

Move blocking questions into the running plan's Open Questions, non-blocking items into Assumptions, and apply the recommended changes directly to Confirmed Decisions before handing off to `ask-prompt`. Pass the change log along with the updated plan — it is how `ask-prompt` checks that nothing found during risk review got lost on the way to the final prompt.
