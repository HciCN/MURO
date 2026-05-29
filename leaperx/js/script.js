/* ==========================================================================
   LeaperX 官方网站核心逻辑脚本 - 点燃星火，行动跃迁
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. 高性能 Canvas "星火" 粒子物理系统
  // ==========================================================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 130 };
    let isHighEnergyMode = false;
    let highEnergyTimer = null;

    // 自适应视口尺寸
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 监听鼠标移动
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // 鼠标移出视口
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // 粒子结构定义
    class Particle {
      constructor(x, y, size) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || canvas.height + Math.random() * 100;
        this.baseSize = size || Math.random() * 3 + 1;
        this.size = this.baseSize;
        
        // 初始向上升腾速度与水平漂移
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.speedX = (Math.random() * 0.6 - 0.3);
        
        // 气流摆动幅度和频率
        this.swingAmplitude = Math.random() * 1.2 + 0.2;
        this.swingSpeed = Math.random() * 0.02 + 0.005;
        this.swingAngle = Math.random() * Math.PI * 2;
        
        // 粒子颜色 (橙色、暗红、星火黄的混合)
        const colors = [
          'rgba(255, 94, 58, ',  // #ff5e3a 橙红
          'rgba(255, 159, 67, ', // #ff9f43 橙黄
          'rgba(255, 107, 107, ', // 柔红
          'rgba(177, 159, 251, '  // 辅色紫
        ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机不透明度与呼吸衰减
        this.opacity = Math.random() * 0.5 + 0.3;
        this.decay = Math.random() * 0.003 + 0.0015;
      }

      update() {
        // 1. 基础物理运动
        let currentSpeedY = this.speedY;
        let currentSpeedX = this.speedX;

        if (isHighEnergyMode) {
          // 高能跃迁模式：大幅加速向上飞升，并产生轻微的纵向拉伸拉线效果
          currentSpeedY *= 4.5;
          currentSpeedX *= 2;
          this.size = this.baseSize * 1.5;
        } else {
          this.size = this.baseSize;
        }

        // 应用升腾与气流微动
        this.y += currentSpeedY;
        this.swingAngle += this.swingSpeed;
        this.x += currentSpeedX + Math.sin(this.swingAngle) * (this.swingAmplitude * 0.5);

        // 2. 鼠标排斥互动 (Repulsion Effect)
        if (mouse.x !== null && mouse.y !== null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius; // 0 到 1 之间的排斥力大小
            // 计算排斥矢量并施加物理位移
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            
            this.x += forceDirectionX * force * 5;
            this.y += forceDirectionY * force * 3 - 0.5; // 轻微向上排斥
            
            // 鼠标拂过时，星火短暂变亮
            this.opacity = Math.min(this.opacity + 0.05, 0.9);
          }
        }

        // 3. 不透明度衰减与边界检测
        this.opacity -= this.decay;
        
        // 若粒子飘出屏幕顶部或衰减死亡，则重新生成在底部
        if (this.y < -10 || this.opacity <= 0 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.size = this.baseSize;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.swingAngle = Math.random() * Math.PI * 2;
        this.speedY = -(Math.random() * 1.5 + 0.5);
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        
        // 高能模式下拉伸星火粒子，模拟运动轨迹
        if (isHighEnergyMode) {
          ctx.strokeStyle = this.colorBase + this.opacity + ')';
          ctx.lineWidth = this.size;
          ctx.lineCap = 'round';
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - (this.speedX * 3), this.y - (this.speedY * 8));
          ctx.stroke();
        } else {
          // 普通模式下绘制呼吸光效小圆形
          ctx.fillStyle = this.colorBase + this.opacity + ')';
          ctx.shadowBlur = this.size * 2;
          ctx.shadowColor = this.colorBase + '0.5)';
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // 初始化粒子群
    const maxParticles = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    // 粒子喷泉爆燃效果 (Ignite Fountain)
    function triggerIgnitionFountain(centerX, centerY) {
      const fountainCount = 45;
      for (let i = 0; i < fountainCount; i++) {
        let p = new Particle(centerX, centerY, Math.random() * 4 + 1.5);
        // 给爆发粒子更强烈的抛射初速度
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 5 + 2;
        p.speedX = Math.cos(angle) * speed;
        p.speedY = Math.sin(angle) * speed - 1.5; // 主要往上喷洒
        p.decay = Math.random() * 0.01 + 0.005;  // 爆燃粒子消亡较快
        p.opacity = 0.95;
        particlesArray.push(p);
      }
      
      // 清除多余粒子，保持上限
      if (particlesArray.length > maxParticles + 100) {
        particlesArray.splice(0, particlesArray.length - (maxParticles + 100));
      }
    }

    // 激活高能模式 (Leap Transition)
    function activateHighEnergy() {
      isHighEnergyMode = true;
      if (highEnergyTimer) clearTimeout(highEnergyTimer);
      
      // 3秒后自动恢复正常状态
      highEnergyTimer = setTimeout(() => {
        isHighEnergyMode = false;
      }, 3000);
    }

    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
    }
    animate();

    // 绑定点燃星火主按钮
    const igniteBtn = document.getElementById('ignite-btn');
    if (igniteBtn) {
      igniteBtn.addEventListener('click', (e) => {
        const rect = igniteBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        triggerIgnitionFountain(centerX, centerY);
        activateHighEnergy();
        
        // 主动跃迁至 Hub 核心区域
        setTimeout(() => {
          const hubSection = document.getElementById('hub');
          if (hubSection) {
            hubSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 800);
      });
    }

    // 绑定开启跃迁按钮
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        const hubSection = document.getElementById('hub');
        if (hubSection) {
          hubSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // 页面任意处点击产生微弱的星火余烬散落
    window.addEventListener('click', (e) => {
      // 排除点燃按钮和卡片本身，避免交互干扰
      if (e.target.tagName !== 'BUTTON' && !e.target.closest('.hub-card') && !e.target.closest('.desktop-nav')) {
        const clickParticlesCount = 6;
        for (let i = 0; i < clickParticlesCount; i++) {
          let p = new Particle(e.clientX, e.clientY, Math.random() * 2 + 1);
          p.speedX = (Math.random() * 2 - 1) * 1.2;
          p.speedY = -(Math.random() * 1.5 + 0.5);
          p.decay = Math.random() * 0.01 + 0.004;
          particlesArray.push(p);
        }
      }
    });
  }

  // ==========================================================================
  // 2. 板块卡片的 3D 鼠标倾斜特效 (Card Tilt Mechanics)
  // ==========================================================================
  const cards = document.querySelectorAll('.hub-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      // 获取鼠标在卡片内的局部像素坐标
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // 归一化坐标 (-0.5 到 0.5)
      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;
      
      // 倾斜强度 (沿 X 和 Y 旋转角度上限)
      const tiltMaxX = 12;
      const tiltMaxY = 12;
      
      // 计算旋转角度并执行渲染 (X-axis tilt uses Y mouse diff, Y-axis tilt uses X mouse diff)
      const rotateX = (-normalizedY * tiltMaxY).toFixed(2);
      const rotateY = (normalizedX * tiltMaxX).toFixed(2);
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      
      // 更新反光 Glow 位置
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      // 恢复平稳状态
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05), transparent 60%)';
      }
    });
  });


  // ==========================================================================
  // 3. 沉浸式内容页面的无缝“跃迁式”入场/退场动画
  // ==========================================================================
  const detailOverlay = document.getElementById('detail-overlay');
  const detailCloseBtn = document.getElementById('detail-close-btn');
  const detailTitle = document.getElementById('detail-title');
  const detailSubtitle = document.getElementById('detail-subtitle');
  const detailBadge = document.getElementById('detail-badge');
  const detailBody = document.getElementById('detail-body');

  // 板块详细数据包（纯手打，完全摒弃空占位符，高可读性内容）
  const database = {
    ai: {
      badge: 'LEAPERX.AI',
      title: 'AI 前沿探索轨道',
      subtitle: '认知重塑，智慧跃迁。追踪前沿人工智能技术，解析 LLM 浪潮与 Agent 革命。',
      content: [
        {
          icon: 'fa-microchip-ai',
          title: '多模态模型与认知演进',
          desc: '深度追踪大语言模型（LLM）的融合边界，解析模型从单一文本任务到声音、视觉、代码多轨并行的物理底层，提供第一手的核心架构演变报告。',
          items: [
            { text: '多模态原生大模型落地前沿速递', action: 'EXPLORE' },
            { text: '混合专家系统 (MoE) 内存占用精简优化方案', action: 'READ' }
          ]
        },
        {
          icon: 'fa-diagram-project',
          title: '智能体革命 (Agent Ecology)',
          desc: '从被动的“提示词”交互进化为具有规划、执行、反思与工具调用闭环能力的自主 Agent。深入介绍多智能体群组（Multi-Agent System）协同开发实践。',
          items: [
            { text: '以自主决策为核心的多人协作工作流脚手架', action: 'CODE' },
            { text: '2026 最新行业级 Agent 编排工具对比分析', action: 'VIEW' }
          ]
        },
        {
          icon: 'fa-wand-magic-sparkles',
          title: '提示词架构设计 (Prompt Engineering)',
          desc: '将大模型的生成极限推向极致的结构化指令方法学。涵盖思绪链（CoT）、系统角色定制以及大模型幻觉控制高级框架。',
          items: [
            { text: '深度思考推理型（O1类型）超级提示词模板', action: 'COPY' },
            { text: '长文本上下文分析与实体提取高级指引', action: 'GET' }
          ]
        }
      ]
    },
    grow: {
      badge: 'LEAPERX.GROW',
      title: '个人成长演进轨道',
      subtitle: '自驱演进，效能跃迁。聚焦极客思维、第二大脑构建、知识沉淀与系统化时间管理。',
      content: [
        {
          icon: 'fa-brain',
          title: '第二大脑系统 (Second Brain)',
          desc: '运用先进的 PARA 知识分类系统，将海量零散信息归档为“项目”、“领域”、“资源”和“存档”，建立无感捕获的个人维基数据库。',
          items: [
            { text: '基于个人数据库构建结构化双链知识网络', action: 'SYSTEM' },
            { text: '信息过载时代的主动“减负型”信息输入屏障', action: 'GUIDE' }
          ]
        },
        {
          icon: 'fa-bolt',
          title: '超昼夜精力调度 (Ultradian Rhythm)',
          desc: '科学对抗现代注意力摩擦。通过 90 分钟精力心流区块和 20 分钟反射式休息，实现大脑认知荷载的持久循环，拒绝慢性疲劳。',
          items: [
            { text: '极客心流工作法与高强度注意力保持习惯', action: 'METHOD' },
            { text: '高效精力状态跟踪日志与恢复机制', action: 'DOWNLOAD' }
          ]
        },
        {
          icon: 'fa-gauge-high',
          title: '行动跃迁心法 (Leap Action)',
          desc: '打破思想上的虚无主义。通过建立反馈周期短、阻力小的微习惯，直接将高阶思维落地到实际行动，构建个体演化的最小可行路径。',
          items: [
            { text: '基于 OKR 指标的周级行动复盘机制', action: 'PROCESS' },
            { text: '战胜拖延：微阻力起跑与五分钟行动热身', action: 'START' }
          ]
        }
      ]
    },
    tool: {
      badge: 'LEAPERX.TOOL',
      title: '工具与开发资源轨道',
      subtitle: '利器备至，生产跃迁。精选高效率软件、极客开发工具、优质开源项目与资源导航。',
      content: [
        {
          icon: 'fa-laptop-code',
          title: '极致效率桌面套件',
          desc: '搜罗真正能削减日常操作摩擦力的神器。涵盖 AI 原生编辑器、快捷多功能指令引擎、高阶窗口管理和自动化脚本调度。',
          items: [
            { text: 'Obsidian、Raycast 与 Cursor 梦幻效率三件套配置', action: 'CONFIG' },
            { text: '原生终端美化与极速快捷命令集推荐', action: 'GET' }
          ]
        },
        {
          icon: 'fa-cubes',
          title: '开发者全栈兵器库',
          desc: '为现代独立开发者与创作者赋能。提供极轻量的全栈模板脚手架，精选开源 UI 框架，以及能极大降低后端依赖的云原生开发方案。',
          items: [
            { text: 'Next.js 15 & Tailwind 极致动效项目模版', action: 'GITHUB' },
            { text: '高效 API 模拟与自动化单元测试脚手架', action: 'DOWNLOAD' }
          ]
        },
        {
          icon: 'fa-share-nodes',
          title: '高精数字资源精选',
          desc: '省去搜索时间。严选高保真免版权设计素材包、全网最速图片无损压缩算法服务，以及可供离线部署的小工具集合。',
          items: [
            { text: '设计师常驻的高清免版税视觉资产资源单', action: 'VISIT' },
            { text: '常用离线小工具箱 (格式转换/加解密/美化) 聚合', action: 'OPEN' }
          ]
        }
      ]
    }
  };

  // 渲染并打开板块详情 overlay
  function openCategoryDetail(category) {
    const data = database[category];
    if (!data) return;

    // 清除既有主题样式并添加新主题
    detailOverlay.className = 'detail-overlay';
    detailOverlay.classList.add(`theme-${category}`);

    // 更新静态字段
    detailBadge.textContent = data.badge;
    detailTitle.textContent = data.title;
    detailSubtitle.textContent = data.subtitle;

    // 动态渲染详细内容模块
    detailBody.innerHTML = '';
    data.content.forEach(section => {
      // 构造子项目行
      let itemsHTML = '';
      section.items.forEach(item => {
        itemsHTML += `
          <div class="detail-item-row">
            <span class="detail-item-title">${item.text}</span>
            <a href="javascript:void(0)" class="detail-item-action">${item.action} <i class="fas fa-chevron-right"></i></a>
          </div>
        `;
      });

      // 构造大卡片小节
      const secElement = document.createElement('div');
      secElement.className = 'detail-section';
      secElement.innerHTML = `
        <div class="detail-sec-header">
          <div class="detail-sec-icon"><i class="fas ${section.icon}"></i></div>
          <h3 class="detail-sec-title">${section.title}</h3>
        </div>
        <p class="detail-sec-desc">${section.desc}</p>
        <div class="detail-items-list">
          ${itemsHTML}
        </div>
      `;
      detailBody.appendChild(secElement);
    });

    // 触发 CSS 无缝动画入场
    detailOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 锁死底层滚动
    
    // 强制重绘，触发 transition 动画
    setTimeout(() => {
      detailOverlay.classList.add('active');
    }, 20);
  }

  // 关闭板块详情 overlay
  function closeCategoryDetail() {
    detailOverlay.classList.remove('active');
    document.body.style.overflow = ''; // 恢复底层滚动
    
    // 等滑出动画播放完毕后，正式隐藏元素
    setTimeout(() => {
      detailOverlay.style.display = 'none';
    }, 600);
  }

  // 给主 Hub 卡片绑定展开点击事件
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      openCategoryDetail(category);
    });
  });

  // 绑定详情页关闭按钮和背景遮罩
  if (detailCloseBtn) {
    detailCloseBtn.addEventListener('click', closeCategoryDetail);
  }
  const detailBackdrop = document.getElementById('detail-backdrop');
  if (detailBackdrop) {
    detailBackdrop.addEventListener('click', closeCategoryDetail);
  }

  // 绑定页脚导航快速入口
  const footerLinks = document.querySelectorAll('.footer-nav-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-category');
      openCategoryDetail(category);
    });
  });


  // ==========================================================================
  // 4. 其它细节辅助：滚动感知、头部状态与移动端导航切换
  // ==========================================================================
  const header = document.querySelector('.global-header');
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  // 滚动时变矮并加深导航背景，同时高亮对应锚点项
  window.addEventListener('scroll', () => {
    // 头部状态
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // 锚点监听
    let currentSectionId = 'hero';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  // 桌面端导航锚点平滑移动
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 移动端折叠导航交互逻辑
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    // 打开/关闭菜单
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    // 点击移动端链接后收缩菜单并跳转
    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');

        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          // 稍微延迟让抽屉滑出去之后再进行滚动，防止跳变
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      });
    });
  }

  // 统计板块动画触发（当滚动到 About 区域时执行计数跑分特效）
  const statsSection = document.getElementById('about');
  let statsTriggered = false;

  function countUp(elementId, targetValue, duration, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    let start = 0;
    const isFloat = targetValue.toString().includes('.') || isNaN(targetValue);
    const end = parseFloat(targetValue) || 100;
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range)) || 15;
    
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        el.textContent = targetValue + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, stepTime);
  }

  window.addEventListener('scroll', () => {
    if (!statsSection || statsTriggered) return;
    
    const rect = statsSection.getBoundingClientRect();
    const triggerHeight = window.innerHeight - 100;
    
    if (rect.top <= triggerHeight) {
      statsTriggered = true;
      // 开始跑数动画
      countUp('stat-ai-pct', 99, 1000, '%');
      countUp('stat-grow-rate', 10, 1500, 'x');
      countUp('stat-tools-cnt', 500, 1000, '+');
    }
  });

  // 欢迎控制台打印 (极客菜单彩蛋)
  console.log(
    '%cLEAPERX%c点燃星火，行动跃迁。Learn to Leap.',
    'color: #ff5e3a; font-size: 24px; font-weight: 800; font-family: Orbitron; text-shadow: 0 0 10px rgba(255,94,58,0.3);',
    'color: #ffffff; font-size: 14px; margin-left: 10px; font-family: "Microsoft YaHei";'
  );
});
