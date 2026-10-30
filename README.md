# Game Guide Framework V2

版本：2.0.0。独立保存于 `E:/游戏站/_framework/game-guide-framework-v2`。

用户游戏站的完整制作与上线流程见 [SITE-WORKFLOW.md](./SITE-WORKFLOW.md)，制作与验收前必须读取。该流程包含 SEOScout 实际采集、内容比较与补齐，以及用户最终确认的左侧 160×600 窄栏方案。下文广告关闭状态为框架初始化设置；用户站点的最终配置按该流程执行。

这是可用于新游戏站的框架源项目。它基于已有共享框架，加入经独立预览验证的六种任务页面骨架，并保留品牌图标、语言路由、SEO、来源管理和传统文章模式。原框架保留。

## 已包含的结构

| 页面骨架 | 用途 | 示例路径 |
| --- | --- | --- |
| landing | 首页任务分流、专题分组 | `/` |
| hub | 展示主题下的实际攻略入口 | `/guides/` |
| catalog | 搜索和展开有共同字段的记录 | `/patterns/reference-library/` |
| comparison | 按相同标准比较选项 | `/patterns/decision-table/` |
| procedure | 操作、成功检查、失败后的下一步 | `/patterns/guided-process/` |
| troubleshooting | 症状、检查、行动、结果和依据 | `/patterns/diagnostic-guide/` |

背景区收起时仍展示所有章节标题，点击标题自动展开并定位。专题分组、精简右侧任务栏和正文宽度均可复用。桌面优先，窄屏变为单列，宽表格在自身区域内滚动。

内链遵循四层规则：首页负责栏目分流和少量精选入口，栏目页列出本栏目全部页面，结构化正文只显示最多三个下一步与页内目录，传统正文只显示栏目入口、上一篇和下一篇。全站目录不会插入每篇正文，阅读路线和整组相关推荐不会与下一步重复渲染。

## 三层分别改什么

- **框架层**：`app/`、`components/`、`lib/`、`scripts/`。已有六种骨架直接使用；新增一种真正不同的交互时才扩展组件。
- **配置层**：`config/site.ts`。替换站名、域名、颜色、图标、主视觉、语言、来源标签与统计设置；通过 `architecture.enabled` 和 `architecture.templates` 控制新结构。
- **内容层**：`content/pages.json`、`content/structure.json`、`content/routes.json`、`content/sources.json`。替换页面、事实、来源、分类、入口和任务路径。批准使用的素材放进 `public/`。

示例记录明确标注为演示数据。新建真实游戏站时应替换全部示例内容和示例来源。框架没有包含先前游戏的图片、机制、域名、广告代码或跟踪账号。

## 创建独立新站

要求 Node.js 22.18.0 或更新的 22.x 和 npm 10 或更新版本。Cloudflare Pages 的 NODE_VERSION 使用 22.18.0 或已验证的更新 22.x；构建准备依赖 Node 内置 stripTypeScriptTypes。在框架目录执行：

```powershell
npm run create:site -- "E:/游戏站/你的游戏目录"
```

目标目录必须尚不存在。生成器不会覆盖现有站点，也不会复制依赖目录、构建缓存、Git 历史、部署绑定、环境变量或本地验证产物。

然后进入新目录，替换配置、内容和素材，执行：

```powershell
npm ci
npm run generate:brand-icons
npm run verify
npm run dev -- --hostname 127.0.0.1 --port 4230
```

`generate:brand-icons` 用于修改品牌图标后的派生文件更新。默认 `searchVisibility: "preview"`，统计和广告关闭。发布另行执行；真实站点启用公开索引前还必须提供经来源确认的首页主视觉。

## 页面结构数据

`content/structure.json` 的四个主要部分：

- `ui`：通用界面文案，可带语言版本。
- `groups`：专题、中心页、成员页面与精选入口。
- `journeys`：跨页的有序阅读路线。
- `pages`：以页面 ID 为键，选择 `template`、主要章节、所属专题、下一步链接和证据范围。

链接使用页面 ID，页面路径由登记表解析；页内跳转额外配置 `anchor`。`displayTitle` 和 `deck` 仅控制可见标题和导语，SEO 标题与描述继续归页面登记表管理。

`focusSectionIds` 指定主要章节，剩余章节自动进入带常驻目录的背景区。catalog 指定含记录的 `catalogSectionId`，comparison 指定含表格的 `comparisonSectionId`，procedure 提供完整检查点，troubleshooting 提供症状与依据。不存在的页面、章节、空记录和不完整检查点会被验证阻止。

## 广告位预设

