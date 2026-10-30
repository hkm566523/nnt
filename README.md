# 念宁堂 · 品牌官网

东方草本轻养专家 —— 静态多页面官网，纯 HTML/CSS/JS，无构建步骤、无外部依赖（字体 CDN 可选）。

## 目录结构

```
nianningtang/
├── index.html      # 首页（Hero / 0添加承诺 / 品牌故事 / 产品系列 / 轻养方式）
├── story.html      # 品牌故事页（缘起 / 品牌大事记 / 品牌信念）
├── product.html    # 产品详情页（通过 ?id= 读取产品，如 product.html?id=yuling）
├── cart.html       # 购物车（localStorage 持久化）
├── css/style.css   # 全站样式
└── js/
    ├── data.js     # 产品与站点数据（在此维护商品）
    └── app.js      # 公共逻辑：导航、页脚、购物车
```

## 本地运行

直接用浏览器打开 `index.html` 即可；或起一个本地服务：

```bash
cd nianningtang
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 部署

整目录上传到任意静态托管（GitHub Pages / Netlify / Vercel / OSS）即可，入口为 `index.html`。

## 维护商品

新增/修改商品只需编辑 `js/data.js` 中的 `PRODUCTS` 数组，详情页与购物车自动生效。

## 说明

- 购物车数据存于浏览器 localStorage（键名 `nnt_cart`）。
- 「去结算」为占位按钮，接入真实支付时替换 `cart.html` 中的 `checkoutBtn` 逻辑。
- 食养产品宣传语仅为示例文案，正式上线前请按广告法与食品法规审核。
