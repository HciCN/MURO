const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('extracted_150_raw.json', 'utf8'));

// Chinese title dictionary and genre mapping for all 150 games
const titleDict = {
  '007-first-light': { cn: '007：初晓', genre: '动作冒险 / 谍战潜行', ram: '16 GB' },
  'forza-horizon-6': { cn: '极限竞速：地平线 6', genre: '赛车竞速 / 开放世界', ram: '16 GB' },
  'grand-theft-auto-v': { cn: '侠盗猎车手 5 (GTA 5)', genre: '动作冒险 / 开放世界', ram: '8 GB' },
  'the-genesis-order': { cn: '创世秩序', genre: '角色扮演 / 剧情冒险', ram: '8 GB' },
  'black-myth-wukong': { cn: '黑神话：悟空', genre: '动作角色扮演 / 神话奇幻', ram: '16 GB' },
  'returning-to-mia': { cn: '重返米娅', genre: '视觉小说 / 角色扮演', ram: '8 GB' },
  'dune-awakening': { cn: '沙丘：觉醒', genre: '生存建造 / 开放世界', ram: '16 GB' },
  'onimusha-way-of-the-sword': { cn: '鬼武者：剑之道', genre: '动作冒险 / 和风奇幻', ram: '16 GB' },
  'the-blood-of-dawnwalker': { cn: '破晓行者之血', genre: '角色扮演 / 暗黑奇幻', ram: '16 GB' },
  'silent-hill-townfall': { cn: '寂静岭：小镇沦陷', genre: '心理恐怖 / 冒险解谜', ram: '16 GB' },
  'control-resonant': { cn: '控制：共鸣', genre: '超自然动作 / 第三人称射击', ram: '16 GB' },
  'sexnatural-milfs-must-be-filled': { cn: '超自然魅影', genre: '互动小说 / 角色扮演', ram: '8 GB' },
  'shambles-sons-of-apocalypse': { cn: '末日之子：混乱行者', genre: '卡牌构筑 / 末日生存', ram: '8 GB' },
  'assassins-creed-black-flag-resynced': { cn: '刺客信条：黑旗 重置版', genre: '动作冒险 / 海盗航海', ram: '8 GB' },
  'red-dead-redemption-2': { cn: '荒野大镖客：救赎 2', genre: '开放世界 / 西部史诗', ram: '12 GB' },
  'marvels-spider-man-2': { cn: '漫威蜘蛛侠 2', genre: '超级英雄 / 动作冒险', ram: '16 GB' },
  'bravely-default-flying-fairy-hd-remaster': { cn: '勇气默示录：飞舞的妖精 高清重置版', genre: '日系角色扮演 / 经典奇幻', ram: '8 GB' },
  'the-last-of-us-part-1': { cn: '最后生还者：第一部', genre: '动作冒险 / 剧情末世', ram: '16 GB' },
  'ea-sports-fc-26': { cn: 'EA SPORTS FC 26', genre: '体育竞技 / 足球模拟', ram: '12 GB' },
  'resident-evil-requiem': { cn: '生化危机：安魂曲', genre: '生存恐怖 / 动作射击', ram: '16 GB' },
  'entity-the-black-day': { cn: '实体：黑昼', genre: '悬疑解谜 / 潜行探索', ram: '8 GB' },
  'blackwood': { cn: '黑木林之谜', genre: '剧情冒险 / 悬疑解谜', ram: '8 GB' },
  'crimson-desert': { cn: '红色沙漠', genre: '开放世界 / 史诗角色扮演', ram: '16 GB' },
  'the-relic-first-guardian': { cn: '遗迹：最初守护者', genre: '魂系动作 / 暗黑奇幻', ram: '16 GB' },
  'beast-of-reincarnation': { cn: '轮回之兽', genre: '动作角色扮演 / 东方玄幻', ram: '16 GB' },
  'far-cry-5': { cn: '孤岛惊魂 5', genre: '第一人称射击 / 开放世界', ram: '8 GB' },
  'the-sinking-city-2': { cn: '沉没之城 2', genre: '克苏鲁恐怖 / 悬疑解谜', ram: '16 GB' },
  'mortal-shell-2': { cn: '致命躯壳 2', genre: '硬核动作 / 魂系冒险', ram: '16 GB' },
  'rogue-blight': { cn: '枯萎深渊', genre: 'Roguelike / 地牢探险', ram: '8 GB' },
  'far-cry-6': { cn: '孤岛惊魂 6', genre: '第一人称射击 / 开放世界', ram: '12 GB' },
  'god-of-war-ragnarok': { cn: '战神：诸神黄昏', genre: '动作冒险 / 北欧神话', ram: '16 GB' },
  'ghost-of-tsushima-directors-cut': { cn: '对马岛之魂：导演剪辑版', genre: '开放世界 / 武士剑戟', ram: '16 GB' },
  'elden-ring': { cn: '艾尔登法环：黄金树幽影', genre: '开放世界 / 魂系角色扮演', ram: '16 GB' },
  'cyberpunk-2077': { cn: '赛博朋克 2077：往日之影', genre: '科幻角色扮演 / 开放世界', ram: '16 GB' },
  'forza-horizon-5': { cn: '极限竞速：地平线 5', genre: '赛车竞速 / 开放世界', ram: '16 GB' },
  'assassins-creed-shadows': { cn: '刺客信条：影', genre: '动作潜行 / 开放世界', ram: '16 GB' },
  'fallout-4': { cn: '辐射 4：年度版', genre: '废土角色扮演 / 开放世界', ram: '8 GB' },
  'mafia-definitive-edition': { cn: '四海兄弟：最终版', genre: '动作犯罪 / 剧情叙事', ram: '16 GB' },
  'kingdom-come-deliverance-2': { cn: '天国：拯救 2', genre: '真实中世纪 / 角色扮演', ram: '16 GB' },
  'gta-san-andreas-next-gen-remaster': { cn: '侠盗猎车手：圣安地列斯 次世代版', genre: '动作犯罪 / 开放世界', ram: '8 GB' },
  'witcher-3-next-gen': { cn: '巫师 3：狂猎 次世代完全版', genre: '奇幻角色扮演 / 开放世界', ram: '16 GB' },
  'horizon-zero-dawn-remastered': { cn: '地平线：零之曙光 重置版', genre: '动作角色扮演 / 后启示录', ram: '16 GB' },
  'marvels-spider-man-remastered': { cn: '漫威蜘蛛侠：重制版', genre: '超级英雄 / 动作冒险', ram: '16 GB' },
  'the-last-of-us-part-2': { cn: '最后生还者：第二部', genre: '剧情动作 / 生存冒险', ram: '16 GB' },
  'resident-evil-4-remake': { cn: '生化危机 4：重制版', genre: '生存恐怖 / 动作射击', ram: '16 GB' },
  'alan-wake-2': { cn: '心灵杀手 2', genre: '心理惊悚 / 生存恐怖', ram: '16 GB' },
  'dragons-dogma-2': { cn: '龙之信条 2', genre: '动作角色扮演 / 奇幻冒险', ram: '16 GB' },
  'palworld': { cn: '幻兽帕鲁', genre: '开放世界 / 怪物收集生存', ram: '16 GB' },
  'helldivers-2': { cn: '绝地潜兵 2', genre: '第三人称射击 / 多人合作', ram: '16 GB' },
  'dying-light-2': { cn: '消逝的光芒 2：人与仁之战', genre: '丧尸跑酷 / 动作冒险', ram: '16 GB' },
  'hades-2': { cn: '哈迪斯 2', genre: 'Roguelike / 动作砍杀', ram: '8 GB' },
  'senua-saga-hellblade-2': { cn: '地狱之刃 2：塞娜的传说', genre: '剧情动作 / 心理沉浸', ram: '16 GB' },
  'death-stranding-directors-cut': { cn: '死亡搁浅：导演剪辑版', genre: '开放世界 / 科幻连接', ram: '16 GB' },
  'monster-hunter-wilds': { cn: '怪物猎人：荒野', genre: '动作狩猎 / 开放世界', ram: '16 GB' },
  'stellar-blade': { cn: '剑星', genre: '动作砍杀 / 科幻冒险', ram: '16 GB' },
  'rise-of-the-ronin': { cn: '浪人崛起', genre: '和风武士 / 动作角色扮演', ram: '16 GB' },
  'final-fantasy-7-rebirth': { cn: '最终幻想 7：重生', genre: '角色扮演 / 经典史诗', ram: '16 GB' },
  'final-fantasy-16': { cn: '最终幻想 16', genre: '动作角色扮演 / 暗黑奇幻', ram: '16 GB' },
  'star-wars-jedi-survivor': { cn: '星球大战绝地：幸存者', genre: '科幻动作 / 银河恶魔城', ram: '16 GB' },
  'lies-of-p': { cn: '匹诺曹的谎言', genre: '魂系硬核动作 / 黑暗童话', ram: '16 GB' },
  'armored-core-6': { cn: '装甲核心 6：境界天火', genre: '机甲对战 / 3D动作', ram: '12 GB' },
  'persona-3-reload': { cn: '女神异闻录 3：Reload', genre: '日系角色扮演 / 校园奇幻', ram: '8 GB' },
  'yakuza-like-a-dragon-infinite-wealth': { cn: '人中之龙 8：无尽的财富', genre: '戏剧角色扮演 / 开放城市', ram: '16 GB' },
  'tekken-8': { cn: '铁拳 8', genre: '格斗对战 / 竞技格斗', ram: '16 GB' },
  'street-fighter-6': { cn: '街头霸王 6', genre: '格斗对战 / 街头文化', ram: '16 GB' },
  'diablo-4': { cn: '暗黑破坏神 4', genre: '动作角色扮演 / 暗黑刷宝', ram: '16 GB' },
  'borderlands-4': { cn: '无主之地 4', genre: '刷宝射击 / 合作冒险', ram: '16 GB' },
  'avowed': { cn: '宣誓', genre: '第一人称角色扮演 / 奇幻史诗', ram: '16 GB' },
  'civilization-7': { cn: '文明 7', genre: '4X回合策略 / 历史模拟', ram: '16 GB' },
  'halo-campaign-evolved': { cn: '光环：战斗进化重制版', genre: '科幻射击 / 史诗战役', ram: '16 GB' },
  'marvels-spider-man-miles-morales': { cn: '漫威蜘蛛侠：迈尔斯·莫拉莱斯', genre: '超级英雄 / 动作冒险', ram: '16 GB' },
  'doom-the-dark-ages': { cn: '毁灭战士：黑暗时代', genre: '第一人称硬核射击 / 恶魔屠杀', ram: '16 GB' },
  'the-last-of-us-part-2-remastered': { cn: '最后生还者 2：复刻版', genre: '生存恐怖 / 剧情冒险', ram: '16 GB' },
  'resonance-a-plague-tale-legacy': { cn: '瘟疫传说：共鸣遗珍', genre: '潜行解谜 / 历史叙事', ram: '16 GB' },
  'grand-theft-auto-the-trilogy-the-definitive-edition': { cn: '侠盗猎车手：三部曲 最终版', genre: '动作犯罪 / 开放世界', ram: '16 GB' },
  'fifa-22': { cn: 'FIFA 22', genre: '体育竞技 / 足球模拟', ram: '8 GB' },
  'sekiro-shadows-die-twice': { cn: '只狼：影逝二度 年度版', genre: '硬核动作 / 忍杀剑斗', ram: '8 GB' },
  'death-stranding-2-on-the-beach': { cn: '死亡搁浅 2：海滩漫行', genre: '开放世界 / 科幻冒险', ram: '16 GB' },
  'minecraft-bedrock-edition': { cn: '我的世界：基岩版', genre: '沙盒创造 / 开放建造', ram: '8 GB' },
  'mortal-kombat-1-pc': { cn: '真人快打 1：混沌支配', genre: '血腥格斗 / 竞技对战', ram: '16 GB' },
  'the-witcher-3-wild-hunt-complete-edition': { cn: '巫师 3：狂猎 完全版', genre: '奇幻角色扮演 / 开放世界', ram: '16 GB' },
  'assassins-creed-odyssey': { cn: '刺客信条：奥德赛', genre: '动作角色扮演 / 古希腊神话', ram: '8 GB' },
  'red-dead-redemption-pc': { cn: '荒野大镖客：初代重置版', genre: '开放世界 / 西部冒险', ram: '12 GB' },
  'resident-evil-2-deluxe-edition': { cn: '生化危机 2：重制豪华版', genre: '生存恐怖 / 动作射击', ram: '8 GB' },
  'assassins-creed-origins': { cn: '刺客信条：起源 黄金版', genre: '动作角色扮演 / 古埃及史诗', ram: '8 GB' },
  'forza-horizon-3': { cn: '极限竞速：地平线 3', genre: '赛车竞速 / 开放世界', ram: '8 GB' },
  'days-gone': { cn: '往日不再', genre: '开放世界 / 丧尸机车生存', ram: '16 GB' },
  'call-of-duty-black-ops-2': { cn: '使命召唤：黑色行动 2', genre: '第一人称射击 / 战役射击', ram: '8 GB' },
  'fifa-23': { cn: 'FIFA 23', genre: '体育竞技 / 足球模拟', ram: '12 GB' },
  'resident-evil-village': { cn: '生化危机 8：村庄 黄金版', genre: '生存恐怖 / 哥特奇幻', ram: '16 GB' },
  'euro-truck-simulator-2': { cn: '欧洲卡车模拟 2', genre: '模拟经营 / 拟真驾驶', ram: '8 GB' },
  'house-party': { cn: '家庭派对 终极同乐包', genre: '互动角色扮演 / 社交喜剧', ram: '8 GB' },
  'batman-arkham-knight-premium-edition': { cn: '蝙蝠侠：阿卡姆骑士 高级版', genre: '超级英雄 / 动作格斗', ram: '12 GB' },
  'samson': { cn: '参孙之怒', genre: '动作冒险 / 史诗神话', ram: '8 GB' },
  'call-of-duty-wwii': { cn: '使命召唤：二战', genre: '第一人称射击 / 二战史诗', ram: '12 GB' },
  'mouse-p-i-for-hire': { cn: '小鼠私家侦探', genre: '复古黑白手绘 / 射击冒险', ram: '8 GB' },
  'starfield': { cn: '星空：数字高级版', genre: '太空科幻 / 开放宇宙RPG', ram: '16 GB' },
  'dying-light-the-beast': { cn: '消逝的光芒：野兽', genre: '丧尸跑酷 / 动作冒险', ram: '16 GB' },
  'sleeping-dogs': { cn: '热血无赖：最终版', genre: '动作格斗 / 香港开放世界', ram: '8 GB' },
  'call-of-duty-modern-warfare-3': { cn: '使命召唤：现代战争 3', genre: '第一人称射击 / 军事战术', ram: '12 GB' },
  'nba-2k27': { cn: 'NBA 2K27', genre: '体育竞技 / 篮球模拟', ram: '16 GB' },
  'metal-gear-solid-4-guns-of-the-patriots-master-collection-version': { cn: '合金装备 4：爱国者之枪 大师合集', genre: '潜行战术 / 科幻军事', ram: '16 GB' },
  'assassins-creed-mirage': { cn: '刺客信条：幻景', genre: '动作潜行 / 古代巴格达', ram: '16 GB' },
  'watch-dogs-2-gold-edition': { cn: '看门狗 2：黄金版', genre: '黑客冒险 / 旧金山开放世界', ram: '8 GB' },
  'the-lord-of-the-rings-war-in-the-north-legacy-edition': { cn: '指环王：北方战争 遗产版', genre: '动作角色扮演 / 中土奇幻', ram: '8 GB' },
  'the-legend-of-zelda-tears-of-the-kingdom': { cn: '塞尔达传说：王国之泪', genre: '开放世界 / 物理建造冒险', ram: '16 GB' },
  'battlefield-6': { cn: '战地 6 战役重制版', genre: '第一人称射击 / 现代战争', ram: '16 GB' },
  'spider-man-shattered-dimensions': { cn: '蜘蛛侠：破碎维度', genre: '超级英雄 / 动作格斗', ram: '8 GB' },
  'rise-of-the-tomb-raider': { cn: '古墓丽影：崛起 20周年纪念版', genre: '动作冒险 / 探险解谜', ram: '8 GB' },
  'dragons-dogma-2-de': { cn: '龙之信条 2：豪华版', genre: '动作角色扮演 / 奇幻世界', ram: '16 GB' },
  'need-for-speed-payback-deluxe-edition': { cn: '极品飞车：复仇 豪华版', genre: '赛车竞速 / 警匪追逐', ram: '8 GB' },
  'call-of-duty-modern-warfare-2-campaign-remastered': { cn: '使命召唤：现代战争 2 战役重置版', genre: '第一人称射击 / 战术突袭', ram: '8 GB' },
  'call-of-duty-black-ops-3': { cn: '使命召唤：黑色行动 3', genre: '第一人称射击 / 未来科幻', ram: '8 GB' },
  'cricket-26-the-official-game-of-the-ashes': { cn: '板球 26：灰烬杯官方版', genre: '体育竞技 / 板球模拟', ram: '8 GB' },
  'detroit-become-human': { cn: '底特律：化身为人', genre: '互动电影 / 科幻叙事', ram: '16 GB' },
  'call-of-duty-black-ops-6': { cn: '使命召唤：黑色行动 6', genre: '第一人称射击 / 谍战特工', ram: '16 GB' },
  'roomgirl-paradise': { cn: 'RoomGirl：乐园', genre: '生活模拟 / 角色互动', ram: '8 GB' },
  'gym-manager': { cn: '健身房经理模拟器', genre: '模拟经营 / 商业建设', ram: '8 GB' },
  'reanimal': { cn: '心灵再醒 (REANIMAL)', genre: '合作冒险 / 黑暗惊悚', ram: '16 GB' },
  'mortal-kombat-11': { cn: '真人快打 11：终极版', genre: '硬派格斗 / 竞技对战', ram: '8 GB' },
  'elden-ring-nightreign': { cn: '艾尔登法环：夜宴统治', genre: '魂系角色扮演 / 暗黑神话', ram: '16 GB' },
  'far-cry-3-duology': { cn: '孤岛惊魂 3：双部曲典藏版', genre: '第一人称射击 / 疯狂海岛', ram: '8 GB' },
  'clair-obscur-expedition-33': { cn: '光与影：33号远征队', genre: '回合制动作角色扮演 / 法式奇幻', ram: '16 GB' },
  'ready-or-not': { cn: '严阵以待 (Ready or Not)', genre: '战术射击 / 反恐拟真', ram: '16 GB' },
  'baldurs-gate-3': { cn: '博德之门 3：数字豪华最终版', genre: 'CRPG角色扮演 / 奇幻史诗', ram: '16 GB' },
  'granblue-fantasy-relink': { cn: '碧蓝幻想：Relink', genre: '日系动作角色扮演 / 团队狩猎', ram: '16 GB' },
  'grand-theft-auto-the-original-trilogy': { cn: '侠盗猎车手：原版经典三部曲', genre: '动作犯罪 / 经典沙盒', ram: '8 GB' },
  'assassins-creed-unity-v1-5-0-dlcs': { cn: '刺客信条：大革命 完全版', genre: '动作潜行 / 法国大革命', ram: '8 GB' },
  'far-cry-4-gold-edition': { cn: '孤岛惊魂 4：黄金版', genre: '第一人称射击 / 喜马拉雅雪峰', ram: '8 GB' },
  'naruto-x-boruto-ultimate-ninja-storm-connections': { cn: '火影忍者：终极风暴羁绊', genre: '动漫格斗 / 忍术对战', ram: '8 GB' },
  'watch-dogs-v1-06-329-all-dlcs': { cn: '看门狗 1：完全版', genre: '黑客动作 / 芝加哥开放世界', ram: '8 GB' },
  'tekken-7-ultimate-edition': { cn: '铁拳 7：终极版', genre: '格斗对战 / 3D竞技', ram: '8 GB' },
  'lust-n-dead': { cn: '末日亡者行', genre: '丧尸生存 / 角色扮演', ram: '8 GB' },
  'star-wars-outlaws': { cn: '星球大战：亡命之徒', genre: '开放世界 / 银河走私冒险', ram: '16 GB' },
  'the-elder-scrolls-v-skyrim-anniversary-edition': { cn: '上古卷轴 5：天际 周年纪念版', genre: '开放世界 / 魔幻史诗RPG', ram: '8 GB' },
  'assassins-creed-3-remastered': { cn: '刺客信条 3：高清重置版', genre: '动作冒险 / 美国独立战争', ram: '8 GB' },
  'taboo-trial': { cn: '禁忌试炼', genre: 'Roguelike / 动作割草', ram: '8 GB' },
  'max-payne-3-complete-edition': { cn: '马克思佩恩 3：完全版', genre: '子弹时间 / 电影级射击', ram: '8 GB' },
  'call-duty-black-ops-dlcs-zombies-multiplayer': { cn: '使命召唤 7：黑色行动 僵尸全集', genre: '第一人称射击 / 冷战谍战', ram: '8 GB' },
  'tomb-raider-definitive-edition': { cn: '古墓丽影 9：决定版', genre: '动作生存 / 探险解谜', ram: '8 GB' },
  'violet': { cn: '薇奥莉特', genre: '心理悬疑 / 叙事解谜', ram: '8 GB' },
  'batman-arkham-city-game-year-edition': { cn: '蝙蝠侠：阿卡姆之城 年度版', genre: '动作格斗 / 超级英雄', ram: '8 GB' },
  'dark-souls-3': { cn: '黑暗之魂 3：灭火版', genre: '硬核受死 / 暗黑奇幻RPG', ram: '8 GB' },
  'horizon-forbidden-west-complete-edition-v1-0-38-0-hotfix-all-dlcs-bonus-content-fsr3-mod': { cn: '地平线：西之绝境 完全版', genre: '开放世界 / 机械巨兽狩猎', ram: '16 GB' },
  'need-for-speed-heat': { cn: '极品飞车：热度 豪华版', genre: '街头赛车 / 警匪狂飙', ram: '16 GB' },
  'call-of-duty-vanguard': { cn: '使命召唤：先锋', genre: '第一人称射击 / 全球战区', ram: '12 GB' },
  'hitman-3': { cn: '杀手 3 (HITMAN 3)', genre: '潜行暗杀 / 沙盒刺杀', ram: '16 GB' },
  'assassins-creed-valhalla': { cn: '刺客信条：英灵殿 完全版', genre: '动作角色扮演 / 维京史诗', ram: '16 GB' },
  'star-wars-zero-company': { cn: '星球大战：零号连队', genre: '战术射击 / 银河特遣队', ram: '16 GB' }
};

