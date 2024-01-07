const db = require("../models/database");

module.exports = class JuejinParser {
  constructor() {}

  static parseCollection(collectionSet) {
    const collections = [];
    for (const collection of collectionSet) {
      collections.push({
        id: collection.collection_id,
        name: collection.collection_name,
        user_id: 1,
        platform_id: 1, // juejin
      });
    }
    return collections;
  }

  async insertCollection(collectionSet) {
    console.log("开始解析收藏夹----");

    const collectionData = JuejinParser.parseCollection(collectionSet);
    console.log(collectionData, "解析后的收藏夹");
    await db.insertData(
      "INSERT INTO collection SET ?", // sql
      collectionData
    );

    console.log("解析收藏夹成功----");
  }

  async parse(collectionSet) {
    await this.insertCollection(collectionSet);
  }
};
