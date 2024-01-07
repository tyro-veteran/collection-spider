const JuejinService = require("../services/juejin.service");
const { juejinParser } = require("../parsers");

const to = require("await-to-js").default;

module.exports = class JuejinSpider {
  constructor() {
    this.collectionSet = [];
    this.collectionDetailMap = new Map();
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
        console.log("---获取收藏夹成功---");
        break;
      }
    }

    return collectionSet;
  }

  static async getCollectionDetail(collection_id, collection_name) {
    console.log(`---开始获取 {${collection_name}} 收藏夹详情---`);
    const collectionDetail = [];
    let cursor = 0;

    while (true) {
      const [err, res] = await to(
        JuejinService.getCollectionDetail(collection_id, String(cursor), 20)
      );

      if (err) {
        console.log(err, `---获取 {${collection_name}} 收藏夹详情失败---`);
        break;
      }

      collectionDetail.push(...res.data.data.articles);

      if (res.has_more) {
        cursor += 1;
      } else {
        console.log(`---获取 {${collection_name}} 收藏夹详情成功---`);
        break;
      }
    }

    return collectionDetail;
  }

  async fetchPage(url) {}

  async crawl() {
    this.collectionSet = await JuejinSpider.getCollectionSet();

    for (const collection of this.collectionSet) {
      this.collectionDetailMap.set(
        collection.collection_name,
        await JuejinSpider.getCollectionDetail(
          collection.collection_id,
          collection.collection_name
        )
      );
    }

    console.log(this.collectionSet, "收藏夹");
    console.log(this.collectionDetailMap, "收藏夹详情");

    await this.triggerParser();
  }

  async triggerParser() {
    // 假设 this.parser 是爬虫对应的解析器实例
    await juejinParser.parse(this.collectionSet); // 调用解析器的解析方法
  }
};
