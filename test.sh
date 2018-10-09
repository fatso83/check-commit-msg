#!/bin/sh

echo -n "Test CLI on good commit: "
node ./cli.js example.commit
[ $? = 0 ] && echo . || echo FAIL

echo -n "Test CLI on bad commit: "
node ./cli.js example.failing-length.commit > /dev/null 2>&1
[ $? = 1 ] && echo -n . || echo FAIL
node ./cli.js example.failing-prefix.commit > /dev/null 2>&1
[ $? = 1 ] && echo . || echo FAIL

echo -n "Test Husky "
GIT_PARAMS=example.commit ./husky.js 
[ $? = 0 ] && echo . || echo FAIL

