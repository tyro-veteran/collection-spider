require('dotenv').config();

const JuejinSpider = require("./src/spiders/juejin");

const juejin = new JuejinSpider();

juejin.crawl();
