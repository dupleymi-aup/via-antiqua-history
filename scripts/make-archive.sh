#!/bin/bash
# Скрипт архивации проекта «Исторический Лабиринт»
# Создаёт ZIP-архив с ИСХОДНЫМ КОДОМ проекта в /home/z/my-project/download/
# В архив попадают только файлы, относящиеся к самому проекту:
#  - src/ (исходный код)
#  - public/ (статические ассеты)
#  - prisma/ (если есть)
#  - конфиги (package.json, tsconfig, tailwind, next.config, eslint, postcss, components.json)
#  - README.md, .gitignore
# Не включаются: node_modules, .next, .git, skills, examples, mini-services,
#                .zscripts, upload, download, *.log, page.html, init.sh, bun.lock

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ARCHIVE_PATH="$PROJECT_DIR/download/via-antiqua-history.zip"

cd "$PROJECT_DIR"

# Удаляем старый архив, если он есть
rm -f "$ARCHIVE_PATH"

# Создаём архив, выбирая только нужные файлы и папки
zip -r "$ARCHIVE_PATH" \
  src/ \
  public/ \
  scripts/ \
  history/ \
  img/ \
  README.md \
  README_RU.md \
  README_EN.md \
  package.json \
  package-lock.json \
  tsconfig.json \
  next.config.ts \
  next-env.d.ts \
  eslint.config.mjs \
  postcss.config.mjs \
  components.json \
  .gitignore \
  .env.example \
  amvera.yaml \
  Caddyfile \
  LICENSE \
  > /tmp/zip-output.log 2>&1

echo "====================================="
echo "Архив создан: $ARCHIVE_PATH"
echo "====================================="
ls -lh "$ARCHIVE_PATH"
echo ""
echo "--- Содержимое архива ---"
unzip -l "$ARCHIVE_PATH" | head -80
echo "..."
echo "--- Всего файлов в архиве ---"
unzip -l "$ARCHIVE_PATH" | tail -1
