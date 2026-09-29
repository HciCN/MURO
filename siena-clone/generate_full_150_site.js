const fs = require('fs');
const path = require('path');

console.log('=== STARTING FULL 150-GAME SITE GENERATION ===');

// 1. Load Configurations
const games150 = JSON.parse(fs.readFileSync('games_150_fitgirl.json', 'utf8'));
const top8Config = JSON.parse(fs.readFileSync('games_fitgirl_config.json', 'utf8'));
const rawFilmHtml = fs.readFileSync(path.join('..', 'siena_film_raw.html'), 'utf8');

const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="34" height="34" fill="none" style="display:inline-block; vertical-align:middle;">
  <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="3 3"/>
  <path d="M12 14h16M12 20h16M12 26h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="28" cy="26" r="3" fill="currentColor"/>
</svg>
<span style="font-family: inherit; font-weight: 800; font-size: 1.15rem; letter-spacing: 0.12em; text-transform: uppercase;">STEM 的平行空间</span>
`;

// Helper: find closing tag
function findClosingDiv(html, startIdx) {
  let depth = 0;
  let tagRegex = /<\/?div\b[^>]*>/gi;
  tagRegex.lastIndex = startIdx;
  let m;
  while ((m = tagRegex.exec(html)) !== null) {
    if (m[0].startsWith('</')) {
      depth--;
      if (depth === 0) return m.index + m[0].length;
    } else {
      depth++;
    }
  }
  return -1;
}

// Helper to get screenshots for a game folder
function getScreenshots(folder) {
  const ssDir = path.join(__dirname, 'games', folder, 'screenshots');
  if (!fs.existsSync(ssDir)) return [];
  const files = fs.readdirSync(ssDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg'));
  files.sort();
  return files.map(f => `/games/${folder}/screenshots/${f}`);
}

// =========================================================================
// STEP 1: GENERATE ALL 150 EXPLORATION PAGES (films/*.html)
// =========================================================================
const filmsDir = path.join(__dirname, 'films');
fs.mkdirSync(filmsDir, { recursive: true });

games150.forEach((game, gameIdx) => {
  let html = rawFilmHtml;

  // Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, 
    `<title>STEM 的平行空间 | ${game.cnTitle} (${game.enTitle}) - 游戏档案与系统配置</title>`);

  // Localize styles & scripts
  html = html.replace(/href="https:\/\/cdn\.prod\.website-files\.com\/[^"]+\.css"/g, 'href="/styles/webflow.css"');
  html = html.replace(/href="https:\/\/siena-film-foundation\.vercel\.app\/styles\/out\.css"/g, 'href="/styles/out.css"');
  html = html.replace(/href="http:\/\/localhost:8000\/styles\/out\.css"/g, 'href="/styles/out.css"');
  html = html.replace(/href="https:\/\/siena-film-foundation\.vercel\.app\/styles\/main\.css"/g, 'href="/styles/webflow.css"');
  html = html.replace(/href="http:\/\/localhost:8000\/styles\/main\.css"/g, 'href="/styles/webflow.css"');

  html = html.replace(/<script src="https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-[^"]+\.js[^"]*"[^>]*><\/script>/gi, '<script src="/scripts/jquery.min.js" type="text/javascript"></script>');
  html = html.replace(/src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+\/js\/webflow\.schunk\.[^"]+\.js"/g, 'src="/scripts/webflow.schunk.js"');
  html = html.replace(/src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+\/js\/webflow\.[^"]+\.js"/g, 'src="/scripts/webflow.main.js"');
  html = html.replace(/src="https:\/\/siena-film-foundation\.vercel\.app\/app\.js"/g, 'src="/scripts/app.js"');
  html = html.replace(/src="http:\/\/localhost:8000\/app\.js"/g, 'src="/scripts/app.js"');

  // Taxi View data-case
  html = html.replace(/data-case="my-project-x"/g, `data-case="${game.slug}"`);

  // Navigation Logo
  html = html.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" fill="none" viewBox="0 0 131 63" width="100%" class="svg-logo">[\s\S]*?<\/svg>/, logoSvg);

  // Hero Section
  html = html.replace(/<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">[\s\S]*?<\/div>/, 
    `<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">${game.genre}</div>`);
  
  html = html.replace(/<h1 data-cs="title" class="cs-title">[\s\S]*?<\/h1>/, 
    `<h1 data-cs="title" class="cs-title" style="font-size: clamp(2.4rem, 5vw, 4.5rem); line-height: 1.15; margin-bottom: 8px;">${game.cnTitle}</h1>
<div class="roll-cont-eyeb parish mb-0" style="font-size: 1.25rem; letter-spacing: 0.12em; color: rgba(0,0,0,0.65); font-weight: 700; text-transform: uppercase;">${game.enTitle} · ${game.version}</div>`);

  // Check if this is one of the top 8 games
  const top8Match = top8Config.find(t => t.slug === game.slug);

  let posterUrl = game.localThumb;
  let screenshots = [];
  let detailedSpecs = null;

  if (top8Match) {
    posterUrl = `/games/${top8Match.folder}/poster.webp`;
    screenshots = getScreenshots(top8Match.folder);
    detailedSpecs = top8Match.specs;
  }

  // Douyin Video section with WebM container & Reservation Photo
  const videoSectionReplacement = `
<div id="second" data-cs="video" class="s is-cs cs-video">
  <div class="videoplayer-w">
    <!-- Douyin Video / WebM Motion Player Placeholder -->
    <div style="position: relative; width: 100%; height: 100%; min-height: 520px; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      <!-- Reservation Photo (WebP) -->
      <img src="${posterUrl}" alt="${game.cnTitle} 宣传海报与视频预留" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.65);" />
      
      <!-- Motion overlay and Douyin video reservation container -->
      <div style="position: relative; z-index: 2; text-align: center; color: #fff; padding: 24px; max-width: 640px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.15);">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: #DFAC42; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">
          <span>抖音实机演示 · 预留播放位</span>
        </div>
        <h3 style="font-size: 1.8rem; margin: 0 0 10px; font-weight: 800;">${game.cnTitle} 实机预告与高光集锦</h3>
        <p style="font-size: 14px; opacity: 0.85; margin: 0 0 20px; line-height: 1.6;">
          本区域已预留抖音高清实机演示视频嵌入位（采用轻量 WebM 动效与自适应视频流）。目前展示官方精选 4K WebP 场景原画。
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="${game.steamUrl}" target="_blank" rel="noopener noreferrer" style="background: #fff; color: #000; font-weight: 700; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-size: 13px; text-transform: uppercase;">
            查看 Steam 官方视频
          </a>
          <a href="${game.fitgirlUrl}" target="_blank" rel="noopener noreferrer" style="background: #339966; color: #fff; font-weight: 700; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-size: 13px; text-transform: uppercase;">
            FitGirl Repack 磁力下载
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  const secondStart = html.indexOf('<div id="second"');
  const secondEnd = findClosingDiv(html, secondStart);
  if (secondStart !== -1 && secondEnd !== -1) {
    html = html.substring(0, secondStart) + videoSectionReplacement.trim() + html.substring(secondEnd);
  }

  // System Requirements & Specs Table
  const minRam = detailedSpecs ? detailedSpecs.min.ram : game.ram;
  const recRam = detailedSpecs ? detailedSpecs.rec.ram : (parseInt(game.ram) >= 16 ? '32 GB' : '16 GB');
  const minGpu = detailedSpecs ? detailedSpecs.min.gpu : 'GTX 1060 / RX 580 (6GB)';
  const recGpu = detailedSpecs ? detailedSpecs.rec.gpu : 'RTX 2060 / RX 5700 XT (8GB) 以上';
  const minCpu = detailedSpecs ? detailedSpecs.min.cpu : 'Intel Core i5-6600 / AMD Ryzen 5 1600';
  const recCpu = detailedSpecs ? detailedSpecs.rec.cpu : 'Intel Core i7-9700 / AMD Ryzen 7 3700X';
  const minStorage = detailedSpecs ? detailedSpecs.min.storage : '需 60 GB 以上可用空间 (推荐 SSD)';
  const recStorage = detailedSpecs ? detailedSpecs.rec.storage : '需 100 GB 以上高速 SSD 空间';

  const creditGridContent = `
