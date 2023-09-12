## node 爬虫

### 爬取网站

- [ ] [掘金](https://juejin.cn/)
- [ ] [微信]()
- [ ] [知乎](https://www.zhihu.com/)

### 目录结构

```bash
├── README.md
├── app.js
├── package.json
├── pnpm-lock.yaml
└── src
    ├── config                  // 配置信息
    │   ├── default.js
    │   ├── development.j s
    │   └── production.js
    ├── httpRequest.js          // 请求封装
    ├── logs                    // 错误日志
    ├── models                  // 数据库模型
    │   ├── Post.js
    │   └── User.js
    ├── parsers                 // 解析获取的数据
    │   ├── juejin.js
    │   ├── wechat.js
    │   └── zhihu.js
    ├── services                // 请求逻辑
    │   ├── postService.js
    │   └── userService.js
    ├── spiders                 // 爬取网页数据
    │   ├── juejin.js
    │   ├── wechat.js
    │   └── zhihu.js
    └── user                    // 用户信息
        ├── userCookies.js
        └── userCredentials.js
```
