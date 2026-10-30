# 游戏攻略站建站 SOP 审核稿

版本：v1.0-review。核查日期：2026-10-28，香港时间。

保存位置已由用户确认。本稿覆盖选题交接、资料采集、内容制作、图片、框架开发、验收、Git 发布、域名、DNSSEC、广告、GA4、GSC 与交付。适用于用户的游戏攻略站；涉及 Roblox 的身份核实使用 Roblox 官方数据。

本稿把已经确认的要求、当前工具的真实能力和本次建议补齐的执行约束集中起来，供用户审核。现行已确认要求继续有效。本次没有修改线上站点、广告扩展或发布脚本，没有重新验证所有账户权限，也没有对全部历史站点逐站复验。

审核时可先看第 1 节的问题、第 3 节的工具分工和第 16 节的整改清单，再按第 4 至第 14 节逐步检查执行细节。第 19 节给出接口级操作表。

## 1. 这次检查得出的结论

目前已有完整流程的主要组成部分。反复偏离的原因集中在：规则分散、工具默认值陈旧、一次性脚本沿用旧站参数、程序检查与浏览器检查分离、把提交回执误当最终生效。

| 当前发现 | 对执行的影响 | 本 SOP 固定处理 |
| --- | --- | --- |
| SITE-WORKFLOW 已有窄栏、真实视频截图、Social 分类等新要求，README 和工具仍有旧默认 | 执行者可能按旧默认交付 | 每次开工读取当前主流程；初始化值必须转换成用户最终配置 |
| H 盘当前不存在，I 盘已有多个历史站 | 容易未经确认切换保存位置 | 新站路径不可用时只询问替代目录；已有站继续使用原目录 |
| 当前默认 Node 为 24.x，框架要求 22.18.0 至 22.x | 命令能启动也可能不符合构建要求 | 选择符合 engines 的运行时，核对 node、npm 的实际路径和版本 |
| SEOScout 网页正文默认只取少量结果，已有采集文件会被跳过 | 容易漏采或把旧文件当新结果 | 按玩家问题扩展候选，显式记录采集范围和时间；刷新使用新批次 |
| SEOScout 的 topic_name 未对普通网页实施游戏身份过滤 | 混入同名或错误游戏 | 每条网页正文人工核实游戏身份 |
| 共享 npm verify 未包含完整浏览器布局检查 | 编译通过仍会有文字被挤窄、单字符段落等问题 | 独立执行全路由六宽度浏览器验收，记录覆盖表 |
| Adsterra Companion 0.3.29 仍有 Games、四种规格默认和 Other 回退逻辑 | 可能提交错误分类、漏 160×600 | 当前新站提交使用可读回 Social 的受控后台流程；扩展修正并验证后再承担自动提交 |
| GA4 创建、GSC DNS 验证与 sitemap 提交已有实际 API 脚本 | 无需每次进入后台逐项点击 | 常规接入优先 API，浏览器用于登录、必要授权和真实事件触发 |
| Cloudflare 发布脚本分散在各站 research，部分残留旧域名、首 100 项查询和覆盖式回执 | 直接复制运行可能误操作或遗漏资源 | 写前断言精确目标、完整分页、原始结果按时间戳保存 |
| Spaceship 已有 DNS/NS API，公开文档本次未找到 DS 管理接口 | 不同操作需要不同入口 | DNS/NS 优先 API；DS 撤下与登记使用已验证后台入口 |
| 历史有 Cloudflare 凭据只能管理 Pages、不能管理 zone 的情况 | 同一服务部分动作可 API，部分要后台 | 逐动作核实权限，不能整个平台一律改用浏览器 |

“工具存在”“脚本存在”“账户当前可用”“本次操作成功”“最终效果通过”分开记录。本稿中列出的历史脚本属于实现参考，未经目标校验不能直接执行。

## 2. 流程固定与变更规则

### 2.1 唯一执行口径

1. 当前任务中用户的明确要求优先，已经确认的授权持续有效。
2. 制作、委派和验收前，完整读取 `E:\游戏站\_framework\game-guide-framework-v2\SITE-WORKFLOW.md`，并读取适用的 AGENTS.md、README.md 和 CONTENT-SCHEMA.md。
3. 本审核稿获采纳后，将正式版本号及入口写入 SITE-WORKFLOW 和框架 README；各专项技能只保存专项细节，避免出现多份互相矛盾的总流程。
4. 新站开工记录使用的 SOP 版本、框架版本或文件哈希、源码目录、域名、工具路线和验收范围。任务中不能悄悄更换流程。
5. 当前生效工具规则仍须遵守。规则冲突需要说明具体条目，不能用模糊的“安全原因”增加确认步骤。

### 2.2 哪些动作可以自行继续

完整建站和上线已获授权时，常规研究、编码、修复、测试、创建对应仓库与发布项目、已有域名绑定、必要 DNS 交接、GA/GSC 接入、正确分类的广告申请和接码持续完成。

必要信息先从当前项目、账户和工具读取。只有目录或目标无法确定、购买或付费、扩大权限、无关资源变更、用户明确保留的决定，或当前工具强制要求确认时，才询问对应事项。提问同时继续不依赖答案的工作。

历史上某站买过域名，不构成后续购买其他域名的授权。既有域名库存读取不需要重复询问。不会因默认托管改成 Cloudflare Pages 而迁移既有站点。

### 2.3 中途改动怎么记录

每次工具切换或方案变化记录：原步骤、实际问题与证据、替代方式、对内容/成本/权限/发布时间的影响、需要复验的项目。普通实现调整自行处理；涉及用户决定的事项只确认该事项。

不能用临时回退永久删除必需步骤。外部审核待处理、采集失败、分类异常、权限不足、未收录等均保留真实状态。

## 3. API、CLI、浏览器的固定分工

### 3.1 总原则

有合适的已连接工具时先用该工具；其能力不足时使用服务官方 API、经过核对的 CLI 或本地脚本。浏览器用于确实需要网页状态的动作、当前授权内可行的能力回退，以及真实页面验收。

API 返回失败时先分类处理：认证过期走已有客户端的正常刷新；403 核对权限；404 核实资源确实不存在；429 按 Retry-After 等待；参数错误修正参数；平台错误保留响应并合理退避。不得把任意失败都当成需要新建资源。

切换浏览器必须有理由：官方能力未覆盖、当前凭据不具备所需权限、平台明确要求交互、API 故障且已登录后台可完成该动作，或该步骤本身需要视觉验证。切换原因写入操作记录。后续 API 可完成的动作继续用 API。

### 3.2 工具路由表

