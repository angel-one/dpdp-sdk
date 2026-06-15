import { cpSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src', 'lib', 'styles');
const outDir = join(root, 'dist', 'styles');

mkdirSync(outDir, { recursive: true });
cpSync(srcDir, outDir, { recursive: true });
