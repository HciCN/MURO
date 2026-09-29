const fs = require('fs');
const path = require('path');

// Read raw film template
const rawHtml = fs.readFileSync('siena_film_raw.html', 'utf8');

// Load steam details
const steamDetails = JSON.parse(fs.readFileSync('steam_games_details.json', 'utf8'));

const games = [
  {
    slug: 'woman-simulator',
    folder: '01-woman-simulator',
    steamId: '4072240',
    title: 'Woman Simulator',
    cnTitle: '女性模拟器',
    category: 'Life Simulation / 生活角色扮演',
    year: '2026',
    developer: 'Sebasa Games',
    publisher: 'Sebasa Games',
    releaseDate: '2026 年 9 月 25 日',
    video: '/games/01-woman-simulator/videos/01_Trailer.mp4',
    cover: '/games/01-woman-simulator/cover.jpg',
    poster: '/games/01-woman-simulator/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/4072240/',
    shortIntro: '这款游戏让你体验做女性的感觉：打扫、洗衣、做饭，没有片刻安宁。完全沉浸在女性日常琐事与生活重担的真实世界中。',
    fullIntro: '《Woman Simulator》（女性模拟器）以写实幽默的第一人称互动视角，细致还原了现代家庭生活中的种种繁琐日常。从晨间厨房的早餐准备、衣物清洗与熨烫，到房间各处的清洁整理与处理突发的生活小插曲，玩家将在快节奏的家庭日程中感受生活的不易与独特的乐趣。游戏兼具轻松休闲的模拟机制与富有洞察力的生活哲学，带来耳目一新的交互体验。',
    specs: {
      min: {
        ram: '8 GB RAM',
        storage: '需要 10 GB 可用空间',
        cpu: 'Intel Core i3 / AMD Ryzen 3',
        gpu: 'NVIDIA GeForce GTX 1660 / AMD RX 5500 XT',
        os: 'Windows 10 64-bit',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '16 GB RAM',
        storage: '需要 10 GB 可用空间 (推荐 SSD 固态硬盘)',
        cpu: 'Intel Core i5 / AMD Ryzen 5',
        gpu: 'NVIDIA GeForce RTX 2060 / AMD RX 5600 XT',
        os: 'Windows 10 / 11 64-bit',
        directx: 'DirectX 12'
      }
    }
  },
  {
    slug: 'entity-the-black-day',
    folder: '02-entity-the-black-day',
    steamId: '2517220',
    title: 'ENTITY: THE BLACK DAY',
    cnTitle: '实体：黑昼',
    category: 'Action, Tactical Survival / 动作战术·生存惊悚',
    year: '2026',
    developer: 'ASD Games Studio',
    publisher: 'ASD Games © 2026',
    releaseDate: '2026 年 1 月 8 日',
    video: '/games/02-entity-the-black-day/videos/01_Full_Release_Official_Trailer.mp4',
    cover: '/games/02-entity-the-black-day/cover.jpg',
    poster: '/games/02-entity-the-black-day/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/2517220/',
    shortIntro: '一名前特种部队队员被派去揭露与秘密病毒实验有关的政府掩盖。随着他探索一座隐藏的地下实验室并追踪仅存的两名幸存者，他逐渐意识到，这处设施还埋藏着更为黑暗的秘密。',
    fullIntro: '《ENTITY: THE BLACK DAY》（实体：黑昼）是一部沉浸感极强的战术潜入与科幻求生大作。玩家将深入深不见底的军方地下实验室，在失控的生化变异危机中步步为营。面对冷酷无情的武装哨兵与不可名状的异化生物，运用战术技巧、有限补给与精准枪法在阴影中寻找一线生机，揭开被最高机密掩盖的人性灾难。',
    specs: {
      min: {
        ram: '16 GB RAM',
        storage: '需要 25 GB 可用空间',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        gpu: 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580',
        os: 'Windows 10 64-bit (v.1803 或更高)',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '32 GB RAM',
        storage: '需要 25 GB 可用空间 (推荐高速 NVMe SSD)',
        cpu: 'Intel Core i7-10700K / AMD Ryzen 7 3700X',
        gpu: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6700 XT',
        os: 'Windows 10 / 11 64-bit',
        directx: 'DirectX 12'
      }
    }
  },
  {
    slug: 'kingdom-rush-6-genesis',
    folder: '03-kingdom-rush-6-genesis',
    steamId: '4259190',
    title: 'Kingdom Rush 6: Genesis TD',
    cnTitle: '王国保卫战 6：新启程',
    category: 'Strategy, Tower Defense / 经典策略塔防·奇幻冒险',
    year: '2026',
    developer: 'Ironhide Game Studio',
    publisher: 'Ironhide Game Studio',
    releaseDate: '2026 年 9 月 24 日',
    video: '/games/03-kingdom-rush-6-genesis/videos/01_Kingdom_Rush_Genesis_Trailer.mp4',
    cover: '/games/03-kingdom-rush-6-genesis/cover.jpg',
    poster: '/games/03-kingdom-rush-6-genesis/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/4259190/',
    shortIntro: '《王国保卫战 6：新启程》是一款策略奇幻塔防游戏，将带您穿越时间回到更早些以前的王国，并同时带来大胆的革新。建造防御塔、号令手下的多名英雄……阻止曾经的"卫兹南"踏上魔道！',
    fullIntro: '全球塔防界殿堂级作品铁皮工作室王者归来！在《王国保卫战 6：新启程》中，玩家将重返古老王国的起源年代。全新的防御塔分支演进系统、多英雄即时联动协同、高难度 Boss 史诗遭遇战，辅以精湛细腻的手绘卡通画风，带来无与伦比的策略推演与战术成就感。',
    specs: {
      min: {
        ram: '8 GB RAM',
        storage: '需要 3 GB 可用空间',
        cpu: 'Quad Core 4核处理器 (Intel i3 / AMD FX)',
        gpu: 'Intel UHD Graphics 600 或独立显卡 (1GB 显存)',
        os: 'Windows 10 64-bit',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '16 GB RAM',
        storage: '需要 4 GB 可用空间 (SSD)',
        cpu: 'Intel Core i5 3.0GHz / AMD Ryzen 5',
        gpu: 'NVIDIA GeForce GTX 960 / AMD Radeon R9 280 (2GB+ 显存)',
        os: 'Windows 10 / 11 64-bit',
        directx: 'DirectX 11'
      }
    }
  },
  {
    slug: 'garfield-escape-from-monday',
    folder: '04-garfield-escape-from-monday',
    steamId: '3932790',
    title: 'Garfield - Escape from Monday',
    cnTitle: '加菲猫：逃离星期一',
    category: '3D Platformer / 3D平台跳跃·趣味冒险',
    year: '2026',
    developer: 'OSome Studio',
    publisher: 'Microids',
    releaseDate: '2026 年 9 月 24 日',
    video: '/games/04-garfield-escape-from-monday/videos/01_Garfield_-_Escape_from_Monday_-_Launch_Trailer.mp4',
    cover: '/games/04-garfield-escape-from-monday/cover.jpg',
    poster: '/games/04-garfield-escape-from-monday/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/3932790/',
    shortIntro: '在这款充满蔬菜的3D平台游戏中唤醒加菲猫，摆脱这场噩梦！世界上最懒的猫即将在《Garfield - Escape from Monday》中努力工作！',
    fullIntro: '加菲猫被困在了一场由西兰花怪兽、狂暴胡萝卜与无尽闹钟组成的恐怖“星期一噩梦”中！在这部绚烂活泼的3D平台动作游戏中，你将操纵世界上最嗜睡的胖橘猫，通过飞扑、滑翔、甩尾与投掷千层面打碎蔬菜大军的包围圈，解救欧迪并找回安逸的周末小憩！',
    specs: {
      min: {
        ram: '8 GB RAM',
        storage: '需要 12 GB 可用空间',
        cpu: 'Intel Core i7-7700K / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580',
        os: 'Windows 10 64-bit 或更高版本',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '16 GB RAM',
        storage: '需要 12 GB 可用空间 (SSD)',
        cpu: 'Intel Core i7-10700 / AMD Ryzen 7 3700X',
        gpu: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700',
        os: 'Windows 10 / 11 64-bit',
        directx: 'DirectX 12'
      }
    }
  },
  {
    slug: 'alaska-gold-fever',
    folder: '05-alaska-gold-fever',
    steamId: '1674200',
    title: 'Alaska Gold Fever',
    cnTitle: '黄金矿主模拟器：阿拉斯加淘金热',
    category: 'Simulation, Survival / 开放世界淘金·模拟建造',
    year: '2026',
    developer: 'Baked Games',
    publisher: 'Baked Games S.A.',
    releaseDate: '2026 年 4 月 14 日',
    video: '/games/05-alaska-gold-fever/videos/01_Alaska_Gold_Fever_-_Bandits_DLC_Release_Trailer.mp4',
    cover: '/games/05-alaska-gold-fever/cover.jpg',
    poster: '/games/05-alaska-gold-fever/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/1674200/',
    shortIntro: '扮演阿拉斯加淘金热时期的淘金者，从零开始建立属于你自己的帝国。开采资源、提炼黄金，并在严酷的气候中生存，建立富甲一方的黄金帝国！',
    fullIntro: '19世纪末的克朗代克冰雪荒原等待着真正的冒险家！《阿拉斯加淘金热》让玩家亲历淘金热的黄金时代。从最初用铁锹和淘金淘洗微小的金砂，到购入蒸汽挖掘机、搭建高水准重力分选流水线与工业冶炼厂。在荒野严冬、野兽威胁与流窜劫匪的夹击下生存，管理矿场雇员，书写属于你的淘金传奇。',
    specs: {
      min: {
        ram: '8 GB RAM',
        storage: '需要 15 GB 可用空间',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        gpu: 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580',
        os: 'Windows 10 64-bit',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '16 GB RAM',
        storage: '需要 20 GB 可用空间 (推荐高速 NVMe SSD)',
        cpu: 'Intel Core i7-9700 / AMD Ryzen 7 3700X',
        gpu: 'NVIDIA GeForce RTX 2070 / AMD Radeon RX 5700 XT',
        os: 'Windows 10 / 11 64-bit',
        directx: 'DirectX 12'
      }
    }
  },
  {
    slug: 'nocturne',
    folder: '06-nocturne',
    steamId: '1374860',
    title: 'Nocturne',
    cnTitle: '夜曲 (Nocturne)',
    category: 'Rhythm RPG, Cyberpunk / 节奏战斗·赛博朋克RPG',
    year: '2026',
    developer: 'Pracy Studios',
    publisher: 'Pracy Studios',
    releaseDate: '2026 年 9 月 22 日',
    video: '/games/06-nocturne/videos/01_Main_Trailer.mp4',
    cover: '/games/06-nocturne/cover.jpg',
    poster: '/games/06-nocturne/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/1374860/',
    shortIntro: '来世如今已完全数字化。在这款打破传统流派、融入独特节奏音乐战斗的RPG中，探索永生背后所伴随的牺牲与宿命抉择。',
    fullIntro: '《Nocturne》（夜曲）打造了一个人类意识数字化上传后的虚拟死后世界。在这里，记忆化作发光的代码，情感与旋律交织一体。玩家将跟随主人公穿梭于赛博光影构筑的遗落都会，在伴随强劲电子节奏乐曲的即时打击与弹幕格挡中克敌制胜，探寻这个数字化灵魂避难所背后潜藏的颠覆性真相。',
    specs: {
      min: {
        ram: '8 GB RAM',
        storage: '需要 14 GB 可用空间',
        cpu: 'Dual Core 2.0 GHz 或更高',
        gpu: '配备 2GB 显存的独立显卡 (GTX 750 Ti 或同等性能)',
        os: 'Windows 10, 11',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '16 GB RAM',
        storage: '需要 14 GB 可用空间 (SSD)',
        cpu: 'Quad Core 3.0 GHz+ (Intel i5 / Ryzen 5)',
        gpu: 'NVIDIA GeForce GTX 1060 / AMD RX 580 (4GB+ 显存)',
        os: 'Windows 10 / 11 64-bit',
        directx: 'DirectX 12'
      }
    }
  },
  {
    slug: 'le-mans-ultimate',
    folder: '07-le-mans-ultimate',
    steamId: '2399420',
    title: 'Le Mans Ultimate',
    cnTitle: '勒芒终极赛',
    category: 'Motorsport, Racing Sim / 国际汽联官方耐力赛模拟',
    year: '2025',
    developer: 'Studio 397',
    publisher: 'Studio 397',
    releaseDate: '2025 年 7 月 22 日',
    video: '/games/07-le-mans-ultimate/videos/02_Version_1_0_Launch_Trailer.mp4',
    cover: '/games/07-le-mans-ultimate/cover.jpg',
    poster: '/games/07-le-mans-ultimate/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/2399420/',
    shortIntro: '勒芒是一个由激情、速度与荣耀驱动的传奇故事。国际汽联世界耐力锦标赛与勒芒24小时耐力赛官方权威认证模拟力作。',
    fullIntro: '《Le Mans Ultimate》（勒芒终极赛）由行业顶尖赛车物理模拟团队 Studio 397 倾力制作。全方位官方授权包含最新一代顶级 Hypercar、LMP2、LMGT3 与 GTE 赛车，激光雷达高精度扫描萨特、斯帕、蒙扎、富士等全球标志性赛道。搭载业界领先的轮胎热力与橡胶衰减模型、动态昼夜流转与雷暴骤雨天气，配合逼真的力反馈回传，带来身临其境的极速电竞赛车狂飙！',
    specs: {
      min: {
        ram: '8 GB RAM',
        storage: '需要 30 GB 可用空间',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        gpu: 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580',
        os: 'Windows 10 或 11 64-bit',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '16 GB RAM (建议 32 GB 高频内存)',
        storage: '需要 40 GB 可用空间 (推荐高速 NVMe SSD)',
        cpu: 'Intel Core i7-10700K / AMD Ryzen 7 3800X',
        gpu: 'NVIDIA GeForce RTX 2080 / RTX 3070 (8GB 显存)',
        os: 'Windows 10 / 11 64-bit',
        directx: 'DirectX 12'
      }
    }
  },
  {
    slug: 'pioneers-of-pagonia',
    folder: '08-pioneers-of-pagonia',
    steamId: '2155180',
    title: 'Pioneers of Pagonia',
    cnTitle: '帕格尼物语 (帕戈尼亚先锋)',
    category: 'City Builder, Strategy / 模拟城市建设·物流运转',
    year: '2025',
    developer: 'Envision Entertainment',
    publisher: 'Envision Entertainment',
    releaseDate: '2025 年 12 月 11 日',
    video: '/games/08-pioneers-of-pagonia/videos/01_Pioneers_of_Pagonia_-_1_0_Release_Trailer__EN_.mp4',
    cover: '/games/08-pioneers-of-pagonia/cover.jpg',
    poster: '/games/08-pioneers-of-pagonia/screenshots/ss_01.jpg',
    steam: 'https://store.steampowered.com/app/2155180/',
    shortIntro: '为这个失落于迷雾之中的世界重建希望。率领你的帕戈尼亚人穿越神秘群岛，将散落各处的部落联合起来，建立起繁荣的社区！',
    fullIntro: '《工人物语》原班制作人 Volker Wertich 潜心打造的划时代德式建造模拟大作！在《帕格尼物语》（Pioneers of Pagonia）中，数以万计拥有独立生活轨迹与作业流程的生动居民穿梭在错落有致的城镇道路上。精细掌控庞大的伐木、矿产提炼、农业种植、水利与武器装备产业链，向迷雾深处探索奇幻遗迹，结交友善异族，抵御狡黠盗匪，享受极具观赏性与深度逻辑的运转美学。',
    specs: {
      min: {
        ram: '8 GB RAM',
        storage: '需要 5 GB 可用空间',
        cpu: 'Quad Core 4核处理器 (Intel i5-7400 / AMD Ryzen 3 1200)',
        gpu: 'NVIDIA GeForce GTX 1050 (3GB) / AMD Radeon RX 560 (4GB)',
        os: '64-bit Windows 10 version 1909 或更高',
        directx: 'DirectX 11'
      },
      rec: {
        ram: '16 GB RAM',
        storage: '需要 10 GB 可用空间 (推荐 SSD)',
        cpu: 'Hexa Core 6核处理器 (Intel i5-10400 / AMD Ryzen 5 3600)',
        gpu: 'NVIDIA GeForce RTX 2060 (6GB) / AMD Radeon RX 5600 XT',
        os: '64-bit Windows 10 / 11',
        directx: 'DirectX 12'
      }
    }
  }
];

