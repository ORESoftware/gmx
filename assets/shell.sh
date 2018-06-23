#!/usr/bin/env bash

gmx_get_latest(){
  . "$HOME/.oresoftware/bash/gmx.sh";
}

gmxx(){

  # here we always use a global installation

   if [[ -z $(command -v gmx) ]] || [[ -z $(which gmx) ]]; then
       npm install --silent -g "gmx" || {
          echo -e "Could not install the 'gmx' NPM package globally." >&2;
          echo -e "Check your user permissions to install global NPM packages." >&2;
         return 1;
      }
   fi

   command gmx $@;

}

gmx(){

    if [[ -d "node_modules" ]]; then
        PATH="./node_modules/.bin:$PATH" "$@"
        return $?;
    fi

     if [[ -z $(command -v gmx_find_root) ]] || [[ -z $(which gmx_find_root) ]]; then
          npm install --silent -g "gmx" || {
             echo -e "Could not install the 'gmx' NPM package globally." >&2;
             echo -e "Check your user permissions to install global NPM packages." >&2;
             return 1;
          }
     fi

    local nm="$(gmx_find_root)"
    PATH="$nm:$PATH" $@

}


export -f gmx;
export -f gmxx;
export -f gmx_get_latest;