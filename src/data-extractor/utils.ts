import * as fs from "fs";
import { join } from "path";
const PATH_TO_FILE = join(__dirname, "..", "..", "sample-websites.csv");

let currentLine = 1; // line 0 is header
const fileContent: string[] = fs
  .readFileSync(PATH_TO_FILE, "utf-8")
  .split("\r\n"); // maybe will be easier to use a cvs package or convert cvs to json

export function getWebsiteDomains(numberOfDomains = 1) {
  return fileContent.slice(currentLine, (currentLine += numberOfDomains));
}
export function removeDuplicates(array: string[]) {
  return [...new Set(array)];
}
export function removeElementFromArray<T>(array: T[], elem: T): void {
  const index = array.indexOf(elem);
  if (index !== -1) {
    array.splice(index, 1);
  }
}
