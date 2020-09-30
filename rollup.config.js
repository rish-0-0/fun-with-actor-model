import nodeResolve from "@rollup/plugin-node-resolve";
import buble from "@rollup/plugin-buble";
import sass from "rollup-plugin-scss";
// import es3 from "rollup-plugin-es3";
import svgi from "rollup-plugin-svgi";
import replace from '@rollup/plugin-replace';
import rimraf from 'rimraf';
import babel from '@rollup/plugin-babel';

rimraf.sync('build');

import pkgj from './package.json';

export default {
  input: "src/index.js",
  output: {
    file: "build/index.js",
    format: "iife",
    globals: {
      preact: 'preact'
    },
    name: 'Hummingbird'
  },
  plugins: [
    replace({
      __buildVersion__: pkgj.version,
    }),
    svgi({
      options: {
        jsx: "preact",
      },
    }),
    sass({
      output: "build/style.css",
    }),
    buble({jsx: 'h'}),
    babel({
      exclude: [
        'node_modules/!(' +
        'google-map-react|preact|preact-compat|react-redux' +
        ')/**',
      ]
    }),
    nodeResolve(),
  ],
};
