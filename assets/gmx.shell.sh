#!/usr/bin/env bash

gmx_get_latest(){
  . "$HOME/.oresoftware/bash/gmx.sh";
}

gmxx(){

   if [ -z "`command -v gmx`" ] || [ -z "`command -v gmx_find_root`" ]; then
       npm install -g "gmx" || {
         return 1;
      }
   fi

   command gmx "$@"
}

gmx(){

    if [[ -d "node_modules" ]]; then

        PATH="./node_modules/.bin:$PATH" "$@"

    else

     if [ -z "`command -v gmx_find_root`" ]; then
          npm install -g "gmx" || {
             return 1;
          }
     fi

    local nm="$(gmx_find_root)"
    PATH="$nm:$PATH" "$@"

    fi

}


export -f gmx;
export -f gmxx;
export -f gmx_get_latest;