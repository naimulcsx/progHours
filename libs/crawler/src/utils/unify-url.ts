import { isValidLink, removeTrailingSlash, removeWWW, toHttps } from "./";

const INVALID_URL_ERROR = "Invalid URL";

export function unifyUrl(url: string) {
  url = toHttps(url);
  url = removeTrailingSlash(url);
  url = removeWWW(url);
  if (!isValidLink(url)) {
    throw new Error(INVALID_URL_ERROR);
  }
  return url;
}
