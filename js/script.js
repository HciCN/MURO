/* ==========================================================================
   慕容子诚 个人网站 & 3D粒子音乐空间 - 核心交互大脑
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. 真实音乐数据定义 (更新为 assets/music 目录下的 4 首 m4a 文件)
  // ==========================================================================
  const MUSIC_LIST = [
    { 
      title: "海屿你 (emo降速版)", 
      artist: "沉浸特调", 
      src: "assets/music/沉浸0.8X/海屿你(emo版).m4a", 
      shape: 0, // 对应：星盘 (落地特效默认改为星盘)
      lyrics: [
        { time: 0, text: "（LeaperX 特调：海屿你 emo降速版）" },
        { time: 6, text: "海风吹过岛屿 像你在耳边的呼吸" },
        { time: 16, text: "我把所有秘密 都藏在深海里" },
        { time: 27, text: "你是遥远的星辰 照亮我的孤寂" },
        { time: 38, text: "可我只是礁石 无法向你游去" },
        { time: 49, text: "潮起潮落 都是爱你的痕迹" },
        { time: 60, text: "如果大海有记忆 请带走这期许" },
        { time: 75, text: "随海面波動起伏..." }
      ]
    },
    { 
      title: "后来我们的爱 (DJAh版)", 
      artist: "苏星婕", 
      src: "assets/music/沉浸0.8X/后来我们的爱(DJAh版)-苏星婕.m4a", 
      shape: 5, // 对应：波动面
      lyrics: [
        { time: 0, text: "（苏星婕 - 后来我们的爱）" },
        { time: 6, text: "后来我们的爱 飘散在人海" },
        { time: 15, text: "像断了线的风筝 无法再回来" },
        { time: 25, text: "记忆中的笑脸 渐渐被掩埋" },
        { time: 35, text: "只剩下遗憾 在风中摇摆" },
        { time: 45, text: "如果当初我们 能够多些信赖" },
        { time: 55, text: "结局会不会 变成另外的色彩" },
        { time: 70, text: "随波动平面感应节拍..." }
      ]
    },
    { 
      title: "失眠了", 
      artist: "吴琳珂Moske", 
      src: "assets/music/沉浸0.8X/失眠了-吴琳珂Moske.m4a", 
      shape: 6, // 对应：神经网络
      lyrics: [
        { time: 0, text: "（吴琳珂Moske - 失眠了）" },
        { time: 5, text: "在这个漫长的夜里 我又失眠了" },
        { time: 14, text: "脑海中全都是 属于我们的时刻" },
        { time: 24, text: "时钟嘀嗒走着 寂寞在拉扯" },
        { time: 34, text: "空荡荡的房间 只有微风吹过" },
        { time: 45, text: "你在的地方 是不是也亮着灯" },
        { time: 56, text: "思念在黑夜里 渐渐失控" },
        { time: 72, text: "神经网络节点跳跃中..." }
      ]
    },
    { 
      title: "偏爱 (沉浸降速版)", 
      artist: "沉浸特调", 
      src: "assets/music/沉浸0.8X/偏爱.m4a", 
      shape: 2, // 对应：心动
      lyrics: [
        { time: 0, text: "（LeaperX 特调：偏爱 降速沉浸版）" },
        { time: 7, text: "把昨天都作废 现在开始越界" },
        { time: 18, text: "一百个美梦代替一个坚决" },
        { time: 29, text: "爱到妥协 到头来还是偏爱" },
        { time: 40, text: "我寻找的终点 只有你的视线" },
        { time: 52, text: "不顾一切的执着 是我的誓言" },
        { time: 65, text: "任凭风雨吹不散 我们的明天" },
        { time: 80, text: "沉浸粒子律动中..." }
      ]
    },
    { 
      title: "恋人 (2025演唱会合肥站)", 
      artist: "李荣浩", 
      src: "assets/music/沉浸0.8X/恋人(2025黑马世界巡回演唱会合肥站)-李荣浩.m4a", 
      shape: 2, // 对应：心动
      lyrics: [
        { time: 0, text: "（李荣浩 - 恋人 2025合肥站现场）" },
        { time: 8, text: "我们都是普通人 却有着不平凡的温存" },
        { time: 19, text: "在拥挤的人潮里 牵手就感觉安稳" },
        { time: 31, text: "做你的恋人 是最幸运的事情" },
        { time: 43, text: "哪怕风雨再大 也有温暖的风景" },
        { time: 55, text: "合肥的夜空 记录下这歌声" },
        { time: 68, text: "你就是我 唯一的可能" },
        { time: 84, text: "随心律粒子深度沉浸..." }
      ]
    },
    { 
      title: "爱如潮水 (慢摇氛围版)", 
      artist: "沉浸氛围", 
      src: "assets/music/沉浸0.8X/爱如潮水.m4a", 
      shape: 6, // 对应：神经网络
      lyrics: [
        { time: 0, text: "（沉浸氛围：爱如潮水 慢摇版）" },
        { time: 8, text: "既然爱已成既然 随潮水渐渐飘散" },
        { time: 19, text: "不要问我一生 究竟为谁而伤感" },
        { time: 31, text: "我的爱如潮水 将我紧紧包围" },
        { time: 42, text: "在冷风吹过的街 还有谁能相随" },
        { time: 54, text: "释怀了所有 痛与泪的滋味" },
        { time: 66, text: "就让这节拍 带走所有疲惫" },
        { time: 82, text: "神经网络脉冲响应中..." }
      ]
    },
    { 
      title: "红色高跟鞋 (0.88x)", 
      artist: "沉浸特调", 
      src: "assets/music/沉浸0.8X/红色高跟鞋(0.88x).m4a", 
      shape: 3, // 对应：立方体
      lyrics: [
        { time: 0, text: "（LeaperX 特调：红色高跟鞋 0.88x）" },
        { time: 7, text: "该怎么去形容你 最贴切" },
        { time: 16, text: "拿什么去比拟你 最特别" },
        { time: 27, text: "你像一双 特调的红色高跟鞋" },
        { time: 37, text: "让我每一步 都走得如此热烈" },
        { time: 47, text: "无法抗拒的 优雅与洒脱" },
        { time: 58, text: "这节奏 让人着迷又惶惑" },
        { time: 73, text: "立方体粒子高速交错..." }
      ]
    },
    { 
      title: "罗生门 (Follow)", 
      artist: "沉浸氛围", 
      src: "assets/music/沉浸0.8X/罗生门(Follow).m4a -Audio File.mp3", 
      shape: 0, // 对应：星盘
      lyrics: [
        { time: 0, text: "（沉浸氛围：罗生门 Follow）" },
        { time: 6, text: "真真假假 的对白 在空气中散开" },
        { time: 15, text: "我们都在各自的 罗生门里徘徊" },
        { time: 25, text: "到底什么是爱 谁又能说个明白" },
        { time: 36, text: "只剩下无声的 叹息和等待" },
        { time: 47, text: "跟着这节拍 拨开迷雾的阻碍" },
        { time: 58, text: "寻找那一抹 属于真实的色彩" },
        { time: 72, text: "星盘银河旋转中..." }
      ]
    },
    { 
      title: "雨过后的风景 (全感官版)", 
      artist: "沉浸氛围", 
      src: "assets/music/沉浸0.8X/雨过后的风景.m4a", 
      shape: 1, // 对应：DNA
      lyrics: [
        { time: 0, text: "（沉浸空间：雨过后的风景 全感官）" },
        { time: 7, text: "雨水洗刷过 街道的泥泞" },
        { time: 17, text: "微风带来 泥土特有的清醒" },
        { time: 28, text: "看彩虹 挂在遥远的天空" },
        { time: 39, text: "那是雨过天晴后 温暖的风景" },
        { time: 50, text: "告别了阴霾 迎来一缕光影" },
        { time: 61, text: "每一步 都是向着美好的远行" },
        { time: 76, text: "双螺旋粒子优雅旋转..." }
      ]
    }
  ];

  // ==========================================================================
  // 2. 静态页面数据 (资源、教程、壁纸数据源)
  // ==========================================================================
  const RESOURCES = [
    {
      title: "AI 大模型全套一键部署与调优包",
      category: "AI & MODEL",
      desc: "包含 DeepSeek-R1、Llama3 等开源大模型的本地一键部署脚本、显存极致优化配置与 API 对接代码。附带 WebUI 界面，零基础也可用本地私有大模型。",
      size: "45.8 MB",
      version: "v2.0",
      tag: "recommend",
      tagText: "REC",
      file: "deepseek_llama_local_deploy.zip"
    },
    {
      title: "2026 全网副业搞钱与数字游民实操指南",
      category: "SIDE HUSTLE",
      desc: "汇总全网最新最火的 AI 辅助写作、短视频自动化出片、海外接单等 20 个搞钱路线，包含完整商业闭环案例、提现流程及全套提效工具配置。",
      size: "8.2 MB",
      version: "v5.5",
      tag: "hot",
      tagText: "HOT",
      file: "side_hustle_hacker_guide.zip"
    },
    {
      title: "结构化 Prompt 万能卡片与提示词库",
      category: "PROMPT CRAFT",
      desc: "精选全网最热门的 150+ 结构化 Prompt（基于 XML/Markdown 混合规范），覆盖代码生成、学术润色、角色扮演、营销文案等场景。Claude 3.5 & GPT-4o 深度优化版。",
      size: "3.4 MB",
      version: "v4.2",
      tag: "recommend",
      tagText: "REC",
      file: "ultimate_prompt_library.zip"
    },
    {
      title: "全平台创作者全自动分发与引流工作流",
      category: "CREATOR FLOW",
      desc: "使用 Make/n8n 搭建的零代码全自动分发系统。从 Notion 或 Markdown 自动转换排版并一键多发至小红书、公众号、B站、X 等，支持 AI 智能生成摘要与封面图。",
      size: "1.8 MB",
      version: "v2.1",
      tag: "hot",
      tagText: "HOT",
      file: "auto_creator_workflow.zip"
    }
  ];

  const TUTORIALS = [
    {
      title: "构建你的首个 AI 智能体工作流：实现每日信息自动筛选与提炼",
      category: "LEAPERX.AI / 前沿科技",
      date: "2026-05-28",
      icon: "🤖",
      excerpt: "手把手教你如何将大语言模型与网络爬虫、自动化工具连接，搭建专属于你的 AI 行业趋势智能过滤器，摆脱无用信息焦虑。",
      content: `
        <p><strong>第一步：定义你的信息源（Feeds）</strong><br>我们并不缺信息，缺的是高质量的信息。推荐使用 RSS 抓取或 Newsletter 订阅，汇总行业内顶尖的 5-10 个前沿科技周刊，把这些数据源统一推送到 Notion 数据库中。</p>
        <p><strong>第二步：选择你的自动化工具</strong><br>我们使用 <strong>Make</strong> 或开源的 <strong>n8n</strong> 作为连接器，监控 Notion 中新增的未读文章链接。当检测到新内容时，触发爬虫节点将正文抓取下来。</p>
        <p><strong>第三步：注入核心结构化 Prompt</strong><br>使用 Claude 的 API 连接到工作流，将正文 and 以下 Prompt 传给模型：<br>
        <div class="code-block">
# 角色：首席 AI 趋势分析师
# 任务：分析提供的文本，提取以下结构化要点：
1. 核心技术突破或产品发布（What）
2. 这一事件对普通开发者或个人的红利点（Impact）
3. 我们可以立即执行的实践建议（Action）</div></p>
        <p><strong>第四步：多渠道推送</strong><br>
        大模型处理完毕后，将提炼后的简报自动推送到你的微信、飞书或 Telegram 频道，每天早晨自动呈现，真正实现从信息焦虑向结构化知识获取的跃迁。
        </p>
        <p><strong>⚠️ LeaperX 的实践避坑建议：</strong><br>
        • 不要试图让 AI 处理太长的书籍，专注于 3000 字以内的优质文章。<br>
        • 定期清理不活跃的信息源，保持输入质量是决定输出好坏的 80% 因素。<br>
        • 不要把过滤逻辑变得过于繁琐，保持工作流的轻量和克制。
        </p>
      `
    },
    {
      title: "结构化 Prompt 的黄金法则：如何像配置代码一样配置 AI",
      category: "PROMPT CRAFT / 精益生产",
      date: "2026-05-27",
      icon: "✍️",
      excerpt: "别再用聊天的方式写 Prompt。本文将介绍如何使用 XML 标签和 Markdown 结构来锁定 AI 的角色、输出格式与边界条件。",
      content: `
        <p>在和 GPT-4o 或 Claude 3.5 交互时，自然语言的模糊性经常导致输出结果不稳定。要获得 100% 可预测的输出，我们需要像写代码一样写 Prompt。这就是<strong>结构化 Prompt</strong> 的魅力。</p>
        <p><strong>三大黄金结构规范：</strong></p>
        <p>1. <strong>角色与上下文定义 (Context)</strong>：不要仅仅说“你是一个翻译官”，而要说明它的背景、受众和偏好。例如：</p>
        <div class="code-block">
&lt;Role&gt;你是一个拥有 10 年经验的科技博客译者，擅长将复杂的硅谷术语转化为接地气的中文表述。&lt;/Role&gt;</div>
        <p>2. <strong>明确的数据输入与约束 (Constraint)</strong>：使用标签包裹输入文本和禁止事项。例如：</p>
        <div class="code-block">
&lt;Constraints&gt;
- 禁止使用“众所周知”、“如前所述”等套话。
- 所有的英文专有名词在首次出现时，必须在括号中附带英文原词。
&lt;/Constraints&gt;</div>
        <p>3. <strong>输出格式范式 (Output Format)</strong>：给大模型一个空的 JSON 结构或 Markdown 模版，让它直接填空，这能够极大地提升提取数据的可靠性，使得输出完美契合下游软件的解析规范。
        </p>
      `
    },
    {
      title: "跨界终身学习者的个人知识库体系搭建实践",
      category: "LEAPERX.GROW / 个人成长",
      date: "2026-05-26",
      icon: "📚",
      excerpt: "介绍基于 PARA 框架和渐进式总结法的知识库构建指南。如何让知识在实践中产生质的飞跃（Leap），而非在收藏夹里吃灰。",
      content: `
        <p>很多人热衷于收藏干货，但“收藏从未停止，行动从未开始”。要实现认知跃迁，我们需要建立一个以<strong>行动</strong>为导向的个人知识库系统。以下是基于经典的 PARA 框架构建的知识系统：</p>
        <p><strong>1. 理解 PARA 架构：</strong><br>
        • <strong>P (Projects) 项目</strong>：当前正在进行的、有明确截止日期和目标的任务（例如：下周的演讲稿、开发这个品牌网站）。<br>
        • <strong>A (Areas) 领域</strong>：需要长期保持高水准的责任范围（例如：身体健康、个人理财、AI 学习）。<br>
        • <strong>R (Resources) 资源</strong>：你感兴趣的、未来可能有用的素材或参考资料（例如：PPT 模板、CSS 技巧）。<br>
        • <strong>A (Archives) 归档</strong>：已经完成的项目或不再活跃的领域，放入归档库，腾出大脑空间。
        </p>
        <p><strong>2. 渐进式总结法 (Progressive Summarization)：</strong><br>
        当我们阅读一篇好文章时，不要指望以后会重读全文。我们需要通过 4 个步骤进行提炼：<br>
        • 第一层：保留原文。<br>
        • 第二层：粗体加粗关键句子。<br>
        • 第三层：对加粗部分中最重要的内容进行高亮黄标。<br>
        • 第四层：用自己的话在文首写出 3 句话的极简摘要（Executive Summary）。<br>
        只有当你需要用到它时，才进行更深层次的提炼，避免在无意义的知识整理上浪费过多精力。
        </p>
      `
    }
  ];


  // ==========================================================================
  // 3. WebGL 3D 粒子系统 (由 Three.js GLSL 着色器驱动，包含音频律动与形变)
  // ==========================================================================
  let scene, camera, renderer, particleGeometry, particleMaterial, particles;
  let currentShape = 0; // 0:星盘, 1:立方体, 2:涡流, 3:波动面, 4:神经网络
  let targetShape = 0;
  let morphProgress = 0;
  let isTransitioning = false;
  let mouse = null;
  let targetMouse = null;
  
  // 动态粒子载荷：移动端减额防止发热卡顿，PC端拉满效果
  const isMobileDevice = window.innerWidth < 768;
  const particleCount = isMobileDevice ? 35000 : 90000;

  function init3DParticleSystem() {
    if (typeof THREE === 'undefined') {
      console.warn("Three.js 库未载入，3D粒子背景不可用。");
      return;
    }

    const canvasContainer = document.getElementById('bg-canvas');
    if (!canvasContainer) return;

    mouse = new THREE.Vector2(0, 0);
    targetMouse = new THREE.Vector2(0, 0);

    // 1. 初始化场景
    scene = new THREE.Scene();

    // 2. 初始化透视相机
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    function adjustCameraDistance() {
      const aspect = window.innerWidth / window.innerHeight;
      const extent = 32.0;
      const fovRad = (camera.fov * Math.PI) / 180;
      let zDist = extent / Math.tan(fovRad / 2);
      
      if (aspect < 1.0) {
        zDist /= aspect; // 手机竖屏时往后拉，确保粒子形态完整收入视口
      }
      camera.position.z = zDist;
    }
    adjustCameraDistance();

    // 3. 初始化 WebGL 渲染器
    renderer = new THREE.WebGLRenderer({
      canvas: canvasContainer,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 移动端最高限制 1.5 渲染分辨率比率，彻底削减显卡开销，防发热
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // 4. 创建粒子几何缓存
    particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const ids = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      ids[i] = i / particleCount;
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('aId', new THREE.BufferAttribute(ids, 1));
    particleGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    // 5. 核心 Shader 着色器定制 (绑定 uAudioAmplitude 响应音乐律动)
    particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: 0.0 },
        uCurrentShape: { value: 0 },
        uTargetShape: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uAudioAmplitude: { value: 0.0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uMorphProgress;
        uniform int uCurrentShape;
        uniform int uTargetShape;
        uniform vec2 uMouse;
        uniform float uAudioAmplitude;

        attribute float aId;
        attribute vec3 aRandom;

        varying vec3 vColor;
        varying float vAlpha;

        #define PI 3.14159265359

        // 极光渐变调色公式
        vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
            return a + b*cos( 6.28318*(c*t+d) );
        }

        // Shape 0: 星盘银河
        vec3 getAstrolabe(float id, vec3 rnd) {
            vec3 pos;
            if (rnd.x > 0.3) {
                float t = id * PI * 2.0;
                float u = t * 13.0;
                float v = t * 8.0;
                float r = 12.0 + 3.0 * cos(v);
                pos = vec3(r * cos(u), r * sin(u), 4.0 * sin(v));
                float noiseAngle = rnd.y * PI * 2.0;
                float noiseRadius = rnd.z * 1.5;
                pos += vec3(cos(noiseAngle), sin(noiseAngle), cos(noiseAngle)) * noiseRadius;
            } else {
                float ringIdx = floor(rnd.y * 3.0);
                float angle = id * PI * 2.0 * 1000.0 + uTime * 0.15 * (ringIdx > 1.0 ? -1.0 : 1.0);
                float r = 24.0 + ringIdx * 4.0 + (rnd.z * 0.5);
                pos = vec3(r * cos(angle), (rnd.x - 0.15) * 2.0, r * sin(angle));
                float tilt = 0.5 + ringIdx * 0.8;
                float rotX = cos(tilt); float rotY = sin(tilt);
                pos.yz = mat2(rotX, -rotY, rotY, rotX) * pos.yz;
                pos.xy = mat2(rotX, -rotY, rotY, rotX) * pos.xy;
            }
            return pos * 1.25;
        }

        // Shape 1: 双螺旋 DNA (阶梯横档, 引入音频)
        vec3 getDNA(float id, vec3 rnd) {
            float h = (id - 0.5) * 75.0;
            float angle = h * 0.5 + uTime * 0.5 + uAudioAmplitude * 0.4;
            float radius = 15.0;
            
            float strand = step(0.5, rnd.x);
            angle += strand * PI;
            
            vec3 pos = vec3(cos(angle) * radius, h, sin(angle) * radius);
            
            float rungZone = fract(h * 0.5);
            if (rungZone < 0.15 && rnd.y > 0.4) {
                float span = (rnd.z * 2.0 - 1.0); 
                pos = vec3(span * cos(angle - strand*PI) * radius, h, span * sin(angle - strand*PI) * radius);
            } else {
                pos += (rnd - 0.5) * 1.2;
            }
            
            return pos;
        }

        // Shape 2: 心跳爱心律动 (经典的 3D 爱心方程)
        vec3 getHeart(float id, vec3 rnd) {
            float u = rnd.x * PI * 2.0;
            float v = acos(2.0 * rnd.y - 1.0);
            
            float x = 16.0 * pow(sin(u), 3.0);
            float y = 13.0 * cos(u) - 5.0 * cos(2.0 * u) - 2.0 * cos(3.0 * u) - cos(4.0 * u) + 3.0;
            float z = 5.0 * cos(v);
            
            vec3 pos = vec3(x, y, z);
            
            float layer = floor(rnd.z * 3.0); 
            float scale = 1.0 - (layer * 0.35);
            
            float beat = 1.0 + pow(sin(uTime * 3.0 - layer * 0.8), 8.0) * 0.12 + uAudioAmplitude * 0.38;
            
            return pos * scale * beat * 1.4;
        }

        // Shape 3: 四维立方体阵列
        vec3 getTesseract(float id, vec3 rnd) {
            float size = 34.0;
            float layer = floor(rnd.x * 3.0) + 1.0;
            float scale = layer / 3.0;
            float halfS = (size * scale) * 0.5;
            
            vec3 p = (rnd - 0.5) * (size * scale);
            float face = floor(rnd.y * 6.0);
            if (face == 0.0) p.x = halfS;
            else if (face == 1.0) p.x = -halfS;
            else if (face == 2.0) p.y = halfS;
            else if (face == 3.0) p.y = -halfS;
            else if (face == 4.0) p.z = halfS;
            else if (face == 5.0) p.z = -halfS;
            
            p += (rnd - 0.5) * 0.8;
            return p;
        }

        // Shape 4: 涡流隧道
        vec3 getVortex(float id, vec3 rnd) {
            float h = (id - 0.5) * 70.0; 
            float angle = h * 0.45 + uTime * 0.6 + (rnd.y * PI * 2.0);
            float radius = 12.0 + (35.0 - h) * 0.22 + rnd.x * 5.0;
            vec3 pos = vec3(cos(angle) * radius, h * 0.8, sin(angle) * radius);
            return pos;
        }

        // Shape 5: 全息波動平面
        vec3 getWave(float id, vec3 rnd) {
            float size = 46.0;
            float x = (rnd.x - 0.5) * size;
            float z = (rnd.y - 0.5) * size;
            float dist = length(vec2(x, z));
            float waveSpeed = uTime * 1.5;
            
            float y = sin(x * 0.35 + waveSpeed) * cos(z * 0.35 + waveSpeed) * (4.5 + uAudioAmplitude * 10.0);
            y += sin(dist * 0.5 - waveSpeed) * (1.5 + uAudioAmplitude * 3.5);
            return vec3(x, y, z);
        }

        // Shape 6: 神经网络球体
        vec3 getNeuralNetwork(float id, vec3 rnd) {
            float u = rnd.x * PI * 2.0;
            float v = acos(2.0 * rnd.y - 1.0);
            float r = 21.0;
            
            float pulse = sin(id * 100.0 + uTime * 2.0) * 0.6 + uAudioAmplitude * 5.0;
            vec3 pos = vec3(
                (r + pulse) * sin(v) * cos(u),
                (r + pulse) * sin(v) * sin(u),
                (r + pulse) * cos(v)
            );
            return pos;
        }

        vec3 getShapePosition(int shape, float id, vec3 rnd) {
            if (shape == 0) return getAstrolabe(id, rnd);
            if (shape == 1) return getDNA(id, rnd);
            if (shape == 2) return getHeart(id, rnd);
            if (shape == 3) return getTesseract(id, rnd);
            if (shape == 4) return getVortex(id, rnd);
            if (shape == 5) return getWave(id, rnd);
            if (shape == 6) return getNeuralNetwork(id, rnd);
            return vec3(0.0);
        }

        vec3 getShapeColor(int shape, float id, vec3 rnd) {
            float t = id * 2.0 + uTime * 0.05;
            
            if (shape == 0) { // 星盘：深邃幽蓝与暗红交织 (莫兰迪色系)
                vec3 base = palette(t, vec3(0.4, 0.4, 0.5), vec3(0.4, 0.4, 0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
                if (rnd.x > 0.85) return mix(vec3(0.85, 0.7, 0.3), vec3(0.85, 0.45, 0.15), rnd.y); // 雅致金橙点缀
                return base;
            }
            if (shape == 1) { // DNA：科技雅翠绿与半饱和青蓝
                float h = (id - 0.5) * 60.0;
                float rungZone = fract(h * 0.5);
                if (rungZone < 0.15 && rnd.y > 0.4) return vec3(0.0, 0.78, 0.42); // 科技雅翠绿
                return palette(id * 0.15, vec3(0.1, 0.5, 0.75), vec3(0.1, 0.35, 0.6), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.2, 0.4)); // 优雅莫兰迪蓝
            }
            if (shape == 2) { // 心动：柔和玫瑰粉与沉稳暗红
                float layer = floor(rnd.z * 3.0);
                if (layer == 2.0) return vec3(0.9, 0.35, 0.55); // 优雅玫瑰粉
                return mix(vec3(0.8, 0.1, 0.2), vec3(0.45, 0.05, 0.1), rnd.y); // 微熏玫瑰红
            }
            if (shape == 3) { // 立方体：科技赛博 (半饱和青蓝与亮金)
                vec3 base = palette(t + 0.2, vec3(0.4, 0.4, 0.4), vec3(0.4, 0.4, 0.4), vec3(2.0, 1.0, 0.0), vec3(0.0, 0.25, 0.25));
                return mix(base, vec3(0.1, 0.75, 0.75), rnd.y * 0.6); // 柔和蒂芙尼蓝
            }
            if (shape == 4) { // 涡流：琥珀熔岩风暴 (高级金褐与暗橙)
                vec3 base = palette(t * 1.5, vec3(0.65, 0.35, 0.12), vec3(0.4, 0.4, 0.4), vec3(1.0, 0.8, 0.6), vec3(0.0, 0.15, 0.3));
                return mix(base, vec3(0.85, 0.4, 0.08), sin(id * 10.0 + uTime * 0.5) * 0.5 + 0.5); // 优雅红橙
            }
            if (shape == 5) { // 波动：霓虹晚霞 (紫罗兰与冷调青橙)
                vec3 base = palette(t, vec3(0.45, 0.35, 0.5), vec3(0.4, 0.4, 0.4), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
                return mix(base, vec3(0.8, 0.35, 0.15), rnd.z * 0.4); // 雅致暖橙
            }
            if (shape == 6) { // 网络：脉冲网络 (半饱和紫与极光绿)
                vec3 base = palette(t - uTime * 0.1, vec3(0.4, 0.25, 0.6), vec3(0.4, 0.4, 0.4), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.2, 0.5));
                float pulse = sin(id * 100.0 - uTime * 4.0) * 0.5 + 0.5;
                return mix(base, vec3(0.1, 0.75, 0.5), pulse * 0.8); // 柔和极光绿
            }
            return vec3(0.5);
        }

        float cubicInOut(float t) {
            return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
        }

        void main() {
            vec3 p1 = getShapePosition(uCurrentShape, aId, aRandom);
            vec3 p2 = getShapePosition(uTargetShape, aId, aRandom);
            
            vec3 c1 = getShapeColor(uCurrentShape, aId, aRandom);
            vec3 c2 = getShapeColor(uTargetShape, aId, aRandom);

            float easedMorph = cubicInOut(uMorphProgress);
            vec3 finalPos = mix(p1, p2, easedMorph);
            
            // 漫游粒子（30% 比例，aRandom.x > 0.70），形成漫天星尘包裹感，铺满全屏
            if (aRandom.x > 0.70) {
                finalPos += vec3(
                    sin(uTime * 0.12 + aRandom.y * 100.0) * 25.0,
                    cos(uTime * 0.15 + aRandom.z * 100.0) * 18.0,
                    sin(uTime * 0.10 + aRandom.x * 100.0) * 25.0
                ) * (1.2 + uAudioAmplitude * 2.0);
            }

            // 形变过程中的粒子向外扩散环
            float breatheMask = sin(uMorphProgress * PI);
            finalPos += normalize(finalPos) * breatheMask * 8.0;

            // 音频律动位移
            float audioDeform = sin(uTime * 20.0 + aId * 60.0) * uAudioAmplitude * 4.2;
            finalPos += normalize(finalPos) * audioDeform;

            // 结合自旋和鼠标运动实现视差旋转
            float rotY = uTime * 0.04 + uMouse.x * 0.22;
            float rotX = uMouse.y * 0.22;
            
            float cY = cos(rotY); float sY = sin(rotY);
            mat3 rotMatY = mat3(cY, 0.0, sY, 0.0, 1.0, 0.0, -sY, 0.0, cY);
            
            float cX = cos(rotX); float sX = sin(rotX);
            mat3 rotMatX = mat3(1.0, 0.0, 0.0, 0.0, cX, -sX, 0.0, sX, cX);
            
            finalPos = rotMatY * rotMatX * finalPos;

            vColor = mix(c1, c2, easedMorph);
            
            // 降低高亮阈值，平滑粒子明暗过渡，防止 AdditiveBlending 堆叠爆白
            vAlpha = 0.3 + 0.7 * sin(uTime * 2.0 + aId * PI * 10.0);

            vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // 缩减粒子尺寸至温和区间（基础 2.0，振幅 4.8，倍率 38.0），避免音乐律动时粒子爆大刺眼
            gl_PointSize = (2.0 + aRandom.x * 2.2 + uAudioAmplitude * 4.8) * (38.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            // 平滑圆形模糊渲染，防止粒子有生硬的方形边界
            vec2 uv = gl_PointCoord.xy - vec2(0.5);
            float dist = length(uv);
            if (dist > 0.5) discard;
            
            float alpha = smoothstep(0.5, 0.08, dist);
            gl_FragColor = vec4(vColor, alpha * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 粒子整体倾斜/移位，适应移动端排版 (移至右下角后，全局居中最为完美)
    function updateParticleGroupPos() {
      particles.position.x = 0;
      particles.position.y = 0.0;
    }
    updateParticleGroupPos();

    // 6. 交互监听
    window.addEventListener('mousemove', (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('touchmove', (e) => {
      targetMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      adjustCameraDistance();
      updateParticleGroupPos();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 7. 粒子更新与形态差值时钟
    const clock = new THREE.Clock();

    function renderLoop() {
      requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // 鼠标插值过渡
      mouse.x += (targetMouse.x - mouse.x) * delta * 2.2;
      mouse.y += (targetMouse.y - mouse.y) * delta * 2.2;

      // 音频数据获取与平滑过渡
      if (analyser && frequencyData) {
        analyser.getByteFrequencyData(frequencyData);
        let sum = 0;
        // 提取前段强低音节奏频带
        const checkLen = Math.min(frequencyData.length, 12);
        for (let i = 0; i < checkLen; i++) {
          sum += frequencyData[i];
        }
        let norm = (sum / checkLen) / 255.0; // 0 到 1
        
        // 阻尼缓动
        currentAmplitude += (norm - currentAmplitude) * 0.18;
      } else {
        currentAmplitude = 0.0;
      }

      // 处理形态形变过渡
      if (isTransitioning) {
        morphProgress += delta * 0.65; // 插值过渡时间约 1.5 秒
        if (morphProgress >= 1.0) {
          morphProgress = 0;
          currentShape = targetShape;
          isTransitioning = false;
          updateDimensionControls(currentShape);
        }
      }

      particleMaterial.uniforms.uTime.value = elapsed;
      particleMaterial.uniforms.uMorphProgress.value = morphProgress;
      particleMaterial.uniforms.uCurrentShape.value = currentShape;
      particleMaterial.uniforms.uTargetShape.value = targetShape;
      particleMaterial.uniforms.uMouse.value.copy(mouse);
      particleMaterial.uniforms.uAudioAmplitude.value = currentAmplitude;

      renderer.render(scene, camera);
    }
    renderLoop();
  }

  function triggerMorphTo(shapeIdx) {
    if (isTransitioning || currentShape === shapeIdx) return;
    targetShape = shapeIdx;
    isTransitioning = true;
    morphProgress = 0;
  }

  function updateDimensionControls(shapeIdx) {
    // 1. 同步顶部导航栏按钮高亮
    const topBtns = document.querySelectorAll('.floating-engine-btn');
    topBtns.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-shape'));
      if (idx === shapeIdx) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. 同步右下角播放面板手动粒子按钮高亮
    const panelBtns = document.querySelectorAll('.mini-particle-btn');
    panelBtns.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-shape'));
      if (idx === shapeIdx) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 绑定所有粒子形态手动选择按钮（顶栏与播放面板微缩按钮的双向联动）
  const allShapeBtns = document.querySelectorAll('.floating-engine-btn, .mini-particle-btn');
  allShapeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止面板事件激活
      
      const idx = parseInt(btn.getAttribute('data-shape'));
      
      // 用户手动选择任何形态时，自动开启并锁死“自适应形态”状态
      isVisualizerMorphLocked = true;
      const lockBtn = document.getElementById('visualizer-toggle-btn');
      if (lockBtn) {
        lockBtn.classList.add('active-loop');
        lockBtn.title = "自适应形态已锁死";
      }

      // 触发 3D 转换过渡
      triggerMorphTo(idx);
      
      // 瞬间同步高亮两处的选择按钮
      updateDimensionControls(idx);
    });
  });

  // ==========================================================================
  // 4. 音频分析与播放列表管理 (Web Audio API & Android 友好型触摸激活机制)
  // ==========================================================================
  let audio = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;
  let loopMode = 'list'; // 'list' (列表), 'single' (单曲), 'random' (随机)
  let isVisualizerMorphLocked = false; // 是否锁定切歌形变开关

  let audioContext = null;
  let analyser = null;
  let mediaSource = null;
  let frequencyData = null;
  let currentAmplitude = 0.0;

  // ==========================================================================
  // 4.1 右下角常驻折叠悬浮控制器逻辑
  // ==========================================================================
  const consolePanel = document.getElementById('console-panel-trigger');
  const heroSection = document.getElementById('player-hero');
  const immersiveModeBtn = document.getElementById('immersive-mode-btn');
  const miniToggleBtn = document.getElementById('console-mini-toggle');
  const miniCollapseBtn = document.getElementById('console-mini-collapse');
  const miniDisplayTitle = document.getElementById('mini-display-title');
  
  let autoHideTimer = null;
  const HIDE_DELAY = 4500; // 展开态无交互 4.5 秒自动收起折叠，避免切歌或看歌词时收起过快
  let isImmersiveMode = true; // 沉浸自动隐藏模式开关
  let isMouseOverPanel = false; // 鼠标是否悬停在面板上

  // 极客感玻璃拟态 Toast 提示框
  function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.cyber-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `cyber-toast toast-${type}`;
    toast.innerHTML = `<i class="fas fa-cube" style="color: #e8401c; margin-right: 8px;"></i>${message}`;
    document.body.appendChild(toast);

    toast.offsetHeight;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 2500);
  }

  // 展开控制面板
  function expandConsolePanel(delay) {
    if (consolePanel) {
      consolePanel.classList.add('expanded');
      consolePanel.classList.remove('panel-hidden'); // 展开时必然 100% 亮度
    }
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      autoHideTimer = null;
    }
    
    // 如果音乐正在播放，且开启了沉浸模式，并且鼠标没有悬停在面板上，启动计时器
    if (isPlaying && isImmersiveMode && !isMouseOverPanel) {
      resetAutoHideTimer(delay);
    }
  }

  // 兼容性接口：使原有的 showConsolePanel 顺利跳转到 expandConsolePanel
  function showConsolePanel(delay) {
    expandConsolePanel(delay);
  }

  // 折叠收缩或半透明隐藏面板
  function hideConsolePanel() {
    // 防御检查：若处于暂停状态、关闭了沉浸开关、或者鼠标正悬停在面板上，绝对不执行折叠或隐藏
    if (!isPlaying || !isImmersiveMode || isMouseOverPanel) {
      if (consolePanel) {
        consolePanel.classList.remove('panel-hidden');
      }
      return;
    }
    
    if (consolePanel) {
      if (consolePanel.classList.contains('expanded')) {
        // 如果目前是展开的，自动将其折叠收缩为极简播放球，并立刻开启 3.5 秒淡出计时
        consolePanel.classList.remove('expanded');
        resetAutoHideTimer(3500);
      } else {
        // 如果已经是折叠的，淡出半隐为微光指示器
        consolePanel.classList.add('panel-hidden');
      }
    }
  }

  // 重置收起/淡出计时器
  function resetAutoHideTimer(delay) {
    if (autoHideTimer) clearTimeout(autoHideTimer);
    
    if (!isPlaying || !isImmersiveMode || isMouseOverPanel) {
      return;
    }
    
    const activeDelay = delay !== undefined ? delay : HIDE_DELAY;
    autoHideTimer = setTimeout(hideConsolePanel, activeDelay);
  }

  // 沉浸切换按钮点击事件
  if (immersiveModeBtn) {
    immersiveModeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isImmersiveMode = !isImmersiveMode;
      
      if (isImmersiveMode) {
         immersiveModeBtn.classList.add('active-immersive');
         immersiveModeBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
         immersiveModeBtn.title = "沉浸模式已开启 (自动隐藏)";
         showToast("[ 沉浸模式：已开启 ] 4.5秒无操作面板将自动折叠");
         
         if (isPlaying) {
           resetAutoHideTimer();
         }
      } else {
         immersiveModeBtn.classList.remove('active-immersive');
         immersiveModeBtn.innerHTML = '<i class="fas fa-eye"></i>';
         immersiveModeBtn.title = "沉浸模式已关闭 (始终显示)";
         showToast("[ 沉浸模式：已关闭 ] 面板将保持常亮展开");
         
         expandConsolePanel();
      }
    });
  }

  // 点击极简指示球展开控制台
  if (miniToggleBtn) {
    miniToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      expandConsolePanel(3500); // 呼出时同样保留 3.5 秒缓冲
    });
  }

  // 点击收起按钮手动折叠控制台
  if (miniCollapseBtn) {
    miniCollapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (consolePanel) {
        consolePanel.classList.remove('expanded');
        // 手动收起后，触发淡出倒计时
        resetAutoHideTimer(3500);
      }
    });
  }

  // 胶囊播放器额外逻辑：播放/暂停代理绑定
  const capsulePlayBtn = document.getElementById('capsule-play-pause-btn');
  if (capsulePlayBtn) {
    capsulePlayBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止展开事件向上冒泡
      const mainPlayBtn = document.getElementById('play-pause-btn');
      if (mainPlayBtn) {
        mainPlayBtn.click(); // 触发底下的主播放按钮
      }
    });
  }

  // 注册全屏 Canvas / 首屏容器点击以唤醒面板并展开
  if (heroSection) {
    heroSection.addEventListener('click', (e) => {
      // 只有当点击目标不在控制面板（或者面板已隐藏）时，执行展开
      const clickOnConsole = e.target.closest('#console-panel-trigger');
      if (!clickOnConsole || (consolePanel && !consolePanel.classList.contains('expanded'))) {
        expandConsolePanel(3500);
      }
    });
  }

  // 智能 Hover 锁：仅在具有精确指针的 PC 设备上启用悬停锁定，防止移动端锁定
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (consolePanel && hasFinePointer) {
    consolePanel.addEventListener('mouseenter', () => {
      isMouseOverPanel = true;
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        autoHideTimer = null;
      }
      // Hover 时面板和播放球立刻 100% 显现
      consolePanel.classList.remove('panel-hidden');
    });

    consolePanel.addEventListener('mouseleave', () => {
      isMouseOverPanel = false;
      if (isPlaying && isImmersiveMode) {
        resetAutoHideTimer();
      }
    });
  }

  // 全页面保活监听：只要用户在网页任何地方产生点击、滚动或触摸，且当前处于淡出半隐藏状态（panel-hidden），就立刻唤醒它，并重置淡出计时器
  ['touchstart', 'touchmove', 'click', 'scroll', 'mousemove'].forEach(evtName => {
    window.addEventListener(evtName, () => {
      if (consolePanel) {
        // 唤醒淡出状态的面板为 100% 亮度
        if (consolePanel.classList.contains('panel-hidden')) {
          consolePanel.classList.remove('panel-hidden');
        }
        
        // 移动端安全重置：触碰时清空 Hover 锁，防止卡死
        if (evtName === 'touchstart' || evtName === 'touchmove') {
          isMouseOverPanel = false;
        }

        // 如果目前处于折叠状态，交互只重置淡出计时器，不自动展开，绝对不骚扰用户
        if (!consolePanel.classList.contains('expanded')) {
          resetAutoHideTimer(3500);
        } else {
          // 如果目前处于展开状态，只有在鼠标正悬停或没有失去焦点时才保活折叠计时
          if (isMouseOverPanel) {
            if (autoHideTimer) {
              clearTimeout(autoHideTimer);
              autoHideTimer = null;
            }
          } else {
            // 没有悬停（例如在外面滚动），则照常开始折叠收起计时
            resetAutoHideTimer(4500);
          }
        }
      }
    }, { passive: true, capture: true }); // 使用捕获模式确保优先保活
  });

  // DOM 音乐控制项
  const actionOverlay = document.getElementById('player-prompt-overlay');
  const songTitle = document.getElementById('song-display-title');
  const songArtist = document.getElementById('song-display-artist');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIconState = document.getElementById('play-icon-state');
  const prevSongBtn = document.getElementById('prev-song-btn');
  const nextSongBtn = document.getElementById('next-song-btn');
  const loopModeBtn = document.getElementById('loop-mode-btn');
  const visualizerLockBtn = document.getElementById('visualizer-toggle-btn');
  
  const progressBar = document.getElementById('console-progress-bar');
  const progressFill = document.getElementById('console-progress-fill');
  const progressHandle = document.getElementById('console-progress-handle');
  const timeCurrentText = document.getElementById('time-current');
  const timeTotalText = document.getElementById('time-total');
  
  const playlistContainer = document.getElementById('playlist-container');

  // 获取 3D 几何形态名字
  function getShapeName(shapeIdx) {
    const names = {
      0: "星盘",
      1: "DNA",
      2: "心动",
      3: "立方体",
      4: "涡流",
      5: "波动",
      6: "网络"
    };
    return names[shapeIdx] || "未指定";
  }

  // 动态渲染播放列表
  function renderPlaylist() {
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';

    MUSIC_LIST.forEach((song, index) => {
      const activeClass = index === currentSongIndex ? 'active' : '';
      const item = document.createElement('div');
      item.className = `playlist-item ${activeClass}`;
      item.setAttribute('data-index', index);
      
      // 如果当前项处于激活播放中，左侧渲染音柱，否则渲染静态音符图标
      const leftIconHTML = (index === currentSongIndex && isPlaying) ? `
        <div class="eq-bars-anim">
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
        </div>
      ` : '<i class="fas fa-music" style="font-size: 11px; opacity: 0.3;"></i>';

      item.innerHTML = `
        <div class="playlist-item-left">
          ${leftIconHTML}
          <div class="playlist-item-meta">
            <span class="playlist-item-title">${song.title}</span>
            <span class="playlist-item-artist">${song.artist}</span>
          </div>
        </div>
        <div class="playlist-item-right">${getShapeName(song.shape)}</div>
      `;

      // 绑定选择切歌
      item.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止冒泡，避免触发面板激活
        activateAudioContext();
        if (audioContext) audioContext.resume();
        if (actionOverlay) actionOverlay.classList.add('dismissed');
        
        if (currentSongIndex === index) {
          togglePlayState();
        } else {
          playSongAt(index);
        }
      });

      playlistContainer.appendChild(item);
    });
  }

  // 初始化音轨并更新列表状态
  function loadSong(index) {
    const song = MUSIC_LIST[index];
    
    audio.src = song.src;
    audio.load();
    
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    if (miniDisplayTitle) {
      miniDisplayTitle.textContent = song.title;
    }
    
    // 渲染并动态生成歌词 DOM 结构
    const lyricsScrollWrap = document.getElementById('lyrics-scroll-wrap');
    if (lyricsScrollWrap) {
      lyricsScrollWrap.innerHTML = '';
      if (song.lyrics && song.lyrics.length > 0) {
        song.lyrics.forEach((lyric, lIdx) => {
          const p = document.createElement('p');
          p.className = `lyric-line ${lIdx === 0 ? 'active' : ''}`;
          p.setAttribute('data-time', lyric.time);
          p.textContent = lyric.text;
          lyricsScrollWrap.appendChild(p);
        });
        // 瞬间将滚动容器居中对齐到首句
        lyricsScrollWrap.style.transform = 'translateY(-50%) translateY(0px)';
      } else {
        lyricsScrollWrap.innerHTML = '<p class="lyric-line active">// 纯音乐 尽情沉浸 3D 空间</p>';
      }
    }
    
    if (!isVisualizerMorphLocked) {
      triggerMorphTo(song.shape);
    }

    renderPlaylist();
  }
  loadSong(currentSongIndex);

  // 安全激活 AudioContext
  function activateAudioContext() {
    if (audioContext) return;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      
      mediaSource = audioContext.createMediaElementSource(audio);
      mediaSource.connect(analyser);
      analyser.connect(audioContext.destination);
      
      frequencyData = new Uint8Array(analyser.frequencyBinCount);
      console.log("AudioContext 初始化成功，粒子低频频段律动管线已激活。");
    } catch (err) {
      console.warn("AudioContext 实例化被安全限制：", err);
    }
  }

  // 控制面板整体激活遮罩
  const panelTrigger = document.getElementById('console-panel-trigger');
  if (panelTrigger) {
    panelTrigger.addEventListener('click', () => {
      activateAudioContext();
      if (audioContext) audioContext.resume();
      if (actionOverlay) {
        actionOverlay.classList.add('dismissed');
      }
      togglePlayState();
    });
  }

  window.addEventListener('click', (e) => {
    if (!audioContext) {
      if (e.target.closest('#console-panel-trigger')) {
        activateAudioContext();
        if (audioContext) audioContext.resume();
        if (actionOverlay) actionOverlay.classList.add('dismissed');
      }
    }
  });

  function togglePlayState() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  function playMusic() {
    // 仅仅发起播放，由原生 play 事件监听器捕获成功并同步状态
    audio.play().catch(err => {
      // 捕获浏览器因未触控或切换歌曲导致的 AbortError 或是安全拦截
      console.log("音频播放被浏览器安全拦截或路径/切换中断：", err);
      if (audio.paused) {
        isPlaying = false;
        playIconState.className = 'fas fa-play';
        renderPlaylist();
        showConsolePanel();
      }
    });
  }

  function pauseMusic() {
    // 仅发起暂停，由原生 pause 事件监听器捕获并同步状态
    audio.pause();
  }

  function playSongAt(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    playMusic();
    showConsolePanel(3000); // 切歌时立即唤起面板展示新歌信息并延长3秒缓冲
  }

  function playNextSong() {
    let nextIdx = (currentSongIndex + 1) % MUSIC_LIST.length;
    playSongAt(nextIdx);
  }

  function playPrevSong() {
    let prevIdx = (currentSongIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length;
    playSongAt(prevIdx);
  }

  // 绑定控制按钮
  playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止面板事件激活
    activateAudioContext();
    if (audioContext) audioContext.resume();
    if (actionOverlay) actionOverlay.classList.add('dismissed');
    togglePlayState();
  });

  prevSongBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    activateAudioContext();
    playPrevSong();
  });

  nextSongBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    activateAudioContext();
    playNextSong();
  });

  // 播放模式切换
  loopModeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (loopMode === 'list') {
      loopMode = 'single';
      loopModeBtn.innerHTML = '<i class="fas fa-arrows-rotate"></i>';
      loopModeBtn.classList.add('active-loop');
      loopModeBtn.title = "单曲循环";
    } else if (loopMode === 'single') {
      loopMode = 'random';
      loopModeBtn.innerHTML = '<i class="fas fa-shuffle"></i>';
      loopModeBtn.classList.add('active-loop');
      loopModeBtn.title = "随机播放";
    } else {
      loopMode = 'list';
      loopModeBtn.innerHTML = '<i class="fas fa-repeat"></i>';
      loopModeBtn.classList.remove('active-loop');
      loopModeBtn.title = "列表循环";
    }
  });

  // 锁死形态按钮切换
  visualizerLockBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isVisualizerMorphLocked = !isVisualizerMorphLocked;
    if (isVisualizerMorphLocked) {
      visualizerLockBtn.classList.add('active-loop');
      visualizerLockBtn.title = "自适应形态已锁死";
    } else {
      visualizerLockBtn.classList.remove('active-loop');
      visualizerLockBtn.title = "跟随切歌自动形变";
    }
  });

  // 歌单折叠/展开控制
  const playlistToggleBtn = document.getElementById('playlist-toggle-btn');
  const playlistToggleIcon = document.getElementById('playlist-toggle-icon');
  if (playlistToggleBtn && playlistToggleIcon && consolePanel) {
    playlistToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止面板整体事件激活
      consolePanel.classList.toggle('playlist-show');
      playlistToggleIcon.classList.toggle('rotated');
      
      const isExpanded = consolePanel.classList.contains('playlist-show');
      const textSpan = playlistToggleBtn.querySelector('span');
      if (textSpan) {
        textSpan.textContent = isExpanded ? '// 收起特调律动列表' : '// 展开特调律动列表';
      }
    });
  }

  // 时间格式化辅助函数
  function formatTime(secs) {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const mStr = minutes < 10 ? '0' + minutes : minutes;
    const sStr = seconds < 10 ? '0' + seconds : seconds;
    return `${mStr}:${mStr === '00' && sStr === '00' ? '00' : sStr}`;
  }

  audio.addEventListener('play', () => {
    isPlaying = true;
    playIconState.className = 'fas fa-pause';
    const capIcon = document.getElementById('capsule-play-icon');
    if (capIcon) capIcon.className = 'fas fa-pause';
    if (consolePanel) {
      consolePanel.classList.add('playing-anim');
    }
    if (audioContext) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }
    renderPlaylist(); // 刷新以启动音柱跳跃动画
    showConsolePanel(3000); // 播放成功时，唤起面板并延长3秒缓冲再隐藏！
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    playIconState.className = 'fas fa-play';
    const capIcon = document.getElementById('capsule-play-icon');
    if (capIcon) capIcon.className = 'fas fa-play';
    if (consolePanel) {
      consolePanel.classList.remove('playing-anim');
    }
    renderPlaylist(); // 刷新以停止音柱跳跃
    showConsolePanel(); // 强制浮现并永远保留显示，且清除隐藏计时器
  });

  // 播放监听更新时间、进度条
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    
    const cur = audio.currentTime;
    const dur = audio.duration;
    const percent = (cur / dur) * 100;
    
    progressFill.style.width = `${percent}%`;
    progressHandle.style.left = `${percent}%`;
    timeCurrentText.textContent = formatTime(cur);

    // 双向同步滚动歌词
    updateLyricsScroll(cur);
  });

  // 歌词中心自动对齐平滑滚动驱动
  function updateLyricsScroll(curTime) {
    const lyricsScrollWrap = document.getElementById('lyrics-scroll-wrap');
    if (!lyricsScrollWrap) return;
    const lines = lyricsScrollWrap.querySelectorAll('.lyric-line');
    if (lines.length === 0) return;

    let activeIndex = -1;
    // 双分查找或线性匹配最接近当前播放时间的歌词行
    for (let i = 0; i < lines.length; i++) {
      const time = parseFloat(lines[i].getAttribute('data-time'));
      if (curTime >= time) {
        activeIndex = i;
      } else {
        break;
      }
    }

    if (activeIndex !== -1) {
      const activeLine = lines[activeIndex];
      if (!activeLine.classList.contains('active')) {
        lines.forEach(line => line.classList.remove('active'));
        activeLine.classList.add('active');

        // 计算当前高亮行距离歌词包装盒顶部的绝对高度 offsetTop 
        // 加上行高 24px 的一半 12px 达到容器完美居中视觉
        const offsetTop = activeLine.offsetTop;
        lyricsScrollWrap.style.transform = `translateY(calc(-50% - ${offsetTop}px + 12px))`;
      }
    }
  }

  audio.addEventListener('loadedmetadata', () => {
    timeTotalText.textContent = formatTime(audio.duration);
  });

  // 歌曲结束处理
  audio.addEventListener('ended', () => {
    if (loopMode === 'single') {
      audio.currentTime = 0;
      playMusic();
    } else if (loopMode === 'random') {
      let randIdx = currentSongIndex;
      while (randIdx === currentSongIndex && MUSIC_LIST.length > 1) {
        randIdx = Math.floor(Math.random() * MUSIC_LIST.length);
      }
      playSongAt(randIdx);
    } else {
      playNextSong();
    }
  });

  // 进度条点击调整
  progressBar.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    if (audio.duration) {
      audio.currentTime = percent * audio.duration;
    }
  });


  // ==========================================================================
  // 5. 动态内容列表渲染 (美化资源、教程、壁纸网格)
  // ==========================================================================
  const resourceGrid = document.getElementById('resource-grid');
  const tutorialGrid = document.getElementById('tutorial-grid');

  // 渲染美化资源
  function renderResources() {
    if (!resourceGrid) return;
    resourceGrid.innerHTML = '';
    
    RESOURCES.forEach((res, index) => {
      const card = document.createElement('div');
      card.className = `resource-card ${res.tag === 'recommend' ? 'recommend-c' : ''}`;
      card.innerHTML = `
        <div class="resource-card-glow"></div>
        <div class="resource-content">
          <div class="resource-header">
            <span class="resource-category">${res.category}</span>
            <span class="resource-badge ${res.tag === 'recommend' ? 'badge-rec' : 'badge-hot'}">${res.tagText}</span>
          </div>
          <h3 class="resource-title">${res.title}</h3>
          <p class="resource-desc">${res.desc}</p>
          <div class="resource-footer">
            <span class="resource-meta">大小: <strong>${res.size}</strong> | 版本: <strong>${res.version}</strong></span>
            <a href="assets/${res.file}" download class="resource-download-btn">下载资源 <i class="fas fa-arrow-down-long"></i></a>
          </div>
        </div>
      `;
      resourceGrid.appendChild(card);
    });
  }

  // 渲染教程列表
  function renderTutorials() {
    if (!tutorialGrid) return;
    tutorialGrid.innerHTML = '';

    TUTORIALS.forEach((tut, index) => {
      const card = document.createElement('div');
      card.className = 'tutorial-card';
      card.innerHTML = `
        <div class="tutorial-left-info">
          <div class="tutorial-icon">${tut.icon}</div>
          <div class="tutorial-texts">
            <div class="tutorial-meta">
              <span>${tut.category}</span>
              <span>发布时间: ${tut.date}</span>
            </div>
            <h3 class="tutorial-title">${tut.title}</h3>
            <p class="tutorial-excerpt">${tut.excerpt}</p>
          </div>
        </div>
        <div class="tutorial-enter-arrow"><i class="fas fa-chevron-right"></i></div>
      `;
      
      // 点击绑定阅读模态框
      card.addEventListener('click', () => {
        openTutorialReader(tut);
      });

      tutorialGrid.appendChild(card);
    });
  }

  // 执行两部分列表渲染
  renderResources();
  renderTutorials();


  // ==========================================================================
  // 6. 3D 卡片鼠标悬停感知倾斜效果 (Card Tilt Physics)
  // ==========================================================================
  function applyCardTiltEffect() {
    const activeCards = document.querySelectorAll('.resource-card');
    activeCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // 归一化比例 (-0.5 到 0.5)
        const ratioX = (mouseX / rect.width) - 0.5;
        const ratioY = (mouseY / rect.height) - 0.5;
        
        const maxTilt = 10; // 最大旋转角度
        const rotX = (-ratioY * maxTilt).toFixed(2);
        const rotY = (ratioX * maxTilt).toFixed(2);
        
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
        
        // 漫反射镜面高光位置计算
        const glow = card.querySelector('.resource-card-glow');
        if (glow) {
          glow.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        // 重置物理状态
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        const glow = card.querySelector('.resource-card-glow');
        if (glow) {
          glow.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05), transparent 60%)';
        }
      });
    });
  }
  // 执行卡片 3D 偏转监听
  applyCardTiltEffect();


  // ==========================================================================
  // 7. 模态框控制中心 (灯箱与教程富文本阅读器)
  // ==========================================================================
  const textModal = document.getElementById('text-modal');
  const textModalClose = document.getElementById('text-modal-close');
  const textModalBackdrop = document.getElementById('text-modal-backdrop');
  const modalBadge = document.getElementById('modal-badge-text');
  const modalTitle = document.getElementById('modal-title-text');
  const modalBody = document.getElementById('modal-body-text');


  // 打开教程阅读器
  function openTutorialReader(tutorial) {
    modalBadge.textContent = tutorial.category;
    modalTitle.textContent = tutorial.title;
    modalBody.innerHTML = tutorial.content;
    
    textModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 锁死网页滚动
  }

  function closeTutorialReader() {
    textModal.classList.remove('active');
    document.body.style.overflow = '';
  }


  // 事件绑定
  if (textModalClose) textModalClose.addEventListener('click', closeTutorialReader);
  if (textModalBackdrop) textModalBackdrop.addEventListener('click', closeTutorialReader);

  // 微信弹窗逻辑
  const weixinBtn = document.getElementById('weixin-btn');
  if (weixinBtn) {
    weixinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBadge.textContent = "CONTACT";
      modalTitle.textContent = "微信联系卡片";
      modalBody.innerHTML = `
        <div class="wechat-modal-content" style="text-align: center; padding: 20px 10px;">
          <p style="margin-bottom: 20px; color: rgba(255,255,255,0.7); font-size: 14px;">长按识别下方二维码，或复制微信号添加好友</p>
          <div style="margin-bottom: 25px; display: inline-block; position: relative;">
            <img src="assets/wechat_qr.jpg" alt="微信二维码" style="width: 200px; height: 200px; border-radius: 12px; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.5); display: block;">
          </div>
          <div class="wechat-copy-box" style="display: inline-flex; align-items: center; background: rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); margin-top: 10px;">
            <span style="font-family: 'DM Mono', monospace; font-size: 16px; letter-spacing: 1px; color: #fff; margin-right: 12px;">HciM001</span>
            <button id="wechat-copy-btn" style="background: #00f2fe; color: #000; border: none; padding: 6px 14px; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(0,242,254,0.3);">一键复制</button>
          </div>
        </div>
      `;
      textModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // 绑定复制按钮事件
      const copyBtn = document.getElementById('wechat-copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText('HciM001').then(() => {
            copyBtn.textContent = '已复制！';
            copyBtn.style.background = '#00ff88';
            copyBtn.style.color = '#000';
            copyBtn.style.boxShadow = '0 0 10px rgba(0,255,136,0.3)';
            
            // 弹出提示
            if (typeof showToast === 'function') {
              showToast("🚀 微信号 HciM001 已复制到剪贴板，请打开微信添加！", "success");
            }
            
            setTimeout(() => {
              copyBtn.textContent = '一键复制';
              copyBtn.style.background = '#00f2fe';
              copyBtn.style.boxShadow = '0 0 10px rgba(0,242,254,0.3)';
            }, 2000);
          }).catch(err => {
            console.error('复制失败: ', err);
          });
        });
      }
    });
  }
  

  // ==========================================================================
  // 8. 辅助交互细节：导航感知、锚点移动与数字跑分
  // ==========================================================================
  const header = document.querySelector('.global-header');
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  
  // LOGO 键返回顶部播放器
  const logoBtn = document.getElementById('logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      const topSec = document.getElementById('player-hero');
      if (topSec) topSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 滚动引导提示
  const discoverHint = document.getElementById('scroll-discover-hint');
  if (discoverHint) {
    discoverHint.addEventListener('click', () => {
      const aboutSec = document.getElementById('about');
      if (aboutSec) aboutSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 滚动高亮导航及头部背景加深
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    let activeSectionId = 'player-hero';
    sections.forEach(sec => {
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        activeSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === activeSectionId) {
        link.classList.add('active');
      }
    });
  });

  // 桌面锚点平滑导航
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 移动端侧滑折叠菜单控制
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navDrawer.classList.toggle('active');
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        menuToggle.classList.remove('active');
        navDrawer.classList.remove('active');

        const targetId = link.getAttribute('data-target');
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
          setTimeout(() => {
            targetSec.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      });
    });
  }

  const aboutSection = document.getElementById('about');
  let runScoreTriggered = false;

  // 智能动态跑分与跑分后的持续微增跳动函数
  function countRun(elemId, targetVal, duration, suffix = '') {
    const el = document.getElementById(elemId);
    if (!el) return;

    let currentVal = 0;
    const stepsCount = 100; // 动画一共走 100 步
    const stepTime = duration / stepsCount;
    const increment = targetVal / stepsCount;

    const timer = setInterval(() => {
      currentVal += increment;
      if (currentVal >= targetVal) {
        currentVal = targetVal;
        clearInterval(timer);
        el.textContent = currentVal.toFixed(suffix.includes('亿') || suffix.includes('K') ? 2 : 1) + suffix;
        
        // 跑分完成，开启长久不断的“动态增长”定时器
        startContinuousGrowth(el, targetVal, suffix);
      } else {
        el.textContent = currentVal.toFixed(suffix.includes('亿') || suffix.includes('K') ? 2 : 1) + suffix;
      }
    }, stepTime);
  }

  // 数据跑完后的“实时缓慢增长”定时器
  function startContinuousGrowth(el, baseVal, suffix) {
    let currentVal = baseVal;
    
    // 根据不同类型的数据设定不同的增长速率和时间间隔
    let interval = 3000; // 默认 3 秒
    let growthAmount = 0.01;
    let decimalPlaces = 2;

    if (suffix.includes('亿')) {
      interval = 4000 + Math.random() * 2000; // 4-6秒更新一次
      growthAmount = 0.000003; // 每次微增 0.000003 亿 (约 300 粉丝)
      decimalPlaces = 6; // 用 6 位小数体现出精细的实时粉丝跳动！例如 1.000003 亿+
    } else if (suffix.includes('G')) {
      interval = 5000 + Math.random() * 3000; // 5-8秒更新
      growthAmount = 0.1; // 每次更新 0.1G
      decimalPlaces = 1; // 100.1G+
    } else if (suffix.includes('K')) {
      interval = 2000 + Math.random() * 1500; // 2-3.5秒更新
      growthAmount = 0.002; // 每次微增 0.002K (约 2 个人)
      decimalPlaces = 3; // 用 3 位小数显示：50.002K+
    }

    setInterval(() => {
      currentVal += growthAmount;
      el.textContent = currentVal.toFixed(decimalPlaces) + suffix;
      
      // 触发一次极其轻微的缩放呼吸发光动效，让数字跳动更具生机！
      el.style.transform = 'scale(1.08)';
      el.style.color = '#00ff88'; // 瞬间变为科技绿
      el.style.textShadow = '0 0 12px #00ff88';
      setTimeout(() => {
        el.style.transform = '';
        el.style.color = '';
        el.style.textShadow = '';
      }, 300);
    }, interval);
  }

  window.addEventListener('scroll', () => {
    if (!aboutSection || runScoreTriggered) return;
    const rect = aboutSection.getBoundingClientRect();
    const viewHeight = window.innerHeight - 120;
    
    if (rect.top <= viewHeight) {
      runScoreTriggered = true;
      countRun('count-fps', 100, 800, 'G+');
      countRun('count-users', 50, 1000, 'K+');
      countRun('count-papers', 1, 1200, '亿+');
    }
  });

  // 页面加载完成后，正式执行 3D 粒子 WebGL 初始化
  init3DParticleSystem();

  // 页面加载完成后，初始化弹幕浮动中心
  initDanmakuSystem();

  // 页面加载完成后，自动尝试播放
  window.addEventListener('load', () => {
    // 尝试自动播放
    activateAudioContext();
    if (audioContext) audioContext.resume();
    playMusic();
    
    // 绑定一次性全局交互事件，一旦用户点击或触摸页面任何地方，即刻保活拉起播放并隐藏引导遮罩
    const forcePlayHandler = () => {
      activateAudioContext();
      if (audioContext) audioContext.resume();
      if (audio.paused) {
        playMusic();
      }
      const actionOverlay = document.getElementById('player-prompt-overlay');
      if (actionOverlay) {
        actionOverlay.classList.add('dismissed');
      }
      // 移除此一次性事件监听，防止多次执行
      window.removeEventListener('click', forcePlayHandler);
      window.removeEventListener('touchstart', forcePlayHandler);
    };
    window.addEventListener('click', forcePlayHandler, { capture: true });
    window.addEventListener('touchstart', forcePlayHandler, { capture: true });
  });

  // ==========================================================================
  // 9. 极客弹幕互动中心 (Barrage / Danmaku Particle Interaction Center)
  // ==========================================================================
  function initDanmakuSystem() {
    const sendBtn = document.getElementById('danmaku-send-btn');
    const clearBtn = document.getElementById('danmaku-clear-btn');
    const textInput = document.getElementById('danmaku-text-input');
    const stage = document.getElementById('danmaku-stage');
    
    if (!sendBtn || !textInput || !stage) return;
    
    // 页面底部常驻标语轮播池（品牌与系统相关）
    const leapTexts = [
      "🚀 梦想起步，即刻跃迁！",
      "✨ 3D WebGL 极光星空系统已就绪",
      "🎵 点击右下角小球，听见星河的跳动吧~",
      "🌌 终身学习者，顶峰相见！",
      "LeaperX / 跃迁研究所 @2026",
      "🔥 这饱满的高级粒子配色太好看啦！",
      "🤖 欢迎体验 LeaperX 音频空间",
      "💫 极光微粒随重低音音波共鸣起伏",
      "📚 Learn to Leap. 每天进步一点点"
    ];

    // 全网走心治愈系弹幕池（用于全屏漂浮弹幕，不包含品牌字眼）
    const healingTexts = [
      "✨ 愿你在冷冽的算法世界里，守住内心的微光。",
      "🌌 抬头仰望星空，你我皆是这宇宙中独一无二的星尘。",
      "🔥 慢一点，没关系，只要你一直在向前走。",
      "💡 所有伟大的跃迁，都始于一次微不足道的尝试。",
      "🌱 那些看似不起眼的日积月累，终会变成惊艳岁月的质变。",
      "💫 每一个在深夜默默努力的灵魂，都值得被星河点亮。",
      "🚀 梦想不设限，任何时候开始都不算晚。",
      "🍀 保持热爱，奔赴山海，星火不灭，跃迁不止。",
      "🤖 科技是冰冷的，但你那颗求知与探索的心永远滚烫。",
      "🌟 愿你的世界充满温情，既能迎风破浪，亦有港湾停泊。"
    ];
    
    // 用户当前会话发送的弹幕库（用于让用户输入的弹幕在此会话中循环）
    const userSentTexts = [];
    
    // 静态系统标语轮播 (已改为大标题底部流动跑马灯)
    const hintTrackElem = document.getElementById('danmaku-hint-track');
    if (hintTrackElem) {
      // 拼接所有常驻文案，并用多个全角空格隔开，增加滚动美感
      const separator = "　　　　"; // 4个全角空格
      const fullText = leapTexts.join(separator) + separator;
      
      // 渲染两组，保证在动画 translate3d(-50%, 0, 0) 时无缝循环
      hintTrackElem.innerHTML = `
        <span class="hint-flow-span">${fullText}</span>
        <span class="hint-flow-span">${fullText}</span>
      `;
    }
    
    // 自动在屏幕上弹全网走心和给用户治愈的弹幕（包含用户自身发送的弹幕）
    let autoDanmakuTimer = null;
    function startAutoDanmaku() {
      if (autoDanmakuTimer) return;
      autoDanmakuTimer = setInterval(() => {
        // 如果用户发过弹幕，有 35% 概率循环播放用户自己输入的，65% 概率漂流系统治愈弹幕
        if (userSentTexts.length > 0 && Math.random() < 0.35) {
          const randIdx = Math.floor(Math.random() * userSentTexts.length);
          createDanmaku(userSentTexts[randIdx], true); // true 表示是用户样式的弹幕，更醒目
        } else {
          const randIdx = Math.floor(Math.random() * healingTexts.length);
          createDanmaku(healingTexts[randIdx], false); // 系统治愈弹幕样式
        }
      }, 3500 + Math.random() * 1500); // 3.5s - 5s 随机间隔自动发送
    }
    
    // 自动漂浮已设定在用户首发弹幕后触发
    
    // 监听发送按钮点击
    sendBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止事件冒泡激活播放器
      sendUserDanmaku();
    });
    
    // 监听一键清空弹幕按钮点击
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        stage.innerHTML = '';
        if (typeof showToast === 'function') {
          showToast("[ 净化星空 ] 已成功清空全部漂浮弹幕", "info");
        }
      });
    }
    
    // 监听回车键发送
    textInput.addEventListener('keydown', (e) => {
      e.stopPropagation(); // 防止回车键触发页面其他绑定事件
      if (e.key === 'Enter') {
        sendUserDanmaku();
      }
    });
    
    // 阻止输入框内按键和点击事件冒泡到页面其他层，保障在输入框输入时不会触发粒子背景或滚动事件
    textInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    function sendUserDanmaku() {
      const val = textInput.value.trim();
      if (!val) return;
      
      // 1. 立刻在屏幕上创建弹幕飞过
      createDanmaku(val, true); // true 表示是当前用户发送的
      
      // 2. 将弹幕内容推进用户已发列表，实现循环播放
      if (!userSentTexts.includes(val)) {
        userSentTexts.push(val);
      }
      
      // 3. 点击发送后的提示色动效反馈（通过类名让输入框和按钮瞬间呈现绿色霓虹脉冲发光）
      const inputContainer = document.querySelector('.danmaku-input-container');
      if (inputContainer) {
        inputContainer.classList.add('success-pulse');
        setTimeout(() => {
          inputContainer.classList.remove('success-pulse');
        }, 1200);
      }
      
      // 4. 弹出发送成功 Toast 提示
      if (typeof showToast === 'function') {
        showToast("🚀 弹幕已融入星河，将永久循环共鸣...", "success");
      }
      
      textInput.value = '';
      // 5. 首次用户发送后，才开始展示自动漂发弹幕
      startAutoDanmaku();
    }
    
    function createDanmaku(text, isUser = false) {
      const item = document.createElement('div');
      item.className = `danmaku-item ${isUser ? 'danmaku-user-item' : ''}`;
      item.textContent = text;
      
      // 随机分配轨道高度 (从 12% 到 72% 避开顶部固定的导航栏)
      const randomY = 12 + Math.random() * 60;
      item.style.top = `${randomY}%`;
      
      // 随机浮动速度 (8s 至 13s 穿过屏幕)
      const duration = 8 + Math.random() * 5;
      item.style.animationDuration = `${duration}s`;
      
      // 随机霓虹配色，完美映射我们的极光粒子色系
      const colors = [
        '#00f2fe', // 霓虹青
        '#00ff88', // 雅翠绿
        '#ff1a75', // 玫瑰粉
        '#ff9900', // 琥珀金
        '#ffffff', // 皓月白
        '#b84dff'  // 极光紫
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // 颜色与边框改为完全随机色相
      item.style.color = randomColor;
      
      if (isUser) {
        // 用户弹幕的边框底色与外阴影完全融合当前的随机颜色 (HEX 颜色追加 66 和 33 代表透明度通道)
        item.style.border = '1px solid ' + randomColor + '66';
        item.style.background = 'rgba(8, 6, 5, 0.75)';
        item.style.boxShadow = '0 0 10px ' + randomColor + '33';
        
        item.style.padding = '4px 16px';
        item.style.borderRadius = '20px';
        item.style.backdropFilter = 'blur(6px)';
        item.style.webkitBackdropFilter = 'blur(6px)';
      }
      
      stage.appendChild(item);
      
      // 动画完全走完后自动销毁 DOM 节点，避免页面 DOM 冗余和内存泄露
      item.addEventListener('animationend', () => {
        item.remove();
      });
    }
  }

  // ==========================================================================
  // 全网音乐搜索与流媒体直链接入 (Meting API Integrator & LRC Lyric Parser)
  // ==========================================================================
  
  // Meting API 基础服务节点配置（若失效可更换其他公共或自建节点）
  // Meting API 备用公共解析节点列表，当发生检索超时时自动无缝轮询重试下一个节点
  const METING_API_NODES = [
    "https://api.injahow.cn/meting/",
    "https://meting.y404.cn/",
    "https://meting.t42t.com/",
    "https://meting.y.ngu.ink/",
    "https://meting.ikmoe.com/api"
  ];

  // 1. 高可用多节点轮询获取 JSON 数据的网络请求方法
  async function fetchFromMeting(paramsStr) {
    let lastError = null;
    
    for (let i = 0; i < METING_API_NODES.length; i++) {
      const node = METING_API_NODES[i];
      let url = node;
      if (url.endsWith('/')) {
        url += `?${paramsStr}`;
      } else {
        url += url.includes('?') ? `&${paramsStr}` : `?${paramsStr}`;
      }
      
      console.log(`[Meting-API] 尝试连接节点 [${i}]: ${node}`);
      
      try {
        // 设置 6 秒超时防止节点卡死
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          // 确保返回的不是错误对象
          if (data && !data.error && (!Array.isArray(data) || data.length > 0 || paramsStr.includes('type=search'))) {
            return { data, nodeIndex: i };
          }
        }
      } catch (err) {
        console.warn(`[Meting-API] 节点 [${i}] 请求失败或超时:`, err);
        lastError = err;
      }
    }
    
    throw lastError || new Error("星轨解析接口目前全部超时，请稍后重试");
  }

  // 2. 高可用多节点轮询获取纯文本（歌词）的网络请求方法
  async function fetchTextFromMeting(paramsStr) {
    let lastError = null;
    
    for (let i = 0; i < METING_API_NODES.length; i++) {
      const node = METING_API_NODES[i];
      let url = node;
      if (url.endsWith('/')) {
        url += `?${paramsStr}`;
      } else {
        url += url.includes('?') ? `&${paramsStr}` : `?${paramsStr}`;
      }
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const text = await response.text();
          // 如果返回非 JSON 报错，则视为成功拿到歌词
          if (text && !text.trim().startsWith('{"error"') && !text.trim().startsWith('{')) {
            return text;
          }
        }
      } catch (err) {
        console.warn(`[Meting-API] 节点 [${i}] 歌词获取失败:`, err);
        lastError = err;
      }
    }
    
    throw lastError || new Error("歌词解析失败");
  }

  // 3. 简易标准 LRC 歌词解析器
  function parseLrc(lrcText) {
    if (!lrcText) return [{ time: 0, text: "// 纯音乐 尽情沉浸 3D 空间" }];
    
    const lines = lrcText.split(/\r?\n/);
    const lyrics = [];
    // 匹配 [00:12.30] 或 [00:12] 类似的时间戳
    const timeReg = /\[(\d+):(\d+)(?:\.(\d+))?\]/;
    
    lines.forEach(line => {
      const match = timeReg.exec(line);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const ms = match[3] ? parseInt(match[3], 10) : 0;
        // 计算秒数时间戳 (如果毫秒是三位数如 300 则除以 1000，两位数则除以 100)
        const time = minutes * 60 + seconds + (ms / (ms > 99 ? 1000 : 100));
        
        // 过滤时间标签，提取歌词文字
        const text = line.replace(timeReg, '').trim();
        if (text) {
          lyrics.push({ time, text });
        }
      }
    });
    
    if (lyrics.length === 0) {
      return [{ time: 0, text: "// 纯音乐 尽情沉浸 3D 空间" }];
    }
    
    lyrics.sort((a, b) => a.time - b.time);
    return lyrics;
  }

  // 4. 全网音乐搜索与结果列表加载交互
  const musicSearchInput = document.getElementById('music-search-input');
  const musicSearchBtn = document.getElementById('music-search-btn');
  const searchResultsList = document.getElementById('search-results-list');

  if (musicSearchInput && musicSearchBtn && searchResultsList) {
    // 执行全网音乐查询
    async function searchMusic(keyword) {
      if (!keyword.trim()) return;
      
      searchResultsList.style.display = 'flex';
      searchResultsList.innerHTML = '<div class="search-results-loading">// 全网星轨检索中...</div>';
      
      try {
        // 请求 Meting-API 网易云检索接口 (使用高可用多节点轮询，强制指定 server=netease 保证检索定向)
        const encodedKeyword = encodeURIComponent(keyword);
        const searchRes = await fetchFromMeting(`type=search&server=netease&keywords=${encodedKeyword}&limit=12`);
        const results = searchRes.data;
        const activeNodeIndex = searchRes.nodeIndex; // 提取当前检索响应最快且存活的节点索引
        
        searchResultsList.innerHTML = '';
        if (!results || results.length === 0) {
          searchResultsList.innerHTML = '<div class="search-results-loading">// 未在星海中检索到相关歌曲</div>';
          return;
        }
        
        results.forEach(song => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          
          item.innerHTML = `
            <div class="search-result-info">
              <span class="search-result-title">${song.title}</span>
              <span class="search-result-artist">${song.author}</span>
            </div>
            <div class="search-result-right">
              <span class="search-result-platform">网易云</span>
            </div>
          `;
          
          // 点击搜索出来的歌，动态拉取直链并播放
          item.addEventListener('click', async (e) => {
            e.stopPropagation();
            searchResultsList.innerHTML = '<div class="search-results-loading">// 正在解析直链和歌词...</div>';
            
            try {
              // 1. 获取歌曲播放链接 (支持 JSON 提取 与 302 重定向双通道 fallback 策略)
              let songUrl = "";
              try {
                // 首先尝试 fetch 轮询节点，假设其返回 JSON 对象
                const urlData = await fetchFromMeting(`type=url&id=${song.id}`);
                if (urlData && urlData.url) {
                  songUrl = urlData.url;
                }
              } catch (urlErr) {
                console.warn("[Meting-API] 获取 JSON url 地址超时或跨域被拦截，转为使用 Fallback 接口直链加载模式:", urlErr);
              }
              
              // 如果没有成功解析出 JSON 内部字段（例如跨域拦截，或是 302 重定向），直接把活跃 API 接口本身作为 audio src 播放
              if (!songUrl) {
                const activeNode = METING_API_NODES[activeNodeIndex];
                if (activeNode.endsWith('/')) {
                  songUrl = `${activeNode}?type=url&id=${song.id}`;
                } else {
                  songUrl = `${activeNode}${activeNode.includes('?') ? '&' : '?'}type=url&id=${song.id}`;
                }
                console.log("[Meting-API] Fallback 直链直接加载方案启动:", songUrl);
              }
              
              // 2. 获取歌词文件并解析 (使用高可用多节点轮询)
              let parsedLyrics = [];
              try {
                const lrcText = await fetchTextFromMeting(`type=lrc&id=${song.id}`);
                if (lrcText) {
                  parsedLyrics = parseLrc(lrcText);
                }
              } catch (lrcErr) {
                console.warn("在线歌词解析失败，降级为纯音乐模式:", lrcErr);
              }
              
              // 3. 构造标准歌曲数据对象
              const newSong = {
                title: song.title,
                artist: song.author,
                src: songUrl,
                shape: Math.floor(Math.random() * 7), // 随机分配 3D 粒子初始形态
                lyrics: parsedLyrics.length > 0 ? parsedLyrics : [{ time: 0, text: "// 纯音乐 尽情沉浸 3D 空间" }]
              };
              
              // 追加到当前的 MUSIC_LIST 内存库
              MUSIC_LIST.push(newSong);
              const newIndex = MUSIC_LIST.length - 1;
              
              // 重置并隐藏搜索状态
              searchResultsList.style.display = 'none';
              musicSearchInput.value = '';
              
              // 激活音频流并播放
              activateAudioContext();
              if (audioContext) audioContext.resume();
              if (actionOverlay) actionOverlay.classList.add('dismissed');
              
              playSongAt(newIndex);
              
            } catch (err) {
              console.error("解析全网歌曲数据失败:", err);
              alert("解析音乐数据超时或失败，已全部尝试备用星轨节点，请稍后重试！");
              searchResultsList.style.display = 'none';
            }
          });
          
          searchResultsList.appendChild(item);
        });
        
      } catch (err) {
        console.error("全网音乐搜索故障:", err);
        searchResultsList.innerHTML = '<div class="search-results-loading">// 所有星轨接口均已超时，请稍后重试</div>';
      }
    }

    // 绑定搜索按键
    musicSearchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchMusic(musicSearchInput.value);
    });

    musicSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        searchMusic(musicSearchInput.value);
      }
    });

    // 阻止搜索框内的按键和点击冒泡，避免触发播放器隐藏或其它全局快捷键
    musicSearchInput.addEventListener('keydown', (e) => {
      e.stopPropagation();
    });
    musicSearchInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // 控制台极客炫彩彩蛋
  console.log(
    '%cMURONG SPACE%c3D WebGL Particle Audio Reactor Pipeline Activated.',
    'color: #00f2fe; font-size: 20px; font-weight: 800; font-family: Orbitron; text-shadow: 0 0 10px rgba(0,242,254,0.3);',
    'color: #ffffff; font-size: 13px; margin-left: 10px; font-family: "Courier New";'
  );
});
