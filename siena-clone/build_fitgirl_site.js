const fs = require('fs');
const path = require('path');

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

const rawFilmHtml = fs.readFileSync(path.join(__dirname, '..', 'siena_film_raw.html'), 'utf8');
const gamesConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'games_fitgirl_config.json'), 'utf8'));

// Helper to get screenshot list for a game
function getScreenshots(folder) {
  const ssDir = path.join(__dirname, 'games', folder, 'screenshots');
  if (!fs.existsSync(ssDir)) return [];
  const files = fs.readdirSync(ssDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg'));
  // sort to ensure 01, 02, etc.
  files.sort();
  return files.map(f => `/games/${folder}/screenshots/${f}`);
}

const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="34" height="34" fill="none" style="display:inline-block; vertical-align:middle;">
  <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="3 3"/>
  <path d="M12 14h16M12 20h16M12 26h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="28" cy="26" r="3" fill="currentColor"/>
</svg>
<span style="font-family: inherit; font-weight: 800; font-size: 1.15rem; letter-spacing: 0.12em; text-transform: uppercase;">STEM 的平行空间</span>
`;

// =========================================================================
// 1. GENERATE EXPLORATION PAGES (films/*.html)
// =========================================================================
function generateExplorationHtml(game, gameIdx, allGames) {
  let html = rawFilmHtml;

  // 1.1 Page Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, 
    `<title>STEM 的平行空间 | ${game.cnTitle} (${game.title}) - 游戏档案与系统配置</title>`);

  // 1.2 Localize styles and scripts
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

  // 1.3 Update Taxi View data-case
  html = html.replace(/data-case="my-project-x"/g, `data-case="${game.slug}"`);

  // 1.4 Update Navigation Logo
  html = html.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" fill="none" viewBox="0 0 131 63" width="100%" class="svg-logo">[\s\S]*?<\/svg>/, logoSvg);

  // 1.5 Update Navigation Menu Film Titles
  const oldFilms = [
    'Savoy',
    'Moon in the 12th House',
    'Taboo',
    "Kafka's Last Trial",
    'My Project X',
    'Ana Maxim',
    'Outsider Freud',
    'By Any Means'
  ];
  allGames.forEach((g, idx) => {
    if (oldFilms[idx]) {
      html = html.replaceAll(oldFilms[idx], g.cnTitle);
    }
  });

  // 1.6 Update Hero Section (Title + Eyebrow + Subtitle in Chinese)
  html = html.replace(/<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">[\s\S]*?<\/div>/, 
    `<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">${game.category}</div>`);
  
  html = html.replace(/<h1 data-cs="title" class="cs-title">[\s\S]*?<\/h1>/, 
    `<h1 data-cs="title" class="cs-title" style="font-size: clamp(2.5rem, 5vw, 4.8rem); line-height: 1.1; margin-bottom: 8px;">${game.cnTitle}</h1>
<div class="roll-cont-eyeb parish mb-0" style="font-size: 1.25rem; letter-spacing: 0.12em; color: rgba(0,0,0,0.65); font-weight: 700; text-transform: uppercase;">${game.title} · ${game.edition}</div>`);

  // 1.7 Update Video Section (#second) with Douyin Video Reservation Photo & Container
  const posterWebp = `/games/${game.folder}/poster.webp`;
  const posterJpg = `/games/${game.folder}/poster.jpg`;
  const coverWebp = `/games/${game.folder}/cover.webp`;

  // Update background image in video-comp
  html = html.replace(/<img src="https:\/\/cdn\.prod\.website-files\.com\/673306db3b111afa559bc378\/67923c1fa550c616a38131b9_project\.jpg"[^>]*class="image-2"\/>/,
    `<img src="${posterWebp}" loading="eager" alt="${game.cnTitle} 抖音视频预留海报" class="image-2" style="object-fit:cover; width:100%; height:100%;"/>`);

  // Update Trigger button on video player to indicate Douyin Video reservation
  html = html.replace(/<div class="roll-cont-eyeb parish mb-2">ACTION!<\/div><h2 class="heading-5">WATCH<br\/>Trailer<\/h2>/,
    `<div class="roll-cont-eyeb parish mb-2" style="color:#00f2fe; text-shadow:0 0 10px rgba(0,242,254,0.6); font-weight:800;">DOUYIN · 抖音</div>
<h2 class="heading-5" style="font-size: 18px; line-height: 1.25; margin-top: 4px; color:#ffffff !important;">视频展位<br/><span style="font-size:12px; color:#00f2fe; font-weight:700;">点击查看</span></h2>`);

  // In video dialog / video container, reserve Douyin photo placeholder
  const douyinPlaceholderHtml = `
<!-- ========================================================================= -->
<!-- 抖音视频嵌入预留位置 (DOUYIN VIDEO RESERVED CONTAINER)                        -->
<!-- 站长提示：当前使用 1080P 高清实机海报作为预留展位。                       -->
<!-- 后续制作完成抖音视频后，直接将此处替换为抖音官方的短视频 iframe 播放器代码即可：-->
<!-- 示例：                                                                   -->
<!-- <iframe src="https://open.douyin.com/player/video?vid=XXXX"              -->
<!--         width="100%" height="100%" frameborder="0" allowfullscreen>      -->
<!-- </iframe>                                                                -->
<!-- ========================================================================= -->
<div class="douyin-embed-container" style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden;">
  <img src="${posterWebp}" alt="${game.cnTitle} 抖音视频预留展位" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter: brightness(0.68) contrast(1.05);" />
  
  <div style="position:relative; z-index:10; text-align:center; padding: 24px; max-width: 600px; background: rgba(10, 10, 10, 0.82); backdrop-filter: blur(12px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
    <!-- Douyin Brand Accents -->
    <div style="display:inline-flex; align-items:center; gap:8px; padding: 5px 16px; border-radius: 20px; background: rgba(255,255,255,0.08); margin-bottom: 16px; border: 1px solid rgba(0,242,254,0.4);">
      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#00f2fe; box-shadow: 0 0 10px #00f2fe;"></span>
      <span style="color:#fff; font-size:12px; font-weight:800; letter-spacing:0.15em;">DOUYIN VIDEO · 抖音视频展位预留</span>
      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#fe0979; box-shadow: 0 0 10px #fe0979;"></span>
    </div>

    <h3 style="color:#fff; font-size:22px; font-weight:800; margin:0 0 10px; letter-spacing:0.05em;">
      ${game.cnTitle} · 官方实机演示预告
    </h3>
    <p style="color:rgba(255,255,255,0.75); font-size:14px; line-height:1.6; margin:0 0 18px;">
      本区域已专门预留用于嵌入抖音短视频 / 官方实机高燃集锦。视频链接制作完毕后，即可直接无缝接入全屏播放。
    </p>

    <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
      <a href="${game.steamUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:8px; background:#fff; color:#000; padding:10px 20px; border-radius:6px; font-weight:700; font-size:13px; text-decoration:none;">
        <span>前往 STEAM 官方详情</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
      </a>
      <a href="${game.fitgirlUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.12); color:#fff; padding:10px 20px; border-radius:6px; font-weight:700; font-size:13px; text-decoration:none; border:1px solid rgba(255,255,255,0.2);">
        <span>FitGirl Repack 官方页面</span>
      </a>
    </div>
  </div>
</div>
`;

  // Replace the video element inside videoplayer-video with douyinPlaceholderHtml
  html = html.replace(/<video src="[^"]*" playsinline="true" data-videoplayer="video" class="videoplayer-vieo-comp"><\/video>/,
    `<div class="videoplayer-vieo-comp" style="width:100%; height:100%;">${douyinPlaceholderHtml}</div>`);

  // 1.8 Update Credits Main Cover Image
  html = html.replace(/<img src="https:\/\/cdn\.prod\.website-files\.com\/673306db3b111afa559bc378\/678fa9c8125c27c780a015e7_project_x\.webp"[^>]*class="credit-main-img"\/>/,
    `<img src="${coverWebp}" loading="lazy" alt="${game.cnTitle}" class="credit-main-img" style="object-fit:cover; width:100%; border-radius:4px; box-shadow: 0 12px 35px rgba(0,0,0,0.18);"/>`);

  // 1.9 Credit Grid Replacement (Chinese Synopsis + Hardware Specs with Highlighted RAM)
  const creditGridContent = `
<div data-credit-grid="" id="w-node-e3e1edc3-c492-a891-c5dc-00cdf01ca074-30953c00" class="credit-grid-w">
  <!-- Game Metadata Row -->
  <div class="credit-row-w main" style="background:#0a0a0a; border-radius: 4px; margin-bottom: 24px;">
    <div class="credit-row w-dyn-list" style="width:100%;">
      <div role="list" class="credit-grid w-dyn-items" style="display:flex; justify-content:space-between; flex-wrap:wrap; padding: 20px 26px; gap: 16px;">
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">GAME / 游戏全称</div>
          <div class="credit-name" style="color:#fff; font-size:17px; font-weight:800; white-space:nowrap !important; word-break:keep-all !important; letter-spacing:0.04em !important;">${game.cnTitle}</div>
          <div style="color:rgba(255,255,255,0.7); font-size:13px; margin-top:2px; white-space:nowrap !important;">${game.title}</div>
        </div>
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">DEVELOPER / 制作开发</div>
          <div class="credit-name" style="color:#fff; font-size:15px; font-weight:700; white-space:nowrap !important; word-break:keep-all !important;">${game.developer}</div>
        </div>
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">PUBLISHER / 全球发行</div>
          <div class="credit-name" style="color:#fff; font-size:15px; font-weight:700; white-space:nowrap !important; word-break:keep-all !important;">${game.publisher}</div>
        </div>
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">RELEASE / 发行时间</div>
          <div class="credit-name" style="color:#fff; font-size:15px; font-weight:700; white-space:nowrap !important; word-break:keep-all !important;">${game.releaseDate}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Chinese Synopsis & Story Row -->
  <div class="credit-row-w border-dash" style="margin-bottom: 24px; padding: 22px 26px; border: 1px dashed rgba(0,0,0,0.25); border-radius: 4px; background: rgba(0,0,0,0.015);">
    <div class="roll-cont-eyeb parish mb-0 credit-row-title" style="font-size: 13px; font-weight: 800; letter-spacing: 0.18em; color: #ffffff !important; margin-bottom: 16px; border-radius: 2px;">游戏深度介绍 / SYNOPSIS &amp; FEATURES</div>
    <div style="line-height: 1.85; color: #222; font-size: 15px;">
      <p style="margin: 0 0 12px; font-weight: 800; font-size: 16px; color: #000; border-left: 3px solid #000; padding-left: 12px;">
        ${game.shortIntro}
      </p>
      <p style="margin: 0; color: #444; font-size: 14.5px; text-align: justify; line-height: 1.8;">
        ${game.fullIntro}
      </p>
    </div>
  </div>

  <!-- Hardware System Requirements & Memory (所需内存和配置重点突出) -->
  <div class="credit-row-w border-dash" style="margin-bottom: 24px; padding: 22px 26px; border: 1px dashed rgba(0,0,0,0.25); border-radius: 4px; background: rgba(0,0,0,0.015);">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom: 16px; gap:8px;">
      <div class="roll-cont-eyeb parish mb-0 credit-row-title" style="font-size: 13px; font-weight: 800; letter-spacing: 0.18em; color: #ffffff !important; border-radius: 2px; margin-bottom:0;">系统配置需求与所需内存 / SYSTEM REQUIREMENTS</div>
      <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #666; text-transform: uppercase;">64 位操作系统架构支持 (64-BIT OS ARCHITECTURE)</div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 20px;">
      <!-- Minimum Requirements -->
      <div style="border: 1px dashed rgba(0,0,0,0.2); border-radius: 6px; padding: 20px 22px; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
        <div style="font-weight: 800; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; color: #000; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 8px;">
          <span>最低配置 (MINIMUM)</span>
          <span style="font-size: 11px; background: #eaeaea; color:#333; padding: 3px 9px; border-radius: 3px; font-weight: 800;">基础流畅运行</span>
        </div>
        <table style="width: 100%; font-size: 13.5px; border-collapse: collapse; line-height: 1.75;">
          <tr>
            <td style="color: #666; width: 95px; padding: 6px 0; vertical-align: top; font-weight: 700;">★ 所需内存</td>
            <td style="color: #000; padding: 6px 0; font-weight: 800;">
              <span style="background: rgba(0,0,0,0.08); padding: 3px 9px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15); font-size: 14px; color: #000;">
                ${game.specs.min.ram}
              </span>
            </td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">存储空间</td>
            <td style="color: #222; padding: 6px 0; font-weight: 700;">${game.specs.min.storage}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">处理器</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.min.cpu}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">显卡</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.min.gpu}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">操作系统</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.min.os}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">DirectX</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.min.directx}</td>
          </tr>
        </table>
      </div>

      <!-- Recommended Requirements -->
      <div style="border: 2px solid #000; border-radius: 6px; padding: 20px 22px; background: #fafafa; box-shadow: 0 6px 20px rgba(0,0,0,0.06);">
        <div style="font-weight: 800; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; color: #000; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
          <span>推荐配置 (RECOMMENDED)</span>
          <span style="font-size: 11px; background: #000; color: #fff; padding: 3px 9px; border-radius: 3px; font-weight: 800;">高清极佳画质</span>
        </div>
        <table style="width: 100%; font-size: 13.5px; border-collapse: collapse; line-height: 1.75;">
          <tr>
            <td style="color: #000; width: 95px; padding: 6px 0; vertical-align: top; font-weight: 800;">★ 所需内存</td>
            <td style="color: #000; padding: 6px 0; font-weight: 800;">
              <span style="background: #000; color: #fff; padding: 3px 10px; border-radius: 4px; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                ${game.specs.rec.ram}
              </span>
            </td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">存储空间</td>
            <td style="color: #000; padding: 6px 0; font-weight: 800;">${game.specs.rec.storage}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">处理器</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.rec.cpu}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">显卡</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.rec.gpu}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">操作系统</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.rec.os}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0; vertical-align: top; font-weight: 600;">DirectX</td>
            <td style="color: #222; padding: 6px 0;">${game.specs.rec.directx}</td>
          </tr>
        </table>
      </div>
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
    <a href="/work" style="color:#000; text-decoration:none; font-weight:700; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; display:flex; align-items:center; gap:8px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      <span>返回全部游戏档案库 (ALL WORK)</span>
    </a>
  </div>
</div>
`;

  const gridStart = html.indexOf('<div data-credit-grid=""');
  const gridEnd = findClosingDiv(html, gridStart);
  if (gridStart !== -1 && gridEnd !== -1) {
    html = html.substring(0, gridStart) + creditGridContent.trim() + html.substring(gridEnd);
  }

  // 1.10 Update Footage Gallery Images with WebP Screenshots
  const screenshots = getScreenshots(game.folder);
  if (screenshots.length > 0) {
    let ssIdx = 0;
    html = html.replace(/<img\s+src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+"[^>]*class="cs-footage-img"[^>]*\/>/g, (match) => {
      const currentSs = screenshots[ssIdx % screenshots.length];
      ssIdx++;
      return `<img src="${currentSs}" loading="eager" draggable="false" data-imgParallax="1" alt="${game.cnTitle} 实机高清截图 ${ssIdx}" class="cs-footage-img" style="object-fit:cover; width:100%; height:100%;"/>`;
    });
  }

  // 1.11 Update Next Project Ticket
  const nextGame = allGames[(gameIdx + 1) % allGames.length];
  html = html.replace(/<div class="previousnext-he">ALL WORK<\/div>/, `<div class="previousnext-he">ALL WORK (全部游戏)</div>`);
  html = html.replace(/<div class="previousnext-he">Savoy<\/div>/g, 
    `<div class="previousnext-he">${nextGame.cnTitle}</div>\n<div style="font-size: 1.15rem; color: rgba(255,255,255,0.8); margin-top: 6px; font-weight: 700;">${nextGame.title}</div>`);
  
  html = html.replace(/<img\s+src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+"[^>]*class="prevnext-img"[^>]*\/>/g,
    `<img src="/games/${nextGame.folder}/cover.webp" loading="lazy" alt="${nextGame.cnTitle}" class="prevnext-img" style="object-fit:cover; width:100%; height:100%;"/>`);

  html = html.replace(/href="\/films\/[a-z0-9-]+"/g, (match) => {
    const m = match.match(/href="\/films\/([a-z0-9-]+)"/);
    if (m && allGames.some(g => g.slug === m[1])) return match;
    return `href="/films/${nextGame.slug}"`;
  });

  // 1.12 Footer Branding
  html = html.replace(/<div data-a="item">PRODUCTION<\/div>/g, '<div data-a="item">PARALLEL SPACE</div>');
  html = html.replace(/<div data-a="item">DOCUMENTARY<\/div>/g, '<div data-a="item">GAME ARCHIVE</div>');
  html = html.replace(/<div data-a="item" class="text-block-13">FILM TV<\/div>/g, '<div data-a="item" class="text-block-13">FITGIRL POPULAR</div>');
  html = html.replace(/©2024\. SIENA FILM FOUNDATION\./g, '©2026. STEM 的平行空间 (STEM PARALLEL SPACE).');
  html = html.replace(/@siena\. All Rights Reserved/gi, '@STEM. All Rights Reserved');
  html = html.replace(/LEE@SiENA\.film/gi, 'CONTACT@STEM-SPACE.COM');
  html = html.replace(/PRESS@SiENA\.FILM/gi, 'PRESS@STEM-SPACE.COM');

  return html;
}

