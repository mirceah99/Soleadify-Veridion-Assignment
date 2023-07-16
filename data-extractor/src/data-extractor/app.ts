console.log(`DATA extractor starts running!`);
import config from "./config";
import DataExtractor from "./dataExtractor";
import { getWebsiteDomains } from "./utils";
import puppeteer, { Browser } from "puppeteer";
import axios from "axios";
import statisticsService from "./statistics";
const additionalSettings = config.chromiumExecutablePath
  ? {
      executablePath: config.chromiumExecutablePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }
  : null;
console.log(additionalSettings);
(async () => {
  const startTime = performance.now();
  const browser = await puppeteer.launch({
    headless: "new",
    timeout: config.connectionTimeout,
    ignoreHTTPSErrors: true,
    ...additionalSettings,
  });
  console.log(
    `I will try to start ${config.concurrentExtractorsAsATime} processors`
  );
  const sites = getWebsiteDomains(config.concurrentExtractorsAsATime);

  const arrayOfRunningExecutors = sites.map(async (site) =>
    startExtractor(browser, site)
  );
  await Promise.all(arrayOfRunningExecutors);

  const endTime = performance.now();
  console.log(`i run in ${(endTime - startTime) / 1000} seconds`);
  statisticsService.setTotalTime((endTime - startTime) / 1000);
  // statisticsService.log();
  await statisticsService.registerResult();
  await browser.close();
})();

async function startExtractor(browser: Browser, site?: string) {
  const siteToProcess = site || getWebsiteDomains(1)[0];
  if (!siteToProcess) return;
  let page;
  try {
    page = await browser.newPage();
    await new DataExtractor(
      siteToProcess,
      page,
      axios,
      statisticsService
    ).processWebsite();
  } catch (e) {
    console.log(`error ocurred ..`);
    return;
  } finally {
    try {
      page?.close();
    } catch (e) {}
  }
  await startExtractor(browser);
  return;
}
