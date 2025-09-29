#!/bin/bash

# --- CONFIG ---
PROJECT_NAME="ClarityForUS"
TAGLINE="Civic tech apps that turn complexity into clarity."

# --- STEP 1: Update index.html ---
INDEX_FILE="./public/index.html"

if [[ -f "$INDEX_FILE" ]]; then
  echo "Updating title and meta tags in $INDEX_FILE..."

  # Update <title>
  sed -i 's|<title>.*</title>|<title>ClarityForUS — civic tech apps that turn complexity into clarity</title>|' "$INDEX_FILE"

  # Add/update meta tags
  sed -i '/<meta name="description"/d' "$INDEX_FILE"
  sed -i '/<meta property="og:title"/d' "$INDEX_FILE"
  sed -i '/<meta property="og:description"/d' "$INDEX_FILE"
  sed -i '/<meta property="og:image"/d' "$INDEX_FILE"
  sed -i '/<meta name="twitter:card"/d' "$INDEX_FILE"

  sed -i '/<title>/a \
  <meta name="description" content="'"$TAGLINE"'">\
  <meta property="og:title" content="'"$PROJECT_NAME"'">\
  <meta property="og:description" content="'"$TAGLINE"'">\
  <meta property="og:image" content="/og-image.png">\
  <meta name="twitter:card" content="summary_large_image">' "$INDEX_FILE"

else
  echo "⚠️  index.html not found at $INDEX_FILE"
fi

# --- STEP 2: Replace all instances in codebase ---
echo "Replacing all 'ClarityForUs' with 'ClarityForUS' in src/..."
grep -rl 'ClarityForUs' ./src | xargs sed -i 's/ClarityForUs/ClarityForUS/g'

# --- STEP 3: Update README.md ---
README_FILE="./README.md"

if [[ -f "$README_FILE" ]]; then
  echo "Updating README.md..."

  sed -i "s/^# .*/# $PROJECT_NAME/" "$README_FILE"
  sed -i "0,/ClarityForUs/s/ClarityForUs/$PROJECT_NAME/" "$README_FILE"
  echo -e "\n**$TAGLINE**" >> "$README_FILE"
else
  echo "⚠️  README.md not found!"
fi

# --- STEP 4: Git commit and push ---
echo "Committing and pushing to GitHub..."
git add .
git commit -m "Rebrand: renamed to $PROJECT_NAME across metadata and codebase"
git push origin main

echo "✅ Rebrand complete and pushed to GitHub!"