// Helper to get screenshot list for a game
function getScreenshots(folder) {
  const ssDir = path.join('siena-clone/games', folder, 'screenshots');
  if (!fs.existsSync(ssDir)) return [];
  const files = fs.readdirSync(ssDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  return files.map(f => `/games/${folder}/screenshots/${f}`);
}

// Brand SVG logo
const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="34" height="34" fill="none" style="display:inline-block; vertical-align:middle;">
  <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="3 3"/>
  <path d="M12 14h16M12 20h16M12 26h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="28" cy="26" r="3" fill="currentColor"/>
</svg>
<span style="font-family: inherit; font-weight: 800; font-size: 1.15rem; letter-spacing: 0.12em; text-transform: uppercase;">STEM 的平行空间</span>
`;

// Build case page generator function
function generateCaseHtml(game, allGames) {
  let html = rawHtml;

  // 1. Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>STEM 的平行空间 | ${game.title} (${game.cnTitle}) - 游戏档案与系统配置</title>`);

  // 2. Localize all stylesheet & script URLs
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
    // Replace old film titles in menu
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
  // Replace genre
  html = html.replace(/<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">[\s\S]*?<\/div>/, 
    `<div data-a="alpha" class="roll-cont-eyeb parish larger is-cs">${game.category}</div>`);
  // Replace title & add Chinese subtitle
  html = html.replace(/<h1 data-cs="title" class="cs-title">[\s\S]*?<\/h1>/, 
    `<h1 data-cs="title" class="cs-title">${game.title}</h1>\n<div class="roll-cont-eyeb parish mb-0" style="font-size: 1.6rem; letter-spacing: 0.15em; color: rgba(0,0,0,0.72); margin-top: 14px; font-weight: 700; text-transform: uppercase;">${game.cnTitle}</div>`);

  // 7. Update Video Player Section (#second)
  let videoSrc = game.video;
  if (!fs.existsSync(path.join('siena-clone', videoSrc))) {
    videoSrc = '/games/08-pioneers-of-pagonia/videos/01_Pioneers_of_Pagonia_-_1_0_Release_Trailer__EN_.mp4';
  }
  // Replace video src
  html = html.replace(/<video src="[^"]*" playsinline="true" data-videoplayer="video" class="videoplayer-vieo-comp"><\/video>/,
    `<video src="${videoSrc}" playsinline="true" data-videoplayer="video" class="videoplayer-vieo-comp"></video>`);
  // Replace video poster image
  html = html.replace(/<img src="https:\/\/cdn\.prod\.website-files\.com\/673306db3b111afa559bc378\/67923c1fa550c616a38131b9_project\.jpg"[^>]*class="image-2"\/>/,
    `<img src="${game.poster}" loading="eager" alt="${game.title}" class="image-2" style="object-fit:cover; width:100%; height:100%;"/>`);

  // 8. Update Credits & System Requirements Section
  // Replace Left side: Director -> Developer + Cover image
  html = html.replace(/<div class="roll-cont-eyeb parish">DIRECTOR<\/div><div class="credit-name">Limor Pinhasov<\/div>/,
    `<div class="roll-cont-eyeb parish">DEVELOPER / 开发商</div><div class="credit-name">${game.developer}</div>`);
  
  html = html.replace(/<img src="https:\/\/cdn\.prod\.website-files\.com\/673306db3b111afa559bc378\/678fa9c8125c27c780a015e7_project_x\.webp"[^>]*class="credit-main-img"\/>/,
    `<img src="${game.cover}" loading="lazy" alt="${game.title}" class="credit-main-img" style="object-fit:cover; width:100%; border-radius:4px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);"/>`);

  // Replace Right side (.credit-grid-w): Inject complete specs, Chinese intro, and hardware table
  const newCreditGridContent = `
<div data-credit-grid="" id="w-node-e3e1edc3-c492-a891-c5dc-00cdf01ca074-30953c00" class="credit-grid-w">
  <!-- Card Header Row -->
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

  <!-- Chinese Synopsis & Story Row -->
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

  // Replace from <div data-credit-grid="" to the closing tag of credit-grid-w
  const gridStart = html.indexOf('<div data-credit-grid=""');
  const gridEnd = html.indexOf('</div></div></div><div data-color="black" class="s footage"');
  if (gridStart !== -1 && gridEnd !== -1) {
    html = html.substring(0, gridStart) + newCreditGridContent + html.substring(gridEnd);
  }

  // 9. Update Footage Gallery Section (inject official screenshots)
  const screenshots = getScreenshots(game.folder);
  if (screenshots.length > 0) {
    // Generate footage repeater items
    const footageItemsHtml = screenshots.map((ss, idx) => `
      <div data-footage="${idx % 2 === 0 ? 'item' : 'item2'}" role="listitem" class="cs-footage-it w-dyn-item w-dyn-repeater-item">
        <div class="cs-footage-mask-group">
          <img src="${ss}" loading="lazy" draggable="false" data-imgParallax="1" alt="${game.title} 实机截图 ${idx + 1}" class="cs-footage-img" style="object-fit:cover; width:100%; height:100%;"/>
          <div class="abs cs-footage-mask-w">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 394" width="0" height="0" class="svg-3">
              <defs>
                <clipPath id="square" clipPathUnits="objectBoundingBox" transform="scale(0.002544529262, 0.002544529262)">
                  <path fill="currentColor" d="M.24 56.311c-.433-2.706-.18-16.313 0-22.779 0-29.95 10.287-31.8 21.794-31.8h109.654c11.507 0 46.975-1.353 50.36 0 3.384 1.353 21.66 0 27.616-1.353 5.957-1.353 26.94 1.353 32.219 1.353 5.28 0 7.04-1.353 8.935-1.353h10.018c2.572 0 25.992 1.353 32.084 1.353h87.858c14.079 0 11.101 24.358 11.101 25.485v43.528c0 11.728 1.218 23.681 0 28.417-1.219 4.737 1.218 33.154 1.218 44.43v131.035l-1.624 91.792c1.408 20.388-6.453 25.184-10.559 25.034-2.573-.451-7.961-1.353-8.935-1.353h-18.953c-7.039 0-42.914 1.353-53.067 1.353h-89.483c-10.559 0-56.992 2.03-66.875 1.579-7.906-.361-20.441-1.203-25.721-1.579H66.302c-5.686 0-32.355-.451-49.412 0C-.167 391.904.782 375.666.782 367.547c0-8.12 0-18.945-.541-25.937-.542-6.991 0-58.187 0-63.825 0-5.639 0-16.013.54-20.073.542-4.06.949-16.238 0-18.719-.947-2.481-.54-11.728-.54-17.817V117.431c0-1.579 1.353-1.579 1.489-2.256.135-.676-.948-1.579-.948-2.481 0-.902-.135-33.83 0-45.557.135-11.728 0-7.443-.541-10.826Z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div data-parallax="2" class="abs cs-footage-cont">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 9" width="100%" class="footagemenu-stars larger"><path fill="currentColor" d="M5.056 0 6 2.9h3.05L6.58 4.694l.943 2.901-2.468-1.793L2.59 7.594l.942-2.9L1.064 2.9h3.05L5.056 0ZM15.552 0l.942 2.9h3.05l-2.468 1.793.943 2.901-2.467-1.793-2.468 1.793.943-2.9L11.559 2.9h3.05L15.552 0ZM26.047 0l.942 2.9h3.05l-2.467 1.793.942 2.901-2.467-1.793-2.468 1.793.943-2.9L22.054 2.9h3.05L26.047 0ZM36.542 0l.942 2.9h3.05l-2.467 1.793.942 2.901-2.467-1.793-2.468 1.793.943-2.9L32.549 2.9h3.05L36.542 0ZM47.036 0l.942 2.9h3.05l-2.467 1.793.942 2.901-2.468-1.793L44.57 7.594l.942-2.9-2.468-1.794h3.05L47.036 0Z"></path></svg>
          <div class="cs-footage-cont-he" style="font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">OFFICIAL IN-GAME SCREENSHOT #${idx + 1}</div>
        </div>
      </div>
    `).join('\n');

    // Replace the footage repeater container
    const footStart = html.indexOf('<div role="list" class="cs-footage-w w-dyn-items">');
    const footEnd = html.indexOf('</div></div></div><div data-color="black" class="s full w-condition-invisible">');
    if (footStart !== -1 && footEnd !== -1) {
      html = html.substring(0, footStart) + 
        `<div role="list" class="cs-footage-w w-dyn-items">\n${footageItemsHtml}\n</div>` +
        html.substring(footEnd + 6);
    }
  }

  // 10. Update Next Project items in data-nextCMS="w"
  const nextItemsHtml = allGames.map(g => `
    <div data-a="parallaxImg" data-id="${g.slug}" role="listitem" class="previousnext-item w-dyn-item">
      <a href="/films/${g.slug}" class="previousnext-link w-inline-block">
        <div class="previousnext-text-w">
          <div>
            <div class="spacer_cs"><div class="roll-cont-eyeb parish mb-2">Showcase · 下一个项目</div></div>
            <div class="previousnext-he">${g.title}</div>
            <div style="font-size: 1.1rem; color: rgba(0,0,0,0.6); margin-top: 4px; font-weight: 700;">${g.cnTitle}</div>
          </div>
          <div class="previousnext-cta-w">
            <div class="text-block-10">EXPLORE</div>
            <figure class="down-arrow-btn right black-copy smaller">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" width="100%" class="svg smaller">
                <path fill="currentColor" d="M69.022 85.363c16.693-13.32 20.658-33.261 20.16-43.736H77.95c0 17.454-11.106 29.106-20.543 35.517-4.676 3.177-10.818 2.998-15.414-.293-17.124-12.264-19.958-27.753-18.988-35.224H10.305c0 20.438 9.697 34.444 20.244 43.16 11.033 9.118 27.285 9.503 38.473.576Z"></path>
                <path fill="currentColor" fill-rule="evenodd" d="M56.016 5v79.243H43.56V5h12.455Z" clip-rule="evenodd"></path>
              </svg>
            </figure>
          </div>
        </div>
        <div class="previousnext-img-w">
          <div class="abs-img-w">
            <div class="full-img-w">
              <img src="${g.cover}" loading="lazy" alt="${g.title}" class="previousnext-img" style="object-fit:cover; width:100%; height:100%;"/>
            </div>
          </div>
        </div>
      </a>
    </div>
  `).join('\n');

  const cmsStart = html.indexOf('<div data-nextCMS="w" role="list" class="previousnext-w w-dyn-items">');
  const cmsEnd = html.indexOf('<div class="abs ticket-holes">', cmsStart);
  if (cmsStart !== -1 && cmsEnd !== -1) {
    html = html.substring(0, cmsStart) +
      `<div data-nextCMS="w" role="list" class="previousnext-w w-dyn-items">\n${nextItemsHtml}\n</div></div>` +
      html.substring(cmsEnd);
  }

  // 11. Update Footer Branding
  html = html.replace(/©2024\. SIENA FILM FOUNDATION\./g, '©2026. STEM 的平行空间 (STEM PARALLEL SPACE).');
  html = html.replace(/LEE@SiENA\.film/gi, 'CONTACT@STEM-SPACE.COM');
  html = html.replace(/PRESS@SiENA\.FILM/gi, 'PRESS@STEM-SPACE.COM');

  return html;
}

// Generate all pages
const filmsDir = path.join('siena-clone', 'films');
if (!fs.existsSync(filmsDir)) {
  fs.mkdirSync(filmsDir, { recursive: true });
}

games.forEach(g => {
  const content = generateCaseHtml(g, games);
  const outPath = path.join(filmsDir, `${g.slug}.html`);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`✓ Generated ${outPath}`);

  // Also write folder-prefix version e.g. 01-woman-simulator.html
  const outPathPrefixed = path.join(filmsDir, `${g.folder}.html`);
  fs.writeFileSync(outPathPrefixed, content, 'utf8');
});

// Also create my-project-x.html (explicitly requested by user)
// Map my-project-x to Alaska Gold Fever or Entity The Black Day
const projectXGame = games.find(g => g.slug === 'alaska-gold-fever');
const projectXContent = generateCaseHtml(projectXGame, games);
fs.writeFileSync(path.join(filmsDir, 'my-project-x.html'), projectXContent, 'utf8');
console.log('✓ Generated siena-clone/films/my-project-x.html');

console.log('All exploration pages generated successfully!');
