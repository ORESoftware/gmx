#!/usr/bin/env bash


gmx(){

    if [[ -d "node_modules" ]]; then

      PATH="./node_modules/.bin:$PATH" "$@"

    else

     local nm="$(node "$HOME/.gmx/find-root.js")"
     PATH="$nm:$PATH" "$@"

    fi

}