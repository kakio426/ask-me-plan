---
name: ask-architecture
description: Design a growth-shaped skeleton before a committed build, so the first implementation is above-MVP and cheap to deepen later. Use on the committed path when the user wants the result done right in one pass, cannot easily upgrade an MVP later, or when data model, module seams, and extension points must be settled before implementation.
---

# Ask Architecture

## Overview

Use this skill on the committed ("do it right in one pass") path, after the plan is clear and before `ask-prompt`.
Its job is to settle the parts that are expensive to change later — data model, module boundaries, what is real versus stubbed, and where the system is expected to grow — so the first build is not throwaway.

The user may be a vibe coder who cannot spec a skeleton in engineering terms. Therefore **the agent designs the skeleton and asks the user to confirm it in plain language.** Do not ask the user to choose data structures or patterns cold; propose a concrete skeleton, explain each choice in one plain sentence, and let the user approve, adjust, or reject.

## Principle

Plan effort in proportion to reversal cost.

- Expensive to change later (data model, seams, real-vs-stub split, extension points): settle these now, concretely.
- Cheap to change later (copy, colors, spacing, wording): do not over-specify here.

Minimal feature surface is fine and encouraged. A throwaway skeleton is the real problem, not a small feature set. Aim for: few features, each on a skeleton that assumes growth.

## What to Settle

Propose a concrete answer for each, then confirm:

- **Data model**: the core entities, their fields, and how they relate. Name the ones that must exist even in the first build.
- **Module seams**: how the product splits into parts that can be built and changed independently (for example, a solving surface versus a reporting surface), and the contract where they meet (what data crosses the boundary, in what shape).
- **Real vs stub**: which parts are built for real in the first pass, and which are deliberately stubbed (mock data, fake API) with a clear seam so the real version can drop in later without a rewrite.
- **Extension points**: the two or three most likely future additions, and where they would attach — so today's structure leaves room instead of blocking them.
- **State and data flow**: where state lives, what is the source of truth, and how data moves between the seams.

## Depth Tags

Tag each major unit so `ask-prompt` and `ask-ship` know where "good enough" is genuinely good enough:

- `core`: build to ship quality, no shortcuts. This is where the product's value lives.
- `scaffold`: a stub or mock is acceptable in the first pass, but the seam around it must be real so it can be upgraded cheaply.

Do not let everything default to one depth. The point is to send full effort to `core` and spend little on `scaffold`, rather than building everything uniformly thin.

## Guardrails

- Design the skeleton for the user; confirm in plain language rather than asking them to spec it.
- Keep the feature set minimal while keeping the skeleton growth-shaped.
- A `scaffold` unit still needs a real seam; a stub behind a fake boundary is not acceptable.
- Do not over-engineer for imagined scale. Leave room for the two or three likely additions, not every conceivable one.

## Output

Fold the result into the running plan's Confirmed Decisions so `ask-prompt` reads one plan:

- Data model (core entities and relationships)
- Module seams and their contracts
- Real vs stub split
- Extension points
- State / source of truth / data flow
- Depth tags per unit (`core` / `scaffold`)

This becomes the architectural backbone that `ask-prompt` turns into a thick, buildable prompt and that `ask-ship` slices and verifies against.
