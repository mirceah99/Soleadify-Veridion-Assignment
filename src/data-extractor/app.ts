import config from "./config";
import DataExtractor, { STATISTICS } from "./dataExtractor";
import { getWebsiteDomains } from "./utils";
import puppeteer from "puppeteer";
(async () => {
  const startTime = performance.now();
  const browser = await puppeteer.launch({
    headless: "new",
    timeout: config.connectionTimeout,
  });
  const sites = getWebsiteDomains(100);

  const arrayOfRunningExecutors = sites.map(async (site) =>
    new DataExtractor(site, await browser.newPage()).processWebsite()
  );
  await Promise.all(arrayOfRunningExecutors);

  console.log(
    `processed: ${STATISTICS.sitesProcessed} fails: ${STATISTICS.failed.length}`
  );
  console.dir(STATISTICS.failed);

  const endTime = performance.now();
  console.log(`i run in ${(endTime - startTime) / 1000} seconds`);
  await browser.close();
  // while (true) {

  //   dataExtractor.processWebsite(sites[0]);
  //   break;
  // }
})();
