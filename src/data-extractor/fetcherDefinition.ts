export default interface Fetcher {
  get(url: string): Promise<any>;
}
