#!/usr/bin/env bash

if [[ -d "node_modules/.bin" ]]; then

  echo "listing all files in cwd:";
  ls -a;
  PATH="./node_modules/.bin:$PATH" "$@"

else

 nm="$(node "$HOME/.gmx/find-root.js")"
 PATH="$nm:$PATH" "$@"

fi