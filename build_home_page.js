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
    video: '/games/01-woman-simulator/videos/01_Trailer.mp4'
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
    video: '/games/02-entity-the-black-day/videos/01_Full_Release_Official_Trailer.mp4'
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
    video: '/games/03-kingdom-rush-6-genesis/videos/01_Kingdom_Rush_Genesis_Trailer.mp4'
  },
  {
    id: 'garfield-escape-from-monday',
    slug: '04-garfield-escape-from-monday',
    title: 'Garfield - Escape from Monday',
    cnTitle: '加菲猫：逃离星期一',
    category: 'Adventure',
    cnCategory: '动作冒险',
    year: '2026',
    duration: '85',
    developer: 'OSome Studio',
    publisher: 'Microids',
    headline: 'Wake up Garfield from this nightmarish veggie filled 3D Platformer!',
    steam: 'https://store.steampowered.com/app/3932790/',
    cover: '/games/04-garfield-escape-from-monday/cover.jpg',
    video: '/games/04-garfield-escape-from-monday/videos/01_Garfield_-_Escape_from_Monday_-_Launch_Trailer.mp4'
  },
  {
    id: 'alaska-gold-fever',
    slug: '05-alaska-gold-fever',
    title: 'Alaska Gold Fever',
    cnTitle: '阿拉斯加淘金热',
    category: 'Survival Sim',
    cnCategory: '荒野生存淘金',
    year: '2026',
    duration: '120',
    developer: 'Baked Games',
    publisher: 'Baked Games S.A.',
    headline: 'Step into the role of a gold prospector during the Alaskan gold rush.',
    steam: 'https://store.steampowered.com/app/1674200/',
    cover: '/games/05-alaska-gold-fever/cover.jpg',
    video: '/games/05-alaska-gold-fever/videos/01_Alaska_Gold_Fever_-_Bandits_DLC_Release_Trailer.mp4'
  },
  {
    id: 'nocturne',
    slug: '06-nocturne',
    title: 'Nocturne',
    cnTitle: '夜曲',
    category: 'Rhythm RPG',
    cnCategory: '节奏角色扮演',
    year: '2026',
    duration: '75',
    developer: 'Pracy Studios',
    publisher: 'Pracy Studios',
    headline: 'The afterlife is now digital. A genre-defying RPG with rhythm combat.',
    steam: 'https://store.steampowered.com/app/1374860/',
    cover: '/games/06-nocturne/cover.jpg',
    video: '/games/06-nocturne/videos/01_Main_Trailer.mp4'
  },
  {
    id: 'le-mans-ultimate',
    slug: '07-le-mans-ultimate',
    title: 'Le Mans Ultimate',
    cnTitle: '勒芒终极赛车',
    category: 'Racing Sim',
    cnCategory: '勒芒耐力赛模拟',
    year: '2025',
    duration: '140',
    developer: 'Studio 397',
    publisher: 'Studio 397',
    headline: 'Official game of the FIA World Endurance Championship and 24 Hours of Le Mans.',
    steam: 'https://store.steampowered.com/app/2399420/',
    cover: '/games/07-le-mans-ultimate/cover.jpg',
    video: '/games/07-le-mans-ultimate/videos/01_Bahrain_Hypercar_compilation_-_Gameplay.mp4'
  },
  {
    id: 'pioneers-of-pagonia',
    slug: '08-pioneers-of-pagonia',
    title: 'Pioneers of Pagonia',
    cnTitle: '帕格尼探险者',
    category: 'City Builder',
    cnCategory: '奇幻殖民建造',
    year: '2025',
    duration: '160',
    developer: 'Envision Entertainment',
    publisher: 'Envision Entertainment',
    headline: 'Lead your Pioneers across the isles of Pagonia and unite scattered tribes.',
    steam: 'https://store.steampowered.com/app/2155180/',
    cover: '/games/08-pioneers-of-pagonia/cover.jpg',
    video: '/games/08-pioneers-of-pagonia/videos/01_Pioneers_of_Pagonia_-_1_0_Release_Trailer__EN_.mp4'
  }
];

let html = fs.readFileSync('siena_home_raw.html', 'utf8');

// 1. Localize assets
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

// 2. Titles & Brand
html = html.replace(/<title>[^<]+<\/title>/, '<title>stem的平行空间 | 电影感游戏视觉档案库</title>');
html = html.replace(/content="Siena Film Foundation[^"]*"/g, 'content="stem的平行空间 - 电影感独立游戏展厅与媒体物料库"');

// 3. Remove GA
html = html.replace(/<script async="" src="https:\/\/www\.googletagmanager\.com[^"]*"><\/script>/g, '');
html = html.replace(/window\.dataLayer = window\.dataLayer[^;]+;[^\n<]+/g, '');

// 4. Logo replacement
const stemLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131 63" width="100%" class="svg-logo">
  <text x="65.5" y="38" text-anchor="middle" font-family="'NeueBrucke', 'Arial Black', sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="currentColor">STEM</text>
  <text x="65.5" y="55" text-anchor="middle" font-family="'NB International Regular', 'Arial', sans-serif" font-weight="600" font-size="8.5" letter-spacing="5" fill="currentColor">的 平 行 空 间</text>
</svg>`;
html = html.replace(/<svg[^>]*class="svg-logo"[^>]*>[\s\S]*?<\/svg>/, stemLogoSvg);

// 5. Replace original films in data-roll="item" and menus
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
  html = html.replaceAll(`data-id="${o.slug}"`, `data-id="${g.id}"`);
  html = html.replaceAll(`data-url="${o.slug}"`, `data-url="${g.id}"`);
  html = html.replaceAll(`href="/films/${o.slug}"`, `href="/films/${g.id}"`);
  html = html.replaceAll(o.title, g.title);
  if (o.slug === 'kafkas-last-trial') {
    html = html.replaceAll("Kafka&#x27;s Last Trial", g.title);
  }
  html = html.replaceAll(o.dir, g.developer);
  html = html.replaceAll('Leelu Dorit', g.publisher);
});

// Replace images inside data-roll="item" with our HD covers
games.forEach((g, i) => {
  // Find img inside the corresponding roll item
  const regex = new RegExp(`(<div[^>]*data-id="${g.id}"[^>]*>[\\s\\S]*?<img[^>]*src=")[^"]+("[^>]*>)`, 'g');
  html = html.replace(regex, `$1${g.cover}$2`);
});

// Replace all webp cdn image URLs with local game covers
const origPosters = [
  '678fa9d345ccec42ef578cb5_savoy',
  '678fa9b886f976d7dd959be9_moon-12-house',
  '678fa98717834571dbec6c7d_taboo',
  '678fa9760773bb8f8e025805_kafka',
  '678fa9c8125c27c780a015e7_project_x',
  '678fa9dc486e902b79a5e818_ana_maxim',
  '678fa98fd309db8934440ef4_outsider_freud',
  '678fa996720f4ef57545b796_by_any_means'
];

origPosters.forEach((hash, i) => {
  const g = games[i];
  const re = new RegExp(`https:\\/\\/cdn\\.prod\\.website-files\\.com\\/673306db3b111afa559bc378\\/${hash}[^"\\s]+`, 'g');
  html = html.replaceAll(re, g.cover);
});

fs.writeFileSync(path.join(__dirname, 'siena-clone', 'home.html'), html, 'utf8');
console.log('siena-clone/home.html built successfully.');
