#!/bin/bash
set -e
cd "$(dirname "$0")/.."
if [ ! -d ".next/static" ]; then
  echo "Error: .next/static not found. Run 'npm run build' first." >&2
  exit 1
fi
mkdir -p .next/standalone/.next/static .next/standalone/public
cp -r .next/static/. .next/standalone/.next/static/
cp -r public/. .next/standalone/public/
echo "Assets copied successfully"