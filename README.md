To use `pre-commit-lint` in your project:

1. Add `pre-commit.js` to the root of your repo.
2. Add `pre-commit` to the `.git/hooks/` directory in your repo.

This will use git's [pre-commit hook](https://githooks.com/) to run all `.js` that have changes to commit through a linter (by default this will be [`eslint`](https://eslint.org/)). If any of the `.js` files that have changes raise linting errors, your changes will not be committed, and you will see the `eslint` output in your console.