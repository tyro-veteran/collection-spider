const JuejinService = require("../services/juejin.service");
const to = require("await-to-js").default;

module.exports = class JuejinSpider {
  constructor() {
    this.cookie = null;
    this.collectionSet = [];
  }

  static async getCollectionSet() {
    console.log("---开始获取收藏夹---");
    const collectionSet = [];
    let cursor = 0;

    while (true) {
      const [err, res] = await to(
        JuejinService.getCollectionSet(
          "",
          "3553264960014669",
          String(cursor),
          20
        )
      );

      if (err) {
        console.log(err, "---获取收藏夹失败---");
        break;
      }

      collectionSet.push(...res.data.data);

      if (res.has_more) {
        cursor += 1;
      } else {
        break;
      }
    }

    return collectionSet;
  }

  async fetchPage(url) {}

  static async crawl() {
    this.collectionSet = await this.getCollectionSet();
  }
};