// Fallback logic to generate readable Chinese name if not explicitly in table
function getChineseTitle(slug, rawTitle) {
  if (titleDict[slug]) return titleDict[slug].cn;
  
  // Clean up title
  let clean = rawTitle.split(' - ')[0].split(': ')[0];
  clean = clean.replace(/&#039;/g, "'").replace(/&quot;/g, '"');
  return clean;
}

function getGenre(slug) {
  if (titleDict[slug]) return titleDict[slug].genre;
  return '动作冒险 / 精品大作';
}

function getRam(slug) {
  if (titleDict[slug]) return titleDict[slug].ram;
  return '16 GB';
}

// Generate the 150 dataset
const dataset = raw.map((item, index) => {
  const cnTitle = getChineseTitle(item.slug, item.title);
  const genre = getGenre(item.slug);
  const ram = getRam(item.slug);

  // Extract clean English title and version
  let enTitle = item.title.replace(/&#039;/g, "'").replace(/&quot;/g, '"');
  let version = '';
  if (enTitle.includes(' - ')) {
    const parts = enTitle.split(' - ');
    enTitle = parts[0];
    version = parts.slice(1).join(' - ');
  }

  // Thumb local path
  const thumbFilename = `${String(index + 1).padStart(3, '0')}-${item.slug}.webp`;
  const localThumb = `/games/thumbs/${thumbFilename}`;

  // Link to detail page:
  // For top 8, we have dedicated films/slug.html. For others, we can link to films/slug.html as well!
  const detailLink = `/films/${item.slug}`;

  return {
    id: index + 1,
    slug: item.slug,
    cnTitle,
    enTitle,
    version: version || '最新完整版 + 整合全部DLC',
    genre,
    category: genre.split(' / ')[0],
    ram,
    rawThumb: item.thumb,
    localThumb,
    fitgirlUrl: item.url,
    steamUrl: `https://store.steampowered.com/search/?term=${encodeURIComponent(enTitle)}`,
    detailLink
  };
});

fs.writeFileSync('games_150_fitgirl.json', JSON.stringify(dataset, null, 2), 'utf8');
console.log(`✓ Built games_150_fitgirl.json with ${dataset.length} games.`);
