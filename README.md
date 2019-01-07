To use `pre-commit-lint` in your project:

1. Navigate to a git repo.
2. Run the command `pc-lint --init`. This will create a `pre-commit` file in the `.git/hooks` directory of your repo.

Next time you commit any `.js` files, they will be run through a linter (by default this will be [`eslint`](https://eslint.org/)). If any of the `.js` files raise linting errors, your changes will not be committed, and you will see the `eslint` output in your console.
