import { copyFile, exists, readJson, writeJson } from "fs-extra";
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
