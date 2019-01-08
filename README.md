# Using `pre-commit-lint` in your project

1. Navigate to a git repo.
2. Run the command `pc-lint --init`. This will create a [`pre-commit`](https://githooks.com/) file in the `.git/hooks` directory of your repo.

Next time you commit any `.js` files, they will be run through a linter (by default this will be [`eslint`](https://eslint.org/)). If any of the `.js` files raise linting errors, your changes will not be committed, and you will see the `eslint` output in your console.

# Configuring `pre-commit-lint`

You can add an optional `.pc-lint-config.json` config file to the root of your repo. In this file you can configure the following options:

* **filesToIgnore**: an array of string file paths to files that should not be linted.
* **linter**: the string name of the linter you want to use. Currently, only eslint has been tested.

Here is an example `.pc-lint-config.json` with both these settings configured:

```json
{
    "filesToIgnore": ["my-minified-file.js", "legacy-file-with-too-many-errors.js"],
    "linter": "eslint"
}
```

By default, no files will be ignored, and eslint will be used as the linter. Any setting specified in the `pc-lint-config.json` will override only the value for that setting, and defaults will be maintained for all settings not configured by the user.
