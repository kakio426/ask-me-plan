# Example: Bakery Pickup-Order Page (ask-light fast path)

This example shows the fast path: a small, concrete, non-education request handled by `ask-light` in a single round, using the shared Confirmed Decisions / Assumptions / Open Questions / Non-Goals output format.

## Starting Request

> 우리 동네 빵집 홈페이지 하나 만들어줘. 메뉴 보여주고 픽업 주문만 받을 수 있으면 돼.

## Skill Chain

```text
ask-light -> ask-build
```

No `ask-visual`, `ask-educator`, or `ask-risk` needed here: the request is small, has no education context, and the owner has no strong design opinion yet.

## Interview (Single Round)

1. 이 페이지의 첫 목표는 메뉴 노출이야, 픽업 주문 접수야, 둘 다야?
2. 주문은 결제까지 온라인으로 받을까, 픽업 시간만 예약하고 결제는 매장에서 할까?
3. 메뉴는 몇 개 정도이고, 매일 바뀌는 품목이 있어?
4. 참고하고 싶은 다른 빵집·카페 사이트가 있어?
5. 완성 기한이나 플랫폼 제약이 있어?

## User's Answer

> 목표는 픽업 주문 접수가 우선이고 메뉴는 그다음이야. 결제는 매장에서 받을 거라 예약만 받으면 돼. 메뉴는 15개 정도, 품절은 그날그날 바뀔 수 있어. 참고 사이트는 따로 없어. 모바일에서 잘 보이면 되고 이번 주말까지 데모 보고 싶어.

## Resulting Output

**Confirmed Decisions**

- Primary goal: accept pickup-time reservations; menu browsing is secondary.
- Payment: in-store only; the site collects pickup reservations, not payments.
- Menu size: about 15 items, with same-day sold-out status.
- Platform: mobile-first responsive web.
- Timeline: a demo is needed by this weekend.

**Assumptions**

- No brand or reference site was given, so `ask-visual` was skipped. A plain, legible bakery-warm style is used as a placeholder and can be revisited later.
- Sold-out status is toggled manually by the owner; no inventory system exists yet.

**Open Questions**

- None blocking for the demo.

**Non-Goals**

- Online payment.
- Multi-location or delivery support.
- Customer accounts or order history.

**Implementation Prompt**

Build a mobile-first bakery ordering page.

The page has two jobs: show the day's menu (about 15 items, each with a sold-out toggle) and let a customer reserve a pickup time. It does not process payment; payment happens in-store.

Include:

- A menu list with name, short description, price, and a sold-out badge when applicable.
- A pickup reservation flow: pick items, pick a pickup time slot, enter a name and phone number, confirm.
- A simple owner view (or a mock-data toggle) to mark items sold out for the day.

Use mock data if no backend exists yet. Keep the visual style plain and legible; no brand direction was chosen yet.

Acceptance criteria:

- A customer can browse the menu and see which items are sold out.
- A customer can complete a pickup reservation without entering payment information.
- The page is usable on a phone-sized screen.
- A demo path exists that does not require a real backend.

## Why This Is a Good Fast-Path Example

- Five questions in one round were enough; no follow-up round was needed.
- The output uses the same section names as the education example, so `ask-prompt` and `ask-build` do not need to guess the structure.
- `ask-visual`, `ask-educator`, and `ask-risk` were correctly skipped because none of their trigger conditions applied — the skill chain adapts to the size of the request instead of always running every step.
