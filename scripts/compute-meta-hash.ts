import { Hash, createHash } from "node:crypto";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Creates hash of given files/folders. Used to conditionally deploy custom
 * resources depending if source files have changed
 */
export function computeMetaHash(paths: string[], inputHash?: Hash) {
  const hash = inputHash ? inputHash : createHash("sha1");
  for (const path of paths) {
    // ignore the .json files
    if (path.endsWith(".json")) continue;

    const statInfo = statSync(path);
    if (statInfo.isDirectory()) {
      const directoryEntries = readdirSync(path, { withFileTypes: true });
      const fullPaths = directoryEntries.map((e) => join(path, e.name));
      // recursively walk sub-folders
      computeMetaHash(fullPaths, hash);
    } else {
      const statInfo = statSync(path);
      // compute hash string name:size:mtime
      const fileInfo = `${path}:${statInfo.size}:${statInfo.mtimeMs}`;
      hash.update(fileInfo);
    }
  }
  // if not being called recursively, get the digest and return it as the hash result
  if (!inputHash) {
    return hash.digest().toString("hex");
  }
  return "";
}
