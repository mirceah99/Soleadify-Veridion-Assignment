import * as fs from "fs";
import { join } from "path";
const PATH_TO_FILE = join(__dirname, "..", "..", "sample-websites.csv");

let currentLine = 1; // line 0 is header
const fileContent: string[] = fs
  .readFileSync(PATH_TO_FILE, "utf-8")
  .split("\r\n")
  .slice(0, 100); // maybe will be easier to use a cvs package or convert cvs to json

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

export const SOCIAL_MEDIA_SIGNATURES = [
  "facebook.com",
  "youtube.com",
  "whatsapp.com",
  "instagram.com",
  "wechat.com",
  "tiktok.com",
  "weibo.com",
  "qq.com",
  "telegram.org",
  "snapchat.com",
  "kuaishou.com",
  "qzone.com",
  "pinterest.com",
  "twitter.com",
  "reddit.com",
  "linkedin.com",
  "quora.com",
  "discord.com",
  "twitch.tv",
  "tumblr.com",
  "mastodon.social",
  "myspace.com",
  "viber.com",
  "line.me",
  "flickr.com",
  "meetup.com",
  "vk.com",
  "soundcloud.com",
  "tencent.com",
  "ok.ru",
  "douban.com",
  "taringa.net",
  "xing.com",
  "deviantart.com",
  "mixi.jp",
  "meetme.com",
  "behance.net",
  "livejournal.com",
  "tagged.com",
  "hi5.com",
  "kiwibox.com",
  "renren.com",
  "goodreads.com",
  "cafe.naver.com",
  "last.fm",
  "fotolog.com",
  "twoo.com",
  "foursquare.com",
  "plurk.com",
  "stumbleupon.com",
  "newgrounds.com",
  "flipboard.com",
  "dailymotion.com",
  "xanga.com",
  "badoo.com",
  "japan-guide.com",
  "cyworld.com",
  "bilibili.com",
  "couchsurfing.com",
  "gaiaonline.com",
  "wretch.cc",
  "skyrock.com",
  "acfun.cn",
  "moco-space.com",
  "wattpad.com",
  "tribe.net",
  "netlog.com",
  "friendster.com",
  "odnoklassniki.ru",
  "tuenti.com",
  "viadeo.com",
  "blackplanet.com",
  "buzznet.com",
  "liveinternet.ru",
  "meinvz.net",
  "grooveshark.com",
  "xiami.com",
  "trombi.com",
  "minds.com",
  "weheartit.com",
  "livejournal.ru",
  "fotki.com",
  "multiply.com",
  "hyves.nl",
  "hyves.net",
  "perfspot.com",
  "blackplanet.com",
  "sina.com.cn",
  "zing.vn",
  "xuite.net",
  "hinet.net",
  "panoramio.com",
  "netease.com",
  "nasza-klasa.pl",
  "meituan.com",
  "linkedin.cn",
  "zhihu.com",
  "instagram.cn",
  "myspace.cn",
  "twitter.cn",
  "facebook.cn",
  "youtube.cn",
  "weibo.cn",
  "qq.cn",
];
