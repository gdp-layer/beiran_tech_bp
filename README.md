# 北京燃气客服｜新一代技术蓝图构建方案

这是一个可以直接运行的原生 HTML + CSS + JavaScript 静态网站。它没有 npm、React、Vite、外部 CDN 或字体下载依赖，适合在 Visual Studio Code 中打开、演示和继续修改。

## 快速运行

### 方式一：直接打开

1. 解压整个项目文件夹。
2. 进入项目目录。
3. 双击 `index.html`，使用 Chrome、Edge 或 Safari 打开。

### 方式二：使用 Visual Studio Code

1. 在 VS Code 中选择“文件 → 打开文件夹”，打开解压后的项目目录。
2. 打开 `index.html`。
3. 如果安装了 Live Server 插件，右键 `index.html`，选择“Open with Live Server”。
4. 如果没有安装插件，也可以直接将 `index.html` 拖入浏览器。

不需要执行 `npm install`，也不需要启动后端服务。

## 文件结构

```text
beijing-gas-tech-blueprint/
├── index.html                         网页内容与章节结构
├── styles.css                         全部视觉样式与响应式布局
├── script.js                          页面切换、双章节导航与 REWIRE 交互
├── README.md                          运行与修改说明
└── assets/
    ├── beijing-gas-placeholder.svg    北京燃气品牌图片占位
    ├── accenture-placeholder.svg      Accenture 品牌图片占位
    └── favicon.svg                    浏览器标签页图标
```

## 替换顶部品牌图片

网站顶部已经为北京燃气和 Accenture 预留两个独立品牌图片框。

推荐操作：

1. 将正式品牌图片复制到 `assets` 文件夹，例如：
   - `assets/beijing-gas-logo.png`
   - `assets/accenture-logo.png`
2. 使用 VS Code 打开 `index.html`。
3. 搜索 `beijing-gas-placeholder.svg`，替换为 `beijing-gas-logo.png`。
4. 搜索 `accenture-placeholder.svg`，替换为 `accenture-logo.png`。
5. 保存并刷新浏览器。

推荐使用透明背景 PNG 或 SVG。品牌框会自动使用 `object-fit: contain` 保持图片比例，不需要额外编写样式。

## 当前页面结构

顶部包含三个一级栏目：

1. `01｜新一代技术蓝图构建方式`：完整的方法论、目标体系与技术成果。
2. `02｜后续技术蓝图设计工作计划`：四阶段推进计划和五项最终成果。
3. `03｜现状调研框架与重点`：七大调研维度和十一项重点调研问题。

第一栏目包括：

- 核心构建原则。
- 燃气行业 1.0—4.0 四阶段演进。
- 技术规划方法的三次迁移。
- 影响北燃未来蓝图的四个变化。
- “双核一面”：Digital Core、Intelligence Core 和 Trusted Governance。
- REWIRE 六阶段互动方法论。
- 五类技术成果。
- 九类关键技术建设问题。
- 四张目标蓝图和一条演进路线。

第二栏目包括：

- 四阶段项目推进总览。
- `8月24日—8月28日`：现状调研。
- `8月31日—9月4日`：方案设计。
- `9月7日—9月11日`：方案初步沟通。
- `后续推进｜具体时间待定`：方案优化与汇报。
- 目标应用架构、目标数据架构、目标 AI 架构、目标技术架构和建设演进路线。

第三栏目包括：

- 仅含“七大维度”和“重点问题”两个入口的内部吸顶导航。
- 七个现状调研维度：系统与应用、业务支撑、数据基础、系统集成、AI 基础、技术运行和演进约束。
- 十一项完整的重点调研问题，采用纵向大字号卡片展示。
- 支持 `#research-dimensions` 和 `#research-questions` 两个直接跳转链接。

## 后续修改建议

- 修改正文、页面标题和卡片内容：编辑 `index.html`。
- 修改紫色主题、间距、字体或移动端布局：编辑 `styles.css` 顶部变量和对应模块样式。
- 修改 REWIRE 六个阶段的详细说明：编辑 `script.js` 中的 `rewireSteps` 数组。
- 修改四阶段日期、工作任务或最终成果：编辑 `index.html` 中 `id="page-work-plan"` 的内容。
- 修改七大调研维度或十一项重点问题：编辑 `index.html` 中 `id="page-research"` 的内容。
- 调整阅读字号：编辑 `styles.css` 中 `Reading-first type scale` 对应的字号层级。
- 项目所有资源均为本地相对路径，可以离线使用，也可以直接部署到任意静态网站托管服务。
