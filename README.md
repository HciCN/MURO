# STEM 的平行空间 (STEM Parallel Space)

> 🎮 1:1 深度复刻 [siena.film](https://siena.film/) 风格的单机与独立游戏资源交互展馆。

---

## 🌟 网站功能特色 (V2.0 最新版)

### 1. 首页 3D 纵向胶卷卷轴 (WebGL 3D Reel)
- 对应原版：`https://siena.film/` (`home.html`)
- 完整的 WebGL Shader 胶卷投影矩阵与 3D 景深弯曲。
- 鼠标滚轮无限滚动、视差位移、右上方动态票据卡片与全屏探索入口。

### 2. 全部作品展馆 (Work Showcase)
- 对应原版：`https://siena.film/work` (`work.html` / `index.html`)
- 3D 滚轴横向滑动交互，左右卡片带有动态虚化景深与聚焦效果。
- 支持顶部 `FOOTAGE` / `GRID` 多视图模式实时切换。
- 配备底部刻度条平滑拖拽与键盘方向键交互。

### 3. 游戏探索与系统配置详情页 (Films & Hardware Specs)
- 对应原版：`https://siena.film/films/my-project-x` (`films/*.html`)
- **双语档案**：游戏英文原名与官方中文全称（《黄金矿主模拟器：阿拉斯加淘金热》、《女性模拟器》、《夜曲》等）。
- **实机预告片播放器**：高清视频流媒体交互播放器，点击即可全屏观赏游戏预告。
- **游戏深度介绍 (Synopsis & Features)**：高对比度设计，提炼核心玩法要点与详细剧情档案。
- **系统配置与所需内存 (System Requirements)**：
  - 重点突出标出 **「所需内存 (RAM)」**（最低 8 GB / 推荐 16 GB 高频内存）；
  - 完整呈现处理器 (CPU)、独立显卡 (GPU)、存储空间 (Storage)、操作系统 (OS) 与 DirectX 版本；
  - 细分为「最低配置（基础流畅运行）」与「推荐配置（高清极佳画质）」双列卡片。
- **1080P 实机画廊 (Footage Gallery)**：双排高画质实机游戏截图，带有独特的票据边框裁剪与视差漂浮。
- **下一个项目 (Next Project Ticket)**：底部票据智能轮播下一款游戏，支持一键切换。
- **Steam 官方外链**：提供前往官方商店页面的快速直达按钮。

---

## 🚀 本地运行与部署

### 本地启动
```bash
cd siena-clone
node server.js
```
启动后在浏览器打开：
- 首页：`http://127.0.0.1:8080/`
- 全部游戏展馆：`http://127.0.0.1:8080/work`
- 探索详情页：`http://127.0.0.1:8080/films/my-project-x`

### 云端一键部署
- **Vercel**：已配置 `vercel.json`，连接仓库后全自动一键发布。
- **GitHub Pages**：已配置 GitHub Actions 静态部署。
