#!/usr/bin/env bash


gmx(){

  local first_arg="$1";

  if [[ ! -z "$first_arg" && "$first_arg" != "-"* ]]; then

    if [[ -d "node_modules" ]]; then
      PATH="./node_modules/.bin:$PATH" "$@"
    else
     local nm="$(gmx_find_root)"
     PATH="$nm:$PATH" "$@"
    fi

  else

   if [[ -z "$(which gmx)" ]]; then
      ( npm install -g gmx ) &> /dev/null
   fi

   command gmx "$@"

  fi
}