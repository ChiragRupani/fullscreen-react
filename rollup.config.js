import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');
const env = process.env.NODE_ENV;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    replace({
      values: { 'process.env.NODE_ENV': JSON.stringify(env) },
      preventAssignment: true,
    }),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'build',
    }),
    postcss(),
    // terser({
    //   format: {
    //     comments: 'all',
    //   },
    // }),
  ],
};