<div data-credit-grid="" class="credit-grid-tx" style="padding: 24px 0;">
  <!-- Section Title -->
  <div style="margin-bottom: 24px;">
    <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #DFAC42; margin-bottom: 4px;">SYSTEM REQUIREMENTS & REPACK DETAILS</div>
    <h2 style="font-size: 1.85rem; font-weight: 800; margin: 0; color: #000;">系统配置与内存需求明细</h2>
  </div>

  <!-- Hardware Specs Grid -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 30px;">
    <!-- Minimum Requirements -->
    <div style="background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.1); border-radius: 6px; padding: 22px;">
      <div style="font-weight: 800; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; color: #000; margin-bottom: 16px; border-bottom: 2px solid #000; padding-bottom: 8px; display: flex; justify-content: space-between;">
        <span>最低配置 (MINIMUM)</span>
        <span style="font-size: 11px; background: rgba(0,0,0,0.1); padding: 2px 8px; border-radius: 3px;">1080P 30FPS</span>
      </div>
      <table style="width: 100%; font-size: 13.5px; border-collapse: collapse; line-height: 1.75;">
        <tr>
          <td style="color: #000; width: 95px; padding: 6px 0; vertical-align: top; font-weight: 800;">★ 所需内存</td>
          <td style="color: #000; padding: 6px 0; font-weight: 800;">
            <span style="background: #DFAC42; color: #000; padding: 3px 10px; border-radius: 4px; font-size: 14px;">${minRam}</span>
          </td>
        </tr>
        <tr>
          <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">存储空间</td>
          <td style="color: #000; padding: 6px 0; font-weight: 700;">${minStorage}</td>
        </tr>
        <tr>
          <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">处理器</td>
          <td style="color: #222; padding: 6px 0;">${minCpu}</td>
        </tr>
        <tr>
          <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">显卡</td>
          <td style="color: #222; padding: 6px 0;">${minGpu}</td>
        </tr>
      </table>
    </div>

    <!-- Recommended Requirements -->
    <div style="background: rgba(0,0,0,0.03); border: 2px solid #000; border-radius: 6px; padding: 22px;">
      <div style="font-weight: 800; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; color: #000; margin-bottom: 16px; border-bottom: 2px solid #000; padding-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <span>推荐配置 (RECOMMENDED)</span>
        <span style="font-size: 11px; background: #000; color: #fff; padding: 3px 9px; border-radius: 3px; font-weight: 800;">高清极佳画质</span>
      </div>
      <table style="width: 100%; font-size: 13.5px; border-collapse: collapse; line-height: 1.75;">
        <tr>
          <td style="color: #000; width: 95px; padding: 6px 0; vertical-align: top; font-weight: 800;">★ 所需内存</td>
          <td style="color: #000; padding: 6px 0; font-weight: 800;">
            <span style="background: #000; color: #fff; padding: 3px 10px; border-radius: 4px; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
              ${recRam}
            </span>
          </td>
        </tr>
        <tr>
          <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">存储空间</td>
          <td style="color: #000; padding: 6px 0; font-weight: 800;">${recStorage}</td>
        </tr>
        <tr>
          <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">处理器</td>
          <td style="color: #222; padding: 6px 0;">${recCpu}</td>
        </tr>
        <tr>
          <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">显卡</td>
          <td style="color: #222; padding: 6px 0;">${recGpu}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Store CTA and Actions Row -->
  <div class="credit-row-w border-dash" style="padding: 18px 24px; border: 1px dashed rgba(0,0,0,0.25); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; background: rgba(0,0,0,0.02);">
    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
      <a href="${game.steamUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:8px; background:#000; color:#fff; padding:12px 22px; font-weight:700; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; border-radius:4px;">
        <span>前往 STEAM 官方商店页面</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
      </a>
      <a href="${game.fitgirlUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:8px; background:#339966; color:#fff; padding:12px 22px; font-weight:700; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; border-radius:4px;">
        <span>查看 FITGIRL REPACK 档案</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
      </a>
    </div>
    <a href="/work#all-games-archive" style="color:#000; text-decoration:none; font-weight:700; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; display:flex; align-items:center; gap:8px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      <span>返回全部 150 款游戏档案库 (ALL 150 GAMES)</span>
    </a>
  </div>
