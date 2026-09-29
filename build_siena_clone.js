const fs = require('fs');
const path = require('path');

const games = [
  {
    id: 'woman-simulator',
    slug: '01-woman-simulator',
    title: 'Woman Simulator',
    cnTitle: '女性模拟器',
    category: 'Simulation',
    cnCategory: '生活模拟',
    year: '2026',
    duration: '105',
    developer: 'Sebasa Games',
    publisher: 'Sebasa Games',
    headline: 'Experience life as a woman - full immersion into everyday chaos!',
    steam: 'https://store.steampowered.com/app/4072240/',
    cover: '/games/01-woman-simulator/cover.jpg',
    video: '/games/01-woman-simulator/videos/01_Trailer.mp4',
    screenshotCount: 11
  },
  {
    id: 'entity-the-black-day',
    slug: '02-entity-the-black-day',
    title: 'ENTITY: THE BLACK DAY',
    cnTitle: '实体：黑暗之日',
    category: 'Action Horror',
    cnCategory: '动作生存惊悚',
    year: '2026',
    duration: '130',
    developer: 'ASD Games Studio',
    publisher: 'ASD Games © 2026',
    headline: 'A special forces operative uncovers a hidden underground virus lab.',
    steam: 'https://store.steampowered.com/app/2517220/',
    cover: '/games/02-entity-the-black-day/cover.jpg',
    video: '',
    screenshotCount: 20
  },
  {
    id: 'kingdom-rush-6-genesis',
    slug: '03-kingdom-rush-6-genesis',
    title: 'Kingdom Rush 6: Genesis',
    cnTitle: '王国保卫战6：起源 TD',
    category: 'Strategy TD',
    cnCategory: '策略塔防',
    year: '2026',
    duration: '90',
    developer: 'Ironhide Game Studio',
    publisher: 'Ironhide Game Studio',
    headline: 'Command heroes and build towers to stop Vez’nan’s corruption!',
    steam: 'https://store.steampowered.com/app/4259190/',
    cover: '/games/03-kingdom-rush-6-genesis/cover.jpg',
    video: '',
    screenshotCount: 9
  },
  {
    id: 'garfield-escape-from-monday',
    slug: '04-garfield-escape-from-monday',
    title: 'Garfield - Escape from Monday',
    cnTitle: '加菲猫：逃离星期一',
    category: '3D Platformer',
    cnCategory: '3D平台冒险',
    year: '2026',
    duration: '75',
    developer: 'OSome Studio',
    publisher: 'Microids',
    headline: 'Wake up Garfield from this nightmarish veggie filled 3D world!',
    steam: 'https://store.steampowered.com/app/3932790/',
    cover: '/games/04-garfield-escape-from-monday/cover.jpg',
    video: '',
    screenshotCount: 6
  },
  {
    id: 'alaska-gold-fever',
    slug: '05-alaska-gold-fever',
    title: 'Alaska Gold Fever',
    cnTitle: '阿拉斯加淘金热',
    category: 'Survival RPG',
    cnCategory: '淘金模拟',
    year: '2026',
    duration: '120',
    developer: 'Baked Games',
    publisher: 'Baked Games S.A.',
    headline: 'Step into the Alaskan gold rush and build your mining empire from scratch.',
    steam: 'https://store.steampowered.com/app/1674200/',
    cover: '/games/05-alaska-gold-fever/cover.jpg',
    video: '',
    screenshotCount: 15
  },
  {
    id: 'nocturne',
    slug: '06-nocturne',
    title: 'Nocturne',
    cnTitle: '夜曲',
    category: 'Rhythm RPG',
    cnCategory: '音律战斗 RPG',
    year: '2026',
    duration: '150',
    developer: 'Pracy Studios',
    publisher: 'Pracy Studios',
    headline: 'The afterlife is now digital with genre-defying rhythm combat.',
    steam: 'https://store.steampowered.com/app/1374860/',
    cover: '/games/06-nocturne/cover.jpg',
    video: '',
    screenshotCount: 12
  },
  {
    id: 'le-mans-ultimate',
    slug: '07-le-mans-ultimate',
    title: 'Le Mans Ultimate',
    cnTitle: '勒芒终极赛车',
    category: 'Racing Sim',
    cnCategory: '官方耐力赛车',
    year: '2025',
    duration: '180',
    developer: 'Studio 397',
    publisher: 'Studio 397',
    headline: 'Race the latest Hypercars on laser-scanned circuits in 24 Hours of Le Mans.',
    steam: 'https://store.steampowered.com/app/2399420/',
    cover: '/games/07-le-mans-ultimate/cover.jpg',
    video: '',
    screenshotCount: 30
  },
  {
    id: 'pioneers-of-pagonia',
    slug: '08-pioneers-of-pagonia',
    title: 'Pioneers of Pagonia',
    cnTitle: '帕格尼探险者',
    category: 'City Builder',
    cnCategory: '奇幻殖民建造',
    year: '2025',
    duration: '135',
    developer: 'Envision Entertainment',
    publisher: 'Envision Entertainment',
    headline: 'Rebuild hope across the isles of Pagonia and discover the history of your people.',
    steam: 'https://store.steampowered.com/app/2155180/',
    cover: '/games/08-pioneers-of-pagonia/cover.jpg',
    video: '/games/08-pioneers-of-pagonia/videos/01_Pioneers_of_Pagonia_-_1_0_Release_Trailer__EN_.mp4',
    screenshotCount: 16
  }
];

