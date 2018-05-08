#!/usr/bin/env bash

if [[ -d "node_modules" ]]; then

  PATH="./node_modules/.bin:$PATH" "$@"

else

 nm="$(node "$HOME/.gmx/find-root.js")"
 PATH="$nm:$PATH" "$@"

fi