// Generate all film pages
const filmsDir = path.join(__dirname, 'films');
fs.mkdirSync(filmsDir, { recursive: true });

gamesConfig.forEach((game, idx) => {
  const content = generateExplorationHtml(game, idx, gamesConfig);
  const outPath = path.join(filmsDir, `${game.slug}.html`);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`✓ Generated ${outPath}`);

  const outPathFolder = path.join(filmsDir, `${game.folder}.html`);
  fs.writeFileSync(outPathFolder, content, 'utf8');
});

// Also generate my-project-x.html mapped to black-myth-wukong
const projectXContent = generateExplorationHtml(gamesConfig[0], 0, gamesConfig);
fs.writeFileSync(path.join(filmsDir, 'my-project-x.html'), projectXContent, 'utf8');
console.log('✓ Generated films/my-project-x.html (mapped to 黑神话：悟空)');

// =========================================================================
// 2. GENERATE WORK PAGE (index.html & work.html)
// =========================================================================
let workHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Update Logo
workHtml = workHtml.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 131 63" width="100%" class="svg-logo">[\s\S]*?<\/svg>/, logoSvg);

// Replace the 8 cards inside .work-roll-coll
const oldSlugs = [
  'woman-simulator',
  'entity-the-black-day',
  'kingdom-rush-6-genesis',
  'garfield-escape-from-monday',
  'alaska-gold-fever',
  'nocturne',
  'le-mans-ultimate',
  'pioneers-of-pagonia'
];

