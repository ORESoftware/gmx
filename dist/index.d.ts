/// <reference types="node" />
import { Readable } from "stream";
export interface GMXResult {
    stdout: Readable;
    stderr: Readable;
}
export interface GMXOptions {
    shell?: string;
}
export declare type ResultCallback = (err: any, result: GMXResult) => void;
export declare const exec: (str: string, opts: GMXOptions | ResultCallback, cb?: ResultCallback) => void;
export declare const execp: (str: string, opts?: GMXOptions) => Promise<GMXResult>;
