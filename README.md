

# GMX - running local NPM executables by default

## Installation:

```bash
npm install -g gmx
```

## Usage

```bash
gmx --shell=bash -- echo "foobar"
```

the default shell is bash, so you can just do this:

```bash
gmx -- echo "foobar"
```

### Something more realistc

You may want to run a local version of typescript/tsc, so you would do:

```bash
gmx -- tsc -w
```

### To define an executable string, use:

```bash
gmx --exec="tsc -w"
```

or for short:

```bash
gmx -e="tsc -w"
```