oldSlugs.forEach((oldSlug, idx) => {
  const newGame = gamesConfig[idx];
  if (!newGame) return;

  const itemStart = workHtml.indexOf(`data-url="${oldSlug}"`);
  if (itemStart === -1) return;
  const nextItemStart = workHtml.indexOf('data-url="', itemStart + 20);
  const itemEnd = nextItemStart !== -1 ? nextItemStart : workHtml.indexOf('</figure>', itemStart);

  let itemChunk = workHtml.substring(itemStart, itemEnd);

  // Replace slug in data-url
  itemChunk = itemChunk.replace(`data-url="${oldSlug}"`, `data-url="${newGame.slug}"`);

  // Replace hidden link
  itemChunk = itemChunk.replace(/href="\/films\/[^"]*"/, `href="/films/${newGame.slug}"`);

  // Replace eyebrow & Title in flip-w
  itemChunk = itemChunk.replaceAll(/<div class="roll-cont-eyeb parish work">[^<]+<\/div>/g, 
    `<div class="roll-cont-eyeb parish work">${newGame.category}</div>`);
  itemChunk = itemChunk.replaceAll(/<h2 class="roll-cont-he work">[^<]+<\/h2>/g, 
    `<h2 class="roll-cont-he work">${newGame.cnTitle}</h2>`);

  // Replace YEAR
  itemChunk = itemChunk.replace(/(<div>YEAR<\/div>\s*<div>)[^<]+(<\/div>)/g, `$1${newGame.year}$2`);

  // Replace CATEGORY
  itemChunk = itemChunk.replace(/(<div>CATEGORY<\/div>\s*<div[^>]*>)[^<]+(<\/div>)/gi, `$1${newGame.genre}$2`);

  // Replace cover image in work card
  itemChunk = itemChunk.replace(/src="\/games\/[^"]*"/g, `src="/games/${newGame.folder}/cover.webp"`);
  itemChunk = itemChunk.replace(/srcset="\/games\/[^"]*"/g, `srcset="/games/${newGame.folder}/cover.webp 1200w"`);

  workHtml = workHtml.substring(0, itemStart) + itemChunk + workHtml.substring(itemEnd);
});

