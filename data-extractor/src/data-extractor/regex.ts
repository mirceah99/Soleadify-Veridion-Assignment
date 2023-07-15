export default {
  findNewPageUrl: {
    anchorTag: (mainUrl: string) =>
      new RegExp(`"(http|ftp|https):\/\/${mainUrl}\/[^"]{2,100}">`, "gm"),
    anchorTagGetPureUrl: (regexMatch: string): string => {
      const pureUrl = regexMatch.trim().slice(9, -2);
      if (pureUrl.slice(-1) === "/") return pureUrl.slice(0, -1);
      return pureUrl;
    },
  },
  phoneNumber: [
    new RegExp(
      `[ ]{0,3}(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}[ ]{0,4}`,
      "gm"
    ),
  ],
  url: new RegExp(
    `[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)`,
    "gm"
  ),
};
