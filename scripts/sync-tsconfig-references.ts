#!/usr/bin/env node

import { globSync, readFileSync, writeFileSync } from "node:fs";
import { resolve as pathResolve, basename } from "node:path";
import assert from "node:assert";
import { isDeepStrictEqual } from "node:util";

const rootDir = pathResolve(import.meta.dirname, "..");

const allPackagesInTsConfigReferencesFormat = globSync(
	pathResolve(rootDir, "packages/*"),
)
	.map((path) => basename(path))
	.toSorted()
	.map((name) => ({
		path: `./packages/${name}`,
	}));

const tsconfigPath = pathResolve(rootDir, "tsconfig.json");

const tsconfig: Record<string, unknown> = JSON.parse(
	readFileSync(tsconfigPath, "utf-8"),
);

assert(Array.isArray(tsconfig["references"]));

if (
	!isDeepStrictEqual(
		tsconfig["references"],
		allPackagesInTsConfigReferencesFormat,
	)
) {
	tsconfig["references"] = allPackagesInTsConfigReferencesFormat;
	// Write without any formatting, let Prettier kick in
	writeFileSync(tsconfigPath, JSON.stringify(tsconfig));

	console.log(
		`[sync-config-references] Updated tsconfig.json references section`,
	);
}
