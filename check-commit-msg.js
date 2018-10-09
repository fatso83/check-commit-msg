/* eslint-disable no-console */
const fs = require("fs");
const process = require("process");
const chalk = require("chalk");
const isInMergeOrRebase = require("./is-rebase-merge.js")();

const printWarning = msg => console.warn(chalk.yellow(msg));
const printError = msg => console.warn(chalk.red(msg));
const absoluteMax = 80;
const recommendedMax = 50;
const errors = [];

/**
 * Check if the commit message follows a good standard
 *
 * @param {String} msg The multi-line message to check
 */
module.exports = function checkCommitMsg(commitMsg) {
  if (isInMergeOrRebase) {
    process.exit(0);
  }

  if (!commitMsg.match(/^[a-zA-Z]{2,6}-\d{1,5} /)) {
    errors.push(
      'Commit messages should be prefixed with the github issue number, i.e. "GH-637 Update design of ListView"'
    );
  }

  const firstLine = commitMsg.split("\n")[0];
  const len = firstLine.length;
  if (len > recommendedMax && len <= absoluteMax) {
    printWarning(
      "Subject lines should be kept short and sweet (i.e. < 50 chars). Use the body for details."
    );
  }

  if (firstLine.length > absoluteMax) {
    errors.push(
      `Too long subject line in git commit message! Max ${absoluteMax} characters.`
    );
  }

  if (errors.length) {
    printError("Commit message policy violation(s)!\n");
    printError(" - " + errors.join("\n - "));

    // https://chris.beams.io/posts/git-commit/#seven-rules
    console.log(`\nThe 7 rules of a good commit message

    1. Separate subject from body with a blank line
    2. Limit the subject line to 50 characters
    3. Capitalize the subject line
    4. Do not end the subject line with a period
    5. Use the imperative mood in the subject line
    6. Wrap the body at 72 characters
    7. Use the body to explain what and why vs. how
  `);
    console.log(
      chalk.green(
        "\nYou can skip the checks by passing the flag `--no-verify` to Git"
      )
    );
    process.exit(1);
  }
};
