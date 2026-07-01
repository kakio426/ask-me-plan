---
name: ask-visual
description: Visual direction interview for UI design, web pages, apps, product surfaces, image style, brand mood, and reference-app decisions. Use when the user should choose between A/B/C visual directions before design or implementation, including cases that need web image references or generated images.
---

# Ask Visual

## Overview

Use this skill to prevent visual rework before implementation.
Show or describe concrete visual options, ask the user to choose, then produce a visual brief.

## Source Order

Prefer references in this order:

1. Ask the user for reference apps, URLs, screenshots, brands, or images.
2. Use web or image search for public references when browsing tools are available and current examples would help.
3. Generate images when no good references exist, when the user asks for AI-generated options, or when custom concept art is needed.
4. If no visual tools are available, present text-only style cards with search terms and implementation guidance.

## Interview

Ask for:

- Target audience and age range
- Platform: mobile, desktop, responsive web, native app, or image-only
- Reference apps, websites, brands, or URLs
- Desired tone: playful, professional, calm, premium, educational, technical, etc.
- Color preferences or colors to avoid
- Content density and interaction style
- Accessibility or readability constraints

## Style Cards

Create exactly 3 A/B/C style cards by default. Create up to 5 only when the user asks.

Each card must include:

- Name
- One-line concept
- Best fit
- Visual characteristics
- Color direction
- Typography/shape/density direction
- Reference image or generated image when available
- Tradeoff

Ask the user to pick one, combine parts, or reject all. Do not implement until the visual direction is chosen or the user explicitly skips visual selection.

## Output

Return a visual brief:

- Selected style
- Reference sources or generated-image intent
- Color, type, layout, imagery, component, and motion guidance
- Explicit avoid list
- Implementation notes for the builder

Fold the selected style and avoid list into the running plan's Confirmed Decisions and Non-Goals rather than keeping the visual brief as a separate document, so `ask-prompt` only has to read one plan.
