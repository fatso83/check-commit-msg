/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const rebasePath = path.join(__dirname, '..', '.git/rebase-merge');
const mergePath = path.join(__dirname, '..', '.git/MERGE_HEAD');
const isInMergeOrRebase = () => fs.existsSync(rebasePath) || fs.existsSync(mergePath);

if (require.main === module) {
  const result = isInMergeOrRebase();
  if (result) {
    console.log(`We are in the middle of a rebase or merge. Skipping`);
  }
  process.exit(result ? 0 : 1);
}

module.exports = isInMergeOrRebase;
