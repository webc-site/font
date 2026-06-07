#!/usr/bin/env bun
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import render from "@3-/mdt/render.js";
import write from "@3-/write";

const DIR = import.meta.dirname,
  WOFF2 = join(DIR, "woff2");

const main = async () => {
  const pkg_path = join(DIR, "package.json"),
    pkg_promise = readFile(pkg_path, "utf-8"),
    readme_promise = render(join(DIR, "README.mdt"));

  const pkg = JSON.parse(await pkg_promise),
    version_parts = pkg.version.split(".");

  version_parts[2] = String(Number(version_parts[2]) + 1);
  pkg.version = version_parts.join(".");

  const pkg_str = JSON.stringify(pkg, null, 2) + "\n",
    readme = await readme_promise;

  write(pkg_path, pkg_str);
  write(join(WOFF2, "package.json"), pkg_str);
  write(join(WOFF2, "README.md"), readme);
  write(join(DIR, "README.md"), readme);
};

export default main;

if (import.meta.main) {
  await main();
}
