const fs = require('fs');
const path = require('path');

console.log('=== APPLYING COMPLETE REBUILD & VISUAL POLISH ===');

const games150 = JSON.parse(fs.readFileSync('games_150_fitgirl.json', 'utf8'));
const top8 = JSON.parse(fs.readFileSync('games_fitgirl_config.json', 'utf8'));

// Top 8 game metadata for 3D Reel
const top8ReelMeta = [
  {
    slug: 'black-myth-wukong',
    folder: '01-black-myth-wukong',
    cnTitle: '黑神话：悟空',
    enTitle: 'Black Myth: Wukong',
    dev: '游戏科学 Game Science',
    year: '2024',
    cat: '动作角色扮演 (Action RPG)',
    awardYear: '2024',
    awardHeadline: 'THE GAME AWARDS · 年度最佳动作游戏',
    reviews: [
      { author: 'IGN China', quote: '国产3A里程碑之作，登峰造极的视听盛宴' },
      { author: 'PC Gamer', quote: 'Breathtaking action and stunning mythical boss fights' },
      { author: 'Eurogamer', quote: 'A triumphant epic steeped in rich folklore' }
    ]
  },
  {
    slug: 'elden-ring',
    folder: '02-elden-ring',
    cnTitle: '艾尔登法环：黄金树幽影',
    enTitle: 'ELDEN RING: Shadow of the Erdtree',
    dev: 'FromSoftware / 万代南梦宫',
    year: '2024',
    cat: '开放世界魂系 (Soulslike)',
    awardYear: '2024',
    awardHeadline: 'GOLDEN JOYSTICK · 终极年度游戏金奖',
    reviews: [
      { author: 'GameSpot', quote: 'DLC规模超越诸多完整游戏，艺术与探索的巅峰' },
      { author: 'IGN', quote: 'A magnificent expansion that matches the original masterpiece' },
      { author: 'Polygon', quote: 'Massive, mysterious, and endlessly rewarding' }
    ]
  },
  {
    slug: 'cyberpunk-2077',
    folder: '03-cyberpunk-2077',
    cnTitle: '赛博朋克 2077：往日之影',
    enTitle: 'Cyberpunk 2077: Phantom Liberty',
    dev: 'CD PROJEKT RED',
    year: '2023',
    cat: '科幻开放世界 (Sci-Fi RPG)',
    awardYear: '2023',
    awardHeadline: 'THE GAME AWARDS · 最佳持续运营与叙事',
    reviews: [
      { author: 'Game Informer', quote: '夜之城的涅槃重生，光影与剧情的终极巅峰' },
      { author: 'Rock Paper Shotgun', quote: 'A gripping espionage thriller with supreme visuals' },
      { author: 'PCGamesN', quote: 'The definitive Cyberpunk experience' }
    ]
  },
  {
    slug: 'red-dead-redemption-2',
    folder: '04-red-dead-redemption-2',
    cnTitle: '荒野大镖客：救赎 2',
    enTitle: 'Red Dead Redemption 2',
    dev: 'Rockstar Games',
    year: '2019',
    cat: '西部史诗 (Open World)',
    awardYear: '2019',
    awardHeadline: 'STEAM AWARDS · 杰出视觉风格与年度大奖',
    reviews: [
      { author: 'IGN', quote: '开放世界的最高艺术巅峰，无可争议的时代杰作' },
      { author: 'Giant Bomb', quote: 'The most detailed and alive virtual world ever created' },
      { author: 'The Guardian', quote: 'A monumental achievement in interactive fiction' }
    ]
  },
  {
    slug: 'grand-theft-auto-v',
    folder: '05-grand-theft-auto-v',
    cnTitle: '侠盗猎车手 5：传承增强版',
    enTitle: 'Grand Theft Auto V',
    dev: 'Rockstar Games',
    year: '2015',
    cat: '动作犯罪沙盒 (Action Crime)',
    awardYear: '2015',
    awardHeadline: 'BAFTA GAMES · 全球吉尼斯世界纪录保持者',
    reviews: [
      { author: 'Edge', quote: '重新定义沙盒游戏的永恒标杆，流行文化的里程碑' },
      { author: 'GamesRadar', quote: 'A satirical masterwork with limitless freedom' },
      { author: 'Kotaku', quote: 'Unbelievably ambitious and executed with perfection' }
    ]
  },
  {
    slug: 'god-of-war-ragnarok',
    folder: '06-god-of-war-ragnarok',
    cnTitle: '战神：诸神黄昏',
    enTitle: 'God of War Ragnarök',
    dev: '索尼圣莫尼卡工作室',
    year: '2024',
    cat: '动作史诗冒险 (Action Adventure)',
    awardYear: '2024',
    awardHeadline: 'BAFTA GAMES · 最佳动作叙事与动画金奖',
    reviews: [
      { author: 'Destructoid', quote: '奎托斯父子救赎史诗的完美终章，战斗爽快极致' },
      { author: 'VGC', quote: 'A triumphant sequel and an unforgettable cinematic spectacle' },
      { author: 'EGM', quote: 'Masterful storytelling and brutal, satisfying combat' }
    ]
  },
  {
    slug: 'baldurs-gate-3',
    folder: '07-baldurs-gate-3',
    cnTitle: '博德之门 3：终极豪华版',
    enTitle: "Baldur's Gate 3",
    dev: '拉瑞安工作室 (Larian Studios)',
    year: '2023',
    cat: '奇幻角色扮演 (CRPG Masterpiece)',
    awardYear: '2023',
    awardHeadline: 'THE GAME AWARDS · 年度大满贯年度最佳游戏 (GOTY)',
    reviews: [
      { author: 'Eurogamer', quote: '自由度前所未有的殿堂级CRPG，定义整个世代' },
      { author: 'PC Gamer', quote: 'The new pinnacle of the role-playing genre' },
      { author: 'Inverse', quote: 'A staggering triumph of reactive storytelling' }
    ]
  },
  {
    slug: 'marvels-spider-man-2',
    folder: '08-marvels-spider-man-2',
    cnTitle: '漫威蜘蛛侠 2：完整典藏版',
    enTitle: "Marvel's Spider-Man 2",
    dev: '失眠组 Insomniac Games',
    year: '2024',
    cat: '超级英雄动作 (Superhero Action)',
    awardYear: '2024',
    awardHeadline: 'D.I.C.E. AWARDS · 年度最佳动作与音效设计',
    reviews: [
      { author: 'Game Informer', quote: '双蛛同台，次世代摆荡与毒液战斗的极致体验' },
      { author: 'Shacknews', quote: 'An exhilarating superhero adventure with unmatched fluidity' },
      { author: 'IGN', quote: 'The best Spider-Man story ever told in a video game' }
    ]
  }
];

