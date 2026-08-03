/* ============================================================
 *  站点 UI 逻辑：预加载器 / 大字入场 / 时钟 / 复制邮箱 /
 *  黑白⇄幻彩主题 / 移动端网格 / file:// 提示
 * ============================================================ */
(function () {
  "use strict";

  var isMobile = window.matchMedia("(max-width: 1023px)").matches;
  var SITE = window.SITE || {};
  var GAMES = window.GAMES || [];
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- 文案注入 ---------- */
  document.title = (SITE.brand || "游戏仓库") + " · Game Vault";
  $("#brand").textContent = SITE.brand || "游戏仓库";
  $("#loader-brand").textContent = SITE.brand || "游戏仓库";
  $("#hero-line-1").textContent = SITE.heroLine1 || "GAME";
  $("#hero-line-2").textContent = SITE.heroLine2 || "VAULT";
  $(".hero-left").textContent = SITE.cornerLeft || "";
  $(".hero-right").textContent = SITE.cornerRight || "";
  $("#hero-foot").textContent = SITE.footer || "";

  /* ---------- 预加载器（监听画廊真实纹理进度） ---------- */
  var loader = $("#loader");
  var pctEl = $("#loader-pct");
  var fillEl = $("#loader-fill");
  var shown = 0, real = 0, minTimePassed = false, started = performance.now();

  setTimeout(function () { minTimePassed = true; }, 1300); // 最短展示时间
  if (isMobile) { real = 1; minTimePassed = true; }

  window.addEventListener("gv:progress", function (e) {
    var d = e.detail || {};
    real = d.total ? d.loaded / d.total : 0;
  });
  window.addEventListener("gv:ready", function () { real = 1; });

  (function loaderTick() {
    shown += (real - shown) * 0.08;
    var v = Math.round(shown * 100);
    pctEl.textContent = v < 10 ? "0" + v : "" + v;
    fillEl.style.width = v + "%";
    if (real >= 1 && shown > 0.985 && minTimePassed) {
      pctEl.textContent = "100";
      fillEl.style.width = "100%";
      setTimeout(openDoors, 250);
      return;
    }
    requestAnimationFrame(loaderTick);
  })();

  function openDoors() {
    loader.classList.add("open");
    document.body.classList.add("ready"); // 触发大字遮罩入场
    setTimeout(function () { loader.style.display = "none"; }, 1300);
  }

  /* 移动端：直接渲染卡片网格 */
  if (isMobile) {
    document.body.classList.add("is-mobile");
    var grid = $("#mc-grid");
    $("#mc-title").textContent = (SITE.heroLine1 || "GAME") + " " + (SITE.heroLine2 || "VAULT");
    GAMES.forEach(function (g) {
      var a = document.createElement("a");
      a.className = "mc-card";
      a.href = g.link || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML =
        '<figure><img loading="lazy" src="' + g.image + '" alt="' + g.name + '"></figure>' +
        '<figcaption><h3>' + g.name + '</h3><p>' +
        [g.genre, g.year].filter(Boolean).join(" · ") + "</p></figcaption>";
      grid.appendChild(a);
    });
    window.dispatchEvent(new CustomEvent("gv:ready"));
  }

  /* ---------- 时钟 ---------- */
  var clockEl = $("#clock");
  function updateClock() {
    try {
      var t = new Intl.DateTimeFormat("zh-CN", {
        timeZone: SITE.timeZone || "Asia/Shanghai",
        hour: "numeric", minute: "2-digit", hour12: false
      }).format(new Date());
      clockEl.textContent = (SITE.timeLabel || "") + " " + t;
    } catch (e) {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- 联系 = 复制邮箱 ---------- */
  var contactBtn = $("#contact-btn");
  contactBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var email = SITE.email || "hello@example.com";
    function done() {
      contactBtn.textContent = "已复制";
      setTimeout(function () { contactBtn.textContent = "联系"; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(done);
    } else {
      var inp = document.createElement("textarea");
      inp.value = email;
      document.body.appendChild(inp);
      inp.select();
      try { document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(inp);
      done();
    }
  });

  /* ============================================================
     主题：黑白 mono ⇄ 幻彩 color
     ============================================================ */
  var theme = localStorage.getItem("gv-theme") || SITE.theme || "mono";
  var toggle = $("#theme-toggle");
  var underline = $("#tt-underline");

  function placeThemeUnderline() {
    var target = theme === "color" ? toggle.querySelector(".tt-color") : toggle.querySelector(".tt-mono");
    if (!target) return;
    underline.style.left = target.offsetLeft + "px";
    underline.style.width = target.offsetWidth + "px";
  }

  function applyTheme() {
    window.__GV_THEME = theme;
    document.body.classList.toggle("theme-active", theme === "color");
    placeThemeUnderline();
    if (theme === "color") startBlobs(); else stopBlobs();
  }

  toggle.addEventListener("click", function () {
    theme = theme === "color" ? "mono" : "color";
    localStorage.setItem("gv-theme", theme);
    applyTheme();
  });
  window.addEventListener("resize", placeThemeUnderline);

  /* ---------- 幻彩背景：Canvas 2D 漂浮渐变色块 ---------- */
  var blobCanvas = document.getElementById("blob-canvas");
  var blobWrap = document.createElement("div");
  blobWrap.className = "blur-wrap";
  blobCanvas.parentNode.insertBefore(blobWrap, blobCanvas);
  blobWrap.appendChild(blobCanvas);
  var bctx = blobCanvas.getContext("2d");
  var blobRunning = false, blobT = 0;

  /* 每个色块：归一化中心点 + 漂移幅度 + 相位 + 颜色 + 透明度区间 */
  var BLOBS = [
    { nx: .40, ny: .22, sx: .20, sy: .17, sp: .9, ph: 0.0, r: 1.0, c: [120, 175, 255], aMax: .8, aMin: .12 },
    { nx: .70, ny: .18, sx: .17, sy: .20, sp: .7, ph: 2.1, r: .85, c: [255, 190, 90], aMax: .7, aMin: .08 },
    { nx: .18, ny: .45, sx: .19, sy: .17, sp: .8, ph: 1.1, r: .8, c: [255, 120, 170], aMax: .6, aMin: .07 },
    { nx: .08, ny: .65, sx: .14, sy: .21, sp: .65, ph: 3.3, r: .78, c: [130, 235, 200], aMax: .6, aMin: .08 },
    { nx: .55, ny: .78, sx: .19, sy: .15, sp: .75, ph: 4.2, r: .9, c: [200, 150, 255], aMax: .6, aMin: .08 },
    { nx: .85, ny: .55, sx: .15, sy: .19, sp: .68, ph: 5.1, r: .8, c: [255, 230, 120], aMax: .5, aMin: .06 }
  ];

  function blobResize() {
    blobCanvas.width = blobWrap.clientWidth || innerWidth;
    blobCanvas.height = blobWrap.clientHeight || innerHeight;
  }

  function blobFrame() {
    if (!blobRunning) return;
    var W = blobCanvas.width, H = blobCanvas.height, S = Math.min(W, H);
    bctx.fillStyle = "#cdd8e2";
    bctx.fillRect(0, 0, W, H);
    for (var i = 0; i < BLOBS.length; i++) {
      var b = BLOBS[i];
      var px = (b.nx + Math.sin(blobT * .0016 * b.sp + b.ph) * b.sx) * W;
      var py = (b.ny + Math.cos(blobT * .0013 * b.sp + b.ph * 1.3) * b.sy) * H;
      var a = b.aMin + (b.aMax - b.aMin) * (Math.sin(blobT * .0011 * b.sp + b.ph * 2) * .5 + .5);
      var rad = b.r * S * (1 + Math.sin(blobT * .0009 * b.sp + b.ph) * .12);
      var g = bctx.createRadialGradient(px, py, 0, px, py, rad);
      var cc = b.c.join(",");
      g.addColorStop(0, "rgba(" + cc + "," + a + ")");
      g.addColorStop(.45, "rgba(" + cc + "," + (a * .45) + ")");
      g.addColorStop(1, "rgba(" + cc + ",0)");
      bctx.fillStyle = g;
      bctx.fillRect(0, 0, W, H);
    }
    blobT++;
    requestAnimationFrame(blobFrame);
  }

  function startBlobs() {
    if (blobRunning) return;
    blobRunning = true;
    blobResize();
    blobFrame();
  }
  function stopBlobs() { blobRunning = false; }
  window.addEventListener("resize", function () { if (blobRunning) blobResize(); });

  applyTheme();

  /* ---------- file:// 直开提示（WebGL 纹理会被浏览器拦截） ---------- */
  if (location.protocol === "file:" && !isMobile) {
    var tip = $("#file-tip");
    tip.hidden = false;
    tip.innerHTML =
      '检测到你是双击打开的本地文件，浏览器会拦截 WebGL 纹理。<br>' +
      "请在网站目录运行 <code>python -m http.server 8000</code>，再访问 " +
      "<code>http://localhost:8000</code> 查看完整效果。" +
      '<span class="tip-close">✕</span>';
    tip.querySelector(".tip-close").addEventListener("click", function () { tip.hidden = true; });
  }
})();
