import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "node:fs";
import { defineConfig } from "rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// import postcss from 'rollup-plugin-postcss';

// import * as packageJson from "./package.json" assert { type: "json" };

// const packageJson = require("./package.json");

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url))
);

// const packageJson = {
//   main: "build/index.js",
//   module: "build/index.esm.js",
// };

const env = process.env.NODE_ENV;

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: "inline",
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: "inline",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    replace({
      values: { "process.env.NODE_ENV": JSON.stringify(env) },
      preventAssignment: true,
    }),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: ".",
      tsconfig: "./tsconfig.json",
    }),
    // postcss(),
    // terser({
    //   format: {
    //     comments: 'all',
    //   },
    // }),
  ],
});
