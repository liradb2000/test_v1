// import { rollup } from "rollup";
import amd from "rollup-plugin-amd";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-modify";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
// rollup({
//   entry: "src/index.js",
//   plugins: [amd()],
// });

export default {
  input: "src/index.js",
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "path",
    "crypto",
    "react-i18next",
    "@mui/material",
    "@mui/material/utils",
    "@mui/lab",
    "three",
    "immutable",
    "lodash",
    "LiteGraph",
    "react-virtualized",
    "zstd-codec",
    "zustand",
    "system/ui",
    /@design-express\//,
    /@mui\/styles/,
    /#extension:/i,
  ],
  output: {
    dir: "dist",
    // format: "amd", // immediately-invoked function expression — suitable for <script> tags
    format: "es", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: false,
    // browser: true,
    // preserveModules: true,
  },
  plugins: [
    json(),
    resolve(), // tells Rollup how to find date-fns in node_modules
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    babel({
      babelHelpers: "runtime",
      presets: [
        require("./node_modules/@design-express/node-scripts/config/babel.config.js"),
      ],
    }),
    commonjs(),
    amd(),
    replace({
      find: new RegExp(/[\'\"]\/pkg\/file\/(?:.[^\/]*\/){3}[\'\"]/),
      replace: () => `'/pkg/file/test/build/'`,
    }),
    terser({
      module: true,
      toplevel: true,
      parse: {
        // We want terser to parse ecma 8 code. However, we don't want it
        // to apply any minification steps that turns valid ecma 5 code
        // into invalid ecma 5 code. This is why the 'compress' and 'output'
        // sections only apply transformations that are ecma 5 safe
        // https://github.com/facebook/create-react-app/pull/4234
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebook/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
        // Disabled because of an issue with Terser breaking valid code:
        // https://github.com/facebook/create-react-app/issues/5250
        // Pending further investigation:
        // https://github.com/terser-js/terser/issues/120
        inline: 2,
        pure_getters: true,
        defaults: false,
        toplevel: true,
        negate_iife: false,
      },
      mangle: {
        safari10: true,
      },
      // Added for profiling in devtools
      // keep_classnames: isEnvProductionProfile,
      // keep_fnames: isEnvProductionProfile,
      output: {
        ecma: 5,
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebook/create-react-app/issues/2488
        ascii_only: true,
      },
    }),
    // commonjs(), // converts date-fns to ES modules
    // production && terser() // minify, but only in production
  ],
};
