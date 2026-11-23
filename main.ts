import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line roast: the alarm app. The joke is the betrayal — the app
// watches you snooze nine times, then acts surprised that you are late.
const LINE =
  "My alarm lets me snooze nine times, then acts shocked when I'm late, as if it wasn't sitting right there for all nine.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// The gate allows 1–200 characters. Fail loudly instead of writing an
// invalid entry if the line ever grows past the limit.
if ([...LINE].length > 200 || [...LINE].length < 1) {
  throw new Error(`roast line is ${[...LINE].length} characters, must be 1-200`);
}

// Create the output dir if missing. Never chmod the dir itself: on the
// grader it is a root-owned bind mount and chmod fails EPERM.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
