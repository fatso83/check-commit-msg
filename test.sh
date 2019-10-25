#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# assert(exit_status, cmd)
assert_exit_status(){
    local exit_status=$1
    local cmd=$2
    bash -c "$cmd" > /dev/null 2>&1
    [ $? = $exit_status ] && echo OK || echo FAIL
}

# test_ok("descriptive title", cmd)
test_ok(){
    local title=$1
    local cmd=$2
    local exit_status=0
    echo -n "$title : "
    assert_exit_status $exit_status "$cmd"
}

test_failed(){
    local title=$1
    local cmd=$2
    local exit_status=1
    echo -n "$title : "
    assert_exit_status $exit_status "$cmd"
}

test_ok "Test CLI on good commit" "node ./cli.js example.commit"

test_failed "Test CLI on failing length" "node ./cli.js example.failing-length.commit" 
test_failed "Test CLI on failing length" "node ./cli.js example.failing-prefix.commit"

test_ok "Test Husky script" "HUSKY_GIT_PARAMS=example.commit ./husky.js"

# Simulate a git dir
pushd $(mktemp -d) > /dev/null
mkdir .git
test_failed "is-rebase-merge should exit with 1 (false) in normal cases" "node $SCRIPT_DIR/is-rebase-merge.js"

# setup a simulation of a merge
touch .git/MERGE_HEAD
test_ok "is-rebase-merge should exit with 0 (true) in case of a merge" "node $SCRIPT_DIR/is-rebase-merge.js"

