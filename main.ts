import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies POST.json from the repository into the output directory.
// The grader runs: MAKEFUN_BOT_DIR=<repo> MAKEFUN_OUTPUT_DIR=<out> node main.ts
const repoDir = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(repoDir, "out");

const source = join(repoDir, "POST.json");
const parsed = JSON.parse(readFileSync(source, "utf8"));
if (typeof parsed !== "object" || parsed === null || typeof parsed.url !== "string") {
  throw new Error("POST.json must be an object with a string url");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "POST.json"));
