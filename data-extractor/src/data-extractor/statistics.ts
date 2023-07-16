import { AxiosStatic } from "axios";
import axios from "axios";
import config from "./config";

interface FailedWebsite {
  reason: string;
  domain: string;
}

export class StatisticsService {
  private addressesFound: number;
  private phoneNumbersFound: number;
  private socialLinksFound: number;
  private websitesSuccessfullyProcessed: number;
  private totalWebsites: number;
  private errors: any;
  private failedWebsites: FailedWebsite[];
  private httpService: AxiosStatic;
  private totalTimeRun: number;
  constructor(httpService: AxiosStatic) {
    this.addressesFound = 0;
    this.phoneNumbersFound = 0;
    this.socialLinksFound = 0;
    this.errors = {};
    this.websitesSuccessfullyProcessed = 0;
    this.totalWebsites = 0;
    this.failedWebsites = [];
    this.httpService = httpService;
    this.totalTimeRun = NaN;
  }

  incrementPhone(value: number) {
    this.phoneNumbersFound += value;
  }
  incrementTotalWebsites(value: number) {
    this.totalWebsites += value;
  }
  incrementAddresses(value: number) {
    this.addressesFound += value;
  }
  incrementSocialLinks(value: number) {
    this.socialLinksFound += value;
  }
  incrementWebsitesSuccessfullyProcessed(value: number) {
    this.websitesSuccessfullyProcessed += value;
  }
  registerError(name: string) {
    if (this.errors[name] !== undefined) return this.errors[name]++;
    return (this.errors[name] = 1);
  }
  registerFailedWebsite(info: FailedWebsite) {
    this.failedWebsites.push(info);
  }
  log() {
    console.log(this);
  }
  generateHtmlTemplate() {
    return `
    <p>Total successfully websites processed: <b>${
      this.websitesSuccessfullyProcessed
    }</b> from <b>${this.totalWebsites}</b> websites</p>
    <p>Success rate: <b> ${(
      (this.websitesSuccessfullyProcessed / this.totalWebsites) *
      100
    ).toFixed(2)}</b> %</p>
    <p>Total time run: <b>${this.totalTimeRun.toFixed(2)} sec aka ${(
      this.totalTimeRun / 60
    ).toFixed(2)} min</b></p>
    <p>Addresses found: <b>${this.addressesFound} </b></p>
    <p>Social links found: <b>${this.socialLinksFound}</b></p>
    <p>Phone numbers found: <b>${this.phoneNumbersFound}</b></p>
    <p>Total errors: </p>
    <ul>
        ${Object.keys(this.errors)
          .map((key) => `<li>${key} - <b>${this.errors[key]}</b>`)
          .concat(" ")}
    </ul>
    <p>Failed websites: </p>
    <ul>
        ${this.failedWebsites
          .map(
            (failedSite) =>
              `<li><a href = "https://${failedSite.domain}">${failedSite.domain}</a> ${failedSite.reason}</li>`
          )
          .concat(" ")}
    </ul>
    `;
  }
  async registerResult() {
    await this.httpService.post(config.postStatisticsFullURI, {
      rawHtml: this.generateHtmlTemplate(),
    });
  }
  setTotalTime(seconds: number) {
    this.totalTimeRun = seconds;
  }
}

const GlobalStatistics = new StatisticsService(axios);
export default GlobalStatistics;
