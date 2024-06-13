#!/bin/bash

# Function to check case sensitivity
check_case_sensitivity() {
  local ignorecase=$(git config --get core.ignorecase)
  if [ "$ignorecase" != "false" ]; then
    echo "Error: Git is configured to be case insensitive. Run 'git config core.ignorecase false' to set Git to be case sensitive."
    return 1
  fi
}

# Check case sensitivity
check_case_sensitivity

# Exit with the status of the check
exit $?
