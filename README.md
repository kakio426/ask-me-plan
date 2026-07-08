# Ask Me Plan

AI가 만들기 전에 먼저 묻게 하는 Codex/Claude Code 스킬 모음입니다.

모호한 아이디어를 바로 구현하지 않고, 사용자의 답변을 바탕으로 기획을 구체화한 뒤 실행 가능한 개발 프롬프트로 정리합니다.

## 설치

전체 스킬 설치 (기본값은 Codex, `~/.codex/skills`):

```bash
npx github:kakio426/ask-me-plan
```

Claude Code에 설치:

```bash
npx github:kakio426/ask-me-plan install --tool claude
```

일부 스킬만 설치:

```bash
npx github:kakio426/ask-me-plan install --skills ask-standard,ask-visual,ask-educator
```

설치 경로 직접 지정:

```bash
npx github:kakio426/ask-me-plan install --target ~/.codex/skills
```

포함된 스킬 목록 확인:

```bash
npx github:kakio426/ask-me-plan list
```

설치한 스킬 제거:

```bash
npx github:kakio426/ask-me-plan uninstall --skills ask-deep
```

설치 후 Codex나 Claude Code에서 스킬이 바로 보이지 않으면 해당 도구를 재시작하세요.

현재 공식 설치 방식은 GitHub 기반 npx입니다. npm registry 배포는 보류 중이므로 `npx ask-me-plan`이 아니라 `npx github:kakio426/ask-me-plan`을 사용합니다.

## 사용 예시

```text
$ask-plan 써서 이거 어떤 스킬로 시작할지 정해줘.
```

```text
$ask-standard 써서 이 서비스 기획을 질문하면서 구체화해줘.
```

```text
$ask-visual 써서 UI 방향을 A/B/C 스타일로 비교해줘.
```

```text
$ask-educator 써서 교육 서비스 기획을 학습자, 학습목표, 피드백 기준까지 구체화해줘.
```

## 스킬 구성

| 스킬 | 역할 |
| --- | --- |
| `ask-plan` | 요청 규모를 파악해 light/standard/deep과 필요한 부가 스킬로 안내합니다. |
| `ask-light` | 작은 작업 전에 3-5개 핵심 질문만 묻습니다. |
| `ask-standard` | 서비스, 웹페이지, 앱, 콘텐츠를 만들기 전 기본 기획 인터뷰를 진행합니다. |
| `ask-deep` | 복잡한 프로젝트를 여러 라운드 질문으로 깊게 구체화합니다. |
| `ask-visual` | UI, 디자인, 이미지풍을 A/B/C 스타일 카드로 비교합니다. |
| `ask-educator` | 교육 서비스, 학습 콘텐츠, 진단, 피드백 기준을 구체화합니다. |
| `ask-risk` | AI가 오해할 수 있는 가정, 모순, 빠진 요구사항을 찾습니다. |
| `ask-prompt` | 인터뷰 결과를 구현 가능한 개발 프롬프트로 정리합니다. |
| `ask-build` | 확정된 기획으로 구현을 시작하되, 먼저 사용자 확인을 받습니다. |

## 철학

AI는 사용자의 의도를 완전히 이해하기 전에 구현을 시작할 때가 많습니다. Ask Me Plan은 구현 전에 질문하고, 사용자의 답변을 결정사항으로 정리하고, 오해 가능성을 줄이는 기획 레이어입니다.

핵심 규칙:

- 사용자의 언어를 따라갑니다.
- 질문을 한 번에 쏟아내지 않고 짧은 라운드로 나눕니다.
- 확정된 결정, 가정, 열린 질문을 분리합니다.
- 사용자가 진행하라고 하면 질문을 멈춥니다. 단, 요청이 너무 모호해서 가정이 크게 빗나갈 수 있으면 딱 하나만 확인하고 넘어갑니다.
- 리스크 점검에서 나온 수정사항은 변경 로그로 남겨 최종 프롬프트에 빠짐없이 반영합니다.
- 최종 결과를 개발자가 바로 실행할 수 있는 프롬프트로 정리합니다.
- 구현 시작 전 확인은 한 번만 받습니다. 이미 확인받았다면 다시 묻지 않습니다.

## 추천 흐름

