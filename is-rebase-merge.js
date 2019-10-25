/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const rootDir = require("./git-root");
const debug = require("debug")("check-commit-msg.is-rebase-merge");

const rebasePath = path.join(rootDir, "rebase-merge");
const mergePath = path.join(rootDir, "MERGE_HEAD");
const isInMergeOrRebase = () =>
  fs.existsSync(rebasePath) || fs.existsSync(mergePath);

debug("rebase", rebasePath);
debug("merge", mergePath);

// this path only happens if testing the script alone
if (require.main === module) {
  const result = isInMergeOrRebase();
  if (result) {
    console.log(`We are in the middle of a rebase or merge. Skipping`);
  }
  process.exit(result ? 0 : 1);
}

module.exports = isInMergeOrRebase;
