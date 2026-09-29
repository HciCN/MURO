const fs = require('fs');
const path = require('path');

const replacements = [
  { oldText: 'Woman Simulator', newCn: '黑神话：悟空', newEn: 'BLACK MYTH: WUKONG', slug: 'black-myth-wukong', folder: '01-black-myth-wukong', cat: 'Action RPG · 动作角色扮演' },
  { oldText: 'ENTITY: THE BLACK DAY', newCn: '艾尔登法环：黄金树幽影', newEn: 'ELDEN RING: SHADOW OF THE ERDTREE', slug: 'elden-ring', folder: '02-elden-ring', cat: 'Dark Fantasy · 开放世界魂系' },
  { oldText: 'Entity: The Black Day', newCn: '艾尔登法环：黄金树幽影', newEn: 'ELDEN RING: SHADOW OF THE ERDTREE', slug: 'elden-ring', folder: '02-elden-ring', cat: 'Dark Fantasy · 开放世界魂系' },
  { oldText: 'Kingdom Rush 6: Genesis', newCn: '赛博朋克 2077：终极版', newEn: 'CYBERPUNK 2077: ULTIMATE EDITION', slug: 'cyberpunk-2077', folder: '03-cyberpunk-2077', cat: 'Sci-Fi Open World · 赛博科幻冒险' },
  { oldText: 'Garfield - Escape from Monday', newCn: '荒野大镖客：救赎 2', newEn: 'RED DEAD REDEMPTION 2', slug: 'red-dead-redemption-2', folder: '04-red-dead-redemption-2', cat: 'Western Open World · 西部史诗巨作' },
  { oldText: 'Garfield: Escape from Monday', newCn: '荒野大镖客：救赎 2', newEn: 'RED DEAD REDEMPTION 2', slug: 'red-dead-redemption-2', folder: '04-red-dead-redemption-2', cat: 'Western Open World · 西部史诗巨作' },
  { oldText: 'ALASKA GOLD FEVER', newCn: '黑神话：悟空', newEn: 'BLACK MYTH: WUKONG', slug: 'black-myth-wukong', folder: '01-black-myth-wukong', cat: 'Action RPG · 动作角色扮演' },
  { oldText: 'Alaska Gold Fever', newCn: '侠盗猎车手 5：传承增强版', newEn: 'GRAND THEFT AUTO V ENHANCED', slug: 'grand-theft-auto-v', folder: '05-grand-theft-auto-v', cat: 'Crime Sandbox · 犯罪都市沙盒' },
  { oldText: 'Nocturne', newCn: '战神：诸神黄昏', newEn: 'GOD OF WAR: RAGNARÖK', slug: 'god-of-war-ragnarok', folder: '06-god-of-war-ragnarok', cat: 'Mythology Action · 北欧神话史诗' },
  { oldText: 'Le Mans Ultimate', newCn: '博德之门 3', newEn: "BALDUR'S GATE 3", slug: 'baldurs-gate-3', folder: '07-baldurs-gate-3', cat: 'Fantasy CRPG · 奇幻角色扮演' },
  { oldText: 'Pioneers of Pagonia', newCn: '漫威蜘蛛侠 2', newEn: "MARVEL'S SPIDER-MAN 2", slug: 'marvels-spider-man-2', folder: '08-marvels-spider-man-2', cat: 'Superhero Action · 超级英雄动作' }
];

['home.html', 'index.html', 'work.html'].forEach(filename => {
  const filePath = path.join(__dirname, filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(r => {
    content = content.replaceAll(r.oldText, r.newCn);
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated menu and widget text in ${filename}`);
});
