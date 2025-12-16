import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tsEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig({
	files: ["packages/**/src/**.ts", "./*.{js,mjs}", "./scripts/*.ts"],
	extends: [
		eslint.configs.recommended,
		tsEslint.configs.strict,
		tsEslint.configs.stylistic,
		eslintConfigPrettier,
	],
});