</div>
`;

  const gridStart = html.indexOf('<div data-credit-grid=""');
  const gridEnd = findClosingDiv(html, gridStart);
  if (gridStart !== -1 && gridEnd !== -1) {
    html = html.substring(0, gridStart) + creditGridContent.trim() + html.substring(gridEnd);
  }

  // Next Project
  const nextGame = games150[(gameIdx + 1) % games150.length];
  html = html.replace(/<div class="previousnext-he">ALL WORK<\/div>/, `<div class="previousnext-he">全部 150 款游戏档案 (ALL WORK)</div>`);
  html = html.replace(/<div class="previousnext-he">Savoy<\/div>/g, 
    `<div class="previousnext-he">${nextGame.cnTitle}</div>\n<div style="font-size: 1.15rem; color: rgba(255,255,255,0.8); margin-top: 6px; font-weight: 700;">${nextGame.enTitle}</div>`);
  
  html = html.replace(/<img\s+src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+"[^>]*class="prevnext-img"[^>]*\/>/g,
    `<img src="${nextGame.localThumb}" loading="lazy" alt="${nextGame.cnTitle}" class="prevnext-img" style="object-fit:cover; width:100%; height:100%;"/>`);

  html = html.replace(/href="\/films\/[a-z0-9-]+"/g, (match) => {
    return `href="${nextGame.detailLink}"`;
  });

  // Footer branding
  html = html.replace(/<div data-a="item">PRODUCTION<\/div>/g, '<div data-a="item">PARALLEL SPACE</div>');
  html = html.replace(/<div data-a="item">DOCUMENTARY<\/div>/g, '<div data-a="item">GAME ARCHIVE</div>');
  html = html.replace(/<div data-a="item" class="text-block-13">FILM TV<\/div>/g, '<div data-a="item" class="text-block-13">FITGIRL POPULAR</div>');
  html = html.replace(/©2024\. SIENA FILM FOUNDATION\./g, '©2026. STEM 的平行空间 (STEM PARALLEL SPACE).');
  html = html.replace(/@siena\. All Rights Reserved/gi, '@STEM. All Rights Reserved');

  const outPath = path.join(filmsDir, `${game.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
});

