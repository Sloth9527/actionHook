import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const extensions = [".ts"];
const noDeclarationFiles = { compilerOptions: { declaration: false } };

const babelRuntimeVersion = pkg.dependencies["@babel/runtime"].replace(
  /^[^0-9]*/,
  ""
);

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
].map((name) => RegExp(`^${name}($|/)`));

const FILE_NAME = "ActionHook";

export default defineConfig([
  // CommonJS
  {
    input: "src/index.ts",
    output: { file: `lib/${FILE_NAME}.js`, format: "cjs", indent: false },
    external,
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        plugins: [
          ["@babel/plugin-transform-runtime", { version: babelRuntimeVersion }],
          // ['./scripts/mangleErrors.js', { minify: false }]
        ],
        babelHelpers: "runtime",
      }),
    ],
  },

  // ES
  {
    input: "src/index.ts",
    output: { file: `es/${FILE_NAME}.js`, format: "es", indent: false },
    external,
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({ tsconfigOverride: noDeclarationFiles }),
      babel({
        extensions,
        plugins: [
          [
            "@babel/plugin-transform-runtime",
            { version: babelRuntimeVersion, useESModules: true },
          ],
          // ['./scripts/mangleErrors.js', { minify: false }]
        ],
        babelHelpers: "runtime",
      }),
    ],
  },

  // UMD Development
  {
    input: "src/index.ts",
    output: {
      file: `dist/${FILE_NAME}.js`,
      format: "umd",
      name: "ActionHook",
      indent: false,
    },
    external,
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({ tsconfigOverride: noDeclarationFiles }),
      babel({
        extensions,
        exclude: "node_modules/**",
        // plugins: [['./scripts/mangleErrors.js', { minify: false }]],
        babelHelpers: "bundled",
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
  },
]);