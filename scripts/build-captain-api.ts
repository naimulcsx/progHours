import { copy, copyFile, exists } from "fs-extra";
import { exec } from "node:child_process";
import { join } from "node:path";

(async function build() {
  /**
   * Dockerfile
   */
  const dockerfileOrigin = join(__dirname, "../apps/api/Dockerfile");
  if (await exists(dockerfileOrigin)) {
    await copyFile(
      dockerfileOrigin,
      join(__dirname, "../dist/apps/api/Dockerfile")
    );
    console.log("🗸 Copied Dockerfile");
  }

  /**
   * captain-definition
   */
  const captainOrigin = join(__dirname, "../apps/api/captain-definition");
  if (await exists(captainOrigin)) {
    await copyFile(
      captainOrigin,
      join(__dirname, "../dist/apps/api/captain-definition")
    );
    console.log("🗸 Copied captain-definition");
  }

  /**
   * Copy prisma
   */
  const prismaOrigin = join(__dirname, `../apps/api/prisma`);
  const prismaDestination = join(__dirname, `../dist/apps/api/prisma`);
  await copy(prismaOrigin, prismaDestination);

  /**
   * Copy Scripts
   */
  const scriptsOrigin = join(__dirname, `../scripts`);
  const scriptsDestination = join(__dirname, `../dist/apps/api/scripts`);
  await copy(scriptsOrigin, scriptsDestination);

  /**
   * Build tarball
   */
  const distFolder = join(__dirname, `../dist/apps/api`);
  const artifactName = "proghours-api.tar";

  exec(`cd ${distFolder} && tar -czvf ../${artifactName} .`, (error) => {
    if (error) {
      console.log(`🚨 Error: ${error.message}`);
      return;
    }
    console.log(`🎉 Successfully created: ${artifactName}`);
  });
})();
