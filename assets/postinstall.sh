#!/usr/bin/env bash

set -e;

if [[ "$gmx_skip_postinstall" == "yes" ]]; then
   echo "GMX is skipping postinstall routine.";
   exit 0;
fi

export gmx_skip_postinstall="yes";
gmx_exec="gmx";


gmx_gray='\033[1;30m'
gmx_magenta='\033[1;35m'
gmx_cyan='\033[1;36m'
gmx_orange='\033[1;33m'
gmx_green='\033[1;32m'
gmx_no_color='\033[0m'


mkdir -p "$HOME/.oresoftware" || {
  echo "could not create '$HOME/.oresoftware'";
  exit 1;
}


(
    cat "node_modules/@oresoftware/shell/assets/shell.sh" > "$HOME/.oresoftware/shell.sh" && {
        echo "Successfully copied @oresoftware/shell/assets/shell.sh to $HOME/.oresoftware/shell.sh";
        exit 0;
    }

    curl -H 'Cache-Control: no-cache' \
         "https://raw.githubusercontent.com/oresoftware/shell/master/assets/shell.sh?$(date +%s)" \
          --output "$HOME/.oresoftware/shell.sh" 2> /dev/null || {
           echo "curl command failed to read shell.sh";
           exit 1;
    }
)


mkdir -p "$HOME/.oresoftware/execs" || {
    echo "could not create execs directory in $HOME/oresoftware.";
}


mkdir -p "$HOME/.oresoftware/bash" || {
    echo "could not mkdir '$HOME/.oresoftware/bash'" >&2;
    exit 1;
}

cat assets/shell.sh > "$HOME/.oresoftware/bash/gmx.sh" || {
      echo "could not copy gmx.sh shell file to user home." >&2;
      exit 1;
}

mkdir -p "$HOME/.oresoftware/nodejs/node_modules" ||{
  echo "could not copy gmx.sh shell file to user home." >&2;
  exit 0;
}


(

    if [[ -f "$HOME/.oresoftware/nodejs/package.json" ]]; then
       exit 0;
    fi

    cat "node_modules/@oresoftware/shell/assets/package.json" > "$HOME/.oresoftware/nodejs/package.json" && {
       echo "Successfully copied @oresoftware/shell/assets/package.json to $HOME/.oresoftware/nodejs/package.json";
       exit 0;
    }

     curl -H 'Cache-Control: no-cache' \
          "https://raw.githubusercontent.com/oresoftware/shell/master/assets/package.json?$(date +%s)" \
            --output "$HOME/.oresoftware/nodejs/package.json" 2> /dev/null  && {

       echo "Successfully copied package.json file from Github repo.";
       exit 0;
    }

     echo "curl command failed to read package.json, now we should try wget..." >&2
     exit 1;

)



echo "";
echo -e "${gmx_green}GMX was installed successfully.${gmx_no_color}";
echo -e "Add the following line to your .bashrc/.bash_profile files:";
echo -e "${gmx_cyan}. \"\$HOME/.oresoftware/shell.sh\"${gmx_no_color}";
echo "";