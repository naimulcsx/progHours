import { readJsonSync, writeJsonSync } from "fs-extra";
import { execSync } from "node:child_process";
import { join } from "node:path";

import { computeMetaHash } from "./compute-meta-hash";

(async function build() {
  /**
   * Compute hash
   */
  const packageJson = readJsonSync(join(__dirname, "../package.json"));
  const json = readJsonSync(
    join(__dirname, "../apps/api/src/modules/app/controllers/info.json")
  );
  json.version = packageJson.version;

  const commitHash = execSync("git rev-parse HEAD").toString("utf8");
  json.commitHash = commitHash.slice(0, -1);

  const buildHash = computeMetaHash([join(__dirname, "../apps/api")]);
  json.buildHash = buildHash;

  json.buildTime = new Date().toISOString();
  writeJsonSync(
    join(__dirname, "../apps/api/src/modules/app/controllers/info.json"),
    json
  );

  console.log(json);
})();
