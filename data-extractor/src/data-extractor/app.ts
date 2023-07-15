console.log(`DATA extractor starts running!`);
import config from "./config";
import DataExtractor, { STATISTICS } from "./dataExtractor";
import { getWebsiteDomains } from "./utils";
import puppeteer, { Browser } from "puppeteer";
import axios from "axios";
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

  console.log(
    `processed: ${STATISTICS.sitesProcessed} fails: ${STATISTICS.failed.length}`
  );
  // console.dir(STATISTICS.failed);
  // fs.writeFileSync("./fails.html", JSON.stringify(STATISTICS.failed));
  const endTime = performance.now();
  console.log(`i run in ${(endTime - startTime) / 1000} seconds`);
  await browser.close();
  // while (true) {

  //   dataExtractor.processWebsite(sites[0]);
  //   break;
  // }
})();

async function startExtractor(browser: Browser, site?: string) {
  const siteToProcess = site || getWebsiteDomains(1)[0];
  if (!siteToProcess) return;
  let page;
  try {
    page = await browser.newPage();
    await new DataExtractor(siteToProcess, page, axios).processWebsite();
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