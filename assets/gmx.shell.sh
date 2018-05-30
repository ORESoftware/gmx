#!/usr/bin/env bash

gmx_get_latest(){
  . "$HOME/.oresoftware/bash/gmx.sh";
}

gmxx(){

  # here we always use a global installation

   if [ -z "`command -v gmx`" ]; then
       npm install -g "gmx" || {
         return 1;
      }
   fi

   command gmx "$@"
   return $?
}

gmx(){

    if [[ -d "node_modules" ]]; then

        PATH="./node_modules/.bin:$PATH" "$@"
        return $?;

    fi

     if [ -z "`command -v gmx_find_root`" ]; then
          npm install -g "gmx" || {
             return 1;
          }
     fi

    local nm="$(gmx_find_root)"
    PATH="$nm:$PATH" "$@"
    return $?
}


export -f gmx;
export -f gmxx;
export -f gmx_get_latest;