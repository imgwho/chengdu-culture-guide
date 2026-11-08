# 锦官道与禅 · 成都文化与旅行双语导览 (Chengdu Tao & Zen Guide)

> **项目目录**：`20261108-chengdu-culture-guide`  
> **核心定位**：专为向外国友人传播中国传统文化与成都深度慢生活设计的响应式双语导览交互站点。讲透**儒释道三教合一**的底层逻辑，以及**青羊宫中轴线深度漫步、道教祈福礼仪与地陪实战口令**。

---

## 🌟 核心特色与功能模块

1. **儒·释·道 三教合一（The Trinity of the Chinese Mind）**：
   - **儒家是否属于宗教辨析**：解构西方宗教三要素（造物主、神迹、来世），用极简英文讲透“社会伦理生活准则”。
   - **儒家双核心**：家庭与尊重（Family & Respect）+ 拼搏学习（Work & Study Hard）。
   - **道教与禅宗对比**：顺应自然（Be like water）vs 专注当下（Be here right now），青羊宫（道）vs 文殊院（禅）。
   - **一分钟打通三者**：上班是儒家，受挫是道家，焦虑是禅宗。

2. **青羊宫中轴线全景点深度导览（Sacred Axis Walk）**：
   - 7 大殿宇看点及极简英文口令（山门/灵祖殿 ➔ 混元殿 ➔ 八卦亭 ➔ 三清殿 ➔ 斗姆殿 ➔ 三皇/唐王殿 ➔ 后苑茶园）。
   - **十二生肖合体独角铜羊交互解构**：可点击 12 个部位，了解“摸羊祛病”民俗。
   - **六十甲子·本命太岁推算器**：输入客人出生年份，自动推算出当值太岁大将军名号与守护吉言。

3. **沉浸式互动礼仪（Rituals & Qiu Qian Experience）**：
   - 道教太极抱拳礼（左手包右拳，阴阳互扣，严禁双手合十）。
   - 上香规范（三柱香代表天地人、忌口吹、举眉心三拜、左手插香）。
   - **在线电子摇签组件**：点击摇动签筒，跳出《青羊灵签》、七言古诗与双语哲学寓意。

4. **地陪实战场景串词库（Field Spoken Scripts）**：
   - 4 大真实场景：进门前、八卦亭前、摸铜羊前、后苑喝盖碗茶时。
   - 内置 Web Speech API 英文语音朗读、一键复制，适合手机随身查阅。

---

## 💻 本地预览方法

本项目为**纯静态单页架构**，无需安装任何构建环境或依赖：

1. **直接双击打开**：
   在资源管理器中打开项目目录，直接双击 `index.html` 即可在任意现代浏览器中运行。
2. **使用本地轻量服务预览**（推荐）：
   在终端进入本项目目录：
   ```powershell
   cd c:\Users\imgwho\Desktop\project\20261108-chengdu-culture-guide
   npx serve .
   # 或使用 Python
   python -m http.server 8080
   ```
   然后访问 `http://localhost:8080` 即可。

---

## 🚀 部署到 Cloudflare Pages（三种方法）

本项目已配备 Cloudflare 规范的 `_headers` 与 `404.html`，可在 Cloudflare Pages 全球 CDN 上获得极速加载。

### 方法一：网页端直接拖拽上传（最快，无需 Git，1 分钟搞定）
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 点击左侧菜单 **Compute (Workers) ➔ Workers & Pages**。
3. 点击 **Create application**，选择 **Pages** 选项卡中的 **Upload assets**。
4. 输入项目名称（例如 `chengdu-culture-guide`）。
5. 直接将本地文件夹 `20261108-chengdu-culture-guide` 拖入上传框中，点击 **Deploy site**。
6. 几秒钟后即可获得专属的全球访问域名（如 `chengdu-culture-guide.pages.dev`）。

### 方法二：通过 GitHub / GitLab 自动构建与持续部署（CI/CD）
1. 将本项目推送到你的 GitHub 仓库。
2. 在 Cloudflare Pages 中选择 **Connect to Git**，选中该仓库。
3. 构建设置（Build settings）选择：
   - **Framework preset**: `None`
   - **Build command**: 留空（纯静态无需构建）
   - **Build output directory**: `/` 或项目根目录
4. 点击 **Save and Deploy**。未来每次推送代码，Cloudflare 将自动部署更新。

### 方法三：使用 Wrangler CLI 命令行部署
在当前项目目录下执行：
```powershell
npx wrangler pages deploy . --project-name=chengdu-culture-guide
```
按照终端提示授权登录 Cloudflare 即可秒级发布。
