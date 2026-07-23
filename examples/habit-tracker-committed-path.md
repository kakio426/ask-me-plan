# Example: Habit Tracker (committed path, above-MVP in one pass)

This example shows the committed path end to end: `ask-architecture -> ask-prompt (committed) -> ask-ship`. The goal is not a throwaway MVP but an above-MVP first result — a small feature set, each core piece built to ship quality on a skeleton that can grow.

Compare this with `bakery-ordering-site.md` (the light path). Same suite, different depth.

## Starting Request

> 습관 트래커 앱을 만들고 싶어. 매일 습관 체크하고, 스트릭(연속 기록) 보여주고, 주간 통계. 근데 나중에 하나하나 고치기 힘드니까 처음부터 제대로 나왔으면 좋겠어.

The last sentence ("나중에 하나하나 고치기 힘드니까 처음부터 제대로") is the committed-path signal. The user cannot cheaply upgrade an MVP later, so depth is front-loaded.

## Skill Chain

```text
ask-plan (committed path) -> ask-deep -> ask-architecture -> ask-prompt (committed) -> ask-risk -> ask-ship
```

`ask-risk` runs before `ask-ship` because front-loading depth raises the cost of a wrong plan.

## Step 1 — ask-architecture (agent designs, user confirms in plain language)

The user is a vibe coder, so the agent proposes a concrete skeleton and explains each choice in one plain sentence.

**Data model** (core entities that must exist even in the first build)

- `Habit`: id, name, schedule (which weekdays), createdAt, archivedAt.
- `Checkin`: id, habitId, date, status (done / skipped). One per habit per day.
- Streak and weekly stats are **derived** from checkins, not stored — so they can never drift out of sync with the raw record.

Plain-language reason given to the user: "스트릭이랑 통계는 따로 저장하지 않고 체크 기록에서 계산할게요. 그래야 나중에 기록을 고쳐도 숫자가 자동으로 맞아요."

**Module seams**

- `data` (storage + the checkin/habit model) — the source of truth.
- `stats` (pure functions: checkins in, streak and weekly numbers out) — no storage, no UI.
- `ui` (screens) — reads from `data` and `stats`, never computes its own numbers.

Contract at the seam: `stats` takes a list of checkins and returns numbers; it never touches storage. This is what lets the storage layer be swapped later without touching the stats or UI.

**Real vs stub**

- `core`: the checkin flow, the streak/stats calculation, and local persistence — built for real.
- `scaffold`: cloud sync. Not built now, but `data` is written behind a small storage interface so a real backend can drop in later without rewriting the app.

**Extension points (the two or three likely additions)**

- Reminders/notifications → attach to `Habit.schedule`.
- Cloud sync → drop in behind the storage interface.

**Depth tags**

- `core`: checkin flow, streak/stats engine, local persistence.
- `scaffold`: cloud sync (interface only), settings screen.

## Step 2 — ask-prompt (committed output)

The prompt carries the architectural backbone, depth tags, a definition-of-done per core unit, and an ordered checklist.

**Architectural backbone**: as confirmed above (data model, three seams, storage interface for later sync).

**Ordered implementation checklist** (dependency order)

- R1 (`core`): data layer — Habit/Checkin model behind a storage interface, with local persistence.
- R2 (`core`): stats engine — pure functions for current streak, longest streak, and weekly completion rate.
- R3 (`core`): checkin flow — today's habits, mark done/skipped, one checkin per habit per day, editable.
- R4 (`core`): stats view — streak and weekly numbers, reading only from the stats engine.
- R5 (`scaffold`): settings — create/archive habits, edit schedule. Basic but real seams.
- R6 (`scaffold`): cloud sync — interface stub only; no real backend this pass.

**Definition of done (core units)** — what "finished" means beyond "it exists":

- R2 streak engine: handles no checkins (streak 0), a single day, gaps that break a streak, skipped days per the rule the user picked, and week boundaries. Numbers computed, never hardcoded.
- R3 checkin flow: handles the empty state (no habits yet), a fully-completed day, editing a past checkin, and prevents a second checkin for the same habit/day. Real copy, not placeholder.
- R4 stats view: renders correctly with zero data and with a long history; no fake sample numbers left in.

## Step 3 — ask-risk (before shipping)

Change log produced:

- `Streak counts skipped days as breaks -> streak treats an explicit "skip" as neutral (does not break), a missed day breaks it (addresses: streak rule ambiguity)`.
- `Weekly stats week starts Sunday -> week starts Monday to match the user's locale (addresses: locale mismatch)`.

These fold into Confirmed Decisions and are passed to the final prompt, which `ask-prompt` checks line by line so neither is lost.

## Step 4 — ask-ship (committed build)

1. Checklist already exists (R1–R6), ordered by dependency.
2. Size check: large enough to slice. Units are grouped along the seams: `data` (R1), `stats` (R2), `ui` (R3+R4), `scaffold` (R5+R6). No two builders touch the same files.
3. Build unit by unit to each definition-of-done:
   - R1 built and persisted; storage interface in place.
   - R2 streak engine built to its bar: all edge cases above handled, verified with the risk-review streak rule (skip = neutral, miss = break).
   - R3/R4 built: empty states, edit path, and duplicate-prevention all handled; no placeholder copy or sample numbers.
   - R5/R6 kept minimal but with real seams (storage interface, settings that actually create/archive).
4. Seam verification: confirm `ui` reads streak/weekly numbers only from `stats`, and `stats` receives checkins only from `data`. A number rendered in the UI must trace back to a real checkin, not a local calculation.
5. Checklist reconciliation, item by item:

   | Item | Implemented | Meets definition-of-done |
   | --- | --- | --- |
   | R1 data layer | yes | yes |
   | R2 stats engine | yes | yes (all edge cases + risk rule) |
   | R3 checkin flow | yes | yes (empty/edit/duplicate handled) |
   | R4 stats view | yes | yes (zero-data and long-history) |
   | R5 settings | yes | scaffold: basic, real seams |
   | R6 cloud sync | interface only | scaffold: stub, real seam |

6. Any missing or thin `core` item would go back to step 3. Here all core items meet their bar.
7. Report: checklist with statuses, seam-verification result (numbers trace to real checkins), what passed, and that cloud sync is a deliberate stub behind a real interface.

## Multi-Agent Shape (if subagents are available)

- Builders: one for the `stats` engine (R2, the deepest logic), one for the `ui` units (R3+R4). Each carries its definition-of-done and the anti-stub rules. The `data` and `scaffold` units share a builder.
- Reviewer: one, whole. Its focus is the seam between the stats engine and the UI — the exact place a split build could drift (a number the UI shows that the engine did not actually produce).
- QA: one, whole. Drives the app end to end: create a habit, check in across several days with a gap and a skip, confirm the streak and weekly numbers match the rule.

## Why This Is a Good Committed-Path Example

- The feature set is small (six units), but each core unit is built to a real completion bar, not a stub.
- The skeleton assumes growth: sync and reminders have a place to attach, so deepening later does not mean a rewrite — the whole point for a vibe coder.
- Stats are derived, not stored, so the expensive-to-reverse decision (how numbers relate to raw data) was settled in `ask-architecture`, not discovered mid-build.
- Slicing + checklist caught completeness; definition-of-done + anti-stub caught depth; seam verification caught the connection. Three different failures, three different mechanisms.
