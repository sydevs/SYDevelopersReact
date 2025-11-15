#!/bin/bash

###############################################################################
# Security Scanner Hook (PreToolUse)
#
# Prevents commits and operations with secrets or sensitive data.
# - Blocks dangerous git operations with secrets
# - Scans for API keys, tokens, passwords in files
# - Validates environment variable usage
###############################################################################

# Read JSON from stdin
INPUT=$(cat)

# Extract tool name and parameters
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName // empty')
COMMAND=$(echo "$INPUT" | jq -r '.parameters.command // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.parameters.file_path // empty')
CONTENT=$(echo "$INPUT" | jq -r '.parameters.content // empty')
NEW_STRING=$(echo "$INPUT" | jq -r '.parameters.new_string // empty')

# Security patterns to check
PATTERNS=(
  'PRIVATE[_-]?KEY'
  'API[_-]?KEY'
  'SECRET[_-]?KEY'
  'ACCESS[_-]?TOKEN'
  'AUTH[_-]?TOKEN'
  'DATABASE[_-]?URL'
  'PASSWORD'
  'STRIPE[_-]?SECRET'
  'CLOUDFLARE[_-]?API'
  'AIRTABLE[_-]?API'
  'sk[-_][a-zA-Z0-9]{32,}'  # Stripe secret keys
  'pk[-_]live[a-zA-Z0-9]{32,}'  # Stripe publishable keys (live)
  'keyp?[a-zA-Z0-9]{32,}'  # Airtable keys
  'Bearer [a-zA-Z0-9_-]{20,}'  # Bearer tokens
)

# Dangerous file patterns
SENSITIVE_FILES=(
  '.env'
  '.env.local'
  '.env.production'
  'credentials.json'
  'serviceAccountKey.json'
  'id_rsa'
  'id_dsa'
  'private.key'
)

# Function to check for secrets in content
check_secrets() {
  local content="$1"
  local context="$2"

  for pattern in "${PATTERNS[@]}"; do
    if echo "$content" | grep -iE "$pattern" > /dev/null; then
      # Check if it's a template/example (has placeholder values)
      if echo "$content" | grep -E "(your[-_]|example[-_]|placeholder|xxx|###|\*\*\*|<.*>)" > /dev/null; then
        continue
      fi

      # Found a potential secret
      matched=$(echo "$content" | grep -iE "$pattern" | head -3)
      cat <<EOF
{
  "continue": false,
  "blockingMessage": "⚠️  SECURITY ALERT: Potential secret detected in $context

Pattern matched: $pattern

Matched lines:
$matched

Please verify this is not a real credential. If it's safe:
1. Use environment variables for secrets
2. Add to .gitignore if it's a config file
3. Use placeholder values in example files"
}
EOF
      exit 2
    fi
  done
}

# Function to check if file is sensitive
is_sensitive_file() {
  local file="$1"
  local basename=$(basename "$file")

  for sensitive in "${SENSITIVE_FILES[@]}"; do
    if [[ "$basename" == "$sensitive" ]]; then
      return 0
    fi
  done
  return 1
}

# Check Bash commands for git operations
if [[ "$TOOL_NAME" == "Bash" ]]; then
  # Check for git add/commit with potentially sensitive files
  if echo "$COMMAND" | grep -E "git (add|commit)" > /dev/null; then
    # Check if committing sensitive files
    for file in "${SENSITIVE_FILES[@]}"; do
      if echo "$COMMAND" | grep -F "$file" > /dev/null; then
        cat <<EOF
{
  "continue": false,
  "blockingMessage": "⚠️  SECURITY ALERT: Attempting to commit sensitive file

File: $file
Command: $COMMAND

This file typically contains secrets and should not be committed.

Recommended actions:
1. Add $file to .gitignore
2. Remove from staging: git reset $file
3. Use environment variables for sensitive data"
}
EOF
        exit 2
      fi
    done
  fi

  # Check for force push to main/master
  if echo "$COMMAND" | grep -E "git push.*--force" > /dev/null; then
    if echo "$COMMAND" | grep -E "(main|master)" > /dev/null; then
      cat <<EOF
{
  "continue": false,
  "blockingMessage": "⚠️  DANGEROUS OPERATION: Force push to main/master branch

Command: $COMMAND

This can overwrite history and cause data loss.
Please confirm this is intentional and coordinate with your team."
}
EOF
      exit 2
    fi
  fi
fi

# Check Write operations
if [[ "$TOOL_NAME" == "Write" ]] && [[ -n "$FILE_PATH" ]]; then
  # Check if writing to sensitive file
  if is_sensitive_file "$FILE_PATH"; then
    # Allow .env.local.example but warn about others
    if [[ "$FILE_PATH" != *".example"* ]]; then
      cat <<EOF
{
  "continue": false,
  "blockingMessage": "⚠️  WARNING: Writing to sensitive file

File: $FILE_PATH

This file type typically contains secrets. Please ensure:
1. File is in .gitignore
2. No real credentials are included
3. Using environment variables properly"
}
EOF
      exit 2
    fi
  fi

  # Check content for secrets
  if [[ -n "$CONTENT" ]]; then
    check_secrets "$CONTENT" "$FILE_PATH"
  fi
fi

# Check Edit operations
if [[ "$TOOL_NAME" == "Edit" ]] && [[ -n "$NEW_STRING" ]]; then
  check_secrets "$NEW_STRING" "$FILE_PATH"
fi

# All checks passed
cat <<EOF
{
  "continue": true,
  "suppressOutput": true
}
EOF
exit 0
