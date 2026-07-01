# Changelog

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
