// ==========================================================================
// 1. 数据结构定义 (音乐、资源、教程、壁纸及左侧面板配置)
// ==========================================================================

const MUSIC_LIST = [
  { title: "感觉至上", artist: "FEELING FIRST", src: "音乐/感觉至上.AAC", shape: 2 },
  { title: "你到底在为谁等待", artist: "WAITING FOR WHOM", src: "音乐/你到底在为谁等待.AAC", shape: 1 },
  { title: "两难", artist: "DILEMMA", src: "音乐/两难.AAC", shape: 0 },
  { title: "野马进行曲", artist: "MUSTANG MARCH", src: "音乐/野马进行曲.AAC", shape: 3 }
];

const RESOURCES = [
  {
    title: "120帧极佳流畅度解锁配置文件",
    category: "FPS UNLOCKER",
    desc: "适配所有主流芯片，强制解锁游戏最高120帧画质限制。关闭冗余光影，大幅降低运行发热，让游戏满帧稳定运行，刚枪无压力。",
    size: "4.8 KB",
    version: "v5.2",
    tag: "recommend",
    tagText: "REC",
    file: "resource_fps_unlock.zip"
  },
  {
    title: "科技霓虹蓝极简十字准星美化包",
    category: "CROSSHAIR CUSTOM",
    desc: "替换系统粗重准星为微米级发光极细科技蓝十字准星。优化腰射手感，提高中远距离盲射命中率，安全不封号。",
    size: "1.2 MB",
    version: "v2.0",
    tag: "hot",
    tagText: "HOT",
    file: "resource_crosshair_neon.zip"
  },
  {
    title: "慕容子诚自用压枪灵敏度配置",
    category: "SENSITIVITY",
    desc: "针对三指/四指/五指用户特调的灵敏度参数。深度微调镜头灵敏度与陀螺仪参数，中远程扫射如激光般稳定，支持一键导入。",
    size: "8.5 KB",
    version: "v9.6",
    tag: "recommend",
    tagText: "REC",
    file: "resource_sensitivity_config.zip"
  },
  {
    title: "扁平玻璃化游戏界面UI美化补丁",
    category: "UI TEXTURE",
    desc: "重构游戏内大厅主背景及仓库页图标，替换为极简透明磨砂玻璃科技质感图标。超前未来感设计，颠覆传统视觉感官体验。",
    size: "18.4 MB",
    version: "v1.5",
    tag: "hot",
    tagText: "HOT",
    file: "resource_ui_glassmorphism.zip"
  }
];

