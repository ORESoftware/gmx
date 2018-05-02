#!/usr/bin/env node
'use strict';

import cp = require('child_process');
import {findProjectRoot} from "residence";
import chalk from 'chalk';
import path = require('path');

if (process.argv.length < 3) {
  throw chalk.magentaBright('Please pass arguments to gmx... Example: "gmx tsc".');
}

const log = {
  info: console.log.bind(console, chalk.gray.bold('gmx')),
  error: console.error.bind(console, chalk.magentaBright.underline('gmx'))
};

const dashdash = require('dashdash');

const options = [
  {
    name: 'version',
    type: 'bool',
    help: 'Print tool version and exit.'
  },
  {
    names: ['help', 'h'],
    type: 'bool',
    help: 'Print this help and exit.',
    default: false
  },
  {
    names: ['verbose', 'v'],
    type: 'arrayOfBool',
    help: 'Verbose output. Use multiple times for more verbose.',
    default: [] as Array<boolean>
  },
  {
    names: ['shell', 's'],
    type: 'string',
    help: 'Shell to use (bash, zsh, fish, ...etc)',
    default: ''
  },
  {
    names: ['exec', 'e'],
    type: 'string',
    help: 'Executable string to run.',
    default: ''
  },
  {
    names: ['run'],
    type: 'string',
    help: 'Matches a string in the gmx.scripts object in package.json.',
    default: ''
  }
];

const parser = dashdash.createParser({options: options});
try {
  var opts = parser.parse(process.argv);
} catch (e) {
  log.error('error: %s', e.message);
  process.exit(1);
}

if(opts.version){
  const gmxPkgJSON = require('../package.json');
  console.log(gmxPkgJSON.version);
  process.exit(0);
}

if (opts.help) {
  const help = parser.help({includeEnv: true}).trimRight();
  log.info('usage: node foo.js [OPTIONS]\n'
    + 'options:\n'
    + help);
  process.exit(0);
}

const projRoot = findProjectRoot(process.cwd());

if (!projRoot) {
  throw new Error('gmx could not find project root given the current working directory: ' + process.cwd());
}

const theirPkgJSON = require(path.resolve(projRoot + '/package.json'));
const gmxScripts = theirPkgJSON.gmx && theirPkgJSON.gmx.scripts || {};

const shell = opts.shell || process.env.gmx_shell || 'bash';

let cmd = `command -v ${shell};`, check = '';

try {
  check = cp.execSync(cmd).toString();
}
catch (err) {
  log.error(err.message);
  log.error(`could not run the following command on your system: "${cmd}"`);
}

if (String(check).trim().length < 1) {
  throw chalk.bold(`gmx could not locate the shell you wish to use: "${chalk.magentaBright(shell)}".`);
}

if(opts.exec && opts.run){
  throw chalk.magenta(`gmx usage error: please use either --exec="x" or --run="x", but not both.`);
}

let runnableScript = '';

if(opts.run){
   if(gmxScripts[opts.run]){
      runnableScript = gmxScripts[opts.run];
   }
   else{
     throw chalk.magentaBright(`gmx: Your package.json file does not have a gmx script that matches "${chalk.magenta.bold(opts.run)}".`)
  }
}

const bin = path.resolve(projRoot + '/node_modules/.bin');

const k = cp.spawn(shell, [], {
  env: Object.assign({}, process.env, {
    PATH: `${bin}:${process.env.PATH}`
  })
});


const exec = runnableScript || opts.exec || opts._args.join(' ');

k.stdin.write(exec);
k.stdout.pipe(process.stdout);
k.stderr.pipe(process.stderr);
k.stdin.end('\n');
