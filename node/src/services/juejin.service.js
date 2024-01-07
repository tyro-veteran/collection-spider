const TyroAxios = require(".");

const httpRequest = new TyroAxios({
  baseURL: "https://api.juejin.cn/interact_api/v2",
  headers: {
    authority: "api.juejin.cn",
    accept: "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    cookie: process.env.COOKIE,
  },
});

const COLLECTION_URL =
  "/collectionset/list?aid=2608&uuid=7253686529141868032&spider=0";

const COLLECTION_DETAIL_URL =
  "collectionset/detail?aid=2608&uuid=7253686529141868032&spider=0";

module.exports = class JuejinService {
  static getCollectionSet(article_id, user_id, cursor, limit) {
    return httpRequest.post({
      url: COLLECTION_URL,
      data: {
        article_id,
        user_id,
        cursor,
        limit,
      },
    });
  }

  static getCollectionDetail(collection_id, cursor, limit) {
    return httpRequest.post({
      url: COLLECTION_DETAIL_URL,
      data: {
        collection_id,
        cursor,
        limit,
      },
    });
  }
};
