# 文章写法：Markdown 语法与文章头说明

> 配套文档：[publish.md](./publish.md)（发布流程）

---

## 一、文章放在哪，网址怎么生成

文章一律放 `src/content/posts/` 目录。

| 你建的文件 | 生成的网址 |
|---|---|
| `src/content/posts/hello.md` | `/posts/hello/` |
| `src/content/posts/my-trip/index.md` | `/posts/my-trip/` |
| `src/content/posts/2026/10/hello.md` | `/posts/2026/10/hello/` |

- **文件名 = URL**，用英文小写 + 连字符（`my-first-post`）
- 中文文件名会变成 `%E6%88%91...` 这种编码，不要用
- 中文标题写在 `title` 字段里
- 想给文章配图，就用「目录式」：`posts/文章名/index.md` + 同目录放图片

---

## 二、文章头（frontmatter）

文件开头两个 `---` 之间的那几行，叫 frontmatter，用 YAML 语法写。它决定了标题、日期、封面、分类等**不属于正文**的信息，构建时会把它读出来。

```markdown
---
title: 我的第一篇文章
published: 2026-10-23
tags: [随笔]
category: 随笔
draft: false
---

正文从这里开始。
```

### 2.1 字段总表

| 字段 | 必填 | 类型 | 默认值 | 作用 |
|---|---|---|---|---|
| `title` | ✅ | 字符串 | — | 文章标题，显示在卡片、文章页、浏览器标签 |
| `published` | ✅ | 日期 | — | 发布日期，列表按它倒序排列 |
| `updated` | | 日期 | 无 | 更新日期，填了会在文章页显示「更新于」 |
| `description` | | 字符串 | 空 | 摘要，显示在首页卡片，也是搜索引擎的描述 |
| `image` | | 字符串 | 空 | 封面图路径，显示在卡片右侧 |
| `tags` | | 字符串数组 | `[]` | 标签，多个用 `[a, b]` |
| `category` | | 字符串 | 空 | 分类，**只能一个** |
| `draft` | | 布尔 | `false` | `true` = 草稿，线上不发布 |
| `lang` | | 字符串 | 空 | 单篇语言，留空跟随站点（`zh_CN`） |

### 2.2 每个字段的细节

**`title`（必填）**
标题。可以带空格、标点、中文，**一般不需要加引号**；如果标题里有英文冒号 `:`、井号 `#` 这类 YAML 特殊字符，就要用引号包起来：

```yaml
title: 我的第一篇文章
title: "笔记：YAML 里的冒号要加引号"
```

**`published`（必填）**
发布日期，格式 `YYYY-MM-DD`。

```yaml
published: 2026-10-23        # ✅ 正确
published: 2026/10/23        # ❌ 斜杠会解析失败，构建报错
published: "2026-10-23"      # ✅ 加引号也可以（会被当成字符串再转日期）
```

这个值决定文章在列表里的位置：**日期越新越靠前**。

**`updated`（可选）**
最后修改日期，写法同上。不写就不显示。

```yaml
updated: 2026-10-25
```

**`description`（可选）**
一两句话的摘要，会出现在首页卡片上（大标题下面那行小字），也作为 SEO 描述。建议写，空格子很难看。

**`image`（可选）**
封面图。**路径相对当前这个 md 文件**：

```yaml
image: ./cover.jpg          # 图片和 md 放在同一目录（目录式文章推荐）
image: ""                   # 不写封面
```

如果图片放在 `public/` 下，则以 `/` 开头：`image: /images/cover.jpg`。

**`tags`（可选）**
标签数组，多个用逗号分隔：

```yaml
tags: [Astro, 教程]           # 中文不需要引号
tags: [笔记, "如何写 YAML"]    # 含空格的要加引号
tags: []                      # 没有标签
```

**`category`（可选）**
分类，**只能写一个字符串**（不是数组）。侧边栏的「分类」列表就是按它统计的。

```yaml
category: 随笔
category: ""        # 不分类
```

**`draft`（可选，默认 `false`）**
草稿开关，行为要记清楚：

| 场景 | `draft: true` 的文章 |
|---|---|
| `pnpm dev`（本地预览） | **能看到**，方便边写边看 |
| `pnpm build` / 线上 | **不生成**，线上看不到 |

所以「本地能看」不代表「线上有」。发布前改成 `false` 或删掉这一行。

**`lang`（可选）**
单篇语言，一般留空。多语言文章才用。

### 2.3 不要手写的字段

下面四个由构建过程自动生成（上一篇/下一篇的标题和链接），**不要自己写**，写了也会被覆盖：

```yaml
prevTitle: ""
prevSlug: ""
nextTitle: ""
nextSlug: ""
```

（`pnpm new-post` 不会生成它们，`post-template.md` 模板里也没有，正常不用管。）

---

## 三、正文：Markdown 基础语法

### 标题

**正文标题从 `##` 开始写，不要写 `#`**——因为你的 `title` 已经会被渲染成页面的一级标题，再写 `#` 会出现两个 H1，目录也会乱。

```markdown
## 二级标题（会进右侧目录）
### 三级标题
#### 四级标题
```

右侧目录默认只收录到二级（由 `src/config.ts` 里 `toc.depth` 控制）。

### 段落与换行

空一行就是新段落。**单个换行不会换行**（Markdown 规则），要强制换行可以：

- 行尾加两个空格
- 或者用 `<br />`

### 强调

```markdown
**加粗**        *斜体*        ***加粗斜体***
~~删除线~~
`行内代码`
```

### 列表

```markdown
- 无序项
- 无序项
  - 嵌套要缩进两个空格

1. 有序项
2. 有序项

- [ ] 未完成的待办
- [x] 已完成
```

