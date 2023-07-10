export default {
  numberOfSubpages: +process.env.NUMBER_OF_SUBPAGES || 10,
  connectionTimeout: +process.env.CONNECTION_TIMEOUT || 30_000,
  concurrentExtractorsAsATime:
    +process.env.CONCURRENT_EXTRACTORS_AS_A_TIME || 25,
};
