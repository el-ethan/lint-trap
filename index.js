#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const lintFiles = require('./pre-commit.js');

const preCommitFilePath = './.git/hooks/pre-commit';
const preCommitFileContent = '#!/bin/sh\n\nlint-trap --check\n\nexit $?\n';
const gitPath = './.git/';


function main() {
    program
        .option('-c, --check', 'Check js files with linter')
        .option('-i, --init', 'Initialize git repo for use with pre-commit-lint')
        .option('-r, --remove', 'Don\'t track this repo with pre-commit-lint any more')
        .parse(process.argv);


    if (program.init) {
        const needsPreCommitHook = isGitRepo() && !hasPreCommitHook();
        if (needsPreCommitHook) {
            createPreCommitHook();
            console.log(`pre-commit hook file created at ${preCommitFilePath}`);
        } else {
            console.log('pre-commit file already exists.');
        }
    } else if (program.check) {
        lintFiles();
    }
}
main();


function isGitRepo() {
    try {
        return fs.lstatSync(gitPath).isDirectory();
    } catch(error) {
        return false;
    }
}


function hasPreCommitHook() {
    try {
        return fs.lstatSync(preCommitFilePath).isFile();
    } catch(error) {
        return false;
    }
}


function createPreCommitHook() {
    const createStream = fs.createWriteStream(preCommitFilePath);
    createStream.end();

    const writeStream = fs.createWriteStream(preCommitFilePath);
    writeStream.write(preCommitFileContent);
    writeStream.end();

    // Make file executable by Git
    fs.chmodSync(preCommitFilePath, '775');
}
