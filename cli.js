#!/usr/bin/env node
/**
 * Standalone checker of commit messages
 *
 * Usage: check-commit-msg <file>
 */
const fs = require("fs");
const filename = process.argv[2];

if (!filename) {
  process.stdout.write("Missing filename with commit message");
  process.exit(1);
}

const commitMsg = fs.readFileSync(filename).toString();
const checkCommitMsg = require("./check-commit-msg");

checkCommitMsg(commitMsg);
