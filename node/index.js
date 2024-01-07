require("dotenv").config();
const db = require("./src/models/database");
const spiders = require("./src/spiders");

const spiderInstances = Object.values(spiders);

const runAllSpiders = async () => {
  let spidersPromises = spiderInstances.map((spider) =>
    spider
      .crawl()
      .then(() => {
        console.log(`${spider.constructor.name} 执行成功！`);
      })
      .catch((error) => {
        console.error(`${spider.constructor.name} 执行出错：`, error);
      })
  );

  await Promise.all(spidersPromises);
};

(async () => {
  await db.initializeDatabase();
  await runAllSpiders();
  await db.endDataBase();
})();
