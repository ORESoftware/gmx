#!/usr/bin/env bash

set -e;

#node foo.js --stdin << EOF
#  echo "444";
#EOF

#gmx << EOF
#  echo "444";
#EOF

#gmx << EOF
#  node -e "console.log('foo')"
#EOF

gmx -- node -e "console.log('foo')"


#cat <<EOF
#  echo "444";
#EOF


#gmx --stdin < cat <<EOF
#   echo "foo";
#EOF


#
#
# gmx --stdin < <(echo "foo")