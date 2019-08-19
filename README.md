# @fatso83/check-commit-msg
> Simple util to check that commits follow a certain template

## The 7 rules of a good commit message

    1. Separate subject from body with a blank line
    2. Limit the subject line to 50 characters
    3. Capitalize the subject line
    4. Do not end the subject line with a period
    5. Use the imperative mood in the subject line
    6. Wrap the body at 72 characters
    7. Use the body to explain what and why vs. how

[Source: Chris Beams](https://chris.beams.io/posts/git-commit/#seven-rules)

Currently it also checks if your commit starts with a JIRA identifier (FOO-123) as well,
but this is easy to fix/remove.

## General Usage
```
npm install -g @fatso83/check-commit-msg
echo << 'EOF' > .git/hooks/commit-msg 
check-commit-msg $1
EOF
chmod +x .git/hooks/commit-msg  #make it executable
```

## Using with Husky
If you use `husky` in your NPM commit hooks
```
 npm install -D @fatso83/check-commit-msg
```
Then add this to your package.json scripts' section:
```
    "commitmsg": "node -r '@fatso83/check-commit-msg/husky'"
```

## Improvements welcome
Need something? Suggestions? Pull requests welcome :)
