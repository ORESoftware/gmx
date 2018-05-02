"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cp = require("child_process");
const residence = require("residence");
exports.exec = function (str, opts, cb) {
    if (typeof opts === 'function') {
        if (cb)
            throw new Error('GMX: Too many arguments.');
        cb = opts || (function () {
            throw new Error('GMX: Must provide a callback function to the exec utility function.');
        })();
    }
    opts = (opts || {});
    const shell = opts.shell || 'bash';
    const projRoot = residence.findProjectRoot(process.cwd());
    const bin = path.resolve(projRoot + '/node_modules/.bin');
    const k = cp.spawn(shell, [], {
        env: Object.assign({}, process.env, {
            PATH: `${bin}:${process.env.PATH}`
        })
    });
    cb(null, k);
};
exports.execp = function (str, opts) {
    return new Promise(function (resolve, reject) {
        exports.exec(str, opts, function (err, result) {
            err ? reject(err) : resolve(result);
        });
    });
};
