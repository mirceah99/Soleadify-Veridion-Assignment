import Fetcher from "./fetcherDefinition";
import axiosFetcher from "./fetcherImplementationAxios";
import * as fs from "fs";
import regexPresets from "./regex";
import config from "./config";
import { removeDuplicates } from "./utils";

interface Page {
  url: string;
  verified: boolean;
  content: string | null;
}
interface Statistics {
  sitesProcessed: number;
  sitesWithInsufficientPages: string[];
  failed: string[];
}

export const STATISTICS: Statistics = {
  sitesProcessed: 0,
  sitesWithInsufficientPages: [],
  failed: [],
};

export default class DataExtractor {
  private pages: Page[];
  private fetcher: Fetcher;
  private mainUrl: string;
  private mainUrlWithoutProtocol: string;
  constructor(mainUrl: string, fetcher?: Fetcher) {
    this.fetcher = fetcher || axiosFetcher;
    this.mainUrl = `https://${mainUrl}`;
    this.mainUrlWithoutProtocol = mainUrl;
    this.pages = [];
    this.pages.push({ url: mainUrl, verified: false, content: null });
  }
  async processWebsite() {
    try {
      const firstPage = await this.fetcher.get(this.mainUrl);
      fs.writeFileSync("./result3.html", firstPage);
      const otherWebsites = this.findOtherPagesInPageContent(firstPage);
      this.addPages(otherWebsites);
      STATISTICS.sitesProcessed++;
      console.log(`${this.pages.length} - ${this.mainUrl}`);
      if (this.pages.length < config.numberOfSubpages)
        STATISTICS.sitesWithInsufficientPages.push(this.mainUrlWithoutProtocol);
    } catch (e) {
      STATISTICS.failed.push(this.mainUrl);
    }
  }
  findOtherPagesInPageContent(pageHtml: string): string[] {
    const matches =
      pageHtml
        .match(
          regexPresets.findNewPageUrl.anchorTag(this.mainUrlWithoutProtocol)
        )
        ?.slice(0, config.numberOfSubpages) || [];
    return removeDuplicates(
      matches.map(regexPresets.findNewPageUrl.anchorTagGetPureUrl)
    );
  }
  addPages(urls: string[]) {
    for (const url in urls) {
      if (!this.getPage(url))
        this.pages.push({ url, content: null, verified: false });
    }
  }
  getPage(url: string): Page | null {
    return this.pages.find((element) => element.url === url) || null;
  }
}