const TUTORIALS = [
  {
    title: "和平精英美化与画质配置文件安全导入防封指南",
    category: "GUIDE / 基础教程",
    date: "2026-05-20",
    icon: "📁",
    excerpt: "手把手教你利用文件管理器将解压出的美化补丁或画质配置文件安全复制至系统沙盒，避免检测拦截。",
    content: `
      <p><strong>第一步：获取配置文件</strong><br>首先在当前站点的【美化资源】板块下载你所需要的配置文件或美化资源包，解压后会获得 <code>Active.sav</code> 或 <code>UserCustom.ini</code> 以及对应的 <code>Paks</code> 文件夹。</p>
      <p><strong>第二步：准备第三方文件管理器</strong><br>由于 Android 11 及以上系统的存储空间限制，推荐使用 <strong>MT管理器</strong> 或 <strong>ZArchiver</strong> 等可以获取 <code>Android/data</code> 目录访问权限的专业文件管理器。</p>
      <p><strong>第三步：定位至游戏沙盒目录</strong><br>打开文件管理器，导航至以下游戏数据缓存路径：<br>
      <div class="code-block">Android/data/com.tencent.tmgp.pubgmhd/files/UE4Game/ShadowTrackerExtra/ShadowTrackerExtra/Saved/</div></p>
      <p><strong>第四步：替换相应文件</strong><br>
      1. 如果是<strong>画质/灵敏度配置</strong>：放入 <code>Config/Android/</code> 目录下覆盖同名文件。<br>
      2. 如果是<strong>贴图/UI美化包</strong>：在 <code>Saved/</code> 下新建一个名为 <code>Paks</code> 的文件夹（若已有则不用建），将 <code>.pak</code> 文件放入 <code>Paks/</code> 中即可。
      </p>
      <p><strong>⚠️ 慕容子诚的安全防封提示：</strong><br>
      • 导入文件前请务必先彻底退出游戏，千万不要在游戏运行挂后台时替换。<br>
      • 每次游戏小版本更新更新可能会重置配置，若失效请重新下载最新适配版覆盖。<br>
      • 坚决不要修改游戏的核心逻辑汇编数据，仅替换资源文件，安全过检率 100%。
      </p>
    `
  },
  {
    title: "强制突破游戏引擎限制：骁龙与天玑芯片满帧调试",
    category: "PERFORMANCE / 画质优化",
    date: "2026-05-24",
    icon: "⚡",
    excerpt: "深入解读渲染引擎各配置项参数，通过手动屏蔽动态阴影与多余折射，降低GPU负载以确保极致稳定。",
    content: `
      <p>要想在不发热、不降频的情况下实现满帧运行，我们需要对游戏内的渲染配置文件进行微调。以下是优化核心参数的解析与配置示例：</p>
      <p><strong>配置文件核心变量修改清单：</strong></p>
      <p>在配置文件 <code>UserCustom.ini</code> 的 <code>[UserCustom DeviceProfile]</code> 下方添加或修改以下 CVars 参数：</p>
      <div class="code-block">
+CVars=r.PUBGDeviceProfileLevel=5
+CVars=r.PUBGFrameRateLimit=120
+CVars=r.ShadowQuality=0
+CVars=r.PUBGMSAA=2
+CVars=r.BloomQuality=0
+CVars=r.DetailMode=1</div>
      <p><strong>参数详细作用剖析：</strong><br>
      1. <code>r.PUBGFrameRateLimit=120</code>：强制解除服务器端对本地渲染帧率的物理锁定，开启 120 帧高刷选项。<br>
      2. <code>r.ShadowQuality=0</code>：<strong>最为关键的降温项！</strong>关闭实时动态阴影投射。在多人激战和烟雾弹较多时，能够让 GPU 负载降低约 30%，彻底杜绝因发热导致的突然掉帧。<br>
      3. <code>r.PUBGMSAA=2</code>：将抗锯齿倍率恒定为 2倍，既保证了画面中人物边缘的清晰度，又避免了 4倍抗锯齿对显存的过度挤占。
      </p>
      <p>修改完成后，保存文件，并给文件属性设置为 <strong>“只读”</strong>，防止游戏大厅启动时自动还原默认参数配置。</p>
    `
  },
  {
    title: "极简暗黑霓虹风手机桌面排版与 Kwgt 美化实践",
    category: "DESIGN / 桌面定制",
    date: "2026-05-25",
    icon: "🎨",
    excerpt: "配合本站提供的三张精美壁纸，如何合理布局小组件与精美线框图标包，打造具有未来科技感的极客主页。",
    content: `
      <p>一个好的主页不仅仅是换一张壁纸，而是要将壁纸、小组件、图标（Icon Pack）的色调与排版融为一体。下面分享一套适合科技赛博风壁纸的手机排版思路：</p>
      <p><strong>1. 壁纸的选择与裁剪：</strong><br>
      如果你使用的是 <code>每日壁纸/王林.png</code> 这类带有强烈国风修仙或角色主体的壁纸，裁剪时应把主体人物偏向屏幕的左侧或右侧，空出 2/3 的空间作为小组件 and 图标摆放区域，避免视觉杂乱。</p>
      <p><strong>2. 图标包（Icon Pack）搭配：</strong><br>
      • 搭配 <strong>“幻影霓虹”</strong> 壁纸：建议在应用商店下载带有“霓虹”、“发光”或“极简线框”字样的图标包。<br>
      • 搭配 <strong>“赛博深空”</strong> 壁纸：选用无边框（Border-less）扁平化白色或蓝色图标包，完美契合深蓝色背景。
      </p>
      <p><strong>3. Kwgt 磨砂玻璃小组件制作：</strong><br>
      使用 Kwgt Custom Widget 工具，在桌面上方添加一个大尺寸的时间天气组件：<br>
      • <strong>背景</strong>：设置形状为圆角矩形，填充颜色为 <code>#1Affffff</code>（10%透明度的纯白）。<br>
      • <strong>滤镜</strong>：开启 <strong>“背景模糊 (Background Blur)”</strong> 设为 25 左右，在手机桌面实现与我们网站一模一样的 Glassmorphism 磨砂玻璃悬浮效果。<br>
      • <strong>文字</strong>：时间字体选用 <code>Orbitron</code> 或 <code>Comfortaa</code>，完美体现赛博科技气息。
      </p>
    `
  }
];

const WALLPAPERS = [
  {
    name: "幻影霓虹 PHANTOM NEON",
    size: "2.4 MB",
    src: "每日壁纸/ChatGPT Image 2026年5月26日 11_36_19.png"
  },
  {
    name: "赛博深空 CYBER DEEP SPACE",
    size: "2.1 MB",
    src: "每日壁纸/ChatGPT Image 2026年5月26日 11_42_16.png"
  },
  {
    name: "仙逆王林 RENEGADE IMMORTAL",
    size: "2.3 MB",
    src: "每日壁纸/王林.png"
  }
];

// 左侧侧边栏配置 (仿 Sidewave scene-state)
const SCENE_CONFIGS = {
  home: {
    title: "个人主页",
    desc: "欢迎来到慕容子诚的个人空间。这里收集并打磨了最极致的流畅画质解锁方案、界面美化工具以及精美壁纸。",
    anchors: [
      { label: "空间引言", frame: 0 },
      { label: "关于作者", frame: 400 },
      { label: "粒子引擎", frame: 800 }
    ],
    nextLabel: "向下滚动：美化资源",
    nextFrame: 1500,
    class: "home-active"
  },
  resources: {
    title: "美化资源",
    desc: "和平精英 120 帧高刷解锁配置、发光科技准星及扁平磨砂玻璃化界面 UI 补丁，全方位革新游戏操控质感。",
    anchors: [
      { label: "画质解锁配置", frame: 1200 },
      { label: "十字准星美化", frame: 1600 },
      { label: "UI美化补丁", frame: 2000 }
    ],
    nextLabel: "向下滚动：实用教程",
    nextFrame: 2900,
    class: "resources-active"
  },
  tutorials: {
    title: "实用教程",
    desc: "深入浅出的安全配置文件防封导入指南、芯片满帧调试变量解析，以及 Kwgt 手机桌面美化布局指南。",
    anchors: [
      { label: "安全导入指南", frame: 2400 },
      { label: "芯片满帧调试", frame: 2900 },
      { label: "Kwgt桌面美化", frame: 3200 }
    ],
    nextLabel: "向下滚动：精美壁纸",
    nextFrame: 4100,
    class: "tutorials-active"
  },
  wallpapers: {
    title: "精美壁纸",
    desc: "高清高对比度画质美化系列壁纸。收录极简霓虹、赛博深空以及国风修仙主题大图，支持自适应下载。",
    anchors: [
      { label: "壁纸：幻影霓虹", frame: 3600 },
      { label: "壁纸：赛博深空", frame: 4100 },
      { label: "壁纸：仙逆王林", frame: 4500 }
    ],
    nextLabel: "向下滚动：联系作者",
    nextFrame: 5400,
    class: "wallpapers-active"
  },
  contact: {
    title: "联系作者",
    desc: "与我保持沟通或提交关于配置补丁的反馈。支持官方邮箱沟通、QQ粉丝交流群以及商业联络对接。",
    anchors: [
      { label: "反馈邮箱登记", frame: 4800 },
      { label: "QQ粉丝交流群", frame: 5300 },
      { label: "空间版权声明", frame: 5700 }
    ],
    nextLabel: "点击返回主页",
    nextFrame: 0,
    class: "contact-active"
  }
};


