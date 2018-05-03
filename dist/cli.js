#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const residence_1 = require("residence");
const chalk_1 = require("chalk");
const path = require("path");
if (process.argv.length < 3) {
    throw chalk_1.default.magentaBright('Please pass arguments to gmx... Example: "gmx tsc".');
}
const log = {
    info: console.log.bind(console, chalk_1.default.gray.bold('GMX')),
    error: console.error.bind(console, chalk_1.default.magentaBright.underline('GMX'))
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
        default: []
    },
    {
        names: ['shell', 's'],
        type: 'string',
        help: 'Shell to use (bash, zsh, fish, ...etc)',
        default: ''
    },
    {
        names: ['silent'],
        type: 'bool',
        help: 'Emit no stdout.',
        default: false
    },
    {
        names: ['debug'],
        type: 'bool',
        help: 'Show warnings, etc.',
        default: false
    },
    {
        names: ['any'],
        type: 'bool',
        help: 'If using multiple processes, will exit with 0 as long as at least one process exits with 0.',
        default: false
    },
    {
        names: ['exec', 'e'],
        type: 'arrayOfString',
        help: 'Executable string to run.',
        default: []
    },
    {
        names: ['run'],
        type: 'arrayOfString',
        help: 'Matches a string in the gmx.scripts object in package.json.',
        default: []
    }
];
const parser = dashdash.createParser({ options: options });
try {
    var opts = parser.parse(process.argv);
}
catch (e) {
    log.error('error: %s', e.message);
    process.exit(1);
}
if (opts.version) {
    const gmxPkgJSON = require('../package.json');
    console.log(gmxPkgJSON.version);
    process.exit(0);
}
if (opts.help) {
    const help = parser.help({ includeEnv: true }).trimRight();
    log.info('usage: node foo.js [OPTIONS]\n'
        + 'options:\n'
        + help);
    process.exit(0);
}
const projRoot = residence_1.findProjectRoot(process.cwd());
const verbosity = opts.verbose.length;
if (!projRoot && (verbosity > 0 || opts.debug)) {
    log.error('could not find project root given the current working directory:', process.cwd());
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
    throw chalk_1.default.bold(`gmx could not locate the shell you wish to use: "${chalk_1.default.magentaBright(shell)}".`);
}
let runnableScripts = opts.exec;
opts.run.forEach(function () {
    const r = gmxScripts[opts.run];
    if (r && typeof r === 'string') {
        runnableScripts.push(gmxScripts[opts.run]);
    }
    else {
        throw chalk_1.default.magentaBright(`gmx: Your package.json file does not have a gmx script that matches "${chalk_1.default.magenta.bold(opts.run)}".`);
    }
});
runnableScripts.push(opts._args.join(' '));
const bin = path.resolve(projRoot + '/node_modules/.bin');
Promise.all(runnableScripts.map(function (s) {
    return new Promise(function (resolve) {
        const k = cp.spawn(shell, [], {
            env: Object.assign({}, process.env, {
                PATH: `${bin}:${process.env.PATH}`
            })
        });
        k.stdin.write(s);
        if (!opts.silent) {
            k.stdout.pipe(process.stdout);
        }
        k.stderr.pipe(process.stderr);
        k.once('exit', resolve);
        k.stdin.end('\n');
    });
}))
    .then(function (results) {
    let successCount = 0;
    let failCount = 0;
    for (let i = 0; i < results.length; i++) {
        const c = results[i];
        if (c === 0) {
            successCount++;
        }
        else {
            failCount++;
        }
    }
    if (opts.any && successCount > 0) {
        return process.exit(0);
    }
    if (failCount < 1) {
        return process.exit(0);
    }
    process.exit(1);
});
