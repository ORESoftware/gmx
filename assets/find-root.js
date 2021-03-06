#!/usr/bin/env node
'use strict';

//core
const path = require('path');
const fs = require('fs');

//project
const cwd = process.cwd();
const down = [];
let  p, cd, found = false;

const stat = function (p) {
  try {
    return fs.statSync(p).isDirectory();
  }
  catch (err) {
    if (!String(err.stack || err).match(/ENOENT: no such file or directory/i)) {
      throw err;
    }
    //explicit for your pleasure
    return false;
  }
};

while (true) {

  cd = path.resolve(cwd + down.join(''));

  if (String(cd) === String(path.sep)) {
    // We are down to the root => fail
    break;
  }

  p = path.resolve(cd + '/node_modules/.bin');

  if (stat(p)) {
    // Found local node_modules/.bin folder
    found = true;
    break;
  }

  down.push('/../');

}

if (found) {
  console.log(p);
  process.exit(0);
}
else {
  process.exit(1);
}
