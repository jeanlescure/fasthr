![Fast Hot Reload CLI Logo](https://assets.jeanlescure.io/ujf5Hb.svg)

# Fast Hot Reload (fasthr)

This is a tiny (6.5kb) CLI tool that mixes together [no-bs-typescript-server-boilerplate](https://github.com/jeanlescure/no-bs-typescript-server-boilerplate), [fastify](https://github.com/fastify/fastify), and [livereload](http://livereload.com/) to easily spin up a hot reload http server on the current directory.

![](https://raw.githubusercontent.com/jeanlescure/fasthr/main/public/demo.gif)

## Like this project? ❤️

Please consider:

- [Buying me a coffee](https://www.buymeacoffee.com/jeanlescure) ☕
- Supporting me on [Patreon](https://www.patreon.com/jeanlescure) 🏆
- Starring this repo on [Github](https://github.com/jeanlescure/fasthr) 🌟

## System dependencies

- Node.js ([install instructions](https://github.com/nvm-sh/nvm#installing-and-updating))

## Usage

With `npx` you can use as a one-liner:

```sh
$ npx fasthr
```

**Alternatively**

Install globally:

```sh
$ npm install -g fasthr
```

then run:

```sh
# Start the server on the current directory on port 3000
$ fasthr

# Start the server on the current directory on port 8080
$ fasthr -p 8080
```

## Options

Run help trigger for more info:

```
$ fasthr -h

Usage:
  node fasthr [OPTION]

Options:
  -d, --dir=ARG      root directory where to serve files from (default: current directory).
  -p, --port=ARG     port to run server on (default: 3000).
  -a, --address=ARG  address to run server on (default: 0.0.0.0).
  -l, --livePort=ARG port to run livereload on (default: 35729).
  -h, --help         display this help
```

## Development

I chose Rollup to handle the transpiling, compression, and any other transformations needed to get
this repo's Typescript code running as quickly and performant as possible.

```
yarn dev
```

Runs Rollup in watch mode which means it will hot-reload the server as you modify your source! This
includes running node with the `--inspect` flag so you can inspect your code using [Google Chrome Dev Tools](https://nodejs.org/en/docs/guides/debugging-getting-started/)
(by opening `chrome://inspect` in your browser), you're welcome ;)

## Contributing

Yes, thank you! Projects like this thrive when they are community-driven.

Please update the docs and tests and add your name to the `package.json` file on any PR you submit.
