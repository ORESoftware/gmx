#!/usr/bin/env bash

set -e;

if [[ "$gmx_skip_postinstall" == "yes" ]]; then
   echo "GMX is skipping postinstall routine.";
   exit 0;
fi

export gmx_skip_postinstall="yes";

gmx_gray='\033[1;30m'
gmx_magenta='\033[1;35m'
gmx_cyan='\033[1;36m'
gmx_orange='\033[1;33m'
gmx_green='\033[1;32m'
gmx_no_color='\033[0m'


mkdir -p "$HOME/.oresoftware" && {

  (
    curl -H 'Cache-Control: no-cache' \
    "https://raw.githubusercontent.com/oresoftware/shell/master/shell.sh?$(date +%s)" \
    --output "$HOME/.oresoftware/shell.sh" 2> /dev/null || {
           echo "curl command failed to read shell.sh, now we should try wget..."
    }
  ) &

} || {

  echo "could not create '$HOME/.oresoftware'";
  exit 1;

}


mkdir -p "$HOME/.oresoftware/execs" || {
    echo "could not create execs directory in $HOME/oresoftware.";
}


mkdir -p "$HOME/.oresoftware/bash" && {
    cat gmx.sh > "$HOME/.oresoftware/bash/gmx.sh" || {
      echo "could not copy gmx.sh shell file to user home." >&2;
    }
}


mkdir -p "$HOME/.oresoftware/nodejs/node_modules" && {

   (
        [ ! -f "$HOME/.oresoftware/nodejs/package.json" ]  && {
            curl -H 'Cache-Control: no-cache' \
              "https://raw.githubusercontent.com/oresoftware/shell/master/assets/package.json?$(date +%s)" \
                --output "$HOME/.oresoftware/nodejs/package.json" 2> /dev/null || {
                echo "curl command failed to read package.json, now we should try wget..." >&2
          }
        }

        (
          cd "$HOME/.oresoftware/nodejs" && npm install --silent gmx 2> /dev/null || {
            echo "could not install GMX in user home..." >&2;
          }
        )
  ) &

} || {

   echo "could not create a 'nodejs' dir in $HOME/oresoftware directory." >&2
}



if [[ -z "$(which gmx)" ]]; then
    echo "installing GMX globally...."
    npm install -g gmx
fi

# wait for background processes to finish
wait;


echo -e "${gmx_green}GMX was installed successfully.${gmx_no_color}";
echo -e "Add the following line to your .bashrc/.bash_profile files:";
echo -e "${gmx_cyan}. \"\$HOME/.gmx/gmx.sh\"${gmx_no_color}";