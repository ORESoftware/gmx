

# GMX - running local NPM executables by default

## Installation:

```bash
npm install -g gmx
```

## Usage

```bash
 $ gmx --shell=bash -- echo "foobar"
```

the default shell is bash, so you can just do this:

```bash
 $ gmx -- echo "foobar"
```

### Something more realistc

You may want to run a local version of typescript/tsc, so you would do:

```bash
 $ gmx -- tsc -w
```

### To define an executable string, use:

```bash
 $ gmx --exec="tsc -w"
```

or for short:

```bash
 $ gmx -e="tsc -w"
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


