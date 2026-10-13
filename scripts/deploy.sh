#!/bin/sh
# Builds the app and publishes it to GitHub Pages, which serves the gh-pages branch.
# Run with: npm run deploy
set -e
cd "$(dirname "$0")/.."

npm run build
remote=$(git remote get-url origin)
site=$(mktemp -d)
cp -R dist/. "$site"
# Tells GitHub Pages to serve the files as they are.
touch "$site/.nojekyll"

git -C "$site" init -q -b gh-pages
git -C "$site" add -A
git -C "$site" -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" \
  commit -q -m "Publish $(git rev-parse --short HEAD 2>/dev/null || echo site)"
git -C "$site" push -q -f "$remote" gh-pages
rm -rf "$site"
echo "Published. GitHub Pages takes a minute or two to update."
