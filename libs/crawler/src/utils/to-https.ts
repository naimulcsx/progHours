export function toHttps(url: string) {
  const _ = new URL(url);
  if (_.protocol === "http:") url = `https:` + url.substring(5);
  return url;
}
