import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const segments = {
  "js/player.js": [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ],
  "js/team.js": [
    27,
    28,
    29
  ],
  "js/tactics.js": [
    34
  ],
  "js/match-engine.js": [
    30,
    31,
    32,
    33,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43
  ],
  "js/match-renderer.js": [
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ],
  "js/main.js": [
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63
  ]
};
const parts = [];
for (const [filename, lines] of Object.entries(segments)) {
  execFileSync('node', ['--check', filename], {stdio:'inherit'});
  const content = fs.readFileSync(filename, 'utf8').replace(/^'use strict';\n/, '').split('\n');
  const originals = content.slice(0, -1);
  if (originals.length !== lines.length) throw Error(`Unexpected line count: ${filename}`);
  lines.forEach((n, i) => parts.push([n, originals[i] + '\n']));
}
parts.sort((a,b) => a[0]-b[0]);
const canonical = parts.map(p=>p[1]).join('');
const actual = crypto.createHash('sha256').update(canonical).digest('hex');
const expected = '7ca99d3dfd16a4d4bcf878287c51fb4cabbc440eae717737f95385eb4a49aa61';
if(actual!==expected)throw Error('Baseline JavaScript differs from v0.3.0');
console.log('PASS: All JavaScript parses and matches the v0.3.0 baseline.');
