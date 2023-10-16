export function isValidLink(link: string) {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