| 任务 | 首选入口 | 浏览器用途或回退条件 | 完成证据 |
| --- | --- | --- | --- |
| Roblox 游戏身份 | 官方游戏/API 数据 | 查看官方页面、排除同名游戏 | Place/Universe/开发者一致 |
| Google 关键词与竞品线索 | SEOScout 的 Serper 搜索入口 | SERP 外观或特殊页面核查 | 查询参数、时间、实际结果 |
| 竞品正文 | SEOScout 抓取与正文提取 | 动态渲染正文、采集失败后的可读页面 | 有效正文、URL、状态、日期 |
| Google Trends | 已可用的采集接口或现有采集器 | 接口不可用、图表需核验 | 地域、时间窗、词条类型、原始结果 |
| 视频检索与字幕 | 已有检索接口、yt-dlp 等 CLI | 确认视频实际内容或播放器定位 | 视频 ID、时间、字幕/画面证据 |
| 视频取图与压缩 | ffmpeg 和图像 CLI | 逐张查看真实截图、检查页面呈现 | 原图、成品、时间码、段落绑定 |
| 网站生成与内容写入 | 当前 V2 生成器、本地文件与 Git | 本地预览验收 | 独立站点目录和变更记录 |
| 仓库与提交 | GitHub 连接工具、gh、本地 git | 首次登录和集成授权 | remote、分支、完整 SHA |
| Cloudflare Pages 创建/构建/部署查询 | Cloudflare API，必要时已安装 CLI | Git 集成首次授权、当前权限缺失 | source/repo/branch/build/out 读回 |
| Pages 绑定自定义域名 | Cloudflare API | 当前接口或权限受限 | 精确域名状态和 HTTPS |
| Cloudflare zone/DNS/跳转/DNSSEC | 对应 Cloudflare API | 当前凭据缺 zone 能力且后台已可操作 | 记录读回及独立公网验证 |
| Spaceship 已购域名查询 | Spaceship Public API，完整分页 | API 登录或权限不可用 | 精确域名和所属账户 |
| Spaceship DNS、NS 更新 | Spaceship Public API | 接口不可用或当前权限不足 | diff、操作状态、读回和解析 |
| Spaceship 旧 DS 撤下、新 DS 登记 | 当前已验证的登录后台 | 本次公开文档未找到可用 DS 管理 API | 后台值、注册局 DS、DNSSEC 验证 |
| GA4 创建独立属性与 Web stream | Google Analytics Admin API | 缺可用授权或平台要求交互 | property、stream、measurement ID |
| GA4 接收事件验收 | 浏览器实际访问 + GA Data API | DebugView 可辅助排障 | 浏览器请求与服务端事件分别记录 |
| GSC 所有权验证 | Site Verification API + DNS API | 缺 API 授权且现有后台能完成 | DNS token、所有权结果 |
| GSC 属性登记、sitemap 提交 | Search Console API；已接入站可用 GSC Wizard | API 权限不可用 | 属性读回、提交回执、sitemap 状态 |
| GSC 收录与搜索数据 | GSC Wizard 或官方 API | 个别页面的后台诊断 | URL Inspection、日期、状态 |
| Adsterra 站点/广告位/统计读取 | 已有 Publisher API 的 GET 能力 | API 未返回分类或详细信息时查后台 | 精确站点和广告位 ID、状态 |
| Adsterra 新站与广告位申请 | 已登录后台的受控表单操作 | 当前扩展通过全部新规则后才可自动承担 | Social 前后读回、五规格详情 |
| Adsterra 代码获取 | 经验证的后台/扩展代码导出 | 不假定只读 API 能返回完整可嵌入代码 | 本域名完整代码包与规格映射 |
| 布局、图片、交互、广告请求 | 真实 Chrome | 这一步需要浏览器 | 全路由六宽度与实际网络行为 |

### 3.3 浏览器使用约束

浏览器后端按当前可用工具和技能选择，任务中尽量保持一致。用户指定浏览器时遵从。使用现有 Tabbit 后端时，先 diagnose、核对 tabs 所属关系，使用该后端支持的运行时；不得混用不受支持的注入方式。需要 Chrome 专项验收时，记录实际浏览器名称和版本；其他 Chromium 替代只能如实标明。

读一次必要页面状态后，用语义定位器完成同一业务动作，随后读回结果。不要反复抓取整页或依赖陈旧坐标。验证码、登录失效和额外授权按当前工具规则处理。只有必要时请求用户操作。

后台轮询不切换用户当前标签。只关闭本任务明确创建且不再需要的临时标签。不得以 UI 自动化方式绕过缺失权限或跳过确认门槛。

## 4. 开工清单与存储

### 4.1 先记录任务清单

建议固定保存 `research/release/task-manifest.json`。这是本 SOP 建议的统一记录文件，当前没有配套自动执行器。

必填字段：游戏名、slug、平台、Place ID、Universe ID、开发者、语言、目标玩家、任务类型、已授权范围、源码/素材/临时/发布目录、域名、canonical 主机、Git 仓库与分支、Pages 项目与账户、SOP 版本、框架标识、工具路线、阶段状态、阻塞项和证据路径。

站点 ID、账户 ID 与密钥分开。记录凭据从哪个受控客户端或环境变量取得，禁止把密钥、OAuth token、签名媒体地址写进文档、截图或 Git。

### 4.2 存储口径

| 用途 | 用户指定默认目录 |
| --- | --- |
| 新站源码 | `H:\游戏站\<game-slug>` |
| 原始视频、大素材 | `H:\游戏站\_素材\<game-slug>` |
| 临时下载 | `H:\游戏站\_临时下载\<game-slug>` |
| 新发布隔离工作区 | `H:\游戏站\_发布工作区\<game-slug>` |
| 当前共享框架 | `E:\游戏站\_framework\game-guide-framework-v2` |

开工核对盘符和适用 AGENTS.md，确认本任务保存位置后再创建、下载或导出。2026-10-28 核查时 H 盘不可用，H 盘 AGENTS.md 无法读取；此时不能自动改用 I 盘。用户一旦在任务中确认替代根目录，后续沿用，不反复询问子文件。

已有 E/I 盘站点和活动发布任务保留原路径。正式图片、favicon、OG 和精简来源清单放入对应项目。大视频、完整研究资料、账号材料不复制到发布工作区。

### 4.3 开工只读预检

核对同名项目、仓库、已购域名、Pages 项目、GA 属性、GSC 属性和广告网站，避免重复创建。列表必须按服务真实分页规则读完整。

核对 node/npm/Python/git/gh/ffmpeg/yt-dlp 的版本及绝对路径；核对 API 账户和 scope、浏览器登录、域名 DNS/DS、已有广告代码。存在命令或凭据文件只说明入口存在，不能代替真实只读请求。

本轮发现默认 Node 24.x 不在框架允许范围；先选择 Node `>=22.18.0 <23`，npm `>=10`，本地与 Pages 使用同一已验证版本。不要仅依据 `.nvmrc` 中的宽泛 `22` 推断具体版本合格。

## 5. 阶段一：游戏核实与内容目标

1. 用官方数据核实游戏名称、Place ID、Universe ID、开发者和官方链接，区分测试服、同名作品、旧版本与克隆。
2. 用户已指定游戏并要求建站时，接收现有研究结果；发现身份错误或严重证据缺口再纠正，不擅自改成另一款游戏。
3. 需要建站决策研究时，独立记录搜索需求、游戏热度、视频传播、竞争站和证据日期。KD 缺失填未知；视频播放量、评论需求不能直接写成搜索量。
4. 既往某站分数、在线人数或竞品数量属于案例，不能自动升级成永久建站阈值。
5. 确定目标语言与首发核心问题，页面按问题组织。没有可靠资料的主题可以标为待研究，不为凑数量发布空泛页面。

输出：游戏身份表、玩家问题清单、已知资料与未知事实、初步页面地图。

## 6. 阶段二：SEOScout 搜索、正文与内容差距

### 6.1 必须真实采集

先读取 `E:\工具\seoscout\README.md` 与实际 CLI 帮助，使用当前实现支持的参数。当前 CLI `python -B -m seoscout --help` 已核实可运行。工具内部搜索/抓取属于 API/HTTP 流程，无须先打开浏览器逐条复制搜索结果。

