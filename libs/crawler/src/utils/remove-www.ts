export function removeWWW(url: string) {
  if (url.startsWith("https://www.")) {
    url = url.replace("https://www.", "https://");
  }
  return url;
}
