export default {
  numberOfSubpages: +process.env.NUMBER_OF_SUBPAGES || 10,
  connectionTimeout: +process.env.CONNECTION_TIMEOUT || 60_000,
};
