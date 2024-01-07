const mysql = require("mysql2/promise");

// 数据库连接配置
let connection;

async function initializeDatabase() {
  try {
    connection = await mysql.createConnection({
      host: "119.23.65.118",
      user: "root",
      password: "123456",
      database: "tyro-collection",
    });
    console.log("数据库连接成功");
  } catch (err) {
    console.error("数据库连接失败：", err);
  }
}

// 关闭数据库
const endDataBase = async () => {
  try {
    await connection.end();
    console.log("已成功关闭数据库");
  } catch (err) {
    console.error("关闭数据库失败：", err);
    throw err;
  }
};

// 插入数据
const insertData = async (sql, data) => {
  const promises = data.map((item) =>
    connection.query(sql, item).then(([results, fields]) => {
      console.log(`成功插入 ${fields} 数据！`, results);
      return results;
    })
  );

  try {
    // 等待所有 Promise 完成
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("插入数据时出错：", error);
    throw error;
  }
};

module.exports = {
  initializeDatabase,
  endDataBase,
  insertData,
};