// =========================================================================
// 1. REBUILD home.html
// =========================================================================
let homeHtml = fs.readFileSync('home.html', 'utf8');

// Replace all award images (.award-img) with golden laurel SVG
homeHtml = homeHtml.replace(/<img[^>]+class="award-img"[^>]*\/>/g, 
  '<img src="/assets/laurel-award.svg" loading="lazy" alt="Game Festival Laurel" class="award-img" style="width: 58px; height: 58px; object-fit: contain; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));"/>');

// Replace all review figures with golden 5-star SVGs
homeHtml = homeHtml.replace(/<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img[^>]+><\/div><\/figure>/g,
  '<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img src="/assets/stars-rating.svg" loading="lazy" alt="5 Stars Rating" style="width: 90px; height: 16px; object-fit: contain; margin: 4px auto;"/></div></figure>');

// Fix typography & remove overlapping clone layers
const homeHeadFixes = `
<style id="home-aesthetic-fixes">
  /* 1. Eliminate text cloning overlap completely */
  .cloneText, .cloneText2 {
    display: none !important;
  }
  .originalText, .originalText2 {
    position: relative !important;
    display: inline-block !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
  }

  /* 2. CJK Title spacing and sizing */
  .roll-cont-he.home {
    font-size: clamp(2.4rem, 4.2vw, 4rem) !important;
    line-height: 1.25 !important;
    letter-spacing: 0.02em !important;
    white-space: normal !important;
    word-break: keep-all !important;
    margin-bottom: 8px !important;
    text-shadow: 0 4px 20px rgba(0,0,0,0.8) !important;
  }
  .split-line-wrapper {
    overflow: visible !important;
  }
  .split-line-move {
    line-height: 1.25 !important;
    height: auto !important;
    margin-bottom: 6px !important;
  }
  .split-line-move > div {
    line-height: 1.25 !important;
    height: auto !important;
    overflow: visible !important;
  }
  .split-rollover {
    display: inline-block !important;
    position: relative !important;
    overflow: visible !important;
    vertical-align: top !important;
  }

  /* 3. Bottom metadata spacing (DEVELOPER, YEAR, CATEGORY) */
  .linecallout-list.home {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin-top: 14px !important;
    padding: 0 !important;
  }
  .linecallout-item.home {
    height: auto !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 16px !important;
    padding: 3px 0 !important;
    transform: none !important;
  }
  .linecallout-item.home div, 
  .linecallout-item.home span {
    transform: none !important;
    font-size: 13.5px !important;
    letter-spacing: 0.06em !important;
    line-height: 1.4 !important;
  }
  .linecallout-item.home .paragraph:first-child,
  .linecallout-item.home div:first-child {
    min-width: 95px !important;
    color: rgba(255, 255, 255, 0.6) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
  }

  /* 4. Left Awards styling */
  .award-year {
    font-size: 2.2rem !important;
    font-weight: 800 !important;
    color: #DFAC42 !important;
  }
  .award_headline {
    font-size: 12.5px !important;
    letter-spacing: 0.08em !important;
    line-height: 1.4 !important;
    text-align: center !important;
    color: rgba(255,255,255,0.85) !important;
    font-weight: 600 !important;
  }
  .award_img-wrap {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-top: 8px !important;
  }

  /* 5. Right Reviews styling */
  .awards-w figure {
    margin: 6px auto 4px !important;
  }
  .awards-w p {
    font-size: 12px !important;
    letter-spacing: 0.1em !important;
    color: rgba(255,255,255,0.6) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    margin-bottom: 2px !important;
  }
  .awards-w h3 {
    font-size: 1.15rem !important;
    line-height: 1.35 !important;
    color: #fff !important;
    margin-top: 0 !important;
    margin-bottom: 14px !important;
  }
</style>
`;