```text
ask-plan, 어떤 스킬로 시작할지 모를 때
        -> ask-light / ask-standard / ask-deep
        -> ask-visual, 디자인 방향이 중요할 때
        -> ask-educator, 교육/학습 맥락이 중요할 때
        -> ask-risk, 모호함이 재작업으로 이어질 수 있을 때
        -> ask-prompt
        -> ask-build
```

## 예시

첫 대표 예시는 초등 5학년 분수 학습을 위한 수학 풀이과정 분석 서비스입니다.

- `examples/math-solution-analysis.md`: 최종 기획 요약과 구현 프롬프트
- `examples/math-solution-analysis-interview.md`: 질문과 답변으로 기획이 구체화되는 대화형 과정

교육 도메인이 아닌, `ask-light` 한 라운드로 끝나는 빠른 경로 예시도 있습니다.

- `examples/bakery-ordering-site.md`: 빵집 픽업 주문 페이지를 질문 5개, 한 라운드로 기획하는 과정

## 로드맵

추가 후보 스킬:

- `ask-flow`: 사용자 흐름과 화면 전환을 구체화합니다.
- `ask-scope`: 지금 만들 것, 나중에 만들 것, 만들지 않을 것을 분리합니다.
- `ask-acceptance`: 완료 기준과 QA 기준을 정의합니다.
- `ask-user`: 대상 사용자, 상황, 페르소나를 더 깊게 구체화합니다.
- `ask-memory`: 세션 간 검색과 요약까지 포함해 결정 이력을 재사용합니다. (`ask-deep`/`ask-standard`가 라운드마다 `PLAN.md`에 저장하는 기본형은 이미 반영되어 있습니다.)

## 라이선스

MIT

---

## English

Ask Me Plan is a Codex and Claude Code skill suite that makes AI ask before building.

It turns vague ideas into precise plans and implementation-ready prompts through guided interviews.

### Installation

Install all skills (defaults to Codex, `~/.codex/skills`):

```bash
npx github:kakio426/ask-me-plan
```

Install for Claude Code:

```bash
npx github:kakio426/ask-me-plan install --tool claude
```

Install selected skills:

```bash
npx github:kakio426/ask-me-plan install --skills ask-standard,ask-visual,ask-educator
```

List included skills:

```bash
npx github:kakio426/ask-me-plan list
```

Remove installed skills:

```bash
npx github:kakio426/ask-me-plan uninstall --skills ask-deep
```

Restart Codex or Claude Code if the skills do not appear immediately.

The official install path is currently GitHub-based npx. npm registry publishing is deferred, so use `npx github:kakio426/ask-me-plan` instead of `npx ask-me-plan`.

### Skills

| Skill | Purpose |
| --- | --- |
| `ask-plan` | Size the request and route to light/standard/deep plus any add-on skills. |
| `ask-light` | Ask 3-5 quick questions before a small build. |
| `ask-standard` | Run the default planning interview for services, websites, apps, and content. |
| `ask-deep` | Run a detailed multi-round interview for complex projects. |
| `ask-visual` | Present A/B/C visual style cards using references or generated images. |
| `ask-educator` | Clarify education products, learning content, diagnostics, and feedback. |
| `ask-risk` | Find assumptions, contradictions, missing requirements, and rework risks. |
| `ask-prompt` | Convert interview results into an implementation-ready prompt. |
| `ask-build` | Start implementation from an approved plan after user confirmation. |

### Workflow

```text
ask-plan, when you are not sure where to start
        -> ask-light / ask-standard / ask-deep
        -> ask-visual, when design matters
        -> ask-educator, when learning context matters
        -> ask-risk, when ambiguity is costly
        -> ask-prompt
        -> ask-build
```

### Philosophy

AI often starts building before it understands what the user really wants. Ask Me Plan adds a planning layer that makes the agent ask better questions, confirm decisions, and preserve the user's intent before implementation.

Core rules:

- Follow the user's language.
- Ask in short interview rounds.
- Separate confirmed decisions from assumptions.
- Stop asking when the user says to proceed, but ask exactly one question first if the request is too vague to guess safely.
- Track risk-review changes in a change log so nothing gets lost on the way to the final prompt.
- Produce prompts that a coding agent can execute.
- Confirm once before starting implementation — never ask twice for the same handoff.