### 引用

```markdown
> 这是一段引用
> 可以有多行

> 引用里也能写 **粗体** 和 [链接](https://example.com)
```

### 链接与图片

```markdown
[链接文字](https://example.com)
[站内链接](/posts/hello/)

![图片说明](./cover.jpg)          # 相对当前 md 文件
![图片说明](/images/x.jpg)        # public/ 目录下的图
```

### 代码

行内：`` `const a = 1` ``

代码块：三个反引号 + 语言名，会自动高亮、加语言标签和复制按钮。

````markdown
```ts
function greet(name: string) {
  return `你好，${name}`;
}
```
````

### 分隔线

```markdown
---
```

（注意：单独一行的 `---` 是分隔线，但**文件最顶部**的 `---` 是文章头的边界，别搞混。）

### 表格

```markdown
| 左对齐 | 居中 | 右对齐 |
| :--- | :---: | ---: |
| 内容 | 内容 | 内容 |
```

### 转义

想原样显示 Markdown 符号，前面加反斜杠：`\*不是斜体\*`、`\# 不是标题`。

---

## 四、本项目额外支持的写法（上游主题扩展）

这些不是标准 Markdown，是这个主题加的功能，用起来很方便。

### 4.1 提示块（Admonition）

五种类型：`note` / `tip` / `important` / `warning` / `caution`

````markdown
:::note
普通提示，适合补充说明。
:::

:::tip
小技巧。
:::

:::important
重要信息。
:::

:::warning
需要注意的坑。
:::

:::caution
可能导致负面后果的操作。
:::
````

**自定义标题**：类型后面加方括号。

````markdown
:::note[我自己起的标题]
正文内容。
:::
````

### 4.2 GitHub 风格提示块

也支持 GitHub 那套写法：

```markdown
> [!NOTE]
> 这是 GitHub 风格的提示。

> [!TIP]
> 这是提示。

> [!WARNING]
> 这是警告。
```

### 4.3 折叠/剧透

文字默认隐藏，点击才显示（支持内部写 Markdown）：

```markdown
答案是 :spoiler[42]！
```

### 4.4 GitHub 仓库卡片

会实时拉取仓库的 star 数和描述：

```markdown
::github{repo="saicaca/fuwari"}
```

格式就是 `仓库所有者/仓库名`。

### 4.5 数学公式（KaTeX）

行内公式用单个 `$`，独立公式用两个 `$`：

```markdown
质能方程 $E = mc^2$。

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$
```

### 4.6 视频

直接粘 iframe（官方示例就是这么做的）：

```html
<iframe width="100%" height="468"
        src="https://www.youtube.com/embed/视频ID"
        title="YouTube video player" frameborder="0" allowfullscreen></iframe>
```

B 站同理，用它的「嵌入代码」。如果某些来源的 iframe 被过滤掉，改用链接 + 封面图更稳。

---

## 五、图片与链接的路径规则（最容易错的地方）

| 写法 | 指向哪里 |
|---|---|
| `./cover.jpg` | 和当前 md **同一个目录**（推荐给目录式文章） |
| `../images/x.png` | 上一级目录 |
| `/images/x.jpg` | 项目根目录下的 `public/images/x.jpg` |
| `https://...` | 外链 |

**特别注意**：`image` 字段和正文里的 `![](...)` 遵循同一套规则，都是**相对当前 md 文件**，不是相对项目根目录。

推荐做法：文章用目录式，图片就放文章目录里。

```
src/content/posts/my-trip/
├── index.md
├── cover.jpg
└── photo-1.jpg
```

```yaml
image: ./cover.jpg
```

---

## 六、一篇完整示例

````markdown
---
title: 我的第一篇文章
published: 2026-10-23
updated: 2026-10-25
description: 记录一下折腾静态博客的过程。
image: ./cover.jpg
tags: [Astro, 折腾记录]
category: 技术
draft: false
---

## 为什么写这篇

因为我想要一个自己可控的地方写字。

## 做了什么

1. 用 Astro 生成静态站
2. 推到 GitHub
3. Cloudflare 自动构建

:::tip[小提示]
文章写完记得把 `draft` 改成 `false`，否则线上看不到。
:::

## 代码示例

```ts
const site = "blog.spaceofp.xyz";
console.log(`部署在 ${site}`);
```

## 小结

就这么简单。
````

对应目录结构：

```
src/content/posts/my-first-post/
├── index.md
└── cover.jpg
```

---

## 七、常见错误对照

| 报错 / 现象 | 原因 | 改法 |
|---|---|---|
| `InvalidContentEntryFrontmatterError` | 字段名拼错 / 类型不对 / 日期格式错 | 对照上面总表逐项检查 |
| 文章不显示（线上） | `draft: true` | 改成 `false` |
| 文章不显示（本地也没有） | 文件不在 `src/content/posts/` | 移动过去 |
| 日期报错 | 写成了 `2026/10/23` | 改成 `2026-10-23` |
| 封面不显示 | 路径写成相对项目根 | 改成 `./cover.jpg` |
| 标题出现两个 H1 | 正文里写了 `# 标题` | 正文从 `##` 开始 |
| 提示块显示成纯文本 | `:::note` 少了一个冒号 / 结尾没有 `:::` | 检查配对 |
| 标签显示成一整串 | 用了逗号分隔但没加方括号 | 改成 `[a, b]` |
| 中文标题乱码 | 文件编码不是 UTF-8 | 用 VS Code 另存为 UTF-8 |
| 构建通过但样式错乱 | 通常是缓存 | 删 `node_modules/.vite` 和 `.astro` 重试 |
