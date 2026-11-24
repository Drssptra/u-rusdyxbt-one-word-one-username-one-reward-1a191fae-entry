// One Word, One Username, One Reward — make.fun bounty entry.
//
// The brief asks for a single word: the entrant's own make.fun username.
// This program prints exactly that username to stdout and nothing else,
// and also writes the exact same word to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), because the sealed scorer reads that file.
// The file must contain the word with NO trailing newline; stdout keeps
// the usual trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "eager-owl-43";

// A username is one word: lowercase letters, digits and hyphens only,
// no spaces, no punctuation beyond the hyphen. Refuse to print anything
// that does not fit that shape, so the output can never be anything but
// the single word the brief asks for.
if (!/^[a-z0-9-]+$/.test(USERNAME)) {
  process.exit(1);
}

// Write the entry file first: exact word, no trailing newline.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), USERNAME, "utf8");

// Keep the stdout contract unchanged: the word plus a trailing newline.
process.stdout.write(USERNAME + "\n");
