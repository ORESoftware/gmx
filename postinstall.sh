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

echo -e "${gmx_green}GMX was installed successfully.${gmx_no_color}";
echo "Add the following line to your .bashrc/.bash_profile files:";
echo "${gmx_cyan}. \$HOME/.gmx/gmx.sh${gmx_no_color}";