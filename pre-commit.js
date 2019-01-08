const { exec } = require('child-process-promise');
const process = require('process');

const defaultConfig = {
    filesToIgnore: [],
    linter: 'eslint'
};

let userConfig;
try {
    const configFromFile = require('./.pc-lint-config.json');
    userConfig = Object.assign(defaultConfig, configFromFile);
} catch(error) {
    userConfig = defaultConfig;
}


async function main() {
    const results = await lintFiles();
    if (results.exitCode === 1 && results.output) {
        console.log(results.output);
        console.log(`You have some linting errors.
Please see the output above and fix the errors before commiting,
or ignore errors and commit using \`git commit --no-verify\`.`);
    }
    process.exit(results.exitCode);
}


async function getFilesToLint() {
    const filesToLint = await exec('git diff HEAD --name-only').then(({stdout}) => {
        const files = stdout.split('\n');
        const filesToLint = files.filter(thisFile => {
            return thisFile.endsWith('.js') && !userConfig.filesToIgnore.includes(thisFile);
        });
        return filesToLint;
    });
    return filesToLint;
}


async function lintFiles() {
    const filesToLint = await getFilesToLint();
    return exec(`${userConfig.linter} ${filesToLint.join(' ')}`)
        .then(({stdout}) => {
            return {exitCode: 0, output: stdout};
        })
        .catch(({stdout}) => {
            return {exitCode: 1, output:stdout};
        });
}


module.exports = main;
