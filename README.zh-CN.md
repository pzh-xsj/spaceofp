# Space of P —— 个人博客使用说明

基于 [Fuwari](https://github.com/saicaca/fuwari)（Astro + Tailwind CSS）的个人静态博客。
这份文档讲**你日常会改什么、在哪儿改**；上游项目本身的英文说明见 `README.md`。

- 技术栈：Astro 5 + Svelte 5 + Tailwind CSS 3
- 构建产物：纯静态 HTML（`dist/`），可以放任何静态托管
- 本地预览：http://localhost:4321

> 当前版本锁定 `astro 5.13.10`。**不要执行 `pnpm update` 或升级 Astro 大版本**，
> 主题的组件和样式是跟着这个版本写的，跨大版本升级基本会编译失败。

---

## 一、快速开始

首次拉取代码后（已经装好依赖的话可跳过）：

```bash
pnpm install     # 必须用 pnpm，npm/yarn 会被 package.json 里的 only-allow 拒绝
pnpm dev         # 启动开发服务器，改文件自动刷新
```

其它命令：

| 命令 | 作用 |
|---|---|
| `pnpm dev` | 本地预览（热更新） |
| `pnpm build` | 构建到 `dist/`，同时生成搜索索引（pagefind） |
| `pnpm preview` | 预览已构建的结果 |
| `pnpm new-post 文件名` | 新建一篇文章，自动填好 frontmatter 骨架 |
| `pnpm check` | 类型与内容校验，改完配置建议跑一次 |
| `pnpm format` | 用 Biome 格式化 `src/` |

---

## 二、目录结构：哪些该改，哪些别动

```
fuwari/
├── src/
│   ├── config.ts            ★ 站点配置：站名、语言、主题色、导航栏、头像、版权
│   ├── content/
│   │   ├── config.ts          文章字段校验规则（一般不用改）
│   │   ├── posts/           ★ 你的文章都放这里
│   │   └── spec/about.md    ★ 「关于」页面的正文
│   ├── assets/images/       ★ 头像、横幅等图片
│   ├── pages/                 路由定义（别动）
│   ├── components/            页面组件（改外观时才动）
│   ├── layouts/               布局（别动）
│   └── styles/                全局样式（调字体、配色时才动）
├── public/                  ★ 原样拷贝到站点根目录的静态文件（favicon 等）
├── astro.config.mjs         ★ 构建配置，通常只需要改 site（域名）
├── post-template.md         ★ 文章模板 + 语法示例（不会被打包发布）
├── package.json               依赖与脚本（别随便改版本）
└── README.md                  上游项目说明（英文）
```

带 ★ 的是你日常会碰的，其余基本不需要动。

---

## 三、站点配置：`src/config.ts`

整个文件一个对象一段，都加了中文注释。重点字段：

### 1. 站点信息（`siteConfig`）

| 字段 | 说明 |
|---|---|
| `title` | 站名，出现在标签页、页头、SEO 标题 |
| `subtitle` | 副标题 |
| `lang` | 界面语言，简体中文用 `"zh_CN"`，繁体 `"zh_TW"` |
| `themeColor.hue` | 主色色相 0–360：0 红 / 60 黄 / 120 绿 / 200 青 / 250 蓝 / 300 紫 / 345 粉 |
| `themeColor.fixed` | `true` 则隐藏访客的换色按钮 |
| `banner.*` | 顶部大图，`enable: true` 才显示 |
| `toc.*` | 文章右侧目录，`depth` 控制收录到第几级标题（1–3） |
| `favicon` | 标签页图标，留空用默认 |

### 2. 导航栏（`navBarConfig`）

```ts
links: [
  LinkPreset.Home,     // 首页
  LinkPreset.Archive,  // 归档
  LinkPreset.About,    // 关于
  { name: "GitHub", url: "https://github.com/你的用户名", external: true },
]
```

站内链接**不要**手写子路径前缀，框架会自动补。

### 3. 个人资料卡（`profileConfig`）

`avatar` 头像、`name` 昵称、`bio` 简介、`links` 社交链接。
图标代码去 <https://icones.js.org/> 查，格式 `图标集:图标名`（如 `fa6-brands:github`）。
用到没安装的图标集时要先装：`pnpm add @iconify-json/<图标集名>`。

### 4. 其它

- `licenseConfig`：文章底部的版权协议，`enable: false` 可关闭
- `expressiveCodeConfig.theme`：代码块配色，**必须选暗色**（`github-dark` 等）

### 图片怎么放

- 放 `src/assets/images/`：路径**不以 `/` 开头**，如 `"assets/images/avatar.png"`
- 放 `public/`：路径**以 `/` 开头**，如 `"/avatar.png"`

建议头像用正方形 ≥256px；横幅用 16:9、≥1920px 宽。

---

## 四、写文章

文章目录：`src/content/posts/`

```
src/content/posts/
├── hello.md                  → 访问地址 /posts/hello/
└── my-trip/
    ├── index.md              → 访问地址 /posts/my-trip/
    └── cover.jpg             ← 配图放同一目录，frontmatter 里写 ./cover.jpg
```

**新建文章**：

```bash
pnpm new-post hello
pnpm new-post my-trip/index    # 也支持子目录
```

或者直接复制根目录的 `post-template.md`（自带完整注释和语法示例）过去改名。

### 文章头部（frontmatter）字段

| 字段 | 必填 | 类型 | 说明 |
|---|---|---|---|
| `title` | ✅ | 字符串 | 标题 |
| `published` | ✅ | 日期 | 如 `2026-10-23`，**不能写 `2026/10/23`** |
| `updated` | | 日期 | 更新时间 |
| `draft` | | 布尔 | `true` 时构建产物中不包含，线上看不到 |
| `description` | | 字符串 | 列表摘要 + SEO 描述 |
| `image` | | 字符串 | 封面图，相对 md 文件，如 `./cover.jpg` |
| `tags` | | 字符串数组 | `[Astro, 教程]` |
| `category` | | 字符串 | 只能一个，如 `"折腾记录"` |
| `lang` | | 字符串 | 单篇语言，留空跟随站点 |

字段规则定义在 `src/content/config.ts`，写错字段名或类型构建会报错。

### 命名建议

文件名会成为 URL，**用英文小写 + 连字符**（`my-first-post`），中文标题写在 `title` 里，
否则 URL 会变成一长串 `%E6%88%91...` 的编码。

---

## 五、Markdown 扩展语法

除了标准 Markdown，主题额外支持：

### 提示块

```markdown
:::note
普通提示
:::

:::warning[自定义标题]
方括号可以改标题
:::
```

类型：`note` `tip` `important` `warning` `caution`

### GitHub 仓库卡片

```markdown
::github{repo="saicaca/fuwari"}
```

页面加载时实时拉取仓库信息（star 数、描述）。

### 数学公式（KaTeX）

行内 `$E=mc^2$`，块级：

```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 代码块

支持行号、长代码折叠、语言标签、复制按钮（Expressive Code）。
示例见上游的 `src/content/posts/expressive-code.md`。

---

## 六、「关于」页面

正文在 `src/content/spec/about.md`，**纯 Markdown、没有 frontmatter**，直接写内容即可。
导航栏的「关于」指向它。

---

## 七、部署

构建产物在 `dist/`，是纯静态文件，推荐 **Cloudflare Pages**（免费、自带 CDN、自动 HTTPS）。

1. 把仓库推到自己 GitHub
2. Cloudflare Pages → 连接仓库
3. 构建命令 `pnpm build`，输出目录 `dist`
4. 绑定自己的域名

注意：**部署到自己的域名后，一定要把 `astro.config.mjs` 里的 `site` 改成实际地址**
（如 `https://blog.example.com/`），否则 RSS 和 sitemap 里会是上游的示例域名。

如果部署在子路径（`example.com/blog/`），还要把 `base` 改成 `"/blog/"`。

---

## 八、常见问题

| 现象 | 原因 / 解决 |
|---|---|
| `ERR_PNPM_... only-allow` | 用了 npm/yarn。改用 `pnpm install` |
| 构建报 `InvalidContentEntryFrontmatterError` | frontmatter 字段写错：日期格式、字段名拼写、类型不符 |
| 图标不显示 / 报错 | 图标集没装：`pnpm add @iconify-json/fa6-brands` |
| 改了配置没生效 | 部分配置（如 `lang`）需要 Ctrl+C 后重跑 `pnpm dev` |
| 文章不显示 | 检查 `draft` 是否为 `true`，以及文件是否在 `src/content/posts/` 下 |
| 图片 404 | 路径规则：相对 md 用 `./x.jpg`，相对 `public/` 用 `/x.jpg` |
| Astro 提示有新版本 | 忽略。本主题锁定 5.x，别升级 |
| 想删掉示例文章 | 删 `src/content/posts/` 下的 `markdown.md`、`markdown-extended.md`、`expressive-code.md`、`video.md`、`draft.md`、`guide/`（整个目录，含图片） |

---

## 九、上游与许可

- 主题来源：[saicaca/fuwari](https://github.com/saicaca/fuwari)（MIT License）
- 本文档与配置文件的中文注释为本地添加，不影响与上游的同步
- 想跟进上游更新：`git remote add upstream https://github.com/saicaca/fuwari.git`，
  然后 `git fetch upstream` 比较，注意 `src/config.ts` 已被本地修改，合并时容易冲突
