# Contributing to Civita / Avento

Thanks for helping improve the project! This short guide explains how to contribute, the branch strategy, and code expectations so PRs are easy to review.

## Getting started

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/short-description`.
3. Implement changes and commit logically.
4. Push to your fork and open a Pull Request against `main`.

## Commit messages

- Use clear, imperative commit messages: `feat(match): add soft-lock payment window`.
- Group related work into a single PR where possible.

## Branching & PRs

- Branch names: `feat/`, `fix/`, `chore/`, `refactor/`.
- Target `main` by default. Provide a short description and checklist in the PR body.

## Tests & quality

- Add unit or integration tests when you change business logic (services, payment flow, trust score).
- Run linters and type-check before opening PRs.

## Review checklist (for PR authors)

- Does the change include necessary tests?
- Are imports updated (no unresolved paths)?
- Is the change backwards-compatible for the dev/mocks flow?
- Have you updated `mockDataService` if new pages need sample data?

## Local development checklist

```bash
npm install
npm run dev
```

If you modify services, run the app and exercise flows in the browser to confirm mock behavior.

---

Thanks — maintainers will review PRs and ask for changes if needed.
