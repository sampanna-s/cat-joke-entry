import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entryText =
  "My cat knocked my coffee off the table, then stared until I apologized for putting it in her way.";

function validateEntry(text) {
  const characterCount = [...text].length;
  const hasLineBreak = /[\r\n]/.test(text);
  const isBlank = text.trim().length === 0;

  if (characterCount < 1 || characterCount > 200 || hasLineBreak || isBlank) {
    throw new Error(`entry failed validation: ${characterCount} characters`);
  }
}

validateEntry(entryText);

function writeEntryAtomically(outputDirectory, text) {
  mkdirSync(outputDirectory, { recursive: true });
  const temporaryPath = join(outputDirectory, ".entry.txt.tmp");
  const finalPath = join(outputDirectory, "entry.txt");
  writeFileSync(temporaryPath, text, "utf8");
  renameSync(temporaryPath, finalPath);
}

writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", entryText);
