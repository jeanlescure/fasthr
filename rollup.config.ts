import { RollupOptions } from 'rollup';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import run from '@rollup/plugin-run';

const pkg = require('./package.json');

const isProduction = (process.env.NODE_ENV === 'production');

const input = './server.ts';

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(
      isProduction ? 'production' : (process.env.NODE_ENV || 'development')
    ),
  }),
  typescript({
    check: !isProduction,
    typescript: require('typescript'),
  }),
  nodeResolve(),
  commonjs({
    sourceMap: !isProduction, // Only output sourcemaps on development
  }),
  json(),
];

if (isProduction) {
  // terser is slow, only run when building
  plugins.push(terser());
}

if (!isProduction) {
  plugins.push(run({
    execArgv: ['-r', 'source-map-support/register', '--inspect'],
  }));
}

const config: RollupOptions = {
  input,
  output: {
    file: 'bin/server.js',
    format: 'cjs',
    exports: 'default',
    sourcemap: !isProduction, // Only output sourcemaps on development
  },
  plugins,
  // indicate here external modules you don't want to include in your bundle (i.e.: 'lodash')
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
  ],
};

if (!isProduction) {
  config.watch = {
    chokidar: {
      useFsEvents: false,
    },
    include: 'server.ts',
    clearScreen: false,
  };
}

export default config;
