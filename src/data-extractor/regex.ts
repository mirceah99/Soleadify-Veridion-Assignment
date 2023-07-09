export default {
  findNewPageUrl: {
    anchorTag: (mainUrl: string) =>
      new RegExp(
        `<a[ ]{0,3}href[ ]{0,3}=[ ]{0,3}"[ ]{0,3}(http|ftp|https):\/\/${mainUrl}\/[^"]{2,100}">`,
        "gm"
      ),
    anchorTagGetPureUrl: (regexMatch: string): string => {
      const pureUrl = regexMatch.trim().slice(9, -2);
      if (pureUrl.slice(-1) === "/") return pureUrl.slice(0, -1);
      return pureUrl;
    },
  },
};
