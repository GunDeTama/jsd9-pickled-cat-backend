#!/usr/bin/env bash

errors=0

check_if_esmodule() {
  grep 'const.*=.*require(.*)' "$1" >/dev/null
  if [ $? -eq 0 ]; then
    echo "Found not-allowed CommonJS importing method in $1"
    errors=$((errors + 1))
  fi
}

check_if_named_export() {
  grep '^export default.*' "$1" >/dev/null
  if [ $? -eq 0 ]; then
    echo "Found default export, must use named export in $1"
    errors=$((errors + 1))
  fi
}

if command -v find grep printf >/dev/null; then
  # Check if all files use ESmodule and not CommonJS.
  files=$(find './src/' -name '*.js' -not -path '*/node_modules/*')
  for file in $files; do
    check_if_esmodule "$file"
  done
  for file in $files; do
    check_if_named_export "$file"
  done

  # Check if all filenames are not snake_case except in `scripts/`.
  snake_case_files=$(find . -name '*_*.js' -not -path '*/node_modules/*' -not -path '*/scripts/*')
  if [ ${#snake_case_files} -ne 0 ]; then
    printf "\nFound not-allowed snake_case file naming\n"
    echo "$snake_case_files"
    errors=$((errors + 1))
  fi

  # Check if all filenames in `src/models` start with capital letters.
  # TODO: correct this if change `model/` to `models/`.
  model_files=$(find './src/model/' -name '[a-z]*.js')
  if [ ${#model_files} -ne 0 ]; then
    printf "\nIncorrect model filename casing, must be PascalCase\n"
    echo "$model_files"
    errors=$((errors + 1))
  fi

else
  echo 'Command find, grep, or printf not found'
  exit 1
fi

if [ $errors -ne 0 ]; then
  printf "\nErrors found, correct and push to remote again\n"
  exit 1
fi
