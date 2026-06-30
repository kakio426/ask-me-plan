# Ask Me Plan

Ask before building. A Codex skill suite for turning vague ideas into precise plans and implementation prompts.

만들기 전에 묻고, 모호한 아이디어를 실행 가능한 개발 프롬프트로 바꾸는 Codex 스킬 모음입니다.

## Skills

| Skill | Purpose |
| --- | --- |
| `ask-light` | Ask 3-5 quick questions before a small build. |
| `ask-standard` | Run the default planning interview for services, websites, apps, and content. |
| `ask-deep` | Run a detailed multi-round interview for complex projects. |
| `ask-visual` | Present A/B/C visual style cards using references or generated images. |
| `ask-educator` | Clarify education products, learning content, diagnostics, and feedback. |
| `ask-prompt` | Convert interview results into an implementation-ready prompt. |
| `ask-build` | Start implementation from an approved plan, with builder/reviewer/QA roles when available. |
| `ask-risk` | Find assumptions, contradictions, missing requirements, and rework risks. |

## Philosophy

AI often starts building before it understands what the user really wants. Ask Me Plan adds a planning layer that makes the agent ask better questions, confirm decisions, and preserve the user's intent before implementation.

Core rules:

- Follow the user's language.
- Ask in short interview rounds.
- Separate confirmed decisions from assumptions.
- Stop asking when the user says to proceed.
- Produce prompts that a coding agent can execute.
- Ask before starting implementation.

## Suggested Workflow

```text
ask-light / ask-standard / ask-deep
        -> ask-visual, when design matters
        -> ask-educator, when learning context matters
        -> ask-risk, when ambiguity is costly
        -> ask-prompt
        -> ask-build
```

## Installation

Copy the skill folders you want into your Codex skills directory:

```bash
cp -R skills/ask-standard ~/.codex/skills/
cp -R skills/ask-visual ~/.codex/skills/
cp -R skills/ask-prompt ~/.codex/skills/
```

Or copy all of them:

```bash
cp -R skills/ask-* ~/.codex/skills/
```

Restart Codex after installing new skills if they do not appear immediately.

## Example

See `examples/math-solution-analysis.md` for a first test case: a math solution-process analysis service for grade 5 fraction learning.

## Roadmap

Potential future skills:

- `ask-flow`: clarify user flows and screen transitions.
- `ask-scope`: split now/later/never scope.
- `ask-acceptance`: define completion and QA criteria.
- `ask-user`: deepen audience, persona, and context questions.
- `ask-memory`: summarize confirmed decisions for reuse across future sessions.

## License

MIT