// ==========================================================================
// 2. Three.js GLSL 粒子系统核心代码 (5种形态与音频律动)
// ==========================================================================

let scene, camera, renderer, particleGeometry, particleMaterial, particles;
let currentShape = 0; // 0:星盘, 1:立方体, 2:涡流, 3:波动面, 4:神经网络
let targetShape = 0;
let morphProgress = 0;
let isTransitioning = false;
const TOTAL_SHAPES = 5;

let mouse = null;
let targetMouse = null;

// 音频分析数据
let audioCtx = null;
let analyser = null;
let sourceNode = null;
let dataArray = null;
let currentAmplitude = 0.0;

function init3DParticleSystem() {
  if (typeof THREE === 'undefined') {
    console.warn("Three.js 未加载，3D 粒子背景已禁用。已应用后备方案。");
    const canvas = document.getElementById('bg-canvas');
    if (canvas) canvas.style.display = 'none';
    document.body.style.backgroundColor = "#000000";
    return;
  }

  const container = document.getElementById('bg-canvas');
  if (!container) return;

  mouse = new THREE.Vector2(0, 0);
  targetMouse = new THREE.Vector2(0, 0);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  function updateCameraZ() {
    const aspect = window.innerWidth / window.innerHeight;
    const maxShapeExtent = 32.0;
    const fovRad = (camera.fov * Math.PI) / 180;
    let requiredZ = maxShapeExtent / Math.tan(fovRad / 2);
    
    if (aspect < 1.0) {
      requiredZ /= aspect; // 手机竖屏时拉远相机
    }
    camera.position.z = requiredZ;
  }
  updateCameraZ();

  renderer = new THREE.WebGLRenderer({ 
    canvas: container, 
    antialias: true, 
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // 10万个粒子，保障视觉密度与冲击感
  const particleCount = 100000;
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

      // 调色盘公式，创造柔美霓虹极光过渡
      vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
          return a + b*cos( 6.28318*(c*t+d) );
      }

      // Shape 0: 星盘银河 (HOME)
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
              float angle = id * PI * 2.0 * 1000.0 + uTime * 0.2 * (ringIdx > 1.0 ? -1.0 : 1.0);
              float r = 24.0 + ringIdx * 4.0 + (rnd.z * 0.5);
              pos = vec3(r * cos(angle), (rnd.x - 0.15) * 2.0, r * sin(angle));
              float tilt = 0.5 + ringIdx * 0.8;
              float rotX = cos(tilt); float rotY = sin(tilt);
              pos.yz = mat2(rotX, -rotY, rotY, rotX) * pos.yz;
              pos.xy = mat2(rotX, -rotY, rotY, rotX) * pos.xy;
          }
          return pos * 0.85;
      }

      // Shape 1: 数字化阵列/四维立方体 (RESOURCE)
      vec3 getTesseract(float id, vec3 rnd) {
          float size = 26.0;
          
          // 根据随机值将粒子离散分布在多层空心立方体的表面或边框上
          float layer = floor(rnd.x * 3.0) + 1.0;
          float scale = layer / 3.0;
          float halfS = (size * scale) * 0.5;
          
          vec3 p = (rnd - 0.5) * (size * scale);
          
          // 将部分粒子强行贴紧在边界面，以显示清晰的立方体包络
          float face = floor(rnd.y * 6.0);
          if (face == 0.0) p.x = halfS;
          else if (face == 1.0) p.x = -halfS;
          else if (face == 2.0) p.y = halfS;
          else if (face == 3.0) p.y = -halfS;
          else if (face == 4.0) p.z = halfS;
          else if (face == 5.0) p.z = -halfS;
          
          // 在表面注入轻微的高频噪点起伏
          p += (rnd - 0.5) * 0.8;
          return p;
      }

      // Shape 2: 涡流隧道 (TUTORIAL)
      vec3 getVortex(float id, vec3 rnd) {
          float h = (id - 0.5) * 70.0; 
          float angle = h * 0.45 + uTime * 0.6 + (rnd.y * PI * 2.0);
          
          // 随着深度产生收缩形成圆锥涡旋
          float radius = 10.0 + (35.0 - h) * 0.18 + rnd.x * 4.0;
          vec3 pos = vec3(cos(angle) * radius, h * 0.8, sin(angle) * radius);
          return pos;
      }

      // Shape 3: 全息波動平面/数字像素浪 (WALLPAPER)
      vec3 getWave(float id, vec3 rnd) {
          float size = 36.0;
          float x = (rnd.x - 0.5) * size;
          float z = (rnd.y - 0.5) * size;
          
          // 三维复合正弦波波动
          float dist = length(vec2(x, z));
          float waveSpeed = uTime * 1.5;
          float y = sin(x * 0.35 + waveSpeed) * cos(z * 0.35 + waveSpeed) * 3.5;
          // 加入从中心散开的水波涟漪
          y += sin(dist * 0.5 - waveSpeed) * 1.2;
          
          return vec3(x, y, z);
      }

      // Shape 4: 神经网络连接球体 (CONTACT)
      vec3 getNeuralNetwork(float id, vec3 rnd) {
          float u = rnd.x * PI * 2.0;
          float v = acos(2.0 * rnd.y - 1.0);
          float r = 16.0;
          
          // 在网格表面产生一定的起伏波动
          float pulse = sin(id * 100.0 + uTime * 2.0) * 0.6;
          vec3 pos = vec3(
              (r + pulse) * sin(v) * cos(u),
              (r + pulse) * sin(v) * sin(u),
              (r + pulse) * cos(v)
          );
          return pos;
      }

      // 获取目标形态坐标
      vec3 getShapePosition(int shape, float id, vec3 rnd) {
          if (shape == 0) return getAstrolabe(id, rnd);
          if (shape == 1) return getTesseract(id, rnd);
          if (shape == 2) return getVortex(id, rnd);
          if (shape == 3) return getWave(id, rnd);
          if (shape == 4) return getNeuralNetwork(id, rnd);
          return vec3(0.0);
      }

      // 形态主色调
      vec3 getShapeColor(int shape, float id, vec3 rnd) {
          if (shape == 0) {
              // 霓虹青蓝
              return palette(id + uTime*0.05, vec3(0.5, 0.5, 0.6), vec3(0.3, 0.3, 0.4), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
          }
          if (shape == 1) {
              // 数字化青绿
              return palette(id*0.2, vec3(0.1, 0.7, 0.9), vec3(0.0, 0.3, 0.4), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.2, 0.4));
          }
          if (shape == 2) {
              // 教程暗紫粉
              return palette(id + uTime*0.08, vec3(0.8, 0.2, 0.9), vec3(0.3, 0.1, 0.4), vec3(1.0, 0.5, 0.5), vec3(0.0, 0.3, 0.6));
          }
          if (shape == 3) {
              // 壁纸亮霓虹红/青
              return palette(id, vec3(0.9, 0.1, 0.3), vec3(0.1, 0.5, 0.8), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.25, 0.5));
          }
          if (shape == 4) {
              // 联系荧光绿/蓝
              return palette(id, vec3(0.0, 0.9, 0.4), vec3(0.1, 0.3, 0.8), vec3(0.5, 1.0, 0.5), vec3(0.1, 0.1, 0.2));
          }
          return vec3(1.0);
      }

      // 三维缓动插值函数
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
          
          // 在形变过程中注入三维向外膨胀的呼吸波
          float breatheMask = sin(uMorphProgress * PI);
          finalPos += normalize(finalPos) * breatheMask * 7.0;

          // ------------------------------------------------------------------
          // 核心特性：音乐振幅律动 (Audio Reactive Position Deformation)
          // ------------------------------------------------------------------
          float audioDeform = sin(uTime * 18.0 + aId * 80.0) * uAudioAmplitude * 3.5;
          finalPos += normalize(finalPos) * audioDeform;

          // 结合鼠标悬浮做三维视差自旋转控制
          float autoRot1 = (uCurrentShape == 3) ? 0.01 * uTime : uTime * 0.05;
          float autoRot2 = (uTargetShape == 3) ? 0.01 * uTime : uTime * 0.05;
          
          float rotY = mix(autoRot1, autoRot2, easedMorph) + uMouse.x * 0.28;
          float rotX = uMouse.y * 0.28;
          
          // 旋转矩阵
          float cY = cos(rotY); float sY = sin(rotY);
          mat3 rotMatY = mat3(
              cY, 0.0, sY,
              0.0, 1.0, 0.0,
              -sY, 0.0, cY
          );
          
          float cX = cos(rotX); float sX = sin(rotX);
          mat3 rotMatX = mat3(
              1.0, 0.0, 0.0,
              0.0, cX, -sX,
              0.0, sX, cX
          );
          
          finalPos = rotMatY * rotMatX * finalPos;

          vColor = mix(c1, c2, easedMorph);
          
          // 闪烁脉冲微弱起伏
          vAlpha = 0.25 + 0.75 * sin(uTime * 3.0 + aId * PI * 20.0);

          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // ------------------------------------------------------------------
          // 核心特性：粒子尺寸音频闪爆 (Audio Reactive Size Pulse)
          // ------------------------------------------------------------------
          gl_PointSize = (1.8 + aRandom.x * 2.0 + uAudioAmplitude * 4.8) * (38.0 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
          // 精确绘制高斯模糊发光圆点，杜绝生硬的正方形点
          vec2 uv = gl_PointCoord.xy - vec2(0.5);
          float dist = length(uv);
          
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.05, dist);

          gl_FragColor = vec4(vColor, alpha * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false, 
    blending: THREE.AdditiveBlending 
  });

  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // 粒子群居中控制 (移除头像后粒子作为整体背景置于屏幕正中)
  function adjustParticlePosition() {
    const aspect = window.innerWidth / window.innerHeight;
    particles.position.x = 0.0;
    if (aspect > 1.0) {
      particles.position.y = 0.0;
    } else {
      particles.position.y = -2.5; // 移动端稍向下偏，避让顶部面板
    }
  }
  adjustParticlePosition();

  // 鼠标交互监听
  window.addEventListener('mousemove', (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    // 跟踪整个屏幕的中心，以便粒子围绕屏幕中央产生完美自旋视差
    targetMouse.x = (clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('touchmove', (e) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    
    targetMouse.x = (clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    updateCameraZ();
    adjustParticlePosition();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    
    mouse.x += (targetMouse.x - mouse.x) * delta * 2.5;
    mouse.y += (targetMouse.y - mouse.y) * delta * 2.5;
    
    // ------------------------------------------------------------------
    // 核心特性：获取音频分析频段
    // ------------------------------------------------------------------
    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      // 捕获低频节奏频段，提供完美的低音鼓点粒子跃动
      const len = Math.min(dataArray.length, 16);
      for (let i = 0; i < len; i++) {
        sum += dataArray[i];
      }
      let avg = sum / len; // 0 ~ 255
      let norm = avg / 255.0;
      
      // 平滑插值，防止粒子剧烈闪烁造成的视觉疲劳
      currentAmplitude += (norm - currentAmplitude) * 0.16;
    } else {
      currentAmplitude = 0.0;
    }

    if (isTransitioning) {
      morphProgress += delta * 0.72; // 插值过渡时间约 1.4 秒
      
      if (morphProgress >= 1) {
        morphProgress = 0;
        currentShape = targetShape;
        isTransitioning = false;
        updateDimensionBtnUI(currentShape);
      }
    }
    
    particleMaterial.uniforms.uTime.value = elapsedTime;
    particleMaterial.uniforms.uMorphProgress.value = morphProgress;
    particleMaterial.uniforms.uCurrentShape.value = currentShape;
    particleMaterial.uniforms.uTargetShape.value = targetShape;
    particleMaterial.uniforms.uMouse.value.copy(mouse);
    particleMaterial.uniforms.uAudioAmplitude.value = currentAmplitude;
    
    renderer.render(scene, camera);
  }

  animate();
}

// 激发 3D 形变过渡
function triggerMorphTo(shapeIndex) {
  if (isTransitioning || currentShape === shapeIndex) return;
  targetShape = shapeIndex;
  isTransitioning = true;
  morphProgress = 0;
}

// 同步控制维度切换条 UI 状态
function updateDimensionBtnUI(shapeIndex) {
  const btns = document.querySelectorAll('.floating-engine-btn');
  btns.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-shape'));
    if (idx === shapeIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}


// ==========================================================================
// 3. Web Audio API 与音乐播放器控制层
// ==========================================================================

let audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let loopMode = 'list'; // 'list' | 'single' | 'random'

function initMusicPlayer() {
  const playerContainer = document.getElementById('mini-player');
  const playBtn = document.getElementById('play-btn');
  const nextBtn = document.getElementById('next-btn');
  const loopBtn = document.getElementById('loop-btn');
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-fill');
  const trackNameText = document.getElementById('track-name');
  const trackArtistText = document.getElementById('track-artist');

  if (!playerContainer) return;

  loadSong(currentSongIndex);

  playBtn.addEventListener('click', () => {
    // 响应用户首击以安全初始化 Web Audio 上下文，避开浏览器限制
    initAudioContext();
    togglePlay();
  });
  
  nextBtn.addEventListener('click', () => {
    initAudioContext();
    playNext();
  });

  loopBtn.addEventListener('click', () => {
    if (loopMode === 'list') {
      loopMode = 'single';
      loopBtn.textContent = '单曲循环';
      loopBtn.classList.add('active-loop');
      loopBtn.title = "单曲循环";
    } else if (loopMode === 'single') {
      loopMode = 'random';
      loopBtn.textContent = '随机播放';
      loopBtn.classList.add('active-loop');
      loopBtn.title = "随机播放";
    } else {
      loopMode = 'list';
      loopBtn.textContent = '列表循环';
      loopBtn.classList.remove('active-loop');
      loopBtn.title = "列表循环";
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${percent}%`;
    }
  });

  audio.addEventListener('ended', () => {
    if (loopMode === 'single') {
      audio.currentTime = 0;
      audio.play();
    } else if (loopMode === 'random') {
      let randIdx = currentSongIndex;
      while (randIdx === currentSongIndex && MUSIC_LIST.length > 1) {
        randIdx = Math.floor(Math.random() * MUSIC_LIST.length);
      }
      playSongAt(randIdx);
    } else {
      playNext();
    }
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    if (audio.duration) {
      audio.currentTime = percent * audio.duration;
    }
  });

  function loadSong(index) {
    const song = MUSIC_LIST[index];
    audio.src = song.src;
    audio.load();
    trackNameText.textContent = song.title;
    trackArtistText.textContent = song.artist;
    
    // 切歌时，触发当前歌曲主线绑定的 3D 粒子形态
    triggerMorphTo(song.shape);
  }

  function togglePlay() {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  function playSong() {
    isPlaying = true;
    audio.play().catch(e => console.log("首次自动播放限制被拦截: ", e));
    playerContainer.classList.add('playing');
    playBtn.textContent = 'PAUSE';
    if (audioCtx) audioCtx.resume();
  }

  function pauseSong() {
    isPlaying = false;
    audio.pause();
    playerContainer.classList.remove('playing');
    playBtn.textContent = 'PLAY';
  }

  function playSongAt(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    playSong();
  }

  function playNext() {
    let nextIndex = (currentSongIndex + 1) % MUSIC_LIST.length;
    playSongAt(nextIndex);
  }
}

// 核心初始化 Web Audio API
function initAudioContext() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64; // 较小的快速傅里叶变换尺寸，保障对重低音的敏感度与性能
    
    sourceNode = audioCtx.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    console.log("AudioContext & AnalyserNode 实例化成功，已载入粒子音频律动管线。");
  } catch (e) {
    console.warn("当前浏览器安全组策略对 Web Audio 进行了屏蔽: ", e);
  }
}


// ==========================================================================
// 4. UI 页面交互 (滚动驱动帧动画、左侧侧边栏联动、全屏极光菜单、弹窗)
// ==========================================================================

function initUIInteractions() {
  
  // ------------------------------------------------------------------
  // A. 滚动驱动时间轴帧引擎 (Scroll-Driven Timeline Engine)
  // ------------------------------------------------------------------
  const sections = document.querySelectorAll('.scroll-section');
  const lateralPanel = document.getElementById('lateral-panel');
  const lateralSceneTitle = document.getElementById('lateral-scene-title');
  const lateralSceneDesc = document.getElementById('lateral-scene-desc');
  const lateralAnchorsList = document.getElementById('lateral-anchors-list');
  const lateralNextBtn = document.getElementById('lateral-next-btn');

  let activeSceneKey = '';

  function handleTimelineScroll() {
    const scrollTop = window.scrollY;
    
    // 1. 小节内容淡入淡出帧判定
    sections.forEach(section => {
      const start = parseInt(section.getAttribute('data-frame-start'));
      const end = parseInt(section.getAttribute('data-frame-end'));
      
      if (scrollTop >= start && scrollTop <= end) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });

    // 2. 映射 3D 粒子基本视角的自旋转与缩放 (随滚动深度产生奇妙视差)
    const maxScroll = document.getElementById('scroll-spacer').offsetHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? (scrollTop / maxScroll) : 0;
    
    if (particles) {
      particles.rotation.y = scrollPercent * Math.PI * 1.5; // Y轴转圈数
      particles.rotation.x = scrollPercent * Math.PI * 0.15; // X轴摆动弧度
    }

    // 3. 左侧侧边栏内容联动判定
    let currentSceneKey = 'home';
    if (scrollTop >= 1100 && scrollTop < 2300) currentSceneKey = 'resources';
    else if (scrollTop >= 2300 && scrollTop < 3500) currentSceneKey = 'tutorials';
    else if (scrollTop >= 3500 && scrollTop < 4700) currentSceneKey = 'wallpapers';
    else if (scrollTop >= 4700) currentSceneKey = 'contact';

    // 联动触发粒子形态转换 (0:星盘, 1:立方体, 2:涡流, 3:波动面, 4:神经网络)
    if (currentSceneKey === 'home') triggerMorphTo(0);
    else if (currentSceneKey === 'resources') triggerMorphTo(1);
    else if (currentSceneKey === 'tutorials') triggerMorphTo(2);
    else if (currentSceneKey === 'wallpapers') triggerMorphTo(3);
    else if (currentSceneKey === 'contact') triggerMorphTo(4);

    // 联动刷新侧边栏 DOM 结构与样式类 (防频闪过滤)
    if (currentSceneKey !== activeSceneKey) {
      activeSceneKey = currentSceneKey;
      renderLateralPanel(activeSceneKey);
    }

    // 4. 更新侧边栏子导航的当前活性锚点高亮
    const activeConfig = SCENE_CONFIGS[activeSceneKey];
    if (activeConfig) {
      const anchorItems = document.querySelectorAll('.lateral-anchor-item');
      anchorItems.forEach((item, idx) => {
        const anchorFrame = activeConfig.anchors[idx].frame;
        // 如果滚动非常贴近此锚点帧数，设定高亮
        const nextAnchorFrame = activeConfig.anchors[idx + 1] ? activeConfig.anchors[idx + 1].frame : 9999;
        
        if (scrollTop >= anchorFrame && scrollTop < nextAnchorFrame) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // 渲染左侧面板细节
  function renderLateralPanel(key) {
    const config = SCENE_CONFIGS[key];
    if (!config) return;

    // 清理其他活性类
    if (lateralPanel) {
      lateralPanel.className = 'lateral-info-panel';
      lateralPanel.classList.add(config.class);
    }

    // 文字内容更新
    if (lateralSceneTitle) lateralSceneTitle.textContent = config.title;
    if (lateralSceneDesc) lateralSceneDesc.textContent = config.desc;

    // 下一节跳转小字更新
    if (lateralNextBtn) {
      lateralNextBtn.textContent = config.nextLabel;
      // 重写点击事件一键滑动到对应小节帧
      lateralNextBtn.onclick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: config.nextFrame, behavior: 'smooth' });
      };
    }

    // 子导航列表刷新
    if (lateralAnchorsList) {
      lateralAnchorsList.innerHTML = '';
      config.anchors.forEach(anch => {
        const li = document.createElement('li');
        li.className = 'lateral-anchor-item';
        li.textContent = anch.label;
        
        // 点击平滑滑动到指定帧
        li.addEventListener('click', () => {
          window.scrollTo({ top: anch.frame, behavior: 'smooth' });
        });
        
        lateralAnchorsList.appendChild(li);
      });
    }
  }

  // 挂载主滚动监听
  window.addEventListener('scroll', handleTimelineScroll);
  // 首屏渲染初始化
  handleTimelineScroll();


  // ------------------------------------------------------------------
  // B. 右上角全屏大字下拉菜单逻辑 & Hover 极光背景联动
  // ------------------------------------------------------------------
  const menuBtn = document.getElementById('menu-btn');
  const menuPanel = document.getElementById('menu-panel');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const menuGlow = document.getElementById('menu-glow');

  // 5种菜单 Hover 的极光彩霞配色 (仿薄膜干涉彩光)
  const glowColors = [
    "radial-gradient(circle at 35% 45%, rgba(0, 242, 254, 0.16) 0%, rgba(189, 0, 255, 0.1) 35%, transparent 70%)", // HOME 青紫
    "radial-gradient(circle at 30% 60%, rgba(0, 242, 254, 0.2) 0%, rgba(0, 230, 118, 0.08) 45%, transparent 80%)",  // RESOURCE 蓝绿
    "radial-gradient(circle at 65% 30%, rgba(189, 0, 255, 0.2) 0%, rgba(255, 0, 127, 0.08) 45%, transparent 80%)",  // TUTORIAL 紫红
    "radial-gradient(circle at 45% 45%, rgba(255, 0, 127, 0.2) 0%, rgba(0, 242, 254, 0.08) 45%, transparent 80%)",  // WALLPAPER 红蓝
    "radial-gradient(circle at 55% 65%, rgba(0, 230, 118, 0.2) 0%, rgba(189, 0, 255, 0.08) 45%, transparent 80%)"   // CONTACT 绿紫
  ];

  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', () => {
      menuPanel.classList.add('active');
      // 开启音频上下文，为律动做铺垫
      initAudioContext();
    });
    
    const closeAction = () => {
      menuPanel.classList.remove('active');
    };
    
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeAction);
    
    // 菜单大字 Hover 极光切换与点击滑动
    const menuLinks = document.querySelectorAll('.menu-nav-link');
    menuLinks.forEach((link, idx) => {
      // Hover 极光
      link.addEventListener('mouseenter', () => {
        if (menuGlow) {
          menuGlow.style.background = glowColors[idx];
          menuGlow.style.opacity = '1';
        }
      });
      
      // 点击一键平滑跳转到对应帧数
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetFrame = parseInt(link.getAttribute('data-target'));
        
        closeAction();
        
        setTimeout(() => {
          window.scrollTo({ top: targetFrame, behavior: 'smooth' });
        }, 350);
      });
    });
  }


  // ------------------------------------------------------------------
  // C. 维度自旋彩蛋与维度选择按钮
  // ------------------------------------------------------------------
  const centerAvatar = document.getElementById('center-avatar');
  if (centerAvatar) {
    centerAvatar.addEventListener('click', () => {
      initAudioContext();
      // 在 5 种形态间循环变换
      const nextShape = (currentShape + 1) % TOTAL_SHAPES;
      triggerMorphTo(nextShape);
    });
  }

  const dimButtons = document.querySelectorAll('.floating-engine-btn');
  dimButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudioContext();
      const shapeIdx = parseInt(btn.getAttribute('data-shape'));
      triggerMorphTo(shapeIdx);
    });
  });


  // ------------------------------------------------------------------
  // D. 渲染美化资源数据到网格
  // ------------------------------------------------------------------
  const resourceGrid = document.querySelector('.resource-grid');
  if (resourceGrid) {
    resourceGrid.innerHTML = '';
    RESOURCES.forEach(res => {
      const card = document.createElement('div');
      card.className = 'res-card-sidewave';
      
      const badgeHtml = res.tag ? `<span class="res-badge-sidewave ${res.tag}">${res.tagText}</span>` : '';
      
      card.innerHTML = `
        ${badgeHtml}
        <div class="res-meta-tag">// ${res.category}</div>
        <div class="res-title-sidewave">${res.title}</div>
        <div class="res-desc-sidewave">${res.desc}</div>
        <div class="res-footer-row">
          <div class="res-details">
            <span>版本: ${res.version}</span>
            <span>大小: ${res.size}</span>
          </div>
          <button class="res-btn-sidewave dl-btn" data-file="${res.file}" data-name="${res.title}">立即下载</button>
        </div>
      `;
      resourceGrid.appendChild(card);
    });

    // 绑定模拟下载
    const dlButtons = resourceGrid.querySelectorAll('.dl-btn');
    dlButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudioContext();
        const fileName = btn.getAttribute('data-file');
        const resName = btn.getAttribute('data-name');
        
        const originalText = btn.textContent;
        btn.textContent = `打包中...`;
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
          btn.textContent = `已保存`;
          btn.style.borderColor = 'var(--color-primary)';
          btn.style.color = 'var(--color-primary)';
          
          const blob = new Blob([`这是和平精英优化资源包: ${resName}`], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.pointerEvents = 'auto';
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 3000);
        }, 1200);
      });
    });
  }


  // ------------------------------------------------------------------
  // E. 渲染教程数据到网格与 Modal 唤起
  // ------------------------------------------------------------------
  const tutorialGrid = document.querySelector('.tutorial-grid');
  const textModal = document.getElementById('text-modal');
  
  if (tutorialGrid && textModal) {
    tutorialGrid.innerHTML = '';
    TUTORIALS.forEach((tut, idx) => {
      const card = document.createElement('div');
      card.className = 'tut-card-sidewave';
      card.innerHTML = `
        <div class="tut-header-row">
          <span class="tut-tag-sidewave">// ${tut.category}</span>
          <span class="tut-date-sidewave">${tut.date}</span>
        </div>
        <h3 class="tut-title-sidewave">${tut.title}</h3>
        <p class="tut-excerpt-sidewave">${tut.excerpt}</p>
        <button class="tut-read-btn" data-index="${idx}">
          阅读全文 <i class="fas fa-arrow-right" style="font-size: 8px;"></i>
        </button>
      `;
      tutorialGrid.appendChild(card);
    });

    const readBtns = tutorialGrid.querySelectorAll('.tut-read-btn');
    const modalTag = textModal.querySelector('.modal-tag');
    const modalTitle = textModal.querySelector('.modal-title');
    const modalBody = textModal.querySelector('.modal-body');

    readBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudioContext();
        const idx = parseInt(btn.getAttribute('data-index'));
        const tut = TUTORIALS[idx];

        modalTag.textContent = tut.category;
        modalTitle.textContent = tut.title;
        modalBody.innerHTML = tut.content;

        textModal.classList.add('active');
      });
    });
  }


  // ------------------------------------------------------------------
  // F. 渲染壁纸数据到画廊与大图灯箱
  // ------------------------------------------------------------------
  const wallpaperGrid = document.querySelector('.wallpaper-grid');
  const imageModal = document.getElementById('image-modal');
  
  if (wallpaperGrid && imageModal) {
    wallpaperGrid.innerHTML = '';
    WALLPAPERS.forEach((wp, idx) => {
      const card = document.createElement('div');
      card.className = 'wp-card-sidewave';
      card.innerHTML = `
        <img class="wallpaper-img" src="${wp.src}" alt="${wp.name}" loading="lazy">
        <div class="wp-overlay-sidewave">
          <div class="wp-name-sidewave">${wp.name}</div>
          <div class="wp-size-sidewave">文件大小: ${wp.size}</div>
          <div class="wp-btns-sidewave">
            <button class="wp-btn-sidewave view" data-src="${wp.src}" data-name="${wp.name}">大图预览</button>
            <a class="wp-btn-sidewave download" href="${wp.src}" download="${wp.name}.png">保存壁纸</a>
          </div>
        </div>
      `;
      wallpaperGrid.appendChild(card);
    });

    const viewBtns = wallpaperGrid.querySelectorAll('.wp-btn-sidewave.view');
    const lightboxImg = imageModal.querySelector('.lightbox-img');
    const lightboxCaption = imageModal.querySelector('.lightbox-caption');

    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudioContext();
        const src = btn.getAttribute('data-src');
        const name = btn.getAttribute('data-name');

        lightboxImg.src = src;
        lightboxCaption.textContent = name;

        imageModal.classList.add('active');
      });
    });
  }

  // G. 模态框关闭事件
  const modalCloseActions = document.querySelectorAll('.modal-close, .modal-overlay');
  modalCloseActions.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  // H. 反馈提交处理
  const fbSubmit = document.getElementById('feedback-submit');
  const fbEmail = document.getElementById('feedback-email');
  if (fbSubmit && fbEmail) {
    fbSubmit.addEventListener('click', () => {
      initAudioContext();
      const val = fbEmail.value.trim();
      const privacyCheck = document.getElementById('privacy-check');
      
      if (!val) {
        alert("请输入有效的电子邮箱地址！");
        return;
      }
      if (privacyCheck && !privacyCheck.checked) {
        alert("请阅读并同意本空间的个人隐私与使用声明条款。");
        return;
      }

      fbSubmit.innerHTML = `<i class="fas fa-check" style="font-size: 10px;"></i>`;
      fbSubmit.style.background = 'var(--color-success)';
      alert(`感谢您的反馈！您的邮箱 ${val} 已成功登记，我会尽快与您取得联系。`);
      fbEmail.value = '';
      
      setTimeout(() => {
        fbSubmit.innerHTML = `<i class="fas fa-arrow-right" style="font-size: 10px;"></i>`;
        fbSubmit.style.background = '';
      }, 3000);
    });
  }
}


// ==========================================================================
// 5. 应用生命周期入口初始化
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化 3D 粒子背景
  init3DParticleSystem();

  // 2. 初始化极简音乐播放器
  initMusicPlayer();

  // 3. 初始化 UI 滚动时间轴及事件机制
  initUIInteractions();
  
  // 4. 打印欢迎日志信息
  console.log("%c 慕容子诚 个人空间 %c v4.0 实时音乐粒子律动版 ", 
    "color: #020205; background: #00f2fe; padding: 5px 10px; border-radius: 4px 0 0 4px; font-weight: bold;", 
    "color: #fff; background: #bd00ff; padding: 5px 10px; border-radius: 0 4px 4px 0;"
  );
});
