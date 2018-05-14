#!/usr/bin/env bash


gmx(){

    if [[ -d "node_modules" ]]; then

        PATH="./node_modules/.bin:$PATH" "$@"

    else

        local nm="$(node "$HOME/.oresoftware/nodejs/node_modules/gmx/dist/find-root.js")"
        PATH="$nm:$PATH" "$@"

    fi

}