// Also create my-project-x.html mapped to black-myth-wukong
fs.copyFileSync(path.join(filmsDir, 'black-myth-wukong.html'), path.join(filmsDir, 'my-project-x.html'));
console.log(`✓ Generated all 150 exploration pages in films/*.html`);

// =========================================================================
// STEP 2: BUILD INTERACTIVE 150 GAMES CATALOG IN work.html & index.html
// =========================================================================
let workHtml = fs.readFileSync('work.html', 'utf8');

// Logo
workHtml = workHtml.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 131 63" width="100%" class="svg-logo">[\s\S]*?<\/svg>/, logoSvg);

// Build Cards HTML for all 150 games
const cardsHtml = games150.map(g => {
  return `
    <div class="game-archive-card" data-cat="${g.category}" data-search="${g.cnTitle.toLowerCase()} ${g.enTitle.toLowerCase()} ${g.genre.toLowerCase()} ${g.version.toLowerCase()}">
      <div class="card-thumb-w">
        <img src="${g.localThumb}" loading="lazy" alt="${g.cnTitle}" class="card-thumb-img"/>
        <div class="card-badge-id">#${String(g.id).padStart(3, '0')}</div>
        <div class="card-badge-cat">${g.category}</div>
      </div>
      <div class="card-content-w">
        <h3 class="card-cn-title">${g.cnTitle}</h3>
        <div class="card-en-title">${g.enTitle}</div>
        <div class="card-ver-tag">${g.version}</div>
        <div class="card-ram-badge">
          <span>★ 所需内存: <strong>${g.ram}</strong></span>
        </div>
        <div class="card-btn-row">
          <a href="${g.detailLink}" class="card-act-btn primary">探索档案</a>
          <a href="${g.steamUrl}" target="_blank" rel="noopener noreferrer" class="card-act-btn sec">Steam</a>
          <a href="${g.fitgirlUrl}" target="_blank" rel="noopener noreferrer" class="card-act-btn fit">FitGirl</a>
        </div>
      </div>
    </div>
  `;
}).join('\n');

