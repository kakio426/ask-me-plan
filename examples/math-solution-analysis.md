# Example: Math Solution-Process Analysis Service

This example shows how Ask Me Plan can turn a vague education-service idea into an implementation prompt.

## Starting Request

> I want to build a service that analyzes how students solve math problems, not just whether the final answer is correct.

## Skill Chain

Use:

```text
ask-deep -> ask-educator -> ask-visual -> ask-risk -> ask-prompt -> ask-build
```

## Interview Questions

Ask in short rounds.

Round 1:

1. Which grade and unit should the MVP target?
2. Who is the first user: student, teacher, parent, academy, or school?
3. Should the first version diagnose final answers, intermediate steps, tool interactions, timing, or reasoning choices?

Round 2:

1. What problem set should be used first?
2. How should one problem be split into diagnostic checkpoints?
3. What should students see after solving, and what should only teachers see?

Round 3:

1. Should students type explanations, choose reasons, manipulate visual tools, or combine these?
2. What student data may be sent to an AI API?
3. What teacher report would make the tool immediately useful?

## Example Confirmed Plan

- Target learner: grade 5 students.
- First unit: fractions.
- First diagnostic set: 10 questions.
- First concepts: equivalent fractions, simplifying, common denominators, fraction addition/subtraction, word problems.
- First users: students and teachers.
- Student experience: one decision per screen.
- First manipulation tool: fraction bars.
- Input model: manipulative choice + selected reason + optional short text.
- Teacher report: class-wide misconception summary first, then student-level detail.
- AI use: generate teacher-facing summary from anonymized logs only.
- Student-facing diagnosis: do not show detailed diagnosis to students in MVP.

## Visual Direction Cards

Use `ask-visual` to show or generate references for three directions:

A. Calm Teacher Dashboard

- Quiet, readable, classroom-friendly.
- Best for teacher trust and repeated daily use.
- Moderate density, clear tables, strong misconception labels.

B. Student Step-by-Step Playground

- Friendly, tactile, visual, and low-pressure.
- Best for grade 5 fraction interaction.
- Large fraction bars, progress strip, one judgment per screen.

C. Diagnostic Lab

- Analytical, precise, data-rich.
- Best for administrators, advanced teachers, or later versions.
- More charts, patterns, and drill-down views.

## Implementation Prompt

Build an MVP for a math solution-process analysis service.

The MVP targets grade 5 fraction learning. It should help students solve fraction problems step by step while collecting diagnostic signals for teachers. It is not a generic answer checker. Its core value is identifying where the student's mathematical thinking becomes unstable.

Create two primary surfaces:

1. Student solving flow
   - Show one problem at a time.
   - Split each problem into small diagnostic checkpoints.
   - Use fraction bars as the first manipulation tool.
   - Let students choose a reason for their action.
   - Allow optional short explanation.
   - Track step completion, changes, time signals, and "I don't know" behavior.

2. Teacher report
   - Start with a class-wide misconception summary.
   - Let the teacher drill into a student-level report.
   - Show whether errors come from concept choice, fraction equivalence, common denominator reasoning, computation, or word-problem interpretation.
   - Use direct, concise teacher-facing language.

Scope:

- Include 10 sample fraction problems.
- Include equivalent fractions, simplifying, common denominators, addition/subtraction, and simple word problems.
- Use mock data if no backend exists.
- Keep student diagnosis hidden from students in the MVP.
- Send only anonymized summary logs to any AI summary layer.

Acceptance criteria:

- A student can complete a step-by-step fraction problem.
- A teacher can see a class-wide summary and student detail.
- The interface clearly distinguishes final-answer correctness from process diagnosis.
- The visual design is readable for teachers and approachable for grade 5 students.
- The implementation includes a clear demo path and QA notes.
