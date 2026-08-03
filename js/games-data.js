/* ============================================================
 *  🎮 游戏仓库 · 内容配置文件
 * ------------------------------------------------------------
 *  你只需要改这一个文件，就能更新整个网站的内容！
 *
 *  ★ 添加一款游戏只需 3 步：
 *    1. 把图片（jpg/png/webp）放进  assets/games/  文件夹
 *    2. 在下面 GAMES 数组里复制一段 { ... } 并改成你的信息
 *    3. 刷新浏览器即可看到效果
 *
 *  字段说明：
 *    name    游戏中文名（必填，浮层大标题）
 *    name_en 英文名（选填，悬停时显示的巨型标题，不填则用中文名）
 *    genre   类型标签，如 "太空探索 RPG"
 *    year    年份
 *    desc    一句话简介（显示在详情浮层里）
 *    image   图片路径，相对 index.html，如 "assets/games/xxx.jpg"
 *    link    点击「查看资源」跳转的地址（下载页/商店页/官网）
 *
 *  数组顺序 = 画廊陈列顺序 = 时间线顺序。
 * ============================================================ */

window.SITE = {
  brand:     "游戏仓库",        // 左上角站名
  heroLine1: "GAME",          // 首页大字第一行
  heroLine2: "VAULT",         // 首页大字第二行
  cornerLeft:  "Since 2020...",           // 大字左下角小字
  cornerRight: "...Always Loading",       // 大字右下角小字
  footer:   "All rights reserved. ©2026 GameVault", // 底部小字
  email:    "hello@example.com",          // 点击「联系」时复制的邮箱
  timeZone: "Asia/Shanghai",  // 右上角时钟时区
  timeLabel: "CST",           // 时钟前缀
  theme:    "mono",           // 默认主题: "mono"=黑白 / "color"=幻彩

  /* —— 进阶：大卡片、低速、克制的交互手感 —— */
  tuning: {
    fluidity:    0.028,  // 运动缓动：降低后鼠标响应与形态切换都更从容
    spinSpeed:   0.03,   // 雕塑自转：极慢速环绕
    spreadX:     3.2,    // 时间线上每张卡片的间距
    sculptScale: 4.1,    // 环形/花形整体半径
    cardSize:    1.25,   // 3D 卡片尺寸缩小 80 倍（100 / 80 = 1.25）
    scrollStep:  0.0008, // 滚轮推进速度：大幅降低
    parallax:    0.32,   // 鼠标视差：克制、稳定
    bleach:      0.35    // 黑白模式的“洗白”程度(0~1)
  }
};

/* ============================================================
 *  游戏列表 —— 共 151 款（数据整理自 PC 近期热门游戏汇总帖的公开名单）
 *  追加新游戏：复制一行 { ... } 改内容即可，不用管顺序编号
 *  link 留空时详情浮层不显示按钮；可自行填写官网/商店页地址
 * ============================================================ */
/* ============================================================
 *  游戏列表 —— 共 151 款
 *  追加新游戏：复制一行 { ... } 改内容即可；
 *  link 可填官网/商店页地址，留空则详情浮层不显示按钮。
 * ============================================================ */
/* ============================================================
 *  游戏列表 —— 共 151 款（数据整理自公开热门游戏汇总名单）
 *  追加新游戏：复制一行 { ... } 改内容即可；
 *  link 可填官网/商店页地址，留空则详情浮层不显示按钮。
 * ============================================================ */
/* ============================================================
 *  游戏列表 —— 共 151 款（数据整理自公开热门游戏汇总名单）
 *  追加新游戏：复制一行 { ... } 改内容即可；
 *  link 可填官网/商店页地址，留空则详情浮层不显示按钮。
 *  image 为空的条目会显示灰色“名字占位卡”，补图后填入路径即可。
 * ============================================================ */
