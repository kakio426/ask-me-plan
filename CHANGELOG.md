# Changelog

## 0.3.1

- Close a fallback gap in the Multi-Agent Mode of `ask-build` and `ask-ship`. Both previously handled only "multi-agent tools are unavailable", so an agent in a session where the tools exist but spawning is policy-restricted had no stated path and could stall asking for permission. Both skills now treat absent tools and restricted spawning as the same condition, state that seeing a spawn tool is not permission to use it, and fall back to the sequential roles directly. `ask-ship` additionally reports that the roles ran sequentially.

## 0.3.0

- Add two build paths and let the user choose. The **light path** (`ask-prompt -> ask-build`) stays as before for quick MVP output. The new **committed path** (`ask-architecture -> ask-prompt -> ask-ship`) produces an above-MVP first result: a minimal feature set, but each core unit built to ship quality on a growth-shaped skeleton.
- Add `ask-architecture`: the agent designs a growth-shaped skeleton (data model, module seams, real-vs-stub split, extension points) and confirms it in plain language, so a vibe coder does not have to spec it. Effort is spent in proportion to reversal cost — settle what is expensive to change later, leave the cheap stuff loose.
- Add `ask-ship`: a committed, above-MVP build that slices the work along architectural seams, builds each unit to its definition-of-done under explicit anti-stub rules, verifies the seams connect, and reconciles against an item-by-item checklist. Deep units get their own builder subagent; the reviewer and QA stay single and whole to catch the seams between them.
- Add depth tags (`core` / `scaffold`) so full effort goes to what matters and stubs stay where they belong, instead of building everything uniformly thin.
- Extend `ask-prompt` with a committed output mode that emits the architectural backbone, depth tags, per-core-unit definition-of-done, and an ordered implementation checklist for `ask-ship` to build and verify against.
- Add path selection to `ask-plan`: one triage question (quick MVP vs done-right-in-one-pass) and committed-path routing.

## 0.2.1

- Stop `ask-build` from asking to confirm a second time when `ask-prompt` already asked "Ready to build?" and the user said yes.
- Cap the opt-out path in `ask-plan`, `ask-light`, `ask-standard`, and `ask-deep` at exactly one clarifying question when the request is too vague to guess safely, instead of always skipping straight to assumptions.
- Add a `Before -> After` change log to `ask-risk`, and have `ask-prompt` check the final prompt against it line by line, so a risk-review finding can no longer be silently dropped on the way to the final prompt.

## 0.2.0

- Add `ask-plan`, an entry-point skill that triages a request into `ask-light`, `ask-standard`, or `ask-deep`, and pulls in `ask-visual`, `ask-educator`, or `ask-risk` when they apply.
- Add a shared Confirmed Decisions / Assumptions / Open Questions / Non-Goals output format across `ask-light`, `ask-standard`, `ask-deep`, `ask-visual`, `ask-educator`, and `ask-risk` so state carries cleanly through the chain into `ask-prompt`.
- Add an opt-out path to `ask-plan`, `ask-light`, `ask-standard`, and `ask-deep` for users who want to skip straight past the interview.
- Add `PLAN.md` persistence guidance to `ask-deep` and `ask-standard` so long or multi-session interviews survive context compaction; `ask-build` now treats an existing `PLAN.md` as the source of truth for scope.
- Add an explicit fix-and-re-review loop to `ask-build` for when QA or review finds a problem, instead of allowing an unresolved failure to be reported as done.
- Add Claude Code support to the installer: `ask-me-plan install --tool claude` targets `~/.claude/skills` and skips the Codex-only `agents/` metadata folder.
- Add `ask-me-plan uninstall` to remove previously installed skills.
- Install output now marks each skill `(new)` or `(updated)`.
- Add a GitHub Actions workflow that runs the test suite on push and pull request across Node 18/20/22.
- Add a non-education example (`examples/bakery-ordering-site.md`) showing the `ask-light` fast path end to end.
- Remove a stray duplicate Korean sentence in `ask-light` for consistency with the other skill files.

## 0.1.0

- Initial release: `ask-light`, `ask-standard`, `ask-deep`, `ask-visual`, `ask-educator`, `ask-risk`, `ask-prompt`, `ask-build`.
