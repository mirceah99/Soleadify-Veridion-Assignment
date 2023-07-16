import regexPresets from "./regex";
import config from "./config";
import { SOCIAL_MEDIA_SIGNATURES, removeDuplicates } from "./utils";
import { Page } from "puppeteer";
import { AxiosStatic } from "axios";
import { StatisticsService } from "./statistics";
interface HtmlPage {
  url: string;
  verified: boolean;
}
let c = 0;
export default class DataExtractor {
  private pages: HtmlPage[];
  private httpService: AxiosStatic;
  private mainUrl: string;
  private mainUrlWithoutProtocol: string;
  private browserTab: Page;
  private phoneNumbers: string[];
  private socialMediaLinks: string[];
  private statisticsService: StatisticsService;
  constructor(
    mainUrl: string,
    browserTab: Page,
    httpService: AxiosStatic,
    statisticsService: StatisticsService
  ) {
    this.httpService = httpService;
    this.browserTab = browserTab;
    this.mainUrl = `https://${mainUrl}`;
    this.mainUrlWithoutProtocol = mainUrl;
    this.pages = [];
    this.pages.push({ url: mainUrl, verified: false });
    this.phoneNumbers = [];
    this.socialMediaLinks = [];
    this.statisticsService = statisticsService;
  }
  async processWebsite() {
    try {
      console.log(`start ${this.mainUrlWithoutProtocol} ${c++}`);
      this.statisticsService.incrementTotalWebsites(1);
      await this.loadPageInTab();
      const otherWebsites = this.findOtherPagesInPageContent(
        await this.getPageRowHTML()
      );
      this.addPages(otherWebsites);
      await this.searchForPhoneNumbers();
      await this.searchForSocialMediaLinks();
      this.removeDuplicates();
      this.statisticsService.incrementAddresses(0);
      this.statisticsService.incrementPhone(this.phoneNumbers.length);
      this.statisticsService.incrementSocialLinks(this.socialMediaLinks.length);
      await this.saveDataToMainAPI();
      this.statisticsService.incrementWebsitesSuccessfullyProcessed(1);
    } catch (error: any) {
      const errorIdentifier = (error?.message as string) || "Unmarked error";
      this.statisticsService.registerFailedWebsite({
        domain: this.mainUrlWithoutProtocol,
        reason: errorIdentifier,
      });
      this.statisticsService.registerError(
        errorIdentifier.replace(this.mainUrl, "")
      );
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
      if (!this.getPage(url)) this.pages.push({ url, verified: false });
    }
  }
  getPage(url: string): HtmlPage | null {
    return this.pages.find((element) => element.url === url) || null;
  }
  async loadPageInTab(url?: string) {
    await this.browserTab.goto(url || this.mainUrl, {
      timeout: config.connectionTimeout,
      waitUntil: "networkidle2", // kinda document.ready (waits to be no more than 2 network connections for at least 500 ms.)
    });
  }
  async getPageRowHTML() {
    return this.browserTab.evaluate(() => {
      return document.querySelector("html")?.outerHTML || "";
    });
  }
  async searchForSocialMediaLinks() {
    const rowHtml = await this.getPageRowHTML();
    const allUrls = rowHtml.match(regexPresets.url) || [];
    for (const url of allUrls) {
      for (const socialMedia of SOCIAL_MEDIA_SIGNATURES) {
        if (url.includes(socialMedia)) {
          this.socialMediaLinks.push(url);
          break;
        }
      }
    }
  }
  async searchForPhoneNumbers() {
    const rowHtml = await this.getPageRowHTML();
    for (const reg of regexPresets.phoneNumber) {
      const matches = rowHtml.match(reg) || [];
      this.phoneNumbers.push(...matches);
    }
  }
  removeDuplicates() {
    this.phoneNumbers = removeDuplicates(this.phoneNumbers);
    this.socialMediaLinks = removeDuplicates(this.socialMediaLinks);
  }
  async saveDataToMainAPI() {
    const updateData = {
      domain: this.mainUrlWithoutProtocol,
      socialMediaLinks:
        this.socialMediaLinks.length > 0 ? this.socialMediaLinks : undefined,
      phoneNumbers:
        this.phoneNumbers.length > 0 ? this.phoneNumbers : undefined,
    };
    return (await this.httpService.post(config.postDataApiFullURI, updateData))
      .status;
  }
}
