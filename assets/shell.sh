#!/usr/bin/env bash

gmx_get_latest(){
  . "$HOME/.oresoftware/bash/gmx.sh";
}

gmxx(){

    options=( );

    while [[ "${1:0:1}" == "-"  ]]; do
        options+=("${1}")
        shift 1;
    done

  # here we always use a global installation
    if ! type -f gmx &> /dev/null || ! which gmx &> /dev/null; then
       npm i -s -g "gmx" || {
          echo -e "Could not install the 'gmx' NPM package globally." >&2;
          echo -e "Check your user permissions to install global NPM packages." >&2;
         return 1;
      }
   fi

   command gmx "$@";

}

gmx(){

    options=( );

    while [[ "${1:0:1}" == "-"  ]]; do
        options+=("${1}")
        shift 1;
    done

    if [[ -f package.json ]]; then

        if [[ ! -d "node_modules/.bin" ]]; then
          echo >&2 "package.json file exists in PWD, but node_modules/.bin is not a dir.";
          return 1;
        fi

        PATH="./node_modules/.bin:$PATH" "$@"
        return $?;

    fi


    if ! type -f gmx_find_root &> /dev/null || ! which gmx_find_root &> /dev/null; then
      npm i -s -g "gmx" || {
         echo -e "Could not install the 'gmx' NPM package globally." >&2;
         echo -e "Check your user permissions to install global NPM packages." >&2;
         return 1;
      }
    fi

    local nm="$(gmx_find_root)"
    PATH="$nm:$PATH" "$@"
}


export -f gmx;
export -f gmxx;
export -f gmx_get_latest;