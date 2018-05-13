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


mkdir -p "$HOME/.oresoftware/nodejs/node_modules" && {


    if [[ ! -f "$HOME/.oresoftware/nodejs/package.json" ]]; then
       cat "node_modules/@oresoftware/oresoftware.package.json/package.json" > "$HOME/.oresoftware/nodejs/package.json";
    fi

    (
      cd "$HOME/.oresoftware/nodejs";
      npm install gmx@latest
    ) &


} || {
  echo "could not install gmx in user home dir."
}


rm -rf "$HOME/.gmx"
mkdir -p "$HOME/.gmx"
cat gmx.sh > "$HOME/.gmx/gmx.sh"
cat dist/find-root.js > "$HOME/.gmx/find-root.js"


if [[ -z "$(which gmx)" ]]; then
    echo "installing GMX globally...."
    npm install -g gmx
fi


echo -e "${gmx_green}GMX was installed successfully.${gmx_no_color}";
echo -e "Add the following line to your .bashrc/.bash_profile files:";
echo -e "${gmx_cyan}. \"\$HOME/.gmx/gmx.sh\"${gmx_no_color}";