// Update Menu items in workHtml
oldSlugs.forEach((oldSlug, idx) => {
  const newGame = gamesConfig[idx];
  if (!newGame) return;

  const itemStart = workHtml.indexOf(`data-id="${oldSlug}"`);
  if (itemStart === -1) return;
  const nextItemStart = workHtml.indexOf('data-id="', itemStart + 20);
  const itemEnd = nextItemStart !== -1 ? nextItemStart : workHtml.indexOf('</defs>', itemStart);

  let itemChunk = workHtml.substring(itemStart, itemEnd);
  itemChunk = itemChunk.replace(`data-id="${oldSlug}"`, `data-id="${newGame.slug}"`);
  itemChunk = itemChunk.replace(/href="\/films\/[^"]*"/g, `href="/films/${newGame.slug}"`);
  
  // Replace old film names in menu
  itemChunk = itemChunk.replace(/<div class="film-link-tx">[^<]+<\/div>/, `<div class="film-link-tx">${newGame.cnTitle}</div>`);

  workHtml = workHtml.substring(0, itemStart) + itemChunk + workHtml.substring(itemEnd);
});

fs.writeFileSync(path.join(__dirname, 'index.html'), workHtml, 'utf8');
fs.writeFileSync(path.join(__dirname, 'work.html'), workHtml, 'utf8');
console.log('✓ Updated index.html and work.html with all 8 FitGirl games!');