const archiveSectionHtml = `
<!-- ========================================== -->
<!-- 150 GAMES INTERACTIVE ARCHIVE CATALOG GRID -->
<!-- ========================================== -->
<section id="all-games-archive" class="all-games-section">
  <div class="archive-header-w">
    <div>
      <div class="archive-eyebrow">FITGIRL POPULAR REPACKS OF THE YEAR</div>
      <h2 class="archive-main-he">全部 150 款精选大作档案库</h2>
      <p class="archive-desc">
        完整收录年度热门 150 款 PC 单机大作，全中文索引与分类检索，超轻量 WebP 高清封面，系统所需内存一目了然。
      </p>
    </div>
    <div class="archive-stats-box">
      <div class="stat-number" id="current-visible-count">150</div>
      <div class="stat-label">收录游戏数量</div>
    </div>
  </div>

  <!-- Search & Category Filters -->
  <div class="archive-controls-w">
    <!-- Realtime Search -->
    <div class="search-input-w">
      <svg class="search-svg-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      <input type="text" id="game-search-input" placeholder="输入游戏中文名 / 英文原名 / 类型 / 关键词进行实时检索..." />
      <button id="clear-search-btn" style="display:none;" onclick="clearGameSearch()">✕</button>
    </div>

    <!-- Category Filter Tabs -->
    <div class="cat-filter-tabs">
      <button class="cat-pill active" onclick="filterCategory('all', this)">全部 150 款</button>
      <button class="cat-pill" onclick="filterCategory('动作角色扮演', this)">动作角色扮演</button>
      <button class="cat-pill" onclick="filterCategory('动作冒险', this)">动作冒险</button>
      <button class="cat-pill" onclick="filterCategory('开放世界', this)">开放世界</button>
      <button class="cat-pill" onclick="filterCategory('第一人称射击', this)">第一人称射击</button>
      <button class="cat-pill" onclick="filterCategory('赛车竞速', this)">赛车竞速</button>
      <button class="cat-pill" onclick="filterCategory('生存恐怖', this)">生存恐怖</button>
      <button class="cat-pill" onclick="filterCategory('体育竞技', this)">体育竞技</button>
      <button class="cat-pill" onclick="filterCategory('格斗对战', this)">格斗对战</button>
    </div>
  </div>

  <!-- Cards Grid -->
  <div id="games-archive-grid" class="games-archive-grid">
    ${cardsHtml}
  </div>

  <!-- No Results Message -->
  <div id="no-results-msg" style="display:none; text-align:center; padding: 60px 20px; color: rgba(255,255,255,0.5);">
    <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
    <div style="font-size: 1.25rem; font-weight: 700; color: #fff;">没有找到符合搜索条件的游戏</div>
    <div style="font-size: 14px; margin-top: 6px;">请尝试输入不同的游戏名称或重置分类筛选</div>
  </div>
</section>

<!-- Filter Script -->
<script>
  let currentCategory = 'all';
  const searchInput = document.getElementById('game-search-input');
  const clearBtn = document.getElementById('clear-search-btn');
  const countEl = document.getElementById('current-visible-count');
  const noResEl = document.getElementById('no-results-msg');
  const cards = document.querySelectorAll('.game-archive-card');

  function updateFilter() {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }

    let visibleCount = 0;
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-cat') || '';
      const cardSearch = card.getAttribute('data-search') || '';

      const matchCat = (currentCategory === 'all') || cardCat.includes(currentCategory);
      const matchQuery = !query || cardSearch.includes(query);

      if (matchCat && matchQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    countEl.textContent = visibleCount;
    if (visibleCount === 0) {
      noResEl.style.display = 'block';
    } else {
      noResEl.style.display = 'none';
    }
  }

  function filterCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    updateFilter();
  }

  function clearGameSearch() {
    searchInput.value = '';
    updateFilter();
    searchInput.focus();
  }

  if (searchInput) {
    searchInput.addEventListener('input', updateFilter);
  }
</script>
`;

