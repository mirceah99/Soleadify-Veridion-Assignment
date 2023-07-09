import DataExtractor, { STATISTICS } from "./dataExtractor";
import { getWebsiteDomains } from "./utils";

(async () => {
  const startTime = performance.now();
  const sites = getWebsiteDomains(100);
  const arrayOfRunningExecutors = sites.map((site) =>
    new DataExtractor(site).processWebsite()
  );
  await Promise.all(arrayOfRunningExecutors);

  console.log(
    `processed: ${STATISTICS.sitesProcessed}, insufficient: ${STATISTICS.sitesWithInsufficientPages.length} fails: ${STATISTICS.failed.length}`
  );

  const endTime = performance.now();
  console.log(`i run in ${(endTime - startTime) / 1000} seconds`);
  // while (true) {

  //   dataExtractor.processWebsite(sites[0]);
  //   break;
  // }
})();
