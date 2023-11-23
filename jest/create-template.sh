#!/bin/bash

folder_name="$1"

# Check if a folder name is provided
if [ -z "$folder_name" ]; then
    echo "Usage: $0 <folder_name>"
    exit 1
fi

# Create the folder
mkdir "$folder_name"

# Create index.ts
echo "// Your code for index.ts" > "$folder_name/index.ts"

# Create isArray.test.ts with template
template_content=$(cat ./src/template.test.ts)
echo "$template_content" > "$folder_name/${folder_name}.test.ts"