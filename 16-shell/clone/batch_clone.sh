#!/bin/bash

# Get the absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if repository list file is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 repos.txt"
    echo "repos.txt file format example:"
    echo ".,https://github.com/user/repo1.git"
    echo "frontend,https://github.com/user/repo2.git"
    echo "backend/api,https://github.com/user/repo3.git"
    exit 1
fi

# Check if input file exists
if [ ! -f "$1" ]; then
    echo "Error: File $1 does not exist"
    exit 1
fi

# Create log directory
LOG_DIR="${SCRIPT_DIR}/clone_logs"
mkdir -p "$LOG_DIR"

# Get current timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Directory creation function
create_directory() {
    local dir="$1"
    # Skip creation if directory is .
    if [ "$dir" = "." ]; then
        return 0
    fi

    if [ ! -d "$dir" ]; then
        echo "Creating directory: $dir"
        mkdir -p "$dir"
        if [ $? -ne 0 ]; then
            echo "Error: Cannot create directory $dir"
            return 1
        fi
    else
        echo "Directory already exists: $dir"
    fi
    return 0
}

# Main function: Clone repositories
clone_repositories() {
    local success_count=0
    local failed_count=0

    # Save initial working directory
    local initial_pwd="$PWD"

    # Read repository list and clone
    while IFS=, read -r target_dir repo || [ -n "$repo" ]; do
        # Skip empty lines and comments
        [[ -z "$target_dir" || "$target_dir" =~ ^#.*$ ]] && continue

        # Remove possible whitespace
        target_dir=$(echo "$target_dir" | tr -d '[:space:]')
        repo=$(echo "$repo" | tr -d '[:space:]')

        echo "Processing: $repo -> $target_dir"

        # Create target directory (if not current directory)
        if ! create_directory "$target_dir"; then
            ((failed_count++))
            continue
        fi

        # Extract repository name
        repo_name=$(basename "$repo" .git)

        # Switch to target directory
        cd "$target_dir" || {
            echo "Error: Cannot enter directory $target_dir"
            ((failed_count++))
            cd "$initial_pwd"
            continue
        }

        # Clone repository and log output
        if git clone "$repo" 2>> "$LOG_DIR/clone_${TIMESTAMP}.log"; then
            echo "✓ Successfully cloned to $target_dir: $repo_name"
            ((success_count++))
        else
            echo "✗ Clone failed $target_dir: $repo_name"
            ((failed_count++))
        fi

        # Return to initial directory
        cd "$initial_pwd"

        echo "----------------------------------------"
    done < "$1"

    # Print summary
    echo "Cloning complete!"
    echo "Successful: $success_count"
    echo "Failed: $failed_count"
    echo "Detailed logs saved to: $LOG_DIR/clone_${TIMESTAMP}.log"
}

# Execute main function
clone_repositories "$1"
