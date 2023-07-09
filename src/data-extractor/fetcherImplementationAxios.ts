import axios from "axios";
import Fetcher from "./fetcherDefinition";

class AxiosFetcher implements Fetcher {
  async get(url: string) {
    return (await axios.get(url)).data;
  }
}
const axiosFetcher = new AxiosFetcher();
export default axiosFetcher;
