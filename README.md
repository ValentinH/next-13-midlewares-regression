# Reproduction of regression of Next.js middlewares on v13

This repository is a reproduction of a regression of Next.js middlewares on v13 when running locally with `next dev`.

The `load-test.js` script is a simple script that sends 100 requests to an API route in a loop.

The key to make the regression appear is to use `next dev` and to have a simple middleware that simply calls `NextResponse.next()`.

## Steps to reproduce

First, install dependencies at the root:

```sh
npm i
```

then, in each project, install dependencies and run the dev server:

```sh
npm i
npm run dev
```

### v12 - works as expected

At the root:

```sh
node ./load-test.js 12
```

Result:

```sh
Took 5579ms to execute 100 requests # first run is slow due to initial compilation
Took 212ms to execute 100 requests
Took 173ms to execute 100 requests
Took 177ms to execute 100 requests
Took 156ms to execute 100 requests
Took 150ms to execute 100 requests
```

### v13 - super slow

At the root:

```sh
node ./load-test.js 13
```

```sh
Took 5663ms to execute 100 requests
Took 5604ms to execute 100 requests
Took 5590ms to execute 100 requests
Took 5868ms to execute 100 requests
Took 5696ms to execute 100 requests
```
