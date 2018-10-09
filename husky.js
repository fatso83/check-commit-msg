#!/usr/bin/env node
/**
 * Entry-point for the NPM based commit-hooks utility Husky
 *
 * Usage:
 *  - Install Husky: `npm install husky -D`
 *  - Put this in your package.json's script section:
 *      "commitmsg": "node -r '@fatso83/check-commit-msg/husky'"
 */
const fs = require('fs');
const filename = process.env['GIT_PARAMS'].split(' ')[0];
const commitMsg = fs.readFileSync(filename).toString();

const checkCommitMsg = require('./check-commit-msg');

checkCommitMsg(commitMsg);
