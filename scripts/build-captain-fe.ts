import { exists, copyFile, readJson, writeJson } from "fs-extra";
import { exec } from "node:child_process";
import { join } from "node:path";

(async function build() {
  /**
   * Dockerfile
   */
  const dockerfileOrigin = join(__dirname, "../apps/client/Dockerfile");
  if (await exists(dockerfileOrigin)) {
    await copyFile(
      dockerfileOrigin,
      join(__dirname, "../dist/apps/client/Dockerfile")
    );
    console.log("🗸 Copied Dockerfile");
  }

  /**
   * captain-definition
   */
  const captainOrigin = join(__dirname, "../apps/client/captain-definition");
  if (await exists(captainOrigin)) {
    await copyFile(
      captainOrigin,
      join(__dirname, "../dist/apps/client/captain-definition")
    );
    console.log("🗸 Copied captain-definition");
  }

  /**
   * Add missing dependencies
   */
  const packageJsonOrigin = join(__dirname, `../dist/apps/client/package.json`);
  const rootPackageJsonOrigin = join(__dirname, `../package.json`);
  const json = await readJson(packageJsonOrigin);
  const rootJson = await readJson(rootPackageJsonOrigin);

  json.dependencies["@emotion/react"] = rootJson.dependencies["@emotion/react"];
  await writeJson(packageJsonOrigin, json, { spaces: 2 });

  /**
   * Build tarball
   */
  const distFolder = join(__dirname, `../dist/apps/client`);
  const artifactName = "proghours-fe.tar";

  exec(`cd ${distFolder} && tar -czvf ../${artifactName} .`, (error) => {
    if (error) {
      console.log(`🚨 Error: ${error.message}`);
      return;
    }
    console.log(`🎉 Successfully created: ${artifactName}`);
  });
})();
