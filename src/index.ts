import path = require('path');
import {Readable, Writable} from "stream";
import cp = require('child_process');
import residence = require('residence');

export interface GMXResult {
  stdout: Readable,
  stderr: Readable,
}

export interface GMXOptions {
  shell?: string,
  root?: string,
  debug?: boolean
}

export type ResultCallback = (err: any, result: GMXResult) => void;

export const exec = function (str: string, opts?: GMXOptions | ResultCallback, cb?: ResultCallback) {
  
  if (typeof opts === 'function') {
    if (cb) throw new Error('GMX: Too many arguments, or perhaps you are using a function as the options object.');
    cb = opts;
  }
  
  const o = <GMXOptions>(opts || {});
  const shell = o.shell || 'bash';
  
  if (o.root && !path.isAbsolute(o.root)) {
    return process.nextTick(cb, new Error('opts.root is not an absolute path:' + o.root));
  }
  
  const projRoot = o.root || residence.findProjectRoot(process.cwd());
  const bin = projRoot && path.resolve(projRoot + '/node_modules/.bin');
  
  const getPath = function () {
    let p = (projRoot && bin) ? `${bin}:${process.env.PATH}` : process.env.PATH;
    if (o.debug) {
      log.info('Added the following path to the PATH env:', bin);
    }
    return p;
  };
  
  const k = cp.spawn(shell, [], {
    env: Object.assign({}, process.env, {
      PATH: getPath()
    })
  });
  
  if (cb) {
    return cb(null, k);
  }
  
  k.stdout.pipe(process.stdout);
  k.stderr.pipe(process.stderr);
  
};

export const execp = function (str: string, opts?: GMXOptions): Promise<GMXResult> {
  return new Promise(function (resolve, reject) {
    exec(str, opts, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};