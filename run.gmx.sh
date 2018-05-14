#!/usr/bin/env bash

if [[ -d "node_modules/.bin" ]]; then

    PATH="./node_modules/.bin:$PATH" "$@"

else

    nm="$(node "$HOME/.oresoftware/nodejs/node_modules/gmx/dist/find-root.js")"
    PATH="$nm:$PATH" "$@"

fi