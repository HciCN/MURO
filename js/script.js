/* ==========================================================================
   慕容子诚 个人网站 & 3D粒子音乐空间 - 核心交互大脑
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. 真实音乐数据定义 (更新为 assets/music 目录下的 4 首 m4a 文件)
  // ==========================================================================
  const MUSIC_LIST = [
    { 
      title: "HEAVEN (宿命氛围版)", 
      artist: "慕容子诚特调", 
      src: "assets/music/HEAVEN(宿命氛围版).m4a", 
      shape: 2 // 对应：涡流形态
    },
    { 
      title: "心似烟火", 
      artist: "慕容子诚特调", 
      src: "assets/music/心似烟火.m4a", 
      shape: 1 // 对应：四维立方体
    },
    { 
      title: "海屿你 (emo版)", 
      artist: "慕容子诚特调", 
      src: "assets/music/海屿你(emo版).m4a", 
      shape: 3 // 对应：波动面
    },
    { 
      title: "爱如潮水", 
      artist: "慕容子诚特调", 
      src: "assets/music/爱如潮水.m4a", 
      shape: 4 // 对应：神经网络
    }
  ];

  // ==========================================================================
  // 2. 静态页面数据 (资源、教程、壁纸数据源)
  // ==========================================================================
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
        如果你使用的是 <code>assets/wallpapers/王林.png</code> 这类带有强烈国风修仙或角色主体的壁纸，裁剪时应把主体人物偏向屏幕的左侧或右侧，空出 2/3 的空间作为小组件 and 图标摆放区域，避免视觉杂乱。</p>
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
      src: "assets/wallpapers/ChatGPT Image 2026年5月26日 11_36_19.png"
    },
    {
      name: "赛博深空 CYBER DEEP SPACE",
      size: "2.1 MB",
      src: "assets/wallpapers/ChatGPT Image 2026年5月26日 11_42_16.png"
    },
    {
      name: "仙逆王林 RENEGADE IMMORTAL",
      size: "2.3 MB",
      src: "assets/wallpapers/王林.png"
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
            return pos * 0.85;
        }

        // Shape 1: 四维立方体阵列
        vec3 getTesseract(float id, vec3 rnd) {
            float size = 26.0;
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

        // Shape 2: 涡流隧道
        vec3 getVortex(float id, vec3 rnd) {
            float h = (id - 0.5) * 70.0; 
            float angle = h * 0.45 + uTime * 0.6 + (rnd.y * PI * 2.0);
            float radius = 10.0 + (35.0 - h) * 0.18 + rnd.x * 4.0;
            vec3 pos = vec3(cos(angle) * radius, h * 0.8, sin(angle) * radius);
            return pos;
        }

        // Shape 3: 全息波動平面
        vec3 getWave(float id, vec3 rnd) {
            float size = 36.0;
            float x = (rnd.x - 0.5) * size;
            float z = (rnd.y - 0.5) * size;
            float dist = length(vec2(x, z));
            float waveSpeed = uTime * 1.5;
            
            // 基础水波 + 音频幅度乘数
            float y = sin(x * 0.35 + waveSpeed) * cos(z * 0.35 + waveSpeed) * (3.5 + uAudioAmplitude * 8.0);
            y += sin(dist * 0.5 - waveSpeed) * (1.2 + uAudioAmplitude * 3.0);
            return vec3(x, y, z);
        }

        // Shape 4: 神经网络球体
        vec3 getNeuralNetwork(float id, vec3 rnd) {
            float u = rnd.x * PI * 2.0;
            float v = acos(2.0 * rnd.y - 1.0);
            float r = 16.0;
            
            // 呼吸脉动 + 音乐节奏震动
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
            if (shape == 1) return getTesseract(id, rnd);
            if (shape == 2) return getVortex(id, rnd);
            if (shape == 3) return getWave(id, rnd);
            if (shape == 4) return getNeuralNetwork(id, rnd);
            return vec3(0.0);
        }

        vec3 getShapeColor(int shape, float id, vec3 rnd) {
            if (shape == 0) { // 星盘：霓虹青蓝
                return palette(id + uTime*0.05, vec3(0.5, 0.5, 0.6), vec3(0.3, 0.3, 0.4), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
            }
            if (shape == 1) { // 立方体：科技翠绿
                return palette(id*0.2, vec3(0.1, 0.7, 0.9), vec3(0.0, 0.3, 0.4), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.2, 0.4));
            }
            if (shape == 2) { // 涡流：迷幻深紫
                return palette(id + uTime*0.08, vec3(0.8, 0.2, 0.9), vec3(0.3, 0.1, 0.4), vec3(1.0, 0.5, 0.5), vec3(0.0, 0.3, 0.6));
            }
            if (shape == 3) { // 波动：热烈橙红
                return palette(id, vec3(0.9, 0.1, 0.3), vec3(0.1, 0.5, 0.8), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.25, 0.5));
            }
            if (shape == 4) { // 网络：极客幽绿
                return palette(id, vec3(0.0, 0.9, 0.4), vec3(0.1, 0.3, 0.8), vec3(0.5, 1.0, 0.5), vec3(0.1, 0.1, 0.2));
            }
            return vec3(1.0);
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
            
            // 形变过程中的粒子向外扩散环
            float breatheMask = sin(uMorphProgress * PI);
            finalPos += normalize(finalPos) * breatheMask * 8.0;

            // ------------------------------------------------------------------
            // 音频律动位移：让粒子依据音频振幅做高频位移起伏
            // ------------------------------------------------------------------
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
            vAlpha = 0.2 + 0.8 * sin(uTime * 2.5 + aId * PI * 15.0);

            vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // ------------------------------------------------------------------
            // 音频律动粒子大小：音乐越强，粒子尺寸跳动越大
            // ------------------------------------------------------------------
            gl_PointSize = (1.5 + aRandom.x * 2.0 + uAudioAmplitude * 5.5) * (36.0 / -mvPosition.z);
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

    // 粒子整体倾斜/移位，适应移动端排版
    function updateParticleGroupPos() {
      const aspect = window.innerWidth / window.innerHeight;
      particles.position.x = 0;
      if (aspect < 1.0) {
        // 手机竖屏时整体下偏以露出正中的播放器
        particles.position.y = -2.0;
      } else {
        particles.position.y = 0.0;
      }
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
    const btns = document.querySelectorAll('.floating-engine-btn');
    btns.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-shape'));
      if (idx === shapeIdx) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 绑定导航栏 3D 形态手动触发器
  const shapeBtns = document.querySelectorAll('.floating-engine-btn');
  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-shape'));
      triggerMorphTo(idx);
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
  // 4.1 沉浸式自动隐藏控制面板逻辑 (自动交互模式)
  // ==========================================================================
  const consolePanel = document.getElementById('console-panel-trigger');
  const heroSection = document.getElementById('player-hero');
  const consoleWakeupBtn = document.getElementById('console-wakeup-btn');
  const immersiveModeBtn = document.getElementById('immersive-mode-btn');
  
  let autoHideTimer = null;
  const HIDE_DELAY = 1800; // 1.8 秒无操作超快自动隐藏
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
    toast.innerHTML = `<i class="fas fa-cube" style="color: #00f2fe; margin-right: 8px;"></i>${message}`;
    document.body.appendChild(toast);

    // 触发重绘以使 CSS transition 生效
    toast.offsetHeight;
    toast.classList.add('active');

    // 2.5 秒后开始淡出并移除
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 2500);
  }

  function showConsolePanel(delay) {
    if (consolePanel) {
      consolePanel.classList.remove('panel-hidden');
    }
    if (consoleWakeupBtn) {
      consoleWakeupBtn.classList.remove('active');
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

  function hideConsolePanel() {
    // 强力防御性安全检查：若处于暂停状态、已关闭沉浸模式、或鼠标/触控指针正悬停在面板上，绝对不执行隐藏并强制恢复显示
    if (!isPlaying || !isImmersiveMode || isMouseOverPanel) {
      showConsolePanel();
      return;
    }
    
    if (consolePanel) {
      consolePanel.classList.add('panel-hidden');
      
      // 唤醒小球淡入
      if (consoleWakeupBtn) {
        consoleWakeupBtn.classList.add('active');
      }
    }
  }

  function resetAutoHideTimer(delay) {
    if (autoHideTimer) clearTimeout(autoHideTimer);
    
    // 强制防御拦截：不满足沉浸自动隐藏的基本条件时，不启动任何隐藏计时器
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
         showToast("[ 沉浸模式：已开启 ] 播放时1.8秒无操作将自动隐退面板");
         
         if (isPlaying) {
           resetAutoHideTimer();
         }
      } else {
         immersiveModeBtn.classList.remove('active-immersive');
         immersiveModeBtn.innerHTML = '<i class="fas fa-eye"></i>';
         immersiveModeBtn.title = "沉浸模式已关闭 (始终显示)";
         showToast("[ 沉浸模式：已关闭 ] 面板将保持常亮显示");
         
         // 强制唤起并永久显示面板，隐藏唤醒球
         showConsolePanel();
      }
    });
  }

  // 注册全屏 Canvas / 首屏容器点击以唤醒面板
  if (heroSection) {
    heroSection.addEventListener('click', (e) => {
      // 只有当点击目标不在控制面板（或者面板已隐藏）且不在唤醒悬浮球上时，执行唤醒
      const clickOnConsole = e.target.closest('#console-panel-trigger');
      const clickOnWakeup = e.target.closest('#console-wakeup-btn');
      
      if (!clickOnConsole || (consolePanel && consolePanel.classList.contains('panel-hidden'))) {
        if (!clickOnWakeup) {
          showConsolePanel(3000); // 重新呼出时给 3 秒展示缓冲时间
        }
      }
    });
  }

  // 唤醒悬浮球点击事件
  if (consoleWakeupBtn) {
    consoleWakeupBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showConsolePanel(3000); // 唤醒时同样保留 3 秒缓冲
    });
  }

  // 智能 Hover 锁：仅在具有精确指针（如鼠标）的 PC 设备上启用悬停锁定，防止移动端 Hover 状态锁定导致不隐藏的 Bug
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (consolePanel && hasFinePointer) {
    consolePanel.addEventListener('mouseenter', () => {
      isMouseOverPanel = true;
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        autoHideTimer = null;
      }
    });

    consolePanel.addEventListener('mouseleave', () => {
      isMouseOverPanel = false;
      if (isPlaying && isImmersiveMode) {
        resetAutoHideTimer();
      }
    });
  }

  // 采用“事件捕获模式”进行保活监听，杜绝子元素 e.stopPropagation() 对重置倒计时的拦截干扰
  if (consolePanel) {
    ['touchstart', 'touchmove', 'click', 'scroll', 'mousedown'].forEach(evtName => {
      consolePanel.addEventListener(evtName, () => {
        // 移动端安全防死锁：每次捕获到触碰操作时，强制重置 Hover 锁定状态为 false
        if (evtName === 'touchstart' || evtName === 'touchmove') {
          isMouseOverPanel = false;
        }
        
        if (!consolePanel.classList.contains('panel-hidden')) {
          resetAutoHideTimer();
        }
      }, { passive: true, capture: true }); // 使用 capture: true 捕获事件优先执行
    });
  }

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
      1: "立方体",
      2: "涡流",
      3: "波动",
      4: "网络"
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

  // 时间格式化辅助函数
  function formatTime(secs) {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const mStr = minutes < 10 ? '0' + minutes : minutes;
    const sStr = seconds < 10 ? '0' + seconds : seconds;
    return `${mStr}:${mStr === '00' && sStr === '00' ? '00' : sStr}`;
  }

  // 原生音频播放状态事件驱动
  audio.addEventListener('play', () => {
    isPlaying = true;
    playIconState.className = 'fas fa-pause';
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
  });

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
  const wallpaperGrid = document.getElementById('wallpaper-grid');

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

  // 渲染壁纸
  function renderWallpapers() {
    if (!wallpaperGrid) return;
    wallpaperGrid.innerHTML = '';

    WALLPAPERS.forEach((wp, index) => {
      const card = document.createElement('div');
      card.className = 'wallpaper-card';
      card.innerHTML = `
        <div class="wallpaper-image-wrapper">
          <img class="wallpaper-preview-img" src="${wp.src}" alt="${wp.name}">
          <div class="wallpaper-hover-actions">
            <button class="lightbox-trigger-btn"><i class="fas fa-magnifying-glass-plus"></i> 全屏预览</button>
          </div>
        </div>
        <div class="wallpaper-footer">
          <div class="wallpaper-meta-info">
            <h3 class="wallpaper-title">${wp.name}</h3>
            <span class="wallpaper-size">尺寸: ${wp.size}</span>
          </div>
          <a href="${wp.src}" download="${wp.name}.png" class="wallpaper-download-btn" title="保存壁纸">
            <i class="fas fa-download"></i>
          </a>
        </div>
      `;
      
      // 点击图片遮罩触发灯箱
      const previewTrigger = card.querySelector('.lightbox-trigger-btn');
      previewTrigger.addEventListener('click', () => {
        openWallpaperLightbox(wp);
      });

      wallpaperGrid.appendChild(card);
    });
  }

  // 执行三部分列表渲染
  renderResources();
  renderTutorials();
  renderWallpapers();


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

  const imageModal = document.getElementById('image-modal');
  const imageModalClose = document.getElementById('image-modal-close');
  const imageModalBackdrop = document.getElementById('image-modal-backdrop');
  const lightboxImg = document.getElementById('lightbox-img-element');
  const lightboxCaption = document.getElementById('lightbox-caption-text');

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

  // 打开壁纸灯箱
  function openWallpaperLightbox(wallpaper) {
    lightboxImg.src = wallpaper.src;
    lightboxCaption.textContent = wallpaper.name + ` (${wallpaper.size})`;
    
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWallpaperLightbox() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
    // 动画关闭后清空大图路径，释放内存
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  // 事件绑定
  if (textModalClose) textModalClose.addEventListener('click', closeTutorialReader);
  if (textModalBackdrop) textModalBackdrop.addEventListener('click', closeTutorialReader);
  
  if (imageModalClose) imageModalClose.addEventListener('click', closeWallpaperLightbox);
  if (imageModalBackdrop) imageModalBackdrop.addEventListener('click', closeWallpaperLightbox);

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

  // 统计数据滚动跳数跑分
  const aboutSection = document.getElementById('about');
  let runScoreTriggered = false;

  function countRun(elemId, targetVal, duration, suffix = '') {
    const el = document.getElementById(elemId);
    if (!el) return;
    let currentVal = 0;
    const isThousands = targetVal.toString().includes('K');
    const numericTarget = parseFloat(targetVal) || 100;
    const step = Math.abs(Math.floor(duration / numericTarget)) || 10;

    const timer = setInterval(() => {
      currentVal += 1;
      if (currentVal >= numericTarget) {
        el.textContent = targetVal + (isThousands ? '' : suffix);
        clearInterval(timer);
      } else {
        el.textContent = currentVal + (isThousands ? 'K+' : suffix);
      }
    }, step);
  }

  window.addEventListener('scroll', () => {
    if (!aboutSection || runScoreTriggered) return;
    const rect = aboutSection.getBoundingClientRect();
    const viewHeight = window.innerHeight - 120;
    
    if (rect.top <= viewHeight) {
      runScoreTriggered = true;
      countRun('count-fps', 120, 800, ' 帧');
      countRun('count-users', 50, 1000, 'K+');
      countRun('count-papers', 3, 1200, ' 张');
    }
  });

  // 页面加载完成后，正式执行 3D 粒子 WebGL 初始化
  init3DParticleSystem();

  // 控制台极客炫彩彩蛋
  console.log(
    '%cMURONG SPACE%c3D WebGL Particle Audio Reactor Pipeline Activated.',
    'color: #00f2fe; font-size: 20px; font-weight: 800; font-family: Orbitron; text-shadow: 0 0 10px rgba(0,242,254,0.3);',
    'color: #ffffff; font-size: 13px; margin-left: 10px; font-family: "Courier New";'
  );
});