// =========================================================================
// 3. GENERATE HOME PAGE (home.html)
// =========================================================================
let homeHtml = fs.readFileSync(path.join(__dirname, 'home.html'), 'utf8');

// Update Logo
homeHtml = homeHtml.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 131 63" width="100%" class="svg-logo">[\s\S]*?<\/svg>/, logoSvg);

// Replace each item in .home-roll-coll
const oldHomeFolders = [
  '01-woman-simulator',
  '02-entity-the-black-day',
  '03-kingdom-rush-6-genesis',
  '04-garfield-escape-from-monday',
  '05-alaska-gold-fever',
  '06-nocturne',
  '07-le-mans-ultimate',
  '08-pioneers-of-pagonia'
];

oldHomeFolders.forEach((oldFolder, idx) => {
  const newGame = gamesConfig[idx];
  if (!newGame) return;

  const oldSlug = oldSlugs[idx];

  // Replace images
  homeHtml = homeHtml.replaceAll(`/games/${oldFolder}/cover.jpg`, `/games/${newGame.folder}/cover.webp`);
  homeHtml = homeHtml.replaceAll(`/games/${oldFolder}/cover.webp`, `/games/${newGame.folder}/cover.webp`);

  // Replace links
  homeHtml = homeHtml.replaceAll(`href="/films/${oldSlug}"`, `href="/films/${newGame.slug}"`);
  homeHtml = homeHtml.replaceAll(`href="/films/${oldFolder}"`, `href="/films/${newGame.slug}"`);
});

