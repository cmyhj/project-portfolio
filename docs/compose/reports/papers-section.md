---
feature: papers-section
status: delivered
specs: []
plans:
  - docs/compose/plans/2026-08-02-papers-section.md
branch: main
commits: 8360248..1708353
---

# Papers Section — Final Report

## What Was Built

为个人主页新增了一个「论文 / Publications」版块，以学术主页常见的竖向论文卡片列表展示论文：每行一张 glass-card 卡片，包含序号、会议/年份徽章、论文标题、作者（作者名高亮绿色）以及论文/代码/项目页图标链接。版块支持中英双语切换、GSAP 滚动出现动画，并已接入导航栏（`#papers` 锚点）。

论文内容目前为示例数据（JAVEdit、OpenVE-3M、Cycle-World、SPOT-E），代码中以 `// TODO: 替换为真实论文数据` 标注，用户后续自行替换。

## Architecture

- **`src/sections/Papers.tsx`** — 新组件（默认导出 `Papers`，无 props）：
  - `Paper` / `PaperLink` 接口定义数据模型（标题、作者、venue、年份、链接组）
  - 顶层 `papers` 数组存放示例数据（TODO 注释标记）
  - `linkIcons` 映射 lucide 图标（FileText/Github/Globe）
  - `highlightAuthors()` 将作者名中的 "Muyuan Li" 高亮为绿色
  - GSAP + ScrollTrigger 滚动出现动画，模式与 `Blog.tsx` 完全一致（`gsap.context` + `top 85%` + `ctx.revert()` 清理）
- **`src/App.tsx`** — 在 `<Blog />` 之后渲染 `<Papers />`
- **`src/sections/Navigation.tsx`** — `navLinks` 增加 `{ label: t('papers'), href: '#papers' }`
- **`src/context/LanguageContext.tsx`** — 新增 `papers` 翻译键（zh: 论文 / en: Publications）

### Design Decisions

- 选用**竖向卡片列表**而非网格卡片（Blog 的样式），因为论文条目是等宽信息行（标题+作者+链接），横向列表信息密度更高、更接近学术主页惯例。
- 整卡不做整卡跳转，而是**标题 hover 变色 + 右侧独立图标链接**（避免嵌套 `<a>` 的无效 HTML）。
- 论文正文保持英文（学术惯例），仅版块标题、导航文案双语。

## Usage

- 替换论文数据：编辑 `src/sections/Papers.tsx` 顶部的 `papers` 数组，按 `Paper` 接口填充（`links` 的 `icon` 支持 `paper` / `code` / `project` 三种）。
- 本地预览：`npm run dev`，导航栏「论文 / Publications」点击平滑滚动到版块；右上角切换中英文观察标题变化。

## Verification

- `npm run build`（tsc -b + vite build）通过，1781 模块无类型错误
- `npx eslint` 单独检查改动的 4 个文件零错误；仓库现存 10 个 lint 错误均为存量问题（react-refresh/react-hooks，位于 components/ui、Projects 等未改动文件）
- 产物 bundle 中确认包含 `"papers"` section id、`#papers` 导航锚点及全部示例论文标题
- `vite preview` 启动后 HTTP 200，页面正常引用 JS bundle
- 浏览器内人工冒烟检查（滚动动画、双语切换视觉效果）建议用户本地 `npm run dev` 确认

## Journey Log

> Brief notes on what informed the final design. Not required reading.

- [lesson] 本机无 Node/npm/bun 工具链；用独立 conda 环境 `conda create -n nodejs -c conda-forge nodejs` 解决构建验证，不污染 base 环境
- [lesson] npm 11 默认拦截 postinstall 脚本，esbuild 需 `npm approve-scripts esbuild` 才能完成二进制安装
- [lesson] `npm install` 会向 package.json 写入 allowScripts、改动 lockfile（devOptional），`vite build` 会重写已跟踪的 dist/ —— 提交前需 `git checkout --` 还原这些工具链噪音
- [lesson] 本会话所有依赖 PowerShell 模块的工具（skill 工具、grep、glob）因缺少 Microsoft.PowerShell.Archive 模块而失败，需直接读取技能文件

## Source Materials

| File | Role | Notes |
|------|------|-------|
| `docs/compose/plans/2026-08-02-papers-section.md` | Implementation plan | 3 个任务全部完成 |
