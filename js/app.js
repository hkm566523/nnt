/* ========== 念宁堂 · 公共逻辑（导航 / 页脚 / 购物车） ========== */
(function () {
  const CART_KEY = "nnt_cart";

  /* ---------- 购物车 ---------- */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateBadge();
  }
  function addToCart(id, qty) {
    const cart = getCart();
    const line = cart.find(i => i.id === id);
    if (line) line.qty += qty;
    else cart.push({ id, qty });
    saveCart(cart);
  }
  function setQty(id, qty) {
    let cart = getCart();
    if (qty <= 0) cart = cart.filter(i => i.id !== id);
    else cart = cart.map(i => (i.id === id ? { ...i, qty } : i));
    saveCart(cart);
  }
  function cartCount() {
    return getCart().reduce((s, i) => s + i.qty, 0);
  }
  function cartTotal() {
    return getCart().reduce((s, i) => {
      const p = getProduct(i.id);
      return p ? s + p.price * i.qty : s;
    }, 0);
  }
  function updateBadge() {
    const badge = document.getElementById("cartBadge");
    if (!badge) return;
    const n = cartCount();
    badge.style.display = n > 0 ? "inline-flex" : "none";
    badge.textContent = n;
  }

  /* ---------- 顶部导航 ---------- */
  function renderHeader(active) {
    const el = document.getElementById("site-header");
    if (!el) return;
    const links = [
      ["index.html", "首页", "home"],
      ["story.html", "品牌故事", "story"],
      ["index.html#products", "产品系列", "products"],
      ["cart.html", "购物车", "cart"]
    ];
    el.innerHTML = `
    <header class="nav">
      <div class="wrap nav-in">
        <a class="logo" href="index.html">
          <span class="logo-seal">念</span>
          <span><span class="logo-name">${SITE.brand}</span>
          <span class="logo-sub">${SITE.slogan}</span></span>
        </a>
        <nav class="nav-links">
          ${links.map(([href, name, key]) =>
            `<a href="${href}" class="${active === key ? "on" : ""}">${name}</a>`).join("")}
        </nav>
        <a class="nav-cart" href="cart.html">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.47 1.2h8.86a1.5 1.5 0 0 0 1.47-1.18L21 8H6"/><circle cx="10" cy="20.5" r="1.3"/><circle cx="17.5" cy="20.5" r="1.3"/></svg>
          购物清单
          <span class="cart-badge" id="cartBadge">0</span>
        </a>
      </div>
    </header>`;
    updateBadge();
  }

  /* ---------- 页脚 ---------- */
  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    el.innerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-in">
          <div>
            <div class="footer-brand">${SITE.brand} ${SITE.pinyin.toUpperCase()}</div>
            <p class="footer-desc">${SITE.slogan}<br>古方新制 · 纯净配方 · 日日轻养</p>
          </div>
          <div class="footer-col">
            <h4>选购</h4>
            <a href="index.html#products">古法膏方</a>
            <a href="index.html#products">草本茶饮</a>
            <a href="index.html#products">食养谷粉</a>
          </div>
          <div class="footer-col">
            <h4>品牌</h4>
            <a href="story.html">品牌故事</a>
            <a href="index.html#ritual">轻养方式</a>
            <a href="index.html">回到首页</a>
          </div>
          <div class="footer-col">
            <h4>联系</h4>
            <a href="#">官方客服 · 9:00–21:00</a>
            <a href="#">hello@nianningtang.cn</a>
            <a href="#">杭州 · 西湖区</a>
          </div>
        </div>
        <div class="footer-copy">
          <span>© 2026 ${SITE.brand} ${SITE.pinyin.toUpperCase()} · 本页面为品牌官网</span>
          <span>食养不能替代药物 · 特殊体质请遵医嘱</span>
        </div>
      </div>
    </footer>`;
  }

  /* ---------- 产品卡片 ---------- */
  function cardHTML(p) {
    return `
    <a class="card" href="product.html?id=${p.id}">
      <span class="card-tag">${p.catName}</span>
      <div class="card-name serif">${p.name}</div>
      <div class="card-eff">${p.eff}</div>
      <div class="card-fml">${p.fml.map(f => `<span class="fml">${f}</span>`).join("")}</div>
      <div class="card-foot">
        <span class="price">¥${p.price}<i> /件</i></span>
        <span class="card-more">查看明细 →</span>
      </div>
    </a>`;
  }

  window.NNT = { getCart, saveCart, addToCart, setQty, cartCount, cartTotal, updateBadge, renderHeader, renderFooter, cardHTML };
})();
