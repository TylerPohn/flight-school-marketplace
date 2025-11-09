#!/usr/bin/env python3
import re

# Read the file
with open('src/mock/detailedSchools.ts', 'r') as f:
    content = f.read()

# Find all strings with description:, body:, title:, bio: that use single quotes and contain apostrophes
# Replace them with template literals

def fix_quoted_string(match):
    field = match.group(1)
    value = match.group(2)
    # Unescape the apostrophes
    value = value.replace("\\'", "'")
    # Return with backticks
    return f"{field}: `{value}`"

# Match pattern: (description|body|title|bio): 'text with \' or just ' text'
patterns = [
    (r"(description):\s*'([^']*(?:\\'[^']*)*)'", fix_quoted_string),
    (r"(body):\s*'([^']*(?:\\'[^']*)*)'", fix_quoted_string),
    (r"(title):\s*'([^']*(?:\\'[^']*)*)'", fix_quoted_string),
    (r"(bio):\s*'([^']*(?:\\'[^']*)*)'", fix_quoted_string),
]

for pattern, replacer in patterns:
    content = re.sub(pattern, replacer, content)

# Write back
with open('src/mock/detailedSchools.ts', 'w') as f:
    f.write(content)

print("✅ Fixed all quote issues in detailedSchools.ts")
