#!/usr/bin/env bash

if [[ -d "node_modules/.bin" ]]; then

    PATH="./node_modules/.bin:$PATH" "$@"

else

    nm="$(gmx_find_root)"
    PATH="$nm:$PATH" "$@"

fi