export function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}
