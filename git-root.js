const pkgDir = require("pkg-dir");
const findUp = require("find-up");
const debug = require("debug")("check-commit-msg");

debug("cwd: ", process.cwd());
const rootOfScript = pkgDir.sync(__dirname); // start traversing up
const cachedResult = findUp.sync(".git", {
  type: "directory"
});

debug("script location: " + rootOfScript);
debug("found git root: ", cachedResult);

module.exports = cachedResult;