当前搜索使用 `POST https://google.serper.dev/search`，正文使用 `GET https://r.jina.ai/{目标URL}`。建议明确分两阶段运行，在 search 与 collect 之间审核候选，避免直接把未经核对的全部结果送入正文阶段：

```powershell
python -B -m seoscout search --keywords "<已确认研究目录>\keywords.json"
python -B -m seoscout collect --keywords "<已确认研究目录>\keywords.json"
```

命令在工具可导入的环境中执行，先配置并核对 `OUTPUT_DIR`、`WEB_SEARCH_TOP_N`、`WEB_EXTRACT_TOP_K`，同时记录关键词文件。当前输出实际位于 `OUTPUT_DIR/<project>/out/search_results.json`、`out/collected/`、`out/cache/` 和 `logs/`；project 由 topic_name 派生。不要假设文件直接写在 OUTPUT_DIR 根目录。候选审核将不采用项设为 `selected:false`，并核对实际读取结果。search 当前不提供 `--project` 或 `--output-dir` 参数，输出根目录通过环境变量 OUTPUT_DIR 指定。

建立英文或目标语言查询组：游戏主词、beginner、codes、各核心系统、获得方式、升级路线、选择比较、常见失败等。只搜索并采用非中文网站信源。先核对官方资料，再采集真正解决玩家问题的英文或目标语言竞品正文。

### 6.2 采集完整性

每个结果记录查询、实际发送的地区/语言参数、排名或发现位置、URL、抓取时间、最终跳转 URL、正文、状态和相关性判断。当前 SEOScout 搜索 payload 主要为 q、num，未显式设置 gl/hl 时如实填“未设置，服务默认”，不能补写成已限制英语或美国。验证码页、空正文、登录壳、错误游戏、重复页面单独标记并排除；禁止仅靠排除 .cn 域名识别中文网站。

当前实现注意事项：`WEB_EXTRACT_TOP_K` 默认值偏少；`topic_name` 对普通网页不提供可靠游戏过滤；已有 collected 文件可能直接跳过。必须读实际配置与结果，不能把一次默认运行当作覆盖所有问题。

使用独立时间戳批次目录刷新资料。记录候选总数、去重数、有效正文数、失败数、尚未采集项。依据问题覆盖继续补采；不设没有依据的固定页数作为完成标准，也不把无限采集作为要求。

如果 SEOScout 不可用，保存具体错误并尝试修复已有配置。可用合法浏览器或其他采集入口补充证据，但仍要把 SEOScout 步骤标为未完成或已记录例外，不能将一般 SEO 校验算成正文采集成功。

Jina 无法取得有效正文时，先尝试普通 HTTP 获取 HTML 并提取主内容；只有动态渲染、已有登录会话或 HTML 无正文等情形才进入浏览器。搜索摘要只作发现线索。多个网站转载同一资料不能算多个独立事实来源。

### 6.3 内容缺口表

| 字段 | 必填内容 |
| --- | --- |
| 玩家问题 | 玩家要完成的具体任务 |
| 本站现状 | 尚无答案、答案不全、已覆盖 |
| 参考资料 | URL、来源类型、日期、相关段落 |
| 缺少答案 | 条件、位置、步骤、结果、限制或选择理由 |
| 目标页面 | page ID、route、section ID |
| 证据状态 | 官方确认、视频观察、社区说法、冲突、未知 |
| 处理结果 | 新增、修正、删除无依据说法、暂不发布 |
| 复审 | 哪条证据支持最终正文 |

检查适用主题：获取方式、前置条件、位置、技能/属性、优缺点、限制、顺序、Boss 召唤、成长路线、失败处理。每项有实际答案才算关闭。

兑换码分别记录字符串、奖励、来源日期、状态、兑换步骤；没有亲自测试的代码不得标为实测有效。过期资料和冲突不静默删除，记录取舍理由。

## 7. 阶段三：正文、视频与图片一起制作

### 7.1 正文标准

每页首先回答一个明确问题，再给执行步骤、条件和失败后的下一步。比较页用相同标准解释选择；目录页列实际可读内容；流程页写成功检查点。移除重复的通用提醒和只换名词的段落。

官方事实、录像观察和社区说法明确区分。截图显示的价格、概率、余额和数值按录制时观察处理。没有证据的数值和机制不得补写。

研究资料整理为结构化事实、原创解释和必要短摘录，保留来源。第三方正文与图片不能未经相应许可直接复制进公开站点。

内容地图、页面数量、实体名齐全都不能代替实用性。逐页对照缺口表，检查玩家能否据此完成动作。

### 7.2 视频处理顺序

1. 选本作真实玩法视频，核对标题、画面、游戏身份、作者、日期与视频 ID。
2. 使用 CLI 取得可访问字幕及获准使用的媒体，保存到已确认素材目录。访问受限时换合法可访问来源，不绕过访问限制。
3. 先通过字幕定位候选时段，再查看相应真实画面。字幕研究必须连同截图选择完成。
4. 用 ffmpeg 截取有信息的画面，逐张查看游戏、界面、文字和相邻正文是否吻合。
5. 保留原图，制作适合网页的压缩成品，避免 UI 字体不可读。不要生成或补画真实游戏 UI。
6. 按主要攻略主题制作配图覆盖表。缺少可靠画面时写原因；图片不设固定张数，不重复首页 hero 填充正文。
7. 在手机检查实际清晰度、加载、宽高和排版。

### 7.3 来源绑定与公开呈现

正式图片在 `public/`，最小来源清单提交至 `content/video-evidence.json`，顶层为数组。每图保留 `asset`、`sourceId`、`sourceUrl`、`timecode`、`text_block_id`、`fact_ids`、`shot_ids`，并与页面 section 和图片字段一致。

当前校验器的具体合约：页面图片 `caption.en` 内须含 `HH:MM:SS`，作为内部字段保存，前台不展示；`sourceUrl` 要求形如 `https://www.youtube.com/watch?v=<video-id>&t=157s`；清单 `timecode` 与图片内部时间一致；`text_block_id` 等于 `page_id.section.id`；section 的 `imageIds` 和清单的 `shot_ids` 均包含该 image.id；fact_ids 为非空稳定字符串数组。sourceId 必须在 sources.json 中登记。

图片路径应含 `/video-` 或 sourceId 以 `video-` 开头，确保进入当前检查器；新图统一采用可识别命名。不得靠改名绕过校验。非 YouTube 来源目前不符合该检查器 URL 合约，须先扩展对应验证与证据方案，不能伪造 YouTube 地址。名义秒数或近似定位按实际精度记录，不夸大为逐帧精确。

完整字幕、来源分析、原始短片和 `text-image-bindings.md` 保存在忽略 Git 的研究/素材目录。原始字幕可通过 `npm run build:video-transcripts` 生成带时间码文本。

正文图片要靠近解释的操作；图片下不放时间码和来源微文案。完整第三方证据保存在内部，公开来源按框架约束集中到底部，最多三个第一方来源。不能把社区录像说成本站实测。

`npm run check:video-evidence` 必须通过。还要在不含 research 的隔离构建输入中验证清单，确认缺清单、来源错配、段落错绑会失败。此检查验证引用结构，不能替代人工观看画面。

