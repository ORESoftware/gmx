#!/usr/bin/env bash


gmx(){

    if [[ -d "node_modules" ]]; then

      PATH="./node_modules/.bin:$PATH" "$@"

    else

     local nm="$(gmx_find_root)"
     PATH="$nm:$PATH" "$@"

    fi

}