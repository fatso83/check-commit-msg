#!/usr/bin/env node
/**
 * Entry-point for the NPM based commit-hooks utility Husky
 *
 * Usage:
 *  - Install Husky: `npm install husky -D`
 *  - Put this in your package.json's script section:
 *      "commitmsg": "node -r '@fatso83/check-commit-msg/husky'"
 */

const fs = require("fs");
const path = require("path");
const filename = process.env["GIT_PARAMS"].split(" ")[0]; // typically '.git/COMMIT_EDITMSG'

function levelsBelowGitRoot() {
  // https://github.com/git/git/blob/77bd3ea9f54f1584147b594abc04c26ca516d987/Documentation/RelNotes/1.7.6.txt#L29-L31
  //  "Processes spawned by "[alias] <name> = !process" in the configuration
  //   can inspect GIT_PREFIX environment variable to learn where in the
  //   working tree the original command was invoked.
  //  "
  const subDirectoryOfRoot = process.env["GIT_PREFIX"] || "";
  const levels = subDirectoryOfRoot.split("/").filter(n => n).length;
  return levels;
}

// Handle issue #2: https://github.com/fatso83/check-commit-msg/issues/2
// sometimes the directory of the frontend project is not at the root of the git repo
// that makes many Git hooks fail when executed through Husky, as Husky changes
// the working directory to the sub-folder where `package.json` is, making
// hooks that rely on file paths being relative to the repo root fail
const dirPrefix = path.resolve(
  path.join(...Array(levelsBelowGitRoot()).fill(".."))
);
const fullFilePath = path.join(dirPrefix, filename);
const commitMsg = fs.readFileSync(fullFilePath).toString();

// GIT_DIR is originally set by GIT when executing the hook, but as it's a relative directory
// to the current working directory (which is the root in git's book), this ends up wrong when
// Husky changes the current working directory. We therefore need to reset it to make
// all the Git commands work, as they all utilize GIT_DIR when accessing .git/* files
// See https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables#_repository_locations
process.env["GIT_DIR"] = path.join(dirPrefix, ".git");
const checkCommitMsg = require("./check-commit-msg");

checkCommitMsg(commitMsg);