let html = fs.readFileSync('siena_work_raw.html', 'utf8');

// 1. 本地化资源链接
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/6728a72e769070a603d43c13\/css\/siena-work-space\.webflow\.[a-z0-9]+\.min\.css/g, '/styles/webflow.css');
html = html.replace(/https:\/\/siena-film-foundation\.vercel\.app\/styles\/out\.css/g, '/styles/out.css');
html = html.replace(/https:\/\/siena-film-foundation\.vercel\.app\/styles\/main\.css/g, '/styles/main.css');
html = html.replace(/http:\/\/localhost:8000\/styles\/main\.css/g, '/styles/main.css');
html = html.replace(/http:\/\/localhost:8000\/styles\/out\.css/g, '/styles/out.css');
html = html.replace(/https:\/\/siena-film-foundation\.vercel\.app\/app\.js/g, '/scripts/app.js');
html = html.replace(/http:\/\/localhost:8000\/app\.js/g, '/scripts/app.js');
html = html.replace(/https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-3\.5\.1\.min\.[a-z0-9]+\.js\?site=[a-z0-9]+/g, '/scripts/jquery.min.js');
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/6728a72e769070a603d43c13\/js\/webflow\.schunk\.[a-z0-9]+\.js/g, '/scripts/webflow.schunk.js');
html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/6728a72e769070a603d43c13\/js\/webflow\.[a-z0-9]+\.[a-z0-9]+\.js/g, '/scripts/webflow.main.js');
html = html.replace(/ integrity="[^"]*"/g, '');

// 2. 页面标题
html = html.replace(/<title>[^<]+<\/title>/, '<title>stem的平行空间 | 游戏视觉档案与媒体物料展厅</title>');
html = html.replace(/content="Siena Film Foundation[^"]*"/g, 'content="stem的平行空间 - 电影感独立游戏展厅与媒体物料库"');

// 3. 移除 Google Analytics
html = html.replace(/<script async="" src="https:\/\/www\.googletagmanager\.com[^"]*"><\/script>/g, '');
html = html.replace(/window\.dataLayer = window\.dataLayer[^;]+;[^\n<]+/g, '');

// 4. 原片列表信息
const orig = [
  { slug: 'savoy', title: 'Savoy', dir: 'Zohar Wagner' },
  { slug: 'moon-in-the-12th-house', title: 'Moon in the 12th House', dir: 'Dorit Hakim Kramer' },
  { slug: 'taboo', title: 'Taboo', dir: 'Shauly Melamed' },
  { slug: 'kafkas-last-trial', title: "Kafka's Last Trial", dir: 'Eliran Peled' },
  { slug: 'my-project-x', title: 'My Project X', dir: 'Limor Pinhasov' },
  { slug: 'ana-maxim', title: 'Ana Maxim', dir: 'Yoni Handelsman' },
  { slug: 'outsider-freud', title: 'Outsider Freud', dir: 'Yair Qedar' },
  { slug: 'by-any-means', title: 'By Any Means', dir: 'Elegance Bratton' }
];

