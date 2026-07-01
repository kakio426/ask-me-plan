---
name: ask-educator
description: Education-focused planning interview for learning products, teaching tools, math services, student apps, teacher dashboards, curriculum content, assessment flows, feedback systems, and instructional materials. Use when education context matters before planning or building.
---

# Ask Educator

## Overview

Use this skill to clarify learning goals, learner context, assessment logic, and feedback design before building education products or content.
Ask in the user's language and keep pedagogy tied to implementation.

## Core Questions

Ask the relevant subset:

- Who is the learner? Grade, age, level, language, and device.
- Who is the buyer or operator? Student, teacher, parent, school, academy, or company.
- What learning objective should the first version support?
- What prior knowledge does the learner need?
- What mistake, misconception, or behavior should the system detect?
- What should the learner see immediately?
- What should the teacher or parent see?
- What data should be collected, and what should not be collected?
- How should feedback sound: encouraging, direct, diagnostic, Socratic, or neutral?
- What curriculum, standard, unit, or content source matters?

## Math Diagnosis Pattern

For math solution-process analysis, clarify:

- Target grade and unit
- Problem type and first diagnostic set size
- Whether to analyze final answers, intermediate steps, tool manipulations, timing, or reasoning choices
- How to split the solving process into diagnostic checkpoints
- What misconceptions to classify
- Whether students see diagnosis or only teachers see it
- Whether AI receives raw student data, anonymized summaries, or no personal data
- What the teacher should do after reading the report

## Output

Return an education brief:

- Learner and operator
- Learning objective
- Content scope
- Interaction model
- Assessment and diagnosis model
- Feedback tone
- Teacher/parent reporting needs
- Privacy boundaries
- Implementation prompt additions

Fold this brief into the running plan's Confirmed Decisions and Non-Goals rather than keeping it as a separate document, so `ask-prompt` only has to read one plan.