首页主视觉与品牌图标来自可核实官方素材，分别选择，不能随意用无关图片替代。

## 8. 阶段四：用共享框架建立独立站点

### 8.1 创建和修改边界

确认目标目录尚不存在，选择合格 Node 环境后，在框架目录运行：

```powershell
npm run create:site -- "<本任务已确认的绝对源码目录>"
```

生成器会排除依赖、缓存、Git 历史、研究、环境文件、旧部署绑定和 marker。创建后再次检查，不能用整体复制某个已上线游戏目录代替清洁初始化。

框架层为 `app/`、`components/`、`lib/`、`scripts/`；配置层为 `config/site.ts`；内容层为 `content/pages.json`、`structure.json`、`routes.json`、`sources.json` 及视频清单。游戏文案、域名、广告 ID 与素材不能写死进通用组件。

landing、hub、catalog、comparison、procedure、troubleshooting 六种骨架按页面任务选择。只有现有骨架无法表达真实需求时才扩展框架。不得临时换框架、另起模板或默认迁移旧站。

### 8.2 初始化必改

替换站名、slug、domain、canonical、语言、颜色、导航、官方链接、品牌图标、hero、全部示例内容和来源。只发布真实完成的语言，禁止用英文回退冒充翻译完成。

按当前 Next 版本随包文档开发。修改语言路由源文件 `app/_routes/localized-page.tsx`，不要直接编辑生成路由。检查 `prepare:routes` 产物与发布语言一致。

导航按框架规则：首页分流，栏目页列该栏目，结构化正文最多三个下一步，传统正文保留栏目与前后篇。不要把全站目录塞进每篇正文。

初始保持 `searchVisibility: "preview"`，真实统计和广告关闭；配置用户要求的本地广告占位。图标源就绪后执行：

```powershell
npm ci
npm run generate:brand-icons
npm run verify
npm start -- --port 4173
```

静态预览使用框架的 serve-static；当前 `next.config.ts` 为静态 export。需要服务端能力时先确定方案，不能删掉必需功能来凑静态兼容。

## 9. 广告布局与 Adsterra 接入

### 9.1 五种规格与布局分开核对

必须申请本域名 Native、300×250、728×90、320×50、160×600 五种代码。广告商规格和页面插槽分别映射，不能只看到五个插槽就判定五种代码齐全。

| 布局规则 | 验收要求 |
| --- | --- |
| 左侧窄栏 | 160×600；视口宽至少 1280、高至少 700 时展示；含间距占 192px |
| 较窄或较矮屏幕 | 左栏隐藏，空间回收，不发该广告请求 |
| 300×250 | 放入容得下的正文或方形区域，不能塞进左栏或 250px 容器造成溢出 |
| 728×90 | 只在实际可容纳该尺寸的区域加载 |
| 320×50 | 按实际断点和容器映射，320px 视口还须计算页面内边距 |
| Native | 检查响应式容器、页面位置及重复挂载 |
| 本地预览 | 使用明确标识的本地占位，不请求真实广告 |
| 正式缺码 | 初次接入先完成五规格完整验收；上线后个别位暂不可用时不输出空壳、不预留白块 |

不能用 300×250 替代左栏，也不能恢复 332px 留白。CSS 隐藏不足以阻止广告请求，适配器必须在加载脚本前检查当前实际可见性。框架中性 AdSlot 只提供占位，单独打开 enabled 不等于广告已接入。

NexRide 和 Soccer 的当前适配器可作已检查实现参考：left-sticky 对应 160×600，article-banner 对应 Native，sidebar-square 对应 300×250，top-sticky 对应 320×50 且视口至少 800px，响应式 banner 按实际容器选择 728×90、320×50 或 300×250。共享框架尚未自动包含这一真实广告适配器，需逐站接入并验收。

### 9.2 当前扩展的使用限制

2026-10-28 检查到 Companion 0.3.29 源码仍保留 Games 默认、四种格式默认和 Other 回退。即使 CLI 可传 Social，也不能据此证明表单最终保存为 Social。

当前新站创建采用能读取真实控件状态的后台操作。扩展自动提交重新启用前，至少完成：Social 显式设置、禁止 Other/Torrents 回退、提交前真实选中值核验、提交后 About Website 分类核验、五规格完整性、后台不抢标签、错误状态保留的验证。

使用扩展前核对浏览器实际加载版本、连接和任务状态，源码 manifest 不能代表正在运行的版本。当前自动发现只接 Vercel 发布记录，Cloudflare Pages 新站必须明确交接域名与五规格任务，不能假设它已自动入队。

只读状态查询、已验证的代码导出可以按实际能力使用；风险集中在未经验证的自动提交，不能因此把全部读取工作改为手工。

### 9.3 固定申请顺序

1. 用 Publisher API 或后台按精确域名查重，区分 apex/www、旧站和近似名称。
2. 新站分类明确选择 Social，读取控件当前值后再提交。
3. Social 不可选或值不匹配，停止该表单；保存状态，继续可独立进行的网站工作。
4. 提交后进入 About Website，复核精确域名和 Social。错误分类保持广告关闭并报告；没有明确授权不得联系支持。
5. 逐项检查五种规格的 ID、审核状态与完整代码。展开全部广告位，不把缓存汇总行当成详细状态。
6. 等待审核时记录实际状态，不反复创建相同广告位。后续检查按状态或合理退避进行。
7. 取得完整代码后集中接入本域名适配器、统一校验和发布，避免每个广告位触发一轮部署。
8. 真实浏览器核对各断点的脚本请求、容器、填充和正文可读性。只查看展示，不点击广告制造测试点击。

Social 属于网站分类。本次广告类型为 Native Banner 与所需尺寸的 Banner，不顺带勾选 Social Bar、Popunder 或 Smartlink。

申请结果不明时先读取后台和已有任务，禁止重复提交。导出包的 `complete:true` 只说明本次请求的规格齐全，还须独立确认精确域名、五规格完整集合、各位 Active 状态、Banner 宽高/key/脚本、Native 容器 ID、Social 前后读回、来源与获取时间。保留 Get Code 的原始代码；根据 key 手工拼出的 HTML 不算后台原始取码证据。