orig.forEach((o, i) => {
  const g = games[i];

  // 替换链接与 ID
  html = html.replaceAll(`data-id="${o.slug}"`, `data-id="${g.id}"`);
  html = html.replaceAll(`data-url="${o.slug}"`, `data-url="${g.id}"`);
  html = html.replaceAll(`href="/films/${o.slug}"`, `href="${g.steam}" target="_blank" rel="noopener noreferrer"`);

  // 替换标题
  html = html.replaceAll(o.title, g.title);
  if (o.slug === 'kafkas-last-trial') {
    html = html.replaceAll("Kafka&#x27;s Last Trial", g.title);
  }

  // 替换导演与制片
  html = html.replaceAll(o.dir, g.developer);
  html = html.replaceAll('Leelu Dorit', g.publisher);
});

// 替换海报大图
const posterWebps = [
  '678fa9d345ccec42ef578cb5_savoy',
  '678fa9b886f976d7dd959be9_moon-12-house',
  '678fa9e14d1a274aa6fbb8f4_taboo',
  '678fa9ac0c9e0abc1e54b2f9_kafka',
  '678fa9c8125c27c780a015e7_project_x',
  '678fa99b36a990291b93f663_ana-maxim',
  '675eb98a528dc10719f7f0d0_freud-the-outsider',
  '6a6738b45e0d15e835b77ebf_BYANYMEANS_2024-04-28_EJA-02511_R2'
];

posterWebps.forEach((p, i) => {
  const g = games[i];
  const regex = new RegExp(`https:\\/\\/cdn\\.prod\\.website-files\\.com\\/[^"']+\\/${p}[^"']*`, 'g');
  html = html.replace(regex, g.cover);
});

// 替换菜单缩略小图
const menuWebps = [
  '675eb91e5fafbd1f37953c10_savoy',
  '67923c109ebd8d8a03e4960c_moon',
  '675eb903f604a7a856c87467_taboo',
  '67923c37a45465ae82ee3f8b_kafka',
  '67923c1fa550c616a38131b9_project',
  '67923c551123732db723b050_ana',
  '67923c44b96499e7828b3f02_freud',
  '6a57521a66d01829a49634b6_6a2904197526731405fcce8a_BYANYMEANS_2024-04-28_EJA-02511_R1'
];

menuWebps.forEach((m, i) => {
  const g = games[i];
  const regex = new RegExp(`https:\\/\\/cdn\\.prod\\.website-files\\.com\\/[^"']+\\/${m}[^"']*`, 'g');
  html = html.replace(regex, g.cover);
});

// 5. 替换 8 个 w-json 的截图数据
let jsonIndex = 0;
html = html.replace(/<script type="application\/json" class="w-json">([\s\S]*?)<\/script>/g, (match, jsonContent) => {
  if (jsonIndex < games.length) {
    const g = games[jsonIndex];
    jsonIndex++;
    const items = [];
    for (let s = 1; s <= g.screenshotCount; s++) {
      items.push({
        url: `/games/${g.slug}/screenshots/ss_${String(s).padStart(2, '0')}.jpg`,
        type: 'image'
      });
    }
    return `<script type="application/json" class="w-json">${JSON.stringify({ items, group: '' }, null, 2)}</script>`;
  }
  return match;
});

// 6. 品牌文字
html = html.replaceAll('<div class="about-menu-tx">SIENA</div>', '<div class="about-menu-tx">STEM</div>');
html = html.replaceAll('©2024. SIENA FILM FOUNDATION.', '©2026. STEM的平行空间 · GAME SHOWCASE');

// 7. 保存生成的文件
fs.writeFileSync('siena-clone/index.html', html, 'utf8');
console.log('Successfully updated siena-clone/index.html with all 8 games and screenshots!');
