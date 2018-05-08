#!/usr/bin/env bash

set -e;

gmx_gray='\033[1;30m'
gmx_magenta='\033[1;35m'
gmx_cyan='\033[1;36m'
gmx_orange='\033[1;33m'
gmx_green='\033[1;32m'
gmx_no_color='\033[0m'


rm -rf "$HOME/.gmx"
mkdir -p "$HOME/.gmx"
cat gmx.sh > "$HOME/.gmx/gmx.sh"
cat dist/find-root.js > "$HOME/.gmx/find-root.js"

root_gmx="/usr/local/bin/gmx"
rm -rf "$root_gmx" || echo "could not remove '$root_gmx'";
cat run.gmx.sh > "$root_gmx"

gmx_bin="$(npm bin -g)/gmx";
rm -rf "$gmx_bin" || echo "could not remove '$gmx_bin'";
cat run.gmx.sh > "$gmx_bin"

echo -e "${gmx_green}GMX was installed successfully.${gmx_no_color}";
echo -e "Add the following line to your .bashrc/.bash_profile files:";
echo -e "${gmx_cyan}. \"\$HOME/.gmx/gmx.sh\"${gmx_no_color}";