// Styles for the 150-game archive grid
const archiveStyles = `
<style id="archive-150-styles">
  .all-games-section {
    position: relative;
    z-index: 10;
    background: #09090b;
    padding: 80px 4vw 120px;
    color: #fff;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .archive-header-w {
    max-width: 1440px;
    margin: 0 auto 36px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 24px;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    padding-bottom: 24px;
  }
  .archive-eyebrow {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #DFAC42;
    font-weight: 800;
    margin-bottom: 6px;
  }
  .archive-main-he {
    font-size: clamp(2rem, 3.8vw, 3.2rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
    color: #fff;
  }
  .archive-desc {
    margin: 0;
    color: rgba(255,255,255,0.65);
    font-size: 14px;
    max-width: 720px;
    line-height: 1.6;
  }
  .archive-stats-box {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.12);
    padding: 12px 22px;
    border-radius: 8px;
    text-align: center;
  }
  .stat-number {
    font-size: 28px;
    font-weight: 800;
    color: #DFAC42;
  }
  .stat-label {
    font-size: 11px;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
  }
  .archive-controls-w {
    max-width: 1440px;
    margin: 0 auto 36px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .search-input-w {
    position: relative;
    width: 100%;
  }
  .search-svg-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    fill: rgba(255,255,255,0.4);
    pointer-events: none;
  }
  .search-input-w input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 15px 44px 15px 48px;
    color: #fff;
    font-size: 15px;
    outline: none;
    transition: all 0.3s ease;
  }
  .search-input-w input:focus {
    border-color: #DFAC42;
    background: rgba(255,255,255,0.08);
    box-shadow: 0 0 20px rgba(223, 172, 66, 0.2);
  }
  #clear-search-btn {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.1);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    cursor: pointer;
    font-size: 12px;
  }
  .cat-filter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .cat-pill {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .cat-pill:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
    border-color: rgba(255,255,255,0.25);
  }
  .cat-pill.active {
    background: #DFAC42;
    color: #000;
    border-color: #DFAC42;
    font-weight: 800;
    box-shadow: 0 4px 14px rgba(223, 172, 66, 0.3);
  }
  .games-archive-grid {
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }
  .game-archive-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .game-archive-card:hover {
    transform: translateY(-6px);
    border-color: rgba(223, 172, 66, 0.5);
    box-shadow: 0 16px 36px rgba(0,0,0,0.6);
  }
  .card-thumb-w {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: #141416;
  }
  .card-thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .game-archive-card:hover .card-thumb-img {
    transform: scale(1.06);
  }
  .card-badge-id {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(4px);
    color: #DFAC42;
    font-size: 11px;
    font-weight: 800;
    padding: 3px 7px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
  .card-badge-cat {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
  }
  .card-content-w {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .card-cn-title {
    font-size: 1.15rem;
    font-weight: 800;
    margin: 0 0 4px;
    color: #fff;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-en-title {
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }
  .card-ver-tag {
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.05);
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-ram-badge {
    margin-top: auto;
    font-size: 12px;
    color: #DFAC42;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .card-ram-badge strong {
    color: #fff;
  }
  .card-btn-row {
    display: flex;
    gap: 6px;
  }
  .card-act-btn {
    text-decoration: none;
    font-size: 11.5px;
    font-weight: 700;
    padding: 8px 10px;
    border-radius: 4px;
    text-align: center;
    letter-spacing: 0.05em;
    transition: opacity 0.2s ease;
  }
  .card-act-btn:hover {
    opacity: 0.85;
  }
  .card-act-btn.primary {
    background: #fff;
    color: #000;
    flex: 2;
  }
  .card-act-btn.sec {
    background: rgba(255,255,255,0.1);
    color: #fff;
    flex: 1;
  }
  .card-act-btn.fit {
    background: #339966;
    color: #fff;
    flex: 1;
  }
</style>
`;

// Insert archive styles into head of workHtml
if (!workHtml.includes('id="archive-150-styles"')) {
  workHtml = workHtml.replace('</head>', `${archiveStyles}\n</head>`);
}

// Append archive section before footer
const footerIdx = workHtml.indexOf('<div data-s="footer"');
if (footerIdx !== -1) {
  // Remove any previous instance of #all-games-archive if present
  if (workHtml.includes('id="all-games-archive"')) {
    const existingStart = workHtml.indexOf('<section id="all-games-archive"');
    const existingEnd = workHtml.indexOf('</section>', existingStart) + 10;
    workHtml = workHtml.substring(0, existingStart) + workHtml.substring(existingEnd);
  }
  const insertPos = workHtml.indexOf('<div data-s="footer"');
  workHtml = workHtml.substring(0, insertPos) + archiveSectionHtml + '\n' + workHtml.substring(insertPos);
}

fs.writeFileSync('work.html', workHtml, 'utf8');
fs.writeFileSync('index.html', workHtml, 'utf8');
console.log('✓ Successfully injected 150-Game Catalog into work.html and index.html!');

console.log('=== COMPLETE SITE GENERATION FINISHED ===');
