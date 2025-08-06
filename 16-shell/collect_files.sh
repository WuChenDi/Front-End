#!/bin/bash

#===============================================================================
# File Collection Script
#===============================================================================
# Description: Recursively traverse directories and collect all file contents
#              into a single markdown file with proper formatting
#
# Usage:
#   1. Place this script in the root directory of your project
#   2. Make it executable: chmod +x collect_files.sh
#   3. Run the script: ./collect_files.sh
#   4. Check the generated files_summary.md file
#
# Configuration:
#   - Modify 'output_file' to change the output filename
#   - Modify 'exclude_extensions' to add/remove file types to exclude
#   - Modify 'exclude_directories' to add/remove directories to exclude
#   - Modify 'exclude_files' to add/remove specific files to exclude
#
# Output Format:
#   - filename.ext
#   ```extension
#   file content here
#   ```
#
# Author: Generated script for project file collection
# Version: 1.0
#===============================================================================

# Output file configuration
output_file="files_summary.md"

# File extensions to exclude (space-separated)
# Add or remove extensions as needed
exclude_extensions="sh json sql md js jsonc"

# Directories to exclude (space-separated)
# Add or remove directory names as needed
exclude_directories="node_modules .git dist build .next .nuxt coverage .vscode .idea logs tmp temp"

# Specific files to exclude (space-separated, with relative paths)
# Add or remove specific files as needed
exclude_files="package-lock.json yarn.lock pnpm-lock.yaml bun.lock .env .env.local .gitignore LICENSE README.md"

# Clear or create the output file
> "$output_file"

# Function to recursively traverse directories and process files
traverse_directory() {
    local current_dir="$1"

    # Iterate through all items in the current directory
    for item in "$current_dir"/*; do
        # Check if the item exists (handle empty directories)
        if [ ! -e "$item" ]; then
            continue
        fi

        # If it's a directory, check if it should be excluded
        if [ -d "$item" ]; then
            # Get directory name (basename)
            dir_name=$(basename "$item")

            # Check if directory should be excluded
            excluded_dir=false
            for exclude_dir in $exclude_directories; do
                if [ "$dir_name" = "$exclude_dir" ]; then
                    echo "Skipping directory: $relative_path (excluded directory)"
                    excluded_dir=true
                    break
                fi
            done

            # If directory is not excluded, recursively traverse it
            if [ "$excluded_dir" = false ]; then
                traverse_directory "$item"
            fi
        # If it's a file, process it
        elif [ -f "$item" ]; then
            # Get relative path (remove leading ./)
            relative_path="${item#./}"

            # Extract filename and extension
            filename=$(basename "$item")
            extension="${filename##*.}"

            # If file has no extension, set to empty
            if [ "$extension" = "$filename" ]; then
                extension=""
            fi

            # Check if specific file should be excluded
            excluded_file=false
            for exclude_file in $exclude_files; do
                if [ "$filename" = "$exclude_file" ] || [ "$relative_path" = "$exclude_file" ]; then
                    echo "Skipping file: $relative_path (excluded specific file)"
                    excluded_file=true
                    break
                fi
            done

            # Skip processing if specific file is excluded
            if [ "$excluded_file" = true ]; then
                continue
            fi

            # Check if file extension should be excluded
            # Check if file extension should be excluded
            excluded=false
            for ext in $exclude_extensions; do
                if [ "$extension" = "$ext" ]; then
                    echo "Skipping file: $relative_path (excluded file type: .$ext)"
                    excluded=true
                    break
                fi
            done

            # Skip processing if file extension is excluded
            if [ "$excluded" = true ]; then
                continue
            fi

            # Write file path with markdown list format
            echo "- $relative_path" >> "$output_file"
            echo "Adding file: $relative_path"

            # Write code block start with file extension
            echo "\`\`\`$extension" >> "$output_file"

            # Write file content
            cat "$item" >> "$output_file"

            # Ensure newline after file content
            echo "" >> "$output_file"

            # Write code block end
            echo "\`\`\`" >> "$output_file"

            # Add blank line for separation
            echo "" >> "$output_file"
        fi
    done
}

# Start recursive traversal from current directory
traverse_directory "."

echo "File summary completed, results saved to $output_file"