// Replace text titles in homeHtml
const oldHomeTitles = [
  'Woman Simulator',
  'Entity: The Black Day',
  'Kingdom Rush 6: Genesis',
  'Garfield: Escape from Monday',
  'Alaska Gold Fever',
  'Nocturne',
  'Le Mans Ultimate',
  'Pioneers of Pagonia'
];

oldHomeTitles.forEach((oldTitle, idx) => {
  const newGame = gamesConfig[idx];
  if (!newGame) return;

  // Replace <h2 class="roll-cont-he home">OldTitle</h2>
  homeHtml = homeHtml.replaceAll(`<h2 class="roll-cont-he home">${oldTitle}</h2>`,
    `<h2 class="roll-cont-he home" style="font-size: clamp(2.4rem, 4.5vw, 4.2rem);">${newGame.cnTitle}</h2>\n<div style="font-size:13px; opacity:0.8; letter-spacing:0.12em; text-transform:uppercase; margin-top:4px; font-weight:700;">${newGame.title}</div>`);

  // Replace old director with developer
  homeHtml = homeHtml.replaceAll(newGame.developer, newGame.developer);
});

fs.writeFileSync(path.join(__dirname, 'home.html'), homeHtml, 'utf8');
console.log('✓ Updated home.html with all 8 FitGirl games in 3D WebGL vertical reel!');

console.log('\n=== ALL PAGES REBUILT SUCCESSFULLY WITH FITGIRL TOP REPACKS ===');