框架预设五个广告插槽：桌面顶部 320 x 50 sticky 横幅、可选的桌面最左侧 160 x 600 sticky 竖幅、首页核心介绍后的响应式横幅、攻略正文快速答案后的响应式横幅、攻略右侧栏最大 250 x 250 的自适应方形位。顶部位在 800px 及以上显示，容器不带背景和底部分隔线，右侧关闭按钮在本次浏览期间隐藏顶部位。左侧位默认关闭，新站不预留左侧广告区域。攻略中心和来源页不放正文广告。

明确需要左栏时才开启 `ads.placements["left-sticky"]`。左栏仅支持 160 x 600，宽度至少 1280px、视口高度至少 700px 时显示，含两侧间距共占 192px；手机、窄屏和较矮窗口不留左栏空间。300 x 250 应放在正文或适合的方形位，禁止用它替换左栏或扩大左栏宽度。左侧容器未渲染窄栏插槽时不预留空间。正式接入广告商时必须先确认该域名的 160 x 600 代码存在，再渲染插槽；缺码返回空，不输出空壳。已输出插槽的广告填充情况仍需单独验证。

`config/site.ts` 的 `ads.placements` 控制各插槽，`previewPlaceholders` 控制本地占位显示，`enabled` 用于正式启用状态。框架未包含任何广告商代码、广告 ID 或外部请求。

中性 AdSlot/AdChrome 仅提供本地预览占位。正式接入时需要实现本域名的响应式广告适配器及相同的可用性判断，缺代码返回空；单独改 enabled 不会加载广告或生成空的常驻栏。public 模式禁止预览占位，不能把配置存在当作挂载或填充成功。

需要整体回退桌面常驻广告时，将 `ads.desktopChrome.enabled` 改为 `false`。顶部位、左侧竖幅和左侧预留区域会同时关闭，正文内已有广告位不会受影响。

## 视频证据工作流

框架保留视频证据的通用验收机制，不包含任何具体游戏的视频、字幕、截图或结论。原始 JSON3 字幕按 `research/video/sources/<source-id>/` 保存后，可执行：

```powershell
npm run build:video-transcripts
```

命令会在每个来源目录生成带时间码的 `cleaned-transcript.md`。也可以在命令后传入相对于项目根目录的其他来源目录。

准备发布的视频截图必须在 `content/pages.json` 中保存来源 ID、带秒数的 YouTube 地址和 `HH:MM:SS` 字幕时间，并在 `research/video/derived/text-image-bindings.md` 登记正文段落、事实、截图和位置关系。`npm run verify` 会执行 `check:video-evidence`，阻止缺少来源、时间码、本地文件或文字图片绑定的截图进入构建。

正文内的视频证据图统一使用受控宽度，避免封面式大图压过正文。截图应直接支持相邻段落中的具体判断。

未指定新骨架的页面继续使用传统文章渲染器。关闭 `architecture.enabled` 可恢复传统布局。新增示例支持五种语言路径；新增演示内容部分使用英语回退，路由可用不等于翻译已经完成。

## 验证与复用证据

`npm run verify` 包括静态导出、精确发布路由、metadata、部署标记、新结构数据和构建后章节/锚点检查。默认构建输出为 `out`，适用于 Cloudflare Pages 静态托管。构建后执行 `npm start -- --port 4173` 在 127.0.0.1 预览静态文件，开发使用 `npm run dev`。

`prepare:routes` 在 dev、typecheck、build 前按 publishedLocales 和实际已发布内容生成语言路由。编辑 `app/_routes/localized-page.tsx`，不要编辑生成的 `app/[locale]/[[...path]]/page.tsx`。英语单语言不生成空语言路由，重新启用真实第二语言会自动恢复。拓扑变化时已有 `.next` 会归档到忽略的 research；`next typegen` 刷新生成类型。研究记录与构建目录不进入 TypeScript 检查或新站复制。

页面 OG/Twitter 优先使用页面图片，缺图时回退配置的官方 heroImage；无可靠素材时保持空并按公开发布规则补齐，框架不附带游戏素材。build 生成忽略 Git 的 `public/deployment.json`，优先记录 CF_PAGES_COMMIT_SHA，本地回退 Git HEAD 或 local-preview。生成器不会复制旧 marker、out、research、.wrangler、.vercel、环境变量和 secrets。预览广告占位与窄栏按真实配置检查，public 模式必须关闭 previewPlaceholders。真实广告仍需本域名代码和可见性适配器，挂载与网络请求需浏览器验收。

另见 `V2-REUSE-VALIDATION.md`，其中记录独立改名、换主题色、改页面 ID 和改路由后的复用验证。

桌面预览通常使用 `http://localhost:4220/`；是否可访问取决于本地预览进程是否正在运行。
