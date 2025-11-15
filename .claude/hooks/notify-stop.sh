#!/bin/bash

###############################################################################
# Notification Hook (Stop)
#
# Plays sound and announces when Claude needs user input.
# - Helps you know when to return to Claude Code
# - Platform-specific implementation (macOS)
# - Useful for long-running tasks
###############################################################################

# Read JSON from stdin (required by hook protocol)
INPUT=$(cat)

# Detect platform
PLATFORM=$(uname)

# Function for macOS notification
notify_macos() {
  # Play system sound
  afplay /System/Library/Sounds/Glass.aiff 2>/dev/null &

  # Voice announcement
  say "Claude needs your input" &
}

# Function for Linux notification
notify_linux() {
  # Try to play sound if paplay is available
  if command -v paplay &> /dev/null; then
    paplay /usr/share/sounds/freedesktop/stereo/message.oga 2>/dev/null &
  fi

  # Voice announcement if espeak is available
  if command -v espeak &> /dev/null; then
    espeak "Claude needs your input" 2>/dev/null &
  fi

  # Desktop notification if notify-send is available
  if command -v notify-send &> /dev/null; then
    notify-send "Claude Code" "Claude needs your input" &
  fi
}

# Execute platform-specific notification
case "$PLATFORM" in
  Darwin)
    notify_macos
    ;;
  Linux)
    notify_linux
    ;;
  *)
    # Unsupported platform - fail silently
    ;;
esac

# Always continue (this is a notification, not a blocker)
cat <<EOF
{
  "continue": true,
  "suppressOutput": true
}
EOF

exit 0
