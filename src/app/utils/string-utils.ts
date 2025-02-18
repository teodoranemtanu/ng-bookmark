
export const isValidUrl = (url: string, urlPattern: RegExp) => {
  return urlPattern.test(url);
}
