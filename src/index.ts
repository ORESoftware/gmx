
import path = require('path');
import {Readable, Writable} from "stream";
import cp = require('child_process');
import residence = require('residence');

export interface GMXResult {
  stdout: Readable,
  stderr: Readable,
}


export interface GMXOptions {
  shell?: string
}

export type ResultCallback = (err: any, result: GMXResult) => void;


export const exec = function(str: string, opts: GMXOptions | ResultCallback, cb?: ResultCallback){
  
  if(typeof opts === 'function'){
    if(cb) throw new Error('GMX: Too many arguments.');
    cb = opts || <any>(function(){
        throw new Error('GMX: Must provide a callback function to the exec utility function.');
    })();
  }
  
  opts = <GMXOptions>(opts || {});
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


export const execp = function(str: string, opts?: GMXOptions) : Promise<GMXResult> {
  return new Promise(function(resolve, reject){
     exec(str, opts, function(err, result){
        err ? reject(err) : resolve(result);
     });
  });
};