import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { argv } from "node:process";

const [artifactPath, expectedDigest] = argv.slice(2);
if (!artifactPath || !expectedDigest) {
	console.error("Uso: node verify-artifact.mjs <archivo> <sha256>");
	process.exit(2);
}

const digest = createHash("sha256")
	.update(readFileSync(artifactPath))
	.digest("hex");
if (digest !== expectedDigest) {
	console.error(`digest inválido: ${digest} !== ${expectedDigest}`);
	process.exit(1);
}

console.log("artifact digest verified");