Adsterra Publisher API 的现有只读能力用于站点、广告位及统计查询。不能假设它提供创建网站、改分类或申请广告位的写接口。[Adsterra 官方 API 说明](https://adsterra.com/api/)

接码、请求成功、广告填充、统计展示和收入是五种不同状态。脚本 200 不能作为实际填充和收入证据。

## 10. 阶段五：本地技术和内容双验收

### 10.1 程序检查

在目标站点执行 `npm run verify`。当前入口包含 lint、contracts、routes、generator、brand-icons、typecheck、content、video-evidence、reading、architecture、build、export、build-output、architecture-build、links、seo。

保留退出码、运行时版本、命令和日志。检查实际 `out/`，包括全部发布路由、404、robots、sitemap、metadata、图片和 deployment marker。仅 next build 成功或只出现 `.next/` 不满足静态导出验收。

隔离构建只使用 Git 应提交输入。执行干净依赖安装；沿用原 node_modules 的测试只能称复用依赖检查。研究目录不参与编译，必须引用的精简清单不能被忽略。

### 10.2 浏览器验收

覆盖所有已发布路由，六种宽度为 1440、1280、1024、768、390、320px，逐项记录视口高度。还要检查左栏 1280×700 的边界及低于条件时空间回收。

每页展开折叠正文，检查：无横向溢出、容器未被挤窄、无连续单字符段落、无空段落、页面高度合理、图片成功解码、表格在自身区域滚动、标题与导航可读、目录定位/搜索/展开/按钮/内链正确、favicon 与分享图正常。

当前个站 `browser-qa.cjs` 已有空段落和连续四个单字符段落检查，共享 npm verify 尚未包含完整浏览器入口。执行时必须显式补跑；不得声称这项已由 verify 全部覆盖。

页面等待采用 DOMContentLoaded、正文可见、字体完成和图片解码等明确条件。广告和第三方请求可能长连接，不能只依赖 networkidle 判断页面就绪。

DOM 数值检查与实际看图一起做。保存全路由覆盖表和代表性截图，异常必须保留对应画面。Chrome 不可用时说明替代后端及未覆盖专项。

### 10.3 内容复审与阻断

逐页回读玩家问题和缺口表，确认关键条件、步骤、数值、限制有证据。复核正文生成函数正确区分字符串与段落数组，避免逐字符生成段落；故障卡片和内部衍生文字也要检查。

仍有演示数据、空泛占位、关键事实无依据、截图错配、坏路由、正文损坏或移动端严重溢出时，不进入正式发布验收。小范围修复复验受影响部分；公共模板或路由变更扩大到全部受影响页面。

## 11. 阶段六：Git 与 Cloudflare Pages 发布

### 11.1 发布前身份检查

默认新站用 Cloudflare Pages。用户明确指定其他平台时按该平台流程；旧站迁移必须属于当前授权范围。

写操作前同时核对 domain、account、zone、Pages project、repo、branch 和本地目录。禁止依赖旧脚本的默认 DOMAIN。资源查询失败先解释失败，只有确认不存在才创建。

使用 GitHub 连接工具或 gh 管理远端，用 git 提交和推送。已有站遵守既有分支规则；新建工作分支使用 `codex/` 前缀，生产分支按本项目实际配置。不得提交密钥、原视频、环境文件、缓存和研究原始结果。

### 11.2 Pages 项目配置

使用 Cloudflare API 建立带 Git source 的 Pages 项目，核对仓库、生产分支、root directory、构建命令 `npm run verify`、输出目录 `out`、具体 Node 22 版本，以及 preview/production 环境差异。

首次 GitHub 集成安装或授权使用官方交互流程。Direct Upload 可以完成单次上传，但不能作为 Git 自动发布已经接通的证据。当前官方文档说明 Direct Upload 项目不能原地转换为 Git 集成项目，因此建项目时就选对路线。[Cloudflare Git 集成](https://developers.cloudflare.com/pages/configuration/git-integration/)；[Direct Upload 限制](https://developers.cloudflare.com/pages/get-started/direct-upload/)

至少一次真实提交和 push 后，读取部署触发来源、分支、完整 SHA 和构建状态，再检查线上 `/deployment.json` 与该 SHA 一致。Git 仓库中“有代码”不等于自动发布正常。

### 11.3 发布索引模式

正式发布切换为 public，关闭预览占位，使用最终 canonical，生成正式 robots 和 sitemap。Pages 预览与部署域名要单独核实 noindex，避免公开副本与正式域名竞争。

检查响应头与 HTML 中的索引指令不能冲突。noindex 只负责索引控制，不作为保密措施。正式图片和引用清单进入 Git，研究目录继续排除。

### 11.4 发布故障回退

上线前保存上一个验证通过的 deployment ID、SHA、配置和关键资源。出现严重故障时，在已授权修复范围内回退到该部署，或通过 git revert 撤销问题提交并正常推送；不使用强制推送改写共享历史。

回退后重新核对 marker、正式域名、关键路由和故障行为。直接回退 Pages 部署时，同时记录 Git 与线上版本的差异，在后续提交前消除该差异，防止下一次 push 再次发布坏版本。广告导致故障可先关闭受影响广告配置并验证正文恢复，保留未完成状态。

## 12. 阶段七：域名、HTTPS 与 DNSSEC

### 12.1 域名预备

用 Spaceship API 完整分页查询已购域名。匹配精确拼写及所属账户，遇到多个合理候选时询问必要选择；没有域名不自动购买。

备份现有 NS、DS、完整 DNS 和回退配置。保留 MX、SPF、DKIM、DMARC、CAA、其他 TXT 和无关子域。先准备 Cloudflare zone 与 Pages 自定义域名，预览通过后才切换流量。

DNS 记录和 NS 使用对应 API，写前计算 diff，写后读回。如果是异步操作，依据返回 operation ID 查询到完成；接受请求不等于注册局已生效。

DNS 记录值冲突时先核对当前接口语义。Spaceship 的保存记录操作不能想当然地覆盖任意旧值，必要时只删除精确冲突记录再写新记录，并保留恢复值。不得整组覆盖无关 DNS。

确定 apex 或 www 为唯一 canonical，并实现另一主机到它的跳转，保留路径与查询参数。测试 http/https、apex/www、根路径、内页和参数，无循环、无丢参。

使用 Cloudflare Single Redirects 时核对入口主机经过 Cloudflare 代理，规则建立后必须用公网请求验证实际跳转。已有 ruleset 先读后做精确差异更新，保留无关规则。

### 12.2 DNSSEC 两个独立安全窗口

以下顺序适用已有旧 DS 且需要切换权威 DNS 的迁移。没有旧 DS 时可以跳过撤旧 DS 和第一窗口；如果仍切换 NS，登记新 DS 前仍须处理旧父区 NS 委派缓存窗口。已有安全多签方案时按该方案验证，不能套用不存在的旧值。

1. 从权威查询旧 DS TTL，再从注册局父区权威查询旧 NS 委派 TTL。二者分别保存。
2. 准备新 zone、正确记录、Pages 绑定、回退方案，必要时在旧 DNS 同步准确的 www CNAME 与验证记录。
3. 通过已验证后台路径撤旧 DS。查询多个父区权威，记录一致确认旧 DS 已消失的保守时间；仍有成功响应返回旧 DS 时继续等待，不能用单台最早消失的时间启动窗口。查询失败保持未知。
4. 第一窗口截止时间 = 确认旧 DS 消失时间 + 旧 DS TTL。窗口结束后再切 NS。
5. 通过 Spaceship API 提交本域实际分配的新 NS，跟踪操作完成并查询多个注册局权威。
6. 只有权威结果一致为新 NS 后，记录确认时间。出现旧值继续排查等待；查询失败只能记未知。
7. 第二窗口截止时间 = 新 NS 一致确认时间 + 旧父区 NS TTL。递归获得的子区 NS TTL 不可替代。
8. 第二窗口结束且新 DNS 可用后，登记本域新 DS，核对 key tag、algorithm、digest type、digest。
9. 独立验收父区 DS、权威 DNSKEY/RRSIG，以及支持验证的递归解析器 apex/www 的 Status 0 与 AD true，保持 CD=false。RDAP secureDNS 作为辅助记录，字段缺失或同步慢记未知/滞后，不能单独取代签名链验证。
10. 单独记录 Cloudflare 控制台状态。控制台 pending 与签名链通过可能短暂并存，不能相互替代。
11. SERVFAIL 必须保留失败结果并排查；关闭校验、CD 绕过或忽略 TLS 错误都不能作为成功证据。

DS 撤下和恢复属于同一次已授权交接，持续完成。不能只做撤下后把恢复当作可选项。恢复前避免反复向最终验收解析器查询空 DS，防止不断刷新负缓存。

所有原始结果带时间戳。跨 PowerShell/Python 用 epoch 或带时区、固定精度时间；Python 3.10 不假定能接受任意位小数。不得在脚本中套用上一域名的 TTL、权威 IP 或 deadline。

DNS 等待期间继续内容复审、广告申请、GA/GSC 和构建。等待结束以真实权威数据和窗口计算为准。[专项细则](<C:/Users/86132/.codex/skills/cloudflare-pages-publish/references/domain-cutover.md>)

DNS 回退也须考虑当前 DS、NS 和缓存状态。新 DS 已发布后，禁止直接切回不匹配的旧权威 DNS；先按现状规划安全交接或修复现有签名链，不能把原 NS 值当作任何时刻都可立即恢复的按钮。

## 13. 阶段八：GA4 与 GSC

### 13.1 GA4

1. 先查当前账户及已有属性，避免重复建立或混用其他站 Measurement ID。
2. 在已授权账户内精确匹配该站 property 与 stream.defaultUri；已存在且正确时复用，确认不存在后才通过 Google Analytics Admin API 创建独立 property 和 WEB_DATA_STREAM。核对站名、正式 URL、Asia/Hong_Kong 时区与 measurement ID，不能直接取列表第一个 stream；货币沿用已确认规则。
3. 配置正式域名统计，预览环境关闭。集中发布后用真实浏览器访问正式页面，并操作需要验证的站内行为。
4. 检查 GA 请求实际发出以及 property/measurement ID 正确；再通过 GA Data API `runRealtimeReport` 核实对应属性收到事件，记录事件名、数量和时间窗口。
5. 请求发送成功但服务端暂未查到事件，记录“已发送，接收待核实”；新站未出现历史报表不直接判故障。
6. 测试流量与真实用户流量区分，不能为验收制造大量访问，也不能用模拟接口事件代替实际网页埋点链路。

GA Admin API 支持属性和数据流管理，Realtime API 支持服务端实时事件读取。[Admin API](https://developers.google.com/analytics/devguides/config/admin/v1/rest)；[Realtime API](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runRealtimeReport)

### 13.2 GSC

1. 优先建立并验证本域 domain property，核对对应 Google 账户。
2. 用 Site Verification API 的 getToken 取得 DNS_TXT，写入当前权威 DNS；迁移期间按实际情况同步旧新两侧记录。
3. 查询 DNS 确认 token 已可见，再用 Site Verification API insert 验证所有权。
4. 用 Search Console API sites.add 登记属性，读回访问权限和所有权状态。
5. 正式 sitemap 可访问、URL/canonical/索引模式正确后，使用官方 API 或已具备权限的 GSC Wizard 提交。
6. 读回 sitemap 提交时间、处理状态和错误。pending 与提交失败分开，提交成功与 Google 实际收录分开。
7. 需要检查收录时调用 URL Inspection，记录 URL、时间和具体结果。不能根据 sitemap 返回的过时 indexed 字段计算收录数。

所有权 token 获取与验证、属性登记、sitemap 提交均有官方 API，常规步骤无需逐项进入后台。[获取 token](https://developers.google.com/site-verification/v1/webResource/getToken)；[验证所有权](https://developers.google.com/site-verification/v1/webResource/insert)；[登记属性](https://developers.google.com/webmaster-tools/v1/sites/add)；[提交 sitemap](https://developers.google.com/webmaster-tools/v1/sitemaps/submit)

### 13.3 GSC Wizard 的边界

本轮工具目录可见 `list_sites`、`add_site`、`list_ga4_properties`、`query_ga4_report`、`submit_sitemap`、`list_sitemaps` 等能力。执行时按最新工具 schema 调用，不猜参数。

`add_site` 将 Google 已验证且可访问的属性接入 Wizard，不负责新域所有权验证。GA4 已有属性和历史报表查询也不能替代创建属性或新站实时事件验收。新增 Wizard 可见站点若触及套餐限制，保留官方 API 路径，不擅自升级付费。

## 14. 阶段九：正式站最终复验与交付

### 14.1 正式站复验

从线上 sitemap 枚举全部路由，核对正常 HTTP/TLS、title、description、H1、canonical、OG/Twitter、索引指令、图片、正文和内链。检查不存在的路径返回合理 404，不把所有错误路径静默伪装成首页 200。

首个正式验收版本完成全路由六宽度，展开正文，核对左栏、手机布局、广告请求和图片。全量通过后的局部修复按影响范围复验；公共模板、响应式布局、广告可见性或路由变更扩大到全部受影响页面。记录每组测试对应 SHA，线上 marker 对应最终代码，不能拿旧部署截图证明受新变更影响的行为通过。

HTTP 检查必须使用正常公共解析和有效证书。指定 IP、关闭证书校验或缓存快照只能用于排障。

最终代码与配置集中校验和推送。广告审核等外部等待确需后续部署时记录原因，避免无变化重复部署。

### 14.2 状态表

| 项目 | 可以标完成的证据 | 仍需单列的状态 |
| --- | --- | --- |
| 内容 | 缺口逐项处理、事实与图片证据齐全 | 待核实主题 |
| 技术 | verify 通过、静态产物与路由正确 | 未运行专项 |
| 页面 | 全路由六宽度与交互检查 | 替代浏览器限制 |
| 发布 | Git push 触发成功、SHA/marker 一致 | 构建排队或失败 |
| 域名 | HTTPS、跳转、解析正常 | DNS 缓存传播 |
| DNSSEC | 注册局与验证解析器通过 | 控制台 pending、恢复未完成 |
| GA4 | 本属性服务端收到实际测试事件 | 仅安装代码、仅发送请求 |
| GSC 所有权 | 正确账户属性已验证 | 验证待处理 |
| Sitemap | 提交回执及后续状态 | 处理 pending 或读取错误 |
| Google 收录 | URL Inspection 等实际结果 | 未查或未收录 |
| 广告配置 | Social 与五规格核实、代码映射正确 | 分类异常、审核中、缺码 |
| 广告效果 | 真实填充证据 | 只有脚本请求成功 |
| 收入 | 对应日期和站点统计 | 无数据或未核实 |

外部状态有未完成项时，如实交付当前已完成部分和具体阻塞原因，不宣称“全部完成”。仍可执行的必要工作继续推进。只有用户要求持续监测或稍后跟进时才建立相应自动化，并按其通知意图执行。

### 14.3 必须交付的材料

1. 正式网址、源码目录、仓库、Pages 项目、最终完整 SHA。
2. 游戏身份、SEOScout 查询与有效正文记录、内容差距表、补齐前后对照、未知事实表。
3. 配图覆盖表、正式图片、精简来源清单和完整内部证据位置。
4. 技术日志、全路由六宽度表、代表性截图、广告布局与网络检查。
5. 域名/DNS/DNSSEC 回执、GA/GSC 分项结果、Adsterra 分类与五规格结果。
6. 未完成项、下一检查条件、回退入口，以及中途工具或方案变更记录。

原始 API 响应、失败、重试、最终复查按时间戳分别保存。可以另有 latest 汇总，不能覆盖唯一失败证据。记录中必要时脱敏，任何凭据都不进入公开仓库。

证据包保存业务响应；包含凭据时先脱敏，完整认证响应不写入研究回执。认证材料只保存在现有受控凭据机制中。

## 15. 并行、委派和效率

可并行：内容研究与账户只读预检；不同主题资料采集；视频证据整理与框架配置；DNS 等待与广告/统计准备。存在依赖的写操作按顺序执行。

同一个站点配置文件、同一个域名 DNS、同一个广告表单和同一个生产部署由一个执行者负责写入，其他人以建议或独立文件交接，避免互相覆盖。

委派时必须传入主流程绝对路径、本任务清单、保存目录、目标站点身份、权限范围、负责文件和验收要求。执行者先完整读取主流程，回报证据而非口头完成。用户没有要求新聊天时留在当前任务协作；新聊天仅在用户明确要求时创建。

正常进度更新说明新发现、阻塞和下一步依据。不要高频重复相同状态、同一接口失败或整页读取。变更集中后统一验证；通过后仅因新变化、失败或未解问题扩大复测。

## 16. 本轮发现的工具整改清单

以下是待落地的工程整改，本次只制定与核查 SOP，没有把这些工具改动标为已完成。

| 优先级 | 整改内容 | 修正前的执行方式 |
| --- | --- | --- |
| 高 | Adsterra 扩展固定 Social、五规格，删除错误回退，增加前后分类读回 | 新站表单使用受控后台操作；只读和已验证导出继续按能力使用 |
| 高 | 统一发布脚本显式接收 domain/account/project/repo，不允许旧值默认写入 | 每次审查当前脚本并断言目标 |
| 高 | 域名/DNS/项目查询完整分页，严格区分不存在与权限/网络错误 | 显式分页和读回，错误时禁止进入创建分支 |
| 高 | DNSSEC 检查动态读取 TTL、权威与一致性，不沿用旧 deadline | 按本域实时权威数据计算两窗口 |
| 中 | 共享浏览器 QA 入口覆盖六宽度、折叠正文、空段落、单字符、窄容器和图片 | 使用审查后的当前站脚本，独立保留验收表 |
| 中 | SEOScout 的文档与 topic_name 实现对齐，显式 fresh 批次和正文覆盖统计 | 人工身份核实、独立输出批次、检查默认提取数量 |
| 中 | 所有原始回执改为时间戳，补错误与复查链 | 每次调用单独保存，latest 仅作索引 |
| 中 | README、专项技能、生成器拷贝文档与主流程统一版本入口 | 每次以主流程和当前用户要求校正旧说明 |
| 中 | 视频技能仍含固定每页 1 至 3 张、旧模型和新聊天路由；SERP 技能仍引用失效 H 盘脚本 | 采用当前主题配图标准和会话规则，核实实际脚本位置；不创建未经用户要求的新聊天 |
| 中 | 干净 CI 与 Node 22 版本固定 | 使用明确路径的合格 Node，隔离输入 npm ci 后校验 |

正式采纳时同时更新上述文档入口，并明确哪些工程整改已完成、哪些仍靠人工必检。不能只增加一份新文档后宣称整个工具链已统一。

## 17. 给后续执行者的固定交接文本

> 完整读取 E:\游戏站\_framework\game-guide-framework-v2\SITE-WORKFLOW.md、正式 SOP 和适用 AGENTS.md。沿用本任务已确认的目录、域名、账户和授权。先核实游戏与资源身份，再完成 SEOScout 实际搜索及正文采集、内容差距比较、实用正文和视频截图、框架配置、本地技术与内容双验收、Git 自动发布、域名及 DNSSEC、GA/GSC、Social 分类的五种广告接入、正式站全路由六宽度复验。每步按工具路由表选择入口，浏览器降级须记录具体原因。左栏固定 160×600，宽屏占 192px，正式缺码不留空壳。API 写前断言精确目标，结果读回，原始回执按时间戳保存。编译、发布、事件接收、收录、广告填充和收入分别报告。不得用旧脚本默认值覆盖任务清单，不得省略正文或图片证据，不得静默改变流程。已授权的常规工作持续完成，只对缺失必要信息或扩大授权事项提问。

## 18. 本次审计来源与可复查入口

### 当前拥有源

- [SITE-WORKFLOW.md](<E:/游戏站/_framework/game-guide-framework-v2/SITE-WORKFLOW.md>)、[README.md](<E:/游戏站/_framework/game-guide-framework-v2/README.md>)、[AGENTS.md](<E:/游戏站/_framework/game-guide-framework-v2/AGENTS.md>)、[package.json](<E:/游戏站/_framework/game-guide-framework-v2/package.json>)、[生成器](<E:/游戏站/_framework/game-guide-framework-v2/scripts/create-site.mjs>)。
- [Cloudflare 发布技能](<C:/Users/86132/.codex/skills/cloudflare-pages-publish/SKILL.md>)及其 references 中静态导出、域名交接说明。
- [SEOScout README](<E:/工具/seoscout/README.md>)及其当前 CLI、配置、collect/web 实现。
- [Adsterra Companion README](<E:/工具/Adsterra Companion/README.md>)及 native、extension 当前实现。
- [Soccer API helper](<I:/游戏站/be-a-soccer-manager/research/service_api.py>)、[预检](<I:/游戏站/be-a-soccer-manager/research/preflight.py>)、[Pages 创建](<I:/游戏站/be-a-soccer-manager/research/pages-create.py>)、[Google 接入](<I:/游戏站/be-a-soccer-manager/research/google-onboard.py>)、[Google 读回](<I:/游戏站/be-a-soccer-manager/research/google-readback.py>)、[浏览器 QA](<I:/游戏站/be-a-soccer-manager/research/browser-qa.cjs>)、[图片 QA](<I:/游戏站/be-a-soccer-manager/research/video/image-qa.cjs>)。
- [NexRide Google 接入](<I:/游戏站/nexride/research/google-onboard.py>)、[Pages 创建](<I:/游戏站/nexride/research/pages-create.py>)与相关发布和广告验收记录。
- 当前会话的 GitHub、GSC Wizard 工具能力描述；浏览器技能与实际本地命令入口。

### 官方 API 依据

Cloudflare 项目创建与 Git 集成参考 [Pages API](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/create/)。Spaceship 域名、DNS、NS、分页和异步操作参考 [官方 API 文档](https://docs.spaceship.dev/)。Google 各步骤的官方接口链接位于第 13 节。

本次以共享流程及实际源码为主体，对 NexRide、Be a Soccer Manager 的近期完整建站路径作交叉核查。历史上线记录只用于解释流程来源，不能证明 2026-10-28 的线上状态。下一次执行仍需只读核对账户权限、版本、域名、配额和真实接口响应。

## 19. 接口级操作表与调用纪律

本节用于明确“调用哪个接口完成哪个动作”。花括号均为本任务实时核实的参数，不是可以直接执行的案例值。参数、请求体、分页和 scope 以调用时官方 schema 为准，认证从现有受控客户端加载。下面没有包含购买域名或扩大权限的动作。

### 19.1 身份和研究

| 用途 | 已核实入口 | 操作要点 |
| --- | --- | --- |
| Roblox 游戏详情 | `GET https://games.roblox.com/v1/games?universeIds={UniverseID}` | 核对响应中的游戏、root Place、creator |
| Roblox 官方主视觉/图标线索 | `GET https://thumbnails.roblox.com/v1/games/multiget/thumbnails`；`GET /v1/games/icons` | 按当前参数返回图片后实际查看，不只保留地址 |
| Google 搜索 | `POST https://google.serper.dev/search` | SEOScout 当前发送 q、num，保存实际参数 |
| 目标正文 | `GET https://r.jina.ai/{完整目标URL}` | 验证正文有效与相关，HTTP 200 不够 |
| SEOScout 入口 | `python -B -m seoscout search/collect` | 第 6 节的显式两阶段流程；不要凭空增加 CLI 参数 |

### 19.2 Spaceship

Base URL：`https://spaceship.dev/api`。使用已有 API key/secret，禁止回显认证请求头。

| 用途 | 方法与路径 | 写后检查 |
| --- | --- | --- |
| 域名库存 | `GET /v1/domains?take=100&skip=0`，继续分页 | 精确域名和账户 |
| 单域信息 | `GET /v1/domains/{domain}` | NS、状态等实际字段 |
| DNS 列表 | `GET /v1/dns/records/{domain}?take=500&skip=0`，继续分页 | 保存完整记录 |
| 保存 DNS | `PUT /v1/dns/records/{domain}` | 精确记录读回和权威查询 |
| 冲突记录替换 | 必要时 `DELETE /v1/dns/records/{domain}` 后精确写入 | 删除范围只含已审核冲突项，保存恢复值 |
| 修改 NS | `PUT /v1/domains/{domain}/nameservers` | provider 为 custom，hosts 为本域实际新 NS |
| 异步操作查询 | `GET /v1/async-operations/{operationId}` | pending/success/failed，成功后再查公网 |

遇到 202 读取 `spaceship-async-operationid` 响应头。域名、DNS、异步读取各有权限范围，按实际响应处理。DS 管理使用第 12 节的后台流程，不能借用 DNS TXT/NS 接口模拟。依据：[Spaceship API](https://docs.spaceship.dev/)。

### 19.3 Cloudflare

Base URL：`https://api.cloudflare.com/client/v4`。优先复用有效客户端；token 所属 account、可见 zone 和权限先只读核实。

| 用途 | 方法与路径 |
| --- | --- |
| Pages 列表/详情 | `GET /accounts/{account_id}/pages/projects`；详情追加 `/{project_name}` |
| 创建 Git 项目 | `POST /accounts/{account_id}/pages/projects` |
| 修改项目配置 | `PATCH /accounts/{account_id}/pages/projects/{project_name}` |
| 域名列表/添加 | `GET` / `POST /accounts/{account_id}/pages/projects/{project_name}/domains` |
| 域名状态 | `GET /accounts/{account_id}/pages/projects/{project_name}/domains/{domain_name}` |
| 部署列表/详情 | `GET /accounts/{account_id}/pages/projects/{project_name}/deployments`；详情追加 `/{deployment_id}` |
| 构建日志 | `GET /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs` |
| 回退已成功部署 | `POST /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/rollback` |
| Zone 查询/创建 | `GET /zones`，筛选并分页；确认不存在后 `POST /zones` |
| DNS 列表/创建 | `GET` / `POST /zones/{zone_id}/dns_records` |
| 修改精确 DNS | `PATCH /zones/{zone_id}/dns_records/{dns_record_id}` |
| DNSSEC 读取/配置 | `GET` / `PATCH /zones/{zone_id}/dnssec` |
| 主机跳转 | Rulesets API 的 `http_request_dynamic_redirect` 阶段；先读取现有规则，再精确更新 |

创建/修改 Pages 时分别核对 Git source、生产分支和预览设置。历史脚本中的 `source.config.deployments_enabled` 已有弃用标记，不原样复制旧请求体。部署使用 Git push 驱动，只有实际成功回执与线上 SHA 一致才通过。

没有 redirect 阶段入口 ruleset 时可按当前官方 schema 创建；已经存在时保留无关规则，禁止用新站单条跳转覆盖整个 zone 的规则集。

依据：[创建项目](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/create/)、[修改项目](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/edit/)、[域名](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/)、[部署](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/)、[DNS](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/edit/)、[DNSSEC](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/)、[Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-api/)。

### 19.4 Google

| 用途 | 方法与入口 | 要核对的字段 |
| --- | --- | --- |
| GA 账户与属性线索 | `GET https://analyticsadmin.googleapis.com/v1beta/accountSummaries`，按 pageToken 继续 | 正确 account 和已有 property |
| 创建 GA property | `POST https://analyticsadmin.googleapis.com/v1beta/properties` | parent、displayName、timeZone、currencyCode |
| GA stream 列表/创建 | `GET` / `POST https://analyticsadmin.googleapis.com/v1beta/properties/{property_id}/dataStreams` | WEB_DATA_STREAM、defaultUri、measurementId |
| 读取实时事件 | `POST https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runRealtimeReport` | eventName、eventCount、测试时间窗口 |
| 获取验证 token | `POST https://www.googleapis.com/siteVerification/v1/token` | INET_DOMAIN、精确裸域、DNS_TXT |
| 验证域名 | `POST https://www.googleapis.com/siteVerification/v1/webResource?verificationMethod=DNS_TXT` | 域名及验证返回 |
| GSC 列表 | `GET https://www.googleapis.com/webmasters/v3/sites` | 精确 property、permissionLevel |
| GSC 登记/读取 | `PUT` / `GET https://www.googleapis.com/webmasters/v3/sites/{encoded_siteUrl}` | sc-domain:domain 或确切 URL-prefix |
| 提交 sitemap | `PUT https://www.googleapis.com/webmasters/v3/sites/{encoded_siteUrl}/sitemaps/{encoded_sitemapUrl}` | 无需请求正文；保存状态码 |
| sitemap 状态 | `GET https://www.googleapis.com/webmasters/v3/sites/{encoded_siteUrl}/sitemaps` | 提交时间、pending、errors、warnings |

siteUrl 和 sitemap URL 作为路径参数需分别做正确 URL 编码。GA property 的数字 ID、Web stream ID、`G-` measurement ID 各不相同，不能混用。GA 管理写入需要相应 edit 权限，验证与 GSC 使用各自 scope，不把一个成功接口当成所有权限均已具备。以上 API 能力与依据见第 13 节。

### 19.5 Adsterra 与插件

Publisher API 用于已存在站点/广告位/统计读取；按 [Publisher API 文档](https://docs.adsterratools.com/public/v3/publishers-api) 的当前 GET 定义和分页调用。本轮该文档入口需要 JavaScript，未在此复制未经解析验证的具体路径。创建站点、分类选择、申请规格、Get Code 按第 9 节后台流程执行，不猜写接口。

使用 GSC Wizard 等连接工具时，先发现本轮工具并读取 schema，再传参数；工具名和能力变化以当前实际为准。调用失败保存工具返回类别，不从错误文本推断不存在的服务能力。

### 19.6 每个写操作的最小记录

固定记录：任务 ID、操作时间、工具/接口、精确目标、写前状态、拟变更值、授权来源、响应状态与 operation ID、写后读回、独立效果检查、证据路径。没有 operation ID 的同步接口不虚构该字段。

阶段仅使用：未开始、进行中、通过、外部等待、阻塞、不适用。不适用必须给理由；请求已接受仍属于进行中或外部等待。工具切换记录附在该阶段，不能把浏览器补做隐藏成原 API 已成功。
