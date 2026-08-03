/* 游戏仓库 · 独立详情页
   读取 detail.html?id=序号。内容在 js/games-data.js 的每个游戏对象中维护。 */
(function () {
  "use strict";
  var games = window.GAMES || [];
  var rawId = new URLSearchParams(window.location.search).get("id");
  var id = Number(rawId);
  var game = Number.isInteger(id) && id >= 0 && id < games.length ? games[id] : null;
  var page = document.getElementById("detail-page");

  if (!game) {
    page.innerHTML = '<div class="not-found"><p class="eyebrow">404 / GAME NOT FOUND</p><h1>未找到该游戏</h1><a class="back-button" href="index.html">返回 3D 展厅</a></div>';
    return;
  }

  document.title = game.name + " · 游戏详情 · 游戏仓库";
  var cover = document.getElementById("game-cover");
  cover.src = game.image || "";
  cover.alt = game.name + " 游戏封面";
  // 无封面时用文字占位，避免破图图标。
  cover.onerror = function () { this.style.display = "none"; this.parentNode.classList.add("cover-empty"); this.parentNode.dataset.label = game.name; };
  if (!game.image) cover.onerror();

  document.getElementById("game-index").textContent = "ARCHIVE NO. " + String(id + 1).padStart(3, "0");
  document.getElementById("game-name").textContent = game.name;
  var en = document.getElementById("game-en");
  en.textContent = game.name_en || "";
  en.hidden = !game.name_en;

  var fields = [["类型", game.genre], ["年份", game.year]];
  var meta = document.getElementById("game-meta");
  fields.forEach(function (row) {
    if (!row[1]) return;
    var dt = document.createElement("dt"), dd = document.createElement("dd");
    dt.textContent = row[0]; dd.textContent = row[1];
    meta.append(dt, dd);
  });
  if (!meta.children.length) meta.hidden = true;

  document.getElementById("game-desc").textContent = game.desc ||
    "《" + game.name + "》已收录于游戏仓库。站点维护者可在 js/games-data.js 中为本游戏填写 desc 字段，补充剧情背景、玩法特色、版本信息及个人推荐理由。";

  if (game.link) {
    var box = document.getElementById("visit-box");
    var link = document.getElementById("game-link");
    box.hidden = false;
    link.href = game.link;
    link.textContent = "访问官方 / 合法资源链接 ↗";
  }
})();
