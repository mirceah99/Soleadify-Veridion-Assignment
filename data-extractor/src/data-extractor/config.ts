export default {
  numberOfSubpages:
    (process.env.NUMBER_OF_SUBPAGES && +process.env.NUMBER_OF_SUBPAGES) || 10,
  connectionTimeout:
    (process.env.CONNECTION_TIMEOUT && +process.env.CONNECTION_TIMEOUT) ||
    40_000,
  concurrentExtractorsAsATime:
    (process.env.CONCURRENT_EXTRACTORS_AS_A_TIME &&
      +process.env.CONCURRENT_EXTRACTORS_AS_A_TIME) ||
    50,
  postDataApiFullURI:
    process.env.MAIN_API_URL || "http://localhost:3000/company",
  chromiumExecutablePath: process.env.CHROMIUM_EXECUTABLE_PATH,
  maxNumberOfWebsitesToCheck:
    process.env.MAX_NUMBER_OF_WEBSITES_TO_CHECK || null,
  postStatisticsFullURI:
    process.env.POST_STATISTICS_FULL_URI || "http://localhost:3000/statistics",
};
