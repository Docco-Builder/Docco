// rollup.config.js
import {defineConfig} from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
    plugins: [esbuild(), nodeResolve()],
    input: './src/docco.ts',
    output: {
        dir: './bin/',
        banner: '#!/usr/bin/env node',
        format: 'cjs',
    },
});// rollup.config.js
