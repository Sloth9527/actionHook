import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import dts from 'rollup-plugin-dts'
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

const globals = {
  react: 'react',
};

export default defineConfig([
  // index.d.ts
  {
    input: "src/index.ts",
    output: { file: './types/index.d.ts', format: "es", globals },
    external,
    plugins: [
      dts({ respectExternal: true }),
    ],
  },

  // CommonJS
  {
    input: "src/index.ts",
    output: { file: `lib/${FILE_NAME}.js`, format: "cjs", globals },
    external,
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({ tsconfigOverride: noDeclarationFiles }),
      babel({
        extensions,
        plugins: [
          ["@babel/plugin-transform-runtime", { version: babelRuntimeVersion }],
        ],
        babelHelpers: "runtime",
      }),
    ],
  },

  // ES
  {
    input: "src/index.ts",
    output: { file: `es/${FILE_NAME}.js`, format: "es", globals },
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
      name: "action-hook",
      globals
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
        babelHelpers: "bundled",
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
  },
]);
