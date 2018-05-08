#!/usr/bin/env bash

set -e;

tsc
npm version patch
./scripts/git/push.sh
npm publish