if (homeHtml.includes('id="home-aesthetic-fixes"')) {
  homeHtml = homeHtml.replace(/<style id="home-aesthetic-fixes">[\s\S]*?<\/style>/, homeHeadFixes);
} else {
  homeHtml = homeHtml.replace('</head>', `${homeHeadFixes}\n</head>`);
}

// Update specific fields in each of the 8 slides in home.html
top8ReelMeta.forEach((meta, idx) => {
  // Developer replacement
  // Replace old strings like "ASD Games Studio" or "Sebasa Games" with meta.dev
  homeHtml = homeHtml.replaceAll('Sebasa Games', meta.dev);
  homeHtml = homeHtml.replaceAll('ASD Games Studio', meta.dev);
  homeHtml = homeHtml.replaceAll('Ironhide Game Studio', meta.dev);
});

fs.writeFileSync('home.html', homeHtml, 'utf8');
console.log('✓ Rebuilt home.html with crystal-clear CJK typography and golden SVGs!');


// =========================================================================
// 2. REBUILD work.html & index.html (3D REEL + ALL 150 GAMES ARCHIVE)
// =========================================================================
let workHtml = fs.readFileSync('work.html', 'utf8');

// Build 150 Game Cards
const cardsHtml = games150.map(g => {
  return `
    <div class="game-archive-card" data-cat="${g.category}" data-search="${g.cnTitle.toLowerCase()} ${g.enTitle.toLowerCase()} ${g.genre.toLowerCase()} ${g.version.toLowerCase()}">
      <div class="card-thumb-w">
        <img src="${g.localThumb}" loading="lazy" alt="${g.cnTitle}" class="card-thumb-img"/>
        <div class="card-badge-id">#${String(g.id).padStart(3, '0')}</div>
        <div class="card-badge-cat">${g.category}</div>
      </div>
      <div class="card-content-w">
        <h3 class="card-cn-title" title="${g.cnTitle}">${g.cnTitle}</h3>
        <div class="card-en-title" title="${g.enTitle}">${g.enTitle}</div>
        <div class="card-ver-tag" title="${g.version}">${g.version}</div>
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

const fullCatalogHtml = `
<!-- ============================================== -->
<!-- 150 GAMES DUAL-MODE VIEW SWITCHER & GRID MODAL -->
<!-- ============================================== -->
<div id="catalog-view-toggle-bar" style="position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; align-items: center; gap: 8px; background: rgba(15,15,18,0.85); backdrop-filter: blur(16px); padding: 8px 12px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 16px 40px rgba(0,0,0,0.7);">
  <button id="btn-mode-reel" onclick="switchView('reel')" style="background: rgba(255,255,255,0.08); color: #fff; border: 1px solid transparent; padding: 10px 22px; border-radius: 30px; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.25s ease;">
    🎬 3D 胶卷展示 (3D REEL)
  </button>
  <button id="btn-mode-archive" onclick="switchView('archive')" style="background: #DFAC42; color: #000; border: 1px solid #DFAC42; padding: 10px 22px; border-radius: 30px; font-weight: 800; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 4px 14px rgba(223,172,66,0.35);">
    📚 全部 150 款游戏档案库 (ALL 150)
  </button>
</div>

<!-- ========================================== -->
<!-- 150 GAMES INTERACTIVE ARCHIVE CATALOG GRID -->
<!-- ========================================== -->
<section id="all-games-archive" class="all-games-section" style="display: none; position: fixed; inset: 0; z-index: 9990; background: #08080a; padding: 60px 4vw 140px; color: #fff; overflow-y: auto; -webkit-overflow-scrolling: touch;">
  <div class="archive-header-w">
    <div>
      <div class="archive-eyebrow">FITGIRL POPULAR REPACKS OF THE YEAR · 150 TITLES</div>
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
      <button class="cat-pill active" onclick="filterCategory('all', this)">全部 (150)</button>
      <button class="cat-pill" onclick="filterCategory('动作角色扮演', this)">动作角色扮演</button>
      <button class="cat-pill" onclick="filterCategory('动作冒险', this)">动作冒险</button>
      <button class="cat-pill" onclick="filterCategory('开放世界', this)">开放世界</button>
      <button class="cat-pill" onclick="filterCategory('射击', this)">射击战争</button>
      <button class="cat-pill" onclick="filterCategory('赛车竞速', this)">赛车竞速</button>
      <button class="cat-pill" onclick="filterCategory('恐怖', this)">生存恐怖</button>
      <button class="cat-pill" onclick="filterCategory('体育', this)">体育竞技</button>
      <button class="cat-pill" onclick="filterCategory('格斗', this)">格斗竞技</button>
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

<!-- Interactive View Switcher & Filter Logic -->
<script>
  let currentCategory = 'all';
  const searchInput = document.getElementById('game-search-input');
  const clearBtn = document.getElementById('clear-search-btn');
  const countEl = document.getElementById('current-visible-count');
  const noResEl = document.getElementById('no-results-msg');
  const cards = document.querySelectorAll('.game-archive-card');

  function updateFilter() {
    const query = (searchInput.value || '').trim().toLowerCase();
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

    if (countEl) countEl.textContent = visibleCount;
    if (noResEl) {
      noResEl.style.display = (visibleCount === 0) ? 'block' : 'none';
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

  function switchView(mode) {
    const archiveSec = document.getElementById('all-games-archive');
    const btnReel = document.getElementById('btn-mode-reel');
    const btnArchive = document.getElementById('btn-mode-archive');
    const canvas = document.querySelector('[data-gl="c"]');
    const workRoll = document.querySelector('.work-roll-w');

    if (mode === 'archive') {
      if (archiveSec) archiveSec.style.display = 'block';
      if (canvas) canvas.style.opacity = '0';
      if (workRoll) workRoll.style.display = 'none';
      btnArchive.style.background = '#DFAC42';
      btnArchive.style.color = '#000';
      btnArchive.style.borderColor = '#DFAC42';
      btnReel.style.background = 'rgba(255,255,255,0.08)';
      btnReel.style.color = '#fff';
      btnReel.style.borderColor = 'transparent';
      document.body.style.overflowY = 'auto';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (archiveSec) archiveSec.style.display = 'none';
      if (canvas) canvas.style.opacity = '1';
      if (workRoll) workRoll.style.display = 'flex';
      btnReel.style.background = '#DFAC42';
      btnReel.style.color = '#000';
      btnReel.style.borderColor = '#DFAC42';
      btnArchive.style.background = 'rgba(255,255,255,0.08)';
      btnArchive.style.color = '#fff';
      btnArchive.style.borderColor = 'transparent';
      document.body.style.overflowY = 'hidden';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
</script>
`;

// Insert styles into work.html <head>
const fullCatalogStyles = `
<style id="full-catalog-150-styles">
  .all-games-section {
    position: relative;
    z-index: 100;
    background: #08080a;
    padding: 60px 4vw 140px;
    color: #fff;
    min-height: 100vh;
  }
  .archive-header-w {
    max-width: 1440px;
    margin: 0 auto 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    padding-bottom: 16px;
  }
  .archive-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #DFAC42;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .archive-main-he {
    font-size: clamp(1.8rem, 3.2vw, 2.6rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
    color: #fff;
  }
  .archive-desc {
    margin: 0;
    color: rgba(255,255,255,0.65);
    font-size: 13px;
    max-width: 700px;
    line-height: 1.5;
  }
  .archive-stats-box {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.12);
    padding: 8px 18px;
    border-radius: 8px;
    text-align: center;
  }
  .stat-number {
    font-size: 24px;
    font-weight: 800;
    color: #DFAC42;
  }
  .stat-label {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
  }
  .archive-controls-w {
    max-width: 1440px;
    margin: 0 auto 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    padding: 12px 40px 12px 46px;
    color: #fff;
    font-size: 14px;
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
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12.5px;
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

if (workHtml.includes('id="full-catalog-150-styles"')) {
  workHtml = workHtml.replace(/<style id="full-catalog-150-styles">[\s\S]*?<\/style>/, fullCatalogStyles);
} else {
  workHtml = workHtml.replace('</head>', `${fullCatalogStyles}\n</head>`);
}

// Insert before <script src="/scripts/jquery.min.js"
// Clean any existing catalog
if (workHtml.includes('id="all-games-archive"')) {
  const s = workHtml.indexOf('<!-- ============================================== -->\n<!-- 150 GAMES DUAL-MODE VIEW SWITCHER');
  const e = workHtml.indexOf('</script>\n', s) + 10;
  if (s !== -1 && e > s) {
    workHtml = workHtml.substring(0, s) + workHtml.substring(e);
  }
}

const jqIdx = workHtml.indexOf('<script src="/scripts/jquery.min.js"');
if (jqIdx !== -1) {
  workHtml = workHtml.substring(0, jqIdx) + fullCatalogHtml + '\n' + workHtml.substring(jqIdx);
}

fs.writeFileSync('work.html', workHtml, 'utf8');
fs.writeFileSync('index.html', workHtml, 'utf8');
console.log('✓ Rebuilt work.html & index.html with interactive 150-game catalog and dual-mode switcher!');

console.log('=== COMPLETE REBUILD APPLIED SUCCESSFULLY ===');
