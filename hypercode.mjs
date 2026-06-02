#!/usr/bin/env node
/**
<<<<<<<< HEAD:hypernexus.mjs
 * HyperNexus HYPERNEXUS - Top-level CLI wrapper
========
 * Hypercode HYPERCODE - Top-level CLI wrapper
>>>>>>>> origin/jules-11468118918326359250-8f2d9620:hypercode.mjs
 * Runs the compiled CLI from packages/cli/dist
 */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliEntry = resolve(__dirname, 'packages/cli/dist/cli/src/index.js');

const require = createRequire(import.meta.url);
require('module').runMain();
import(cliEntry);
