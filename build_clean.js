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
      if (depth === 0) {
        return m.index + m[0].length;
      }
    } else {
      depth++;
    }
  }
  return -1;
}

const rawHtml = fs.readFileSync('siena_film_raw.html', 'utf8');
const steamDetails = JSON.parse(fs.readFileSync('steam_games_details.json', 'utf8'));

// Import games definition from build_exploration_pages.js
const { spawnSync } = require('child_process');

// Helper to get screenshot list for a game
function getScreenshots(folder) {
  const ssDir = path.join('siena-clone/games', folder, 'screenshots');
  if (!fs.existsSync(ssDir)) return [];
  const files = fs.readdirSync(ssDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
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

// Read games list from build_exploration_pages.js
const fullScript = fs.readFileSync('build_exploration_pages.js', 'utf8');
const gamesMatch = fullScript.match(/const games = (\[[\s\S]*?\]);\s*\/\//);
const games = eval(gamesMatch[1]);

function generateCleanCaseHtml(game, gameIdx, allGames) {
  let html = rawHtml;

  // 1. Page title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>STEM 的平行空间 | ${game.title} (${game.cnTitle}) - 游戏档案与系统配置</title>`);

  // 2. Localize all styles & scripts
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

  // 3. Update Taxi View data-case
  html = html.replace(/data-case="my-project-x"/g, `data-case="${game.slug}"`);

  // 4. Update Navigation Logo
  html = html.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" fill="none" viewBox="0 0 131 63" width="100%" class="svg-logo">[\s\S]*?<\/svg>/, logoSvg);

  // 5. Update Navigation Menu Film Titles
  allGames.forEach((g, idx) => {
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
    if (oldFilms[idx]) {
      html = html.replace(new RegExp(oldFilms[idx], 'g'), g.title);
    }
  });

  // 6. Update Hero Section
  html = html.replace(/<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">[\s\S]*?<\/div>/, 
    `<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">${game.category}</div>`);
  html = html.replace(/<h1 data-cs="title" class="cs-title">[\s\S]*?<\/h1>/, 
    `<h1 data-cs="title" class="cs-title">${game.title}</h1>\n<div class="roll-cont-eyeb parish mb-0" style="font-size: 1.6rem; letter-spacing: 0.15em; color: rgba(0,0,0,0.72); margin-top: 14px; font-weight: 700; text-transform: uppercase;">${game.cnTitle}</div>`);

  // 7. Update Video Player Section (#second)
  let videoSrc = game.video;
  if (!fs.existsSync(path.join('siena-clone', videoSrc))) {
    videoSrc = '/games/08-pioneers-of-pagonia/videos/01_Pioneers_of_Pagonia_-_1_0_Release_Trailer__EN_.mp4';
  }
  html = html.replace(/<video src="[^"]*" playsinline="true" data-videoplayer="video" class="videoplayer-vieo-comp"><\/video>/,
    `<video src="${videoSrc}" playsinline="true" data-videoplayer="video" class="videoplayer-vieo-comp"></video>`);
  html = html.replace(/<img src="https:\/\/cdn\.prod\.website-files\.com\/673306db3b111afa559bc378\/67923c1fa550c616a38131b9_project\.jpg"[^>]*class="image-2"\/>/,
    `<img src="${game.poster}" loading="eager" alt="${game.title}" class="image-2" style="object-fit:cover; width:100%; height:100%;"/>`);

  // 8. Update Credits (Developer + Cover image)
  html = html.replace(/<div class="roll-cont-eyeb parish">DIRECTOR<\/div><div class="credit-name">Limor Pinhasov<\/div>/,
    `<div class="roll-cont-eyeb parish">DEVELOPER / 开发商</div><div class="credit-name">${game.developer}</div>`);
  
  html = html.replace(/<img src="https:\/\/cdn\.prod\.website-files\.com\/673306db3b111afa559bc378\/678fa9c8125c27c780a015e7_project_x\.webp"[^>]*class="credit-main-img"\/>/,
    `<img src="${game.cover}" loading="lazy" alt="${game.title}" class="credit-main-img" style="object-fit:cover; width:100%; border-radius:4px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);"/>`);

  // 9. Exact Credit Grid Replacement (Specs + Chinese Synopsis)
  const newCreditGridContent = `
<div data-credit-grid="" id="w-node-e3e1edc3-c492-a891-c5dc-00cdf01ca074-30953c00" class="credit-grid-w">
  <!-- Game Metadata Row -->
  <div class="credit-row-w main" style="background:#0a0a0a; border-radius: 4px; margin-bottom: 24px;">
    <div class="credit-row w-dyn-list" style="width:100%;">
      <div role="list" class="credit-grid w-dyn-items" style="display:flex; justify-content:space-between; flex-wrap:wrap; padding: 18px 24px; gap: 16px;">
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">GAME / 游戏全称</div>
          <div class="credit-name" style="color:#fff; font-size:18px; font-weight:700;">${game.title}</div>
          <div style="color:rgba(255,255,255,0.7); font-size:13px; margin-top:2px;">${game.cnTitle}</div>
        </div>
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">DEVELOPER / 开发团队</div>
          <div class="credit-name" style="color:#fff; font-size:16px;">${game.developer}</div>
        </div>
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">PUBLISHER / 发行商</div>
          <div class="credit-name" style="color:#fff; font-size:16px;">${game.publisher}</div>
        </div>
        <div role="listitem" class="credit-text dash white w-dyn-item" style="border:none;">
          <div class="roll-cont-eyeb parish mb-0" style="color:#aaa; font-size:11px; letter-spacing:0.12em;">RELEASE / 发行时间</div>
          <div class="credit-name" style="color:#fff; font-size:16px;">${game.releaseDate}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Chinese Synopsis Row -->
  <div class="credit-row-w border-dash" style="margin-bottom: 24px; padding: 20px 24px; border: 1px dashed rgba(0,0,0,0.25); border-radius: 4px; background: rgba(0,0,0,0.015);">
    <div class="roll-cont-eyeb parish mb-0 credit-row-title" style="font-size: 13px; font-weight: 800; letter-spacing: 0.18em; color: #ffffff !important; margin-bottom: 16px; border-radius: 2px;">游戏深度介绍 / SYNOPSIS &amp; FEATURES</div>
    <div style="line-height: 1.85; color: #222; font-size: 15px;">
      <p style="margin: 0 0 12px; font-weight: 700; font-size: 16px; color: #000; border-left: 3px solid #000; padding-left: 12px;">
        ${game.shortIntro}
      </p>
      <p style="margin: 0; color: #444; font-size: 14.5px; text-align: justify;">
        ${game.fullIntro}
      </p>
    </div>
  </div>

  <!-- Hardware System Requirements & Memory Row -->
  <div class="credit-row-w border-dash" style="margin-bottom: 24px; padding: 20px 24px; border: 1px dashed rgba(0,0,0,0.25); border-radius: 4px; background: rgba(0,0,0,0.015);">
    <div class="roll-cont-eyeb parish mb-0 credit-row-title" style="font-size: 13px; font-weight: 800; letter-spacing: 0.18em; color: #ffffff !important; margin-bottom: 14px; border-radius: 2px;">系统配置需求与所需内存 / SYSTEM REQUIREMENTS</div>
    <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #666; text-transform: uppercase; margin-bottom: 16px; text-align: right;">64 位操作系统架构支持 (64-BIT OS ARCHITECTURE)</div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 20px;">
      <!-- Minimum Requirements -->
      <div style="border: 1px dashed rgba(0,0,0,0.2); border-radius: 6px; padding: 18px 20px; background: #fff;">
        <div style="font-weight: 800; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; color: #000; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 8px;">
          <span>最低配置 (MINIMUM)</span>
          <span style="font-size: 11px; background: #eaeaea; color:#333; padding: 2px 8px; border-radius: 3px; font-weight: 700;">基础流畅运行</span>
        </div>
        <table style="width: 100%; font-size: 13.5px; border-collapse: collapse; line-height: 1.7;">
          <tr>
            <td style="color: #777; width: 85px; padding: 5px 0; vertical-align: top; font-weight: 600;">所需内存</td>
            <td style="color: #000; padding: 5px 0; font-weight: 800;"><span style="background: rgba(0,0,0,0.08); padding: 2px 7px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.1);">${game.specs.min.ram}</span></td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">存储空间</td>
            <td style="color: #222; padding: 5px 0; font-weight: 700;">${game.specs.min.storage}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">处理器</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.min.cpu}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">显卡</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.min.gpu}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">操作系统</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.min.os}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">DirectX</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.min.directx}</td>
          </tr>
        </table>
      </div>

      <!-- Recommended Requirements -->
      <div style="border: 1px dashed rgba(0,0,0,0.3); border-radius: 6px; padding: 18px 20px; background: #fafafa;">
        <div style="font-weight: 800; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; color: #000; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 8px;">
          <span>推荐配置 (RECOMMENDED)</span>
          <span style="font-size: 11px; background: #000; color: #fff; padding: 2px 8px; border-radius: 3px; font-weight: 700;">高清极佳画质</span>
        </div>
        <table style="width: 100%; font-size: 13.5px; border-collapse: collapse; line-height: 1.7;">
          <tr>
            <td style="color: #777; width: 85px; padding: 5px 0; vertical-align: top; font-weight: 600;">所需内存</td>
            <td style="color: #000; padding: 5px 0; font-weight: 800;"><span style="background: #000; color:#fff; padding: 2px 7px; border-radius: 3px;">${game.specs.rec.ram}</span></td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">存储空间</td>
            <td style="color: #222; padding: 5px 0; font-weight: 700;">${game.specs.rec.storage}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">处理器</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.rec.cpu}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">显卡</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.rec.gpu}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">操作系统</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.rec.os}</td>
          </tr>
          <tr>
            <td style="color: #777; padding: 5px 0; vertical-align: top; font-weight: 600;">DirectX</td>
            <td style="color: #222; padding: 5px 0;">${game.specs.rec.directx}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <!-- Store CTA and Actions Row -->
  <div class="credit-row-w border-dash" style="padding: 18px 24px; border: 1px dashed rgba(0,0,0,0.25); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; background: rgba(0,0,0,0.02);">
    <a href="${game.steam}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:10px; background:#000; color:#fff; padding:12px 24px; font-weight:700; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none; border-radius:4px; transition: background 0.2s ease;">
      <span>前往 STEAM 官方商店页面</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
    </a>
    <a href="/work" style="color:#000; text-decoration:none; font-weight:700; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; display:flex; align-items:center; gap:8px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      <span>返回全部游戏档案库 (ALL WORK)</span>
    </a>
  </div>
</div>
`;

  const gridStart = html.indexOf('<div data-credit-grid=""');
  const gridEnd = findClosingDiv(html, gridStart);
  if (gridStart !== -1 && gridEnd !== -1) {
    html = html.substring(0, gridStart) + newCreditGridContent.trim() + html.substring(gridEnd);
  }

  // 10. Update Footage Gallery Images (replace existing 28 images with actual game screenshots)
  const screenshots = getScreenshots(game.folder);
  if (screenshots.length > 0) {
    let ssIdx = 0;
    // Replace all images with class="cs-footage-img"
    html = html.replace(/<img\s+src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+"[^>]*class="cs-footage-img"[^>]*\/>/g, (match) => {
      const currentSs = screenshots[ssIdx % screenshots.length];
      ssIdx++;
      return `<img src="${currentSs}" loading="eager" draggable="false" data-imgParallax="1" alt="${game.title} 实机截图 ${ssIdx}" class="cs-footage-img" style="object-fit:cover; width:100%; height:100%;"/>`;
    });
  }

  // 11. Update Next Project Ticket
  const nextGame = allGames[(gameIdx + 1) % allGames.length];
  html = html.replace(/<div class="previousnext-he">ALL WORK<\/div>/, `<div class="previousnext-he">ALL WORK (全部游戏)</div>`);
  
  // Replace the next film ticket title, subtitle, cover image, and link
  html = html.replace(/<div class="previousnext-he">Savoy<\/div>/g, 
    `<div class="previousnext-he">${nextGame.title}</div>\n<div style="font-size: 1.15rem; color: rgba(255,255,255,0.8); margin-top: 6px; font-weight: 700;">${nextGame.cnTitle}</div>`);
  
  html = html.replace(/<img\s+src="https:\/\/cdn\.prod\.website-files\.com\/[^"]+"[^>]*class="prevnext-img"[^>]*\/>/g,
    `<img src="${nextGame.cover}" loading="lazy" alt="${nextGame.title}" class="prevnext-img" style="object-fit:cover; width:100%; height:100%;"/>`);

  html = html.replace(/href="\/films\/[a-z0-9-]+"/g, (match) => {
    // Keep internal links that match our games, or rewrite unknown to nextGame
    const m = match.match(/href="\/films\/([a-z0-9-]+)"/);
    if (m && allGames.some(g => g.slug === m[1])) return match;
    return `href="/films/${nextGame.slug}"`;
  });

  // 12. Footer Branding
  html = html.replace(/<div data-a="item">PRODUCTION<\/div>/g, '<div data-a="item">PARALLEL SPACE</div>');
  html = html.replace(/<div data-a="item">DOCUMENTARY<\/div>/g, '<div data-a="item">GAME ARCHIVE</div>');
  html = html.replace(/<div data-a="item" class="text-block-13">FILM TV<\/div>/g, '<div data-a="item" class="text-block-13">STEAM SHOWCASE</div>');
  html = html.replace(/©2024\. SIENA FILM FOUNDATION\./g, '©2026. STEM 的平行空间 (STEM PARALLEL SPACE).');
  html = html.replace(/@siena\. All Rights Reserved/gi, '@STEM. All Rights Reserved');
  html = html.replace(/LEE@SiENA\.film/gi, 'CONTACT@STEM-SPACE.COM');
  html = html.replace(/PRESS@SiENA\.FILM/gi, 'PRESS@STEM-SPACE.COM');

  return html;
}

// Generate all pages
const filmsDir = path.join('siena-clone', 'films');
games.forEach((g, idx) => {
  const content = generateCleanCaseHtml(g, idx, games);
  const outPath = path.join(filmsDir, `${g.slug}.html`);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`✓ Generated ${outPath}`);

  const outPathPrefixed = path.join(filmsDir, `${g.folder}.html`);
  fs.writeFileSync(outPathPrefixed, content, 'utf8');
});

// Also create my-project-x.html mapped to alaska-gold-fever
const projectXGame = games.find(g => g.slug === 'alaska-gold-fever') || games[0];
const projectXIdx = games.indexOf(projectXGame);
const projectXContent = generateCleanCaseHtml(projectXGame, projectXIdx, games);
fs.writeFileSync(path.join(filmsDir, 'my-project-x.html'), projectXContent, 'utf8');
console.log('✓ Generated siena-clone/films/my-project-x.html');

console.log('All exploration pages generated cleanly!');
