/* ============================================================
 *  3D 流体游戏画廊引擎
 *  原创实现 —— 思路：为每张卡片预先计算多种 3D 布局目标，
 *  每帧向目标做惯性插值（lerp/slerp），滚轮拆成两段叙事：
 *  [0→1] 雕塑摊平为时间线，[1→N] 相机沿时间线巡览。
 *  依赖：Three.js r149（CDN 经典脚本，file:// 也能加载库本身）
 * ============================================================ */
(function () {
  "use strict";

  var isMobile = window.matchMedia("(max-width: 1023px)").matches;
  if (isMobile) return; // 移动端由 site.js 渲染卡片网格

  /* ---------- 可调参数（与 SITE.tuning 合并） ---------- */
  var TUNE = {
    fluidity: 0.06, spinSpeed: 0.35, spreadX: 4.4,
    sculptScale: 5.2, cardSize: 1.0, scrollStep: 0.0022,
    parallax: 1.0, bleach: 0.35
  };
  if (window.SITE && window.SITE.tuning) {
    for (var k in window.SITE.tuning) TUNE[k] = window.SITE.tuning[k];
  }

  var GAMES = (window.GAMES || []).slice();
  if (!GAMES.length) {
    showStageError("还没有配置任何游戏。\n请打开 js/games-data.js 添加你的第一款游戏！");
    fire("gv:ready");
    return;
  }

  /* ---------- 事件小工具 ---------- */
  function fire(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail: detail || {} }));
  }
  function showStageError(msg) {
    var el = document.getElementById("stage-error");
    if (el) { el.hidden = false; el.textContent = msg; }
  }

  /* ---------- 动态加载 Three.js（CDN 失败自动切换备用源） ---------- */
  var THREE_CDNS = [
    "https://unpkg.com/three@0.149.0/build/three.min.js",
    "https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js"
  ];
  function loadLib(urls) {
    return new Promise(function (resolve, reject) {
      if (window.THREE) return resolve();
      var i = 0;
      (function next() {
        if (i >= urls.length) return reject(new Error("Three.js 加载失败"));
        var s = document.createElement("script");
        s.src = urls[i++];
        s.onload = function () { resolve(); };
        s.onerror = next;
        document.head.appendChild(s);
      })();
    });
  }

  loadLib(THREE_CDNS).then(boot).catch(function () {
    showStageError("Three.js 加载失败，请检查网络后刷新。");
    fire("gv:ready");
  });

  /* ============================================================
     引擎主体
     ============================================================ */
  function boot() {
    var stage = document.getElementById("stage");
    var N = GAMES.length;
    var S = TUNE.sculptScale;

    /* ---------- 着色器 ---------- */
    var VERT = [
      "varying vec2 vUv;",
      "void main(){",
      "  vUv = uv;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
      "}"
    ].join("\n");

    var FRAG = [
      "uniform sampler2D uMap;",
      "uniform float uMono;",    // 1=黑白
      "uniform float uBleach;",  // 洗白强度
      "uniform float uFade;",    // 0..1 距离雾(0=融入白底)
      "uniform float uHover;",   // 悬停恢复原图彩色
      "uniform float uDim;",     // 聚焦他人时进一步洗白
      "uniform float uWire;",    // 线稿模式
      "varying vec2 vUv;",
      "void main(){",
      "  if (uWire > 0.5) {",
      "    float w = 0.008;",
      "    bool border = vUv.x < w || vUv.x > 1.0 - w || vUv.y < w || vUv.y > 1.0 - w;",
      "    bool diag = abs(vUv.x - vUv.y) < w * 0.6;",
      "    if (border || diag) { gl_FragColor = vec4(vec3(0.05), uFade * 0.28); }",
      "    else { discard; }",
      "    return;",
      "  }",
      "  vec4 tex = texture2D(uMap, vUv);",
      "  float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));",
      "  vec3 col = mix(tex.rgb, vec3(luma), uMono);",        // 黑白化
      "  col = mix(col, vec3(1.0), uBleach);",                // 统一洗白
      "  col = mix(col, vec3(1.0), (1.0 - uFade) * 0.78);",   // 远处融入白雾
      "  col = mix(col, tex.rgb, uHover);",                   // 悬停还原彩色
      "  col = mix(col, vec3(1.0), uDim * 0.45);",            // 聚焦时其余淡化
      "  gl_FragColor = vec4(col, tex.a * max(uFade, 0.04));",
      "}"
    ].join("\n");

    /* ---------- 场景 ---------- */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, stage.clientWidth / stage.clientHeight, 0.1, 300);
    var camZ = 5 + S * 1.2;
    camera.position.set(0, 0, camZ);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0xffffff, 0);
    stage.appendChild(renderer.domElement);

    var group = new THREE.Group();
    scene.add(group);
    var raycaster = new THREE.Raycaster();
    var ndc = new THREE.Vector2(-10, -10);

    /* ---------- 占位纹理（图片加载前/失败时显示游戏名） ---------- */
    function makePlaceholder(name) {
      var cv = document.createElement("canvas");
      cv.width = 640; cv.height = 360;
      var ctx = cv.getContext("2d");
      ctx.fillStyle = "#ececec"; ctx.fillRect(0, 0, 640, 360);
      ctx.strokeStyle = "#c9c9c9"; ctx.lineWidth = 2; ctx.strokeRect(8, 8, 624, 344);
      ctx.fillStyle = "#9a9a9a";
      ctx.font = "600 34px Helvetica, PingFang SC, Microsoft YaHei, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(name || "NO IMAGE", 320, 180);
      var tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      return tex;
    }

    /* ---------- 进度上报（真实纹理预载） ---------- */
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (url, loaded, total) {
      fire("gv:progress", { loaded: loaded, total: Math.max(total, N) });
    };
    manager.onLoad = function () { fire("gv:ready"); };
    var texLoader = new THREE.TextureLoader(manager);
    texLoader.crossOrigin = "anonymous";
    var readyFired = false;
    setTimeout(function () { // 兜底：任何异常都不阻塞开场
      if (!readyFired) fire("gv:ready");
    }, 20000);
    window.addEventListener("gv:ready", function () { readyFired = true; });

    /* ---------- 卡片对象 ---------- */
    var cards = [];
    var layouts = ["ring", "flower", "sphere", "cylinder"]; // 可切换的雕塑布局
    var layoutName = "ring";

    for (var i = 0; i < N; i++) {
      (function (g, i) {
        var placeholder = makePlaceholder(g.name);
        var uniforms = {
          uMap:    { value: placeholder },
          uMono:   { value: 1 },
          uBleach: { value: TUNE.bleach },
          uFade:   { value: 0 },
          uHover:  { value: 0 },
          uDim:    { value: 0 },
          uWire:   { value: 0 }
        };
        var mat = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.8), mat);
        mesh.userData.index = i;
        group.add(mesh);

        texLoader.load(g.image, function (tex) {
          tex.encoding = THREE.sRGBEncoding;
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          uniforms.uMap.value = tex;
          var a = tex.image.width / tex.image.height || (16 / 9);
          mesh.geometry.dispose();
          mesh.geometry = new THREE.PlaneGeometry(2.6 * a, 2.6);
        }, undefined, function () { /* 失败则保留占位纹理 */ });

        cards.push({
          game: g, mesh: mesh, uni: uniforms,
          hover: 0, fade: 0,
          seedY: (Math.random() - 0.5),          // 环布局的 Y 随机抖动
          targets: {} // 下面统一计算
        });
      })(GAMES[i], i);
    }

    /* ---------- 布局目标预计算：每种姿态一套 position/quaternion/scale ---------- */
    var GOLDEN = Math.PI * (3 - Math.sqrt(5)); // 黄金角
    var dummy = new THREE.Object3D();

    function computeTargets() {
      for (var i = 0; i < N; i++) {
        var c = cards[i];
        c.targets = {};

        /* ① 环 Ring —— 椭圆环 + Y 抖动，面朝外侧 */
        var ang = (i / N) * Math.PI * 2;
        setTarget(c, "ring",
          new THREE.Vector3(Math.cos(ang) * S * 1.45, c.seedY * S * 0.32, Math.sin(ang) * S * 1.75),
          "outward", 1);

        /* ② 花形 Flower —— 黄金角螺旋叶序，中心小、外圈大，面朝镜头 */
        var t = N === 1 ? 1 : i / (N - 1);
        var r = Math.pow(t, 1.35) * S * 2.1;
        setTarget(c, "flower",
          new THREE.Vector3(Math.cos(i * GOLDEN) * r, Math.sin(i * GOLDEN) * r, Math.sin(t * 15.7) * S * 0.22),
          "front", 0.3 + t * 1.15);

        /* ③ 星球 Sphere —— 斐波那契均匀球面分布 */
        var phi = Math.acos(1 - 2 * (i + 0.5) / N);
        var theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
        setTarget(c, "sphere",
          new THREE.Vector3(
            S * Math.cos(theta) * Math.sin(phi),
            S * Math.sin(theta) * Math.sin(phi),
            S * Math.cos(phi)),
          "outward", 0.9);

        /* ④ 柱阵 Cylinder —— 多层圆环堆叠 */
        var rows = Math.max(3, Math.round(Math.sqrt(N)));
        var perRow = Math.ceil(N / rows);
        var row = Math.floor(i / perRow), col = i % perRow;
        var cAng = (col / perRow) * Math.PI * 2 + row * 0.35;
        var cY = rows > 1 ? (row / (rows - 1) - 0.5) * S * 2.6 : 0;
        setTarget(c, "cylinder",
          new THREE.Vector3(Math.cos(cAng) * S * 0.85, cY, Math.sin(cAng) * S * 0.85),
          "outward", 0.72);

        /* ⑤ 时间线 Archive —— 沿 X 一字排开（内部布局，不参与切换器） */
        c.targets.archive = {
          p: new THREE.Vector3(i * TUNE.spreadX * TUNE.cardSize, 0, 0),
          q: new THREE.Quaternion(),
          s: 1
        };
      }
    }

    /* 朝向："outward"=背对中心面朝外；"front"=正对镜头 */
    function setTarget(card, key, pos, face, scale) {
      dummy.position.copy(pos);
      if (face === "outward") {
        dummy.lookAt(0, pos.y, 0);
        dummy.rotateY(Math.PI);
      } else {
        dummy.rotation.set(0, 0, 0);
      }
      card.targets[key] = { p: pos.clone(), q: dummy.quaternion.clone(), s: scale };
    }
    computeTargets();

    /* ---------- UI：切换器 / 线稿 / 光标 / 巨字标题 ---------- */
    var LAYOUT_LABELS = [["ring", "环形"], ["flower", "花形"], ["sphere", "星球"], ["cylinder", "柱阵"]];
    var switcher = document.getElementById("switcher");
    var swItems = {};
    LAYOUT_LABELS.forEach(function (pair, idx) {
      var el = document.createElement("span");
      el.className = "sw-item" + (pair[0] === layoutName ? " active" : "");
      el.textContent = pair[1];
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        layoutName = pair[0];
        targetScroll = 0; // 换雕塑时回到雕塑视角
        LAYOUT_LABELS.forEach(function (p) { swItems[p[0]].classList.toggle("active", p[0] === layoutName); });
        placeUnderline();
      });
      swItems[pair[0]] = el;
      switcher.appendChild(el);
      if (idx < LAYOUT_LABELS.length - 1) {
        var sep = document.createElement("span");
        sep.className = "sw-sep";
        sep.textContent = ",";
        switcher.appendChild(sep);
      }
    });
    var swUnderline = document.createElement("span");
    swUnderline.id = "sw-underline";
    switcher.appendChild(swUnderline);
    function placeUnderline() {
      var a = swItems[layoutName];
      if (!a) return;
      swUnderline.style.width = a.offsetWidth + "px";
      swUnderline.style.left = a.offsetLeft + "px";
    }
    setTimeout(placeUnderline, 120);
    setTimeout(placeUnderline, 600);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeUnderline);

    var wireOn = false;
    var frameToggle = document.getElementById("frame-toggle");
    frameToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      wireOn = !wireOn;
      frameToggle.classList.toggle("wire-on", wireOn);
    });

    var cursorEl = document.getElementById("cursor");
    var cursor = { x: innerWidth / 2, y: innerHeight / 2, tx: innerWidth / 2, ty: innerHeight / 2, s: 1, ts: 1, on: false };

    var titleEl = document.getElementById("hover-title");
    var shownTitle = "";
    function showTitle(text) {
      if (shownTitle === text) return;
      shownTitle = text;
      titleEl.innerHTML = "";
      titleEl.className = "";
      text.split("").forEach(function (ch, i) {
        var sp = document.createElement("span");
        sp.className = "ch";
        sp.style.setProperty("--i", i);
        sp.textContent = ch === " " ? " " : ch;
        titleEl.appendChild(sp);
      });
      // 强制重排后再加 class，保证过渡生效
      void titleEl.offsetWidth;
      titleEl.classList.add("show");
    }
    function hideTitle() {
      if (!shownTitle) return;
      shownTitle = "";
      titleEl.classList.remove("show");
      titleEl.classList.add("hide");
      setTimeout(function () { if (!shownTitle) { titleEl.innerHTML = ""; titleEl.className = ""; } }, 600);
    }

    /* ---------- 交互状态 ---------- */
    var targetScroll = 0, curScroll = 0;   // 滚动进度（带惯性）
    var spin = 0;                          // 雕塑自转角
    var hoverCard = null;
    var focusCard = null, focusP = 0;      // 聚焦进度 0..1
    var mouse = { x: 0, y: 0 };

    window.addEventListener("mousemove", function (e) {
      var rect = stage.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = ndc.x; mouse.y = ndc.y;
      cursor.tx = e.clientX; cursor.ty = e.clientY;
      cursor.on = true;
    });
    stage.addEventListener("mouseleave", function () { cursor.on = false; });

    function pushScroll(delta) {
      if (focusCard) return;
      targetScroll += delta;
      targetScroll = Math.max(0, Math.min(N, targetScroll));
    }
    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      var d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;
      if (e.deltaMode === 2) d *= 100;
      pushScroll(d * TUNE.scrollStep);
    }, { passive: false });

    // 触屏滑动（平板等宽屏设备）
    var touchY = null;
    stage.addEventListener("touchstart", function (e) { touchY = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener("touchmove", function (e) {
      if (touchY === null) return;
      var ny = e.touches[0].clientY;
      pushScroll((touchY - ny) * 0.006);
      touchY = ny;
    }, { passive: true });

    // 键盘左右键 = 沿时间线前后翻卡片
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && focusCard) closeFocus();
      if (focusCard) return;
      if (e.key === "ArrowRight") { targetScroll = Math.min(N, Math.max(1, Math.round(targetScroll) + 1)); }
      if (e.key === "ArrowLeft")  { targetScroll = Math.max(0, Math.round(targetScroll) - 1); }
    });

    /* ---------- 点击 = 聚焦卡片 ---------- */
    var downXY = null;
    stage.addEventListener("pointerdown", function (e) { downXY = [e.clientX, e.clientY]; });
    window.addEventListener("pointerup", function (e) {
      if (!downXY) return;
      var moved = Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]);
      downXY = null;
      if (moved > 6) return; // 视为拖拽而非点击
      if (focusCard) return; // 打开状态下由浮层逻辑处理关闭
      if (e.target !== renderer.domElement) return;
      raycaster.setFromCamera(ndc, camera);
      var hits = raycaster.intersectObjects(group.children);
      if (!hits.length) return;
      var card = cards[hits[0].object.userData.index];
      if (card) openFocus(card);
    });

    var fpImg = document.getElementById("fp-img");
    var fpTitle = document.getElementById("fp-title");
    var fpEn = document.getElementById("fp-en");
    var fpMeta = document.getElementById("fp-meta");
    var fpDesc = document.getElementById("fp-desc");
    var fpBtn = document.getElementById("fp-btn");

    function openFocus(card) {
      focusCard = card;
      var g = card.game;
      fpImg.src = g.image;
      fpImg.alt = g.name;
      fpTitle.textContent = g.name;
      fpEn.textContent = g.name_en || "";
      fpEn.style.display = g.name_en ? "" : "none";
      // 未填写资料时仍展示完整的详情版式；可在 games-data.js 的 genre/year/desc/link 字段补充真实内容。
      fpMeta.textContent = [g.genre, g.year].filter(Boolean).join(" · ") || "GAME VAULT ARCHIVE · 已收录";
      fpDesc.textContent = g.desc || ("《" + g.name + "》已收录于游戏仓库。这里可填写游戏背景、玩法特色、版本说明或你的推荐理由；在 js/games-data.js 为该游戏补充 desc 字段即可替换这段介绍。");
      if (g.link) { fpBtn.href = g.link; fpBtn.style.display = ""; }
      else { fpBtn.style.display = "none"; }
      document.body.classList.add("is-focus");
      hideTitle();
    }
    function closeFocus() {
      focusCard = null;
      document.body.classList.remove("is-focus");
    }
    document.getElementById("focus-overlay").addEventListener("click", closeFocus);
    document.getElementById("fp-close").addEventListener("click", closeFocus);
    // 在详情面板内浏览内容不会关闭；按 Esc、点关闭按钮或遮罩即可返回画廊。
    document.getElementById("focus-panel").addEventListener("click", function (e) {
      e.stopPropagation();
    });

    /* ---------- 帧循环 ---------- */
    var clock = new THREE.Clock();
    var spinQuat = new THREE.Quaternion();
    var AXIS_Y = new THREE.Vector3(0, 1, 0);
    var tmpV = new THREE.Vector3();
    var tmpQ = new THREE.Quaternion();
    var lookTarget = new THREE.Vector3();

    function tick() {
      requestAnimationFrame(tick);
      var dt = Math.min(clock.getDelta(), 0.05);
      var t = clock.getElapsedTime();

      var colorTheme = (window.__GV_THEME === "color");

      // 聚焦进度缓动
      focusP += ((focusCard ? 1 : 0) - focusP) * TUNE.fluidity * 1.6;
      if (!focusCard && focusP < 0.004) focusP = 0;

      // 滚动惯性
      curScroll += (targetScroll - curScroll) * 0.095;
      var unfold = Math.min(Math.max(curScroll, 0), 1);        // 0→1 雕塑摊平
      var archive = Math.min(Math.max(curScroll - 1, 0), N-1); // 1→N 相机巡览
      document.body.classList.toggle("far-scroll", curScroll > 0.55);

      // 雕塑自转（展开后衰减）
      spin += TUNE.spinSpeed * dt * (1 - unfold * 0.9) * (1 - focusP);
      spinQuat.setFromAxisAngle(AXIS_Y, spin);

      // 悬停检测
      raycaster.setFromCamera(ndc, camera);
      var hits = raycaster.intersectObjects(group.children);
      hoverCard = null;
      if (hits.length && !focusCard) hoverCard = cards[hits[0].object.userData.index];

      // 巨字标题：展开后悬停才显示
      if (hoverCard && unfold > 0.9 && !focusCard) {
        var g = hoverCard.game;
        showTitle(g.name_en || g.name);
      } else {
        hideTitle();
      }

      // 光标
      cursor.ts = hoverCard ? 2.6 : 1;
      cursor.x += (cursor.tx - cursor.x) * 0.16;
      cursor.y += (cursor.ty - cursor.y) * 0.16;
      cursor.s += (cursor.ts - cursor.s) * 0.16;
      cursorEl.style.transform =
        "translate3d(" + cursor.x + "px," + cursor.y + "px,0) translate(-50%,-50%) scale(" + cursor.s.toFixed(3) + ")";
      cursorEl.style.opacity = cursor.on ? "1" : "0";
      cursorEl.classList.toggle("is-cross", !!focusCard);

      /* --- 逐卡片更新 --- */
      var gap = TUNE.spreadX * TUNE.cardSize;
      for (var i = 0; i < N; i++) {
        var c = cards[i];
        var tgt = c.targets[layoutName];
        var arch = c.targets.archive;

        // 雕塑姿态 + 呼吸漂浮 + 整体自转
        var floatAmp = (1 - unfold) * 0.055 * S * (1 - focusP);
        tmpV.copy(tgt.p);
        tmpV.x += Math.sin(t * 0.5 + i * 1.7) * floatAmp;
        tmpV.y += Math.sin(t * 0.6 + i * 2.3) * floatAmp;
        tmpV.z += Math.sin(t * 0.7 + i * 1.1) * floatAmp;
        tmpV.applyQuaternion(spinQuat);
        tmpQ.copy(tgt.q).premultiply(spinQuat);

        // 雕塑 ↔ 时间线 插值
        var goalP = tmpV.clone().lerp(arch.p, unfold);
        var goalQ = tmpQ.clone().slerp(arch.q, unfold);

        // 悬停：面片沿自身法线前推
        var hTarget = (c === hoverCard) ? 1 : 0;
        c.hover += (hTarget - c.hover) * TUNE.fluidity * 3;
        if (c.hover > 0.01) {
          var fwd = new THREE.Vector3(0, 0, c.hover * 0.75 * TUNE.cardSize).applyQuaternion(goalQ);
          goalP.add(fwd);
        }

        c.mesh.position.lerp(goalP, TUNE.fluidity);
        c.mesh.quaternion.slerp(goalQ, TUNE.fluidity);

        // 尺寸：布局尺寸 → 悬停放大 → 时间线焦点放大
        var base = (tgt.s + (arch.s - tgt.s) * unfold) * TUNE.cardSize;
        base += c.hover * 0.16 * TUNE.cardSize;
        if (unfold > 0.5 && !focusCard) {
          var dx = Math.abs(c.mesh.position.x - camera.position.x);
          if (dx < gap) base += 0.38 * TUNE.cardSize * (1 - dx / gap) * unfold;
        }
        c.mesh.scale.setScalar(0);
        c.mesh.scale.lerp(tmpV.set(base, base, base), TUNE.fluidity);

        // 距离雾：远卡片淡出融入白底
        var d = camera.position.distanceTo(c.mesh.position);
        var near = camZ - S * 0.55, far = camZ + S * 1.55;
        var fade = 1 - (d - near) / (far - near);
        fade = Math.max(0.05, Math.min(1, fade));
        fade += (1 - fade) * unfold; // 时间线模式全部可见
        if (focusCard) fade = (c === focusCard) ? 1 - focusP : fade * (1 - focusP * 0.55);

        c.uni.uFade.value = fade;
        c.uni.uHover.value = c.hover;
        c.uni.uMono.value = colorTheme ? 0 : 1;
        c.uni.uBleach.value = colorTheme ? 0 : TUNE.bleach;
        c.uni.uWire.value = wireOn ? 1 : 0;
        c.uni.uDim.value = (focusCard && c !== focusCard) ? focusP : 0;
      }

      /* --- 相机：视差 + 时间线巡览 --- */
      var par = TUNE.parallax * (1 - focusP * 0.8);
      var targetCX = archive * gap + mouse.x * par * S * 0.42;
      var targetCY = mouse.y * par * S * 0.42;
      camera.position.x += (targetCX - camera.position.x) * TUNE.fluidity * 1.4;
      camera.position.y += (targetCY - camera.position.y) * TUNE.fluidity * 1.4;
      camera.position.z += (camZ - camera.position.z) * TUNE.fluidity;
      lookTarget.set(archive * gap + mouse.x * par * 0.6, mouse.y * par * 0.6, 0);
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);
    }
    tick();

    /* ---------- 自适应 ---------- */
    window.addEventListener("resize", function () {
      var w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      placeUnderline();
    });
  }
})();
