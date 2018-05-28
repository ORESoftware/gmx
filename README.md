

# GMX - running local NPM executables by default

Pronounced "gimmicks". <br>
This tool is similar to the official NPM tool "npx", but "gmx" attempts to do less, but do less better.

---------
If local executables exist in `./node_modules/.bin`, gmx will use those first.
For example, if you have a local and global version of nodemon, `gmx -- nodemon`, will use the local version
if you are within the project, otherwise if your cwd is outside the project, will use the global version of nodemon.
Just depends on your cwd.

---------

## Installation:

```bash
npm install -g gmx
```

## Usage

```bash
 $ gmx echo 'foobar'
```


### Something more useful/realistc

You may want to run a local version of typescript/tsc or nodemon, so you would do:

```bash
 $ gmx -- tsc -w
```

or:

```bash
 $ gmx -- nodemon
```


### To define an executable string, use:

```bash
 $ gmx --exec='tsc -w'
```

or for short:

```bash
 $ gmx -e 'tsc -w'
```

## Running jobs in parallel

Bash does a fine job of running things in series, so we don't need to help bash with that,<br>
but if you want to run commands in parallel, use gmx:


```bash
 $ gmx -e 'echo "foo"' -e 'exit 3' -e 'echo "baz"'
```

the above will exit with code 1, as evidence by the output from:


```bash
 $ gmx -e 'echo "foo"' -e 'exit 3' -e 'echo "baz"'; echo $?
```

if we run the above, we get:

> foo <br> 
> baz <br>
> 1


to exit the `gmx` process with 0 if any subcommand exits with 0, use the `--any` option:


```bash
 $ gmx --any -e 'echo "foo"' -e 'exit 3' -e 'echo "baz"'; echo $?
```

now we get:

> foo <br>
> baz <br>
> 0