window.GAMES = [
  { name: "刺客信条 影", image: "assets/games/game-001.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "007 初露锋芒", image: "assets/games/game-002.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "歧路旅人0", image: "assets/games/game-003.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "深海迷航2", name_en: "Subnautica 2", image: "assets/games/game-004.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "识质存在", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "剑星", image: "assets/games/game-006.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "极限竞速 地平线6", image: "assets/games/game-007.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "死亡搁浅2 冥滩之上", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "生化危机9", image: "assets/games/game-009.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "杀戮尖塔2", name_en: "Slay the Spire 2", image: "assets/games/game-010.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "零～红蝶", name_en: "REMAKE", image: "assets/games/game-011.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "刺客信条 幻景", image: "assets/games/game-012.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "生灵重塑", image: "assets/games/game-013.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "暗黑破坏神2 狱火重生 重制版", image: "assets/games/game-014.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "仁王 3", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "真・三国无双 起源", image: "assets/games/game-016.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "生化危机4 重制版", image: "assets/games/game-017.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "三国志8 重制版 威力加强版", name_en: "ROMANCE OF THE THREE KINGDOMS 8 REMAKE", image: "assets/games/game-018.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "纪元1800", image: "assets/games/game-019.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "空洞骑士 丝之歌", name_en: "Hollow Knight: Silksong", image: "assets/games/game-020.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "女神异闻录5 皇家版", image: "assets/games/game-021.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "人中之龙０", image: "assets/games/game-022.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "战地风云™ 6", image: "assets/games/game-023.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "莱莎的炼金工房 秘密三部曲", name_en: "DX", image: "assets/games/game-024.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "闪电十一人 英雄们的胜利之路", image: "assets/games/game-025.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "天外世界2", name_en: "The Outer Worlds 2", image: "assets/games/game-026.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "空之轨迹", name_en: "THE 1ST", image: "assets/games/game-027.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "牧场物语 来吧! 风之繁华集市", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "欧陆风云5", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "忍者龙剑传4", image: "assets/games/game-030.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "宝可梦传说", name_en: "Z-A", image: "assets/games/game-031.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "双截龙 再临", image: "assets/games/game-032.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "小小梦魇3", image: "assets/games/game-033.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "寂静岭F", name_en: "SILENT HILL f", image: "assets/games/game-034.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "消逝的光芒 困兽", image: "assets/games/game-035.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "机甲战魔 神话之裔", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "帝国时代", name_en: "IV", image: "assets/games/game-037.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "失落之魂", image: "assets/games/game-038.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "地狱即我们", image: "assets/games/game-039.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "时间旅者 重生曙光", image: "assets/games/game-040.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "合金装备3 重制版", image: "assets/games/game-041.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "超级机器人大战Y", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "超级忍 反攻的斩击", image: "assets/games/game-043.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "祇 女神之道", name_en: "Kunitsu-Gami Path of the Goddess", image: "assets/games/game-044.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "啪嗒砰 1+2 重制版", image: "assets/games/game-045.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "多重人生", name_en: "The Alters", image: "assets/games/game-046.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "心之眼", name_en: "MindsEye", image: "assets/games/game-047.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "匹诺曹的谎言", name_en: "Lies of P", image: "assets/games/game-048.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "幻想生活i 转圈圈的龙和偷取时间的少女", image: "assets/games/game-049.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "艾尔登法环 黑夜君临", image: "assets/games/game-050.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "野狗子 裂头怪", image: "assets/games/game-051.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "光与影 33号远征队", image: "assets/games/game-052.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "上古卷轴IV 湮灭重制版", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "百日战纪 最终防卫学园", image: "assets/games/game-054.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "秘影曼德拉", image: "assets/games/game-055.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "勇闯死人谷 暗黑之日", image: "assets/games/game-056.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "最后生还者2 复刻版", name_en: "The Last of Us Part II Remastered", image: "assets/games/game-057.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "苏丹的游戏", image: "assets/games/game-058.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "云族裔", name_en: "inZOI", image: "assets/games/game-059.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "BLEACH 魂魄觉醒", image: "assets/games/game-060.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "优米雅的炼金工房 追忆之炼金术士与幻创之地", image: "assets/games/game-061.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "浪人崛起", image: "assets/games/game-062.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "双影奇境", image: "assets/games/game-063.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "切尔诺贝利人2 禁区", image: "assets/games/game-064.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "最终幻想16", image: "assets/games/game-065.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "圣剑传说", name_en: "Visions of Mana", image: "assets/games/game-066.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "宣誓", name_en: "Avowed", image: "assets/games/game-067.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "无双深渊", image: "assets/games/game-068.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "天国 拯救2 黄金版", image: "assets/games/game-069.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "忍者龙剑传2 黑之章", name_en: "NINJA GAIDEN 2 Black", image: "assets/games/game-070.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "最终幻想7 重生", name_en: "FINAL FANTASY VII REBIRTH", image: "assets/games/game-071.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "漫威蜘蛛侠2", image: "assets/games/game-072.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "自杀小队 消灭正义联盟", image: "assets/games/game-073.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "龙之信条2", name_en: "Dragon's Dogma 2", image: "assets/games/game-074.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "龙腾世纪™: 影障守护者", image: "assets/games/game-075.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "七龙珠 电光炸裂！", name_en: "ZERO", image: "assets/games/game-076.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "寂静岭2 重制版", name_en: "SILENT HILL 2", image: "assets/games/game-077.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "战神 诸神黄昏", image: "assets/games/game-078.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "战锤40K:星际战士2", name_en: "Warhammer 40,000 Space Marine 2", image: "assets/games/game-079.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "冰汽时代2", image: "assets/games/game-080.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "直到黎明", name_en: "Until Dawn™", image: "assets/games/game-081.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "刀剑神域 碎梦边境", image: "assets/games/game-082.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "战锤40K：行商浪人", image: "assets/games/game-083.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "奇迹时代4", image: "assets/games/game-084.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "十字军之王3 皇家版", name_en: "Crusader Kings III", image: "assets/games/game-085.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "艾尔登法环 黄金树幽影", image: "assets/games/game-086.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "对马岛之魂", name_en: "Ghost of Tsushima DIRECTOR", image: "assets/games/game-087.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "心灵杀手2", image: "assets/games/game-088.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "哈迪斯2", name_en: "Hades II", image: "assets/games/game-089.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "庄园领主", image: "assets/games/game-090.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "恶意不息", image: "assets/games/game-091.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "木卫四协议", image: "assets/games/game-092.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "重装前哨", image: "assets/games/game-093.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "遗迹传说", name_en: "HD", image: "assets/games/game-094.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "雾锁王国", image: "assets/games/game-095.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "最后纪元", image: "assets/games/game-096.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "幻兽帕鲁", name_en: "Palworld", image: "assets/games/game-097.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "赵云传 重制版", name_en: "Zhao Yun", image: "assets/games/game-098.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "都市 天际线2", image: "assets/games/game-099.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "幽灵行者2", image: "assets/games/game-100.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "堕落之主", image: "assets/games/game-101.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "赛博朋克2077 往日之影", image: "assets/games/game-102.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "星空", name_en: "Starfield", image: "assets/games/game-103.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "星之海", name_en: "Sea of Stars", image: "assets/games/game-104.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "机战佣兵 VI 境界天火", image: "assets/games/game-105.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "博德之门3", image: "assets/games/game-106.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "八方旅人2", name_en: "OCTOPATH TRAVELER II", image: "assets/games/game-107.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "尘封大陆", image: "assets/games/game-108.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "遗迹2 终极版", name_en: "Remnant II", image: "assets/games/game-109.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "魔咒之地 豪华版", image: "assets/games/game-110.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "信长之野望 新生 威力加强版", name_en: "NOBUNAGA'S AMBITION Awakening", image: "assets/games/game-111.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "潜水员戴夫", image: "assets/games/game-112.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "三国立志传3", image: "assets/games/game-113.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "卡库远古封印", image: "assets/games/game-114.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "帶我去地下城吧", image: "assets/games/game-115.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "瑞奇与叮当 时空跳转", image: "assets/games/game-116.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "狂想乐园", image: "assets/games/game-117.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "塞尔达传说 王国之泪", image: "", genre: "", year: "", desc: "", link: "" },
  { name: "蛇上而生", image: "assets/games/game-119.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "暗黑地牢2", name_en: "Darkest Dungeon II", image: "assets/games/game-120.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "星之海洋6 神圣力量", image: "assets/games/game-121.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "小缇娜的奇幻之地", image: "assets/games/game-122.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "最后生还者 第一部", name_en: "The Last of Us Part I", image: "assets/games/game-123.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "卧龙 苍天陨落", name_en: "Wo Long: Fallen Dynasty", image: "assets/games/game-124.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "莱莎的炼金工房3", image: "assets/games/game-125.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "刺客信条 英灵殿完全版", name_en: "Assassin’s Creed: Valhalla Complete Edition", image: "assets/games/game-126.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "三角战略", name_en: "TRIANGLE STRATEGY", image: "assets/games/game-127.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "森林之子", name_en: "Sons Of The Forest", image: "assets/games/game-128.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "生化危机8 村庄", name_en: "Resident Evil Village", image: "assets/games/game-129.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "极限竞速 地平线5 顶级版", image: "assets/games/game-130.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "维多利亚3", name_en: "Victoria 3", image: "assets/games/game-131.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "消失的光芒2 人与仁之战终极版", image: "assets/games/game-132.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "霍格沃茨之遗", name_en: "Hogwarts Legacy", image: "assets/games/game-133.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "原子之心", name_en: "Atomic Heart", image: "assets/games/game-134.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "光环 士官长合集", name_en: "Halo The Master Chief Collection", image: "assets/games/game-135.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "最终幻想7 核心危机 重聚 CRISIS CORE –FINAL FANTASY VII–", name_en: "REUNION", image: "assets/games/game-136.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "狂野之心", name_en: "WILD HEARTS", image: "assets/games/game-137.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "零 月蚀的假面", name_en: "Fatal Frame: Mask of the Lunar Eclipse", image: "assets/games/game-138.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "北欧女神 极乐世界", name_en: "VALKYRIE ELYSIUM", image: "assets/games/game-139.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "死亡回归", name_en: "Returnal", image: "assets/games/game-140.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "骑马与砍杀2 霸主", name_en: "Mount & Blade II: Bannerlord", image: "assets/games/game-141.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "拳皇15", name_en: "THE KING OF FIGHTERS XV", image: "assets/games/game-142.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "漫威蜘蛛侠 重制版", name_en: "Marvel s Spider-Man Remastered", image: "assets/games/game-143.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "艾尔登法环豪华版", name_en: "Elden Ring Deluxe Edition", image: "assets/games/game-144.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "亚瑟王 骑士传说", name_en: "King Arthur: Knight’s Tale", image: "assets/games/game-145.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "开拓者 正义之怒", name_en: "Pathfinder: Wrath of the Righteous", image: "assets/games/game-146.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "龙珠 超宇宙2", name_en: "DRAGON BALL XENOVERSE 2", image: "assets/games/game-147.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "X4 基石 X4 基奠", name_en: "X4: Foundations", image: "assets/games/game-148.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "巫师3 狂猎次世代版", name_en: "The Witcher 3: Wild Hunt", image: "assets/games/game-149.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "半条命 爱莉克斯", name_en: "Half-Life: Alyx", image: "assets/games/game-150.jpg", genre: "", year: "", desc: "", link: "" },
  { name: "文明6", name_en: "Civilization VI", image: "assets/games/game-151.jpg", genre: "", year: "", desc: "", link: "" }
];
