---
# ===========================================================================
#  文章模板 —— 复制这个文件到 src/content/posts/ 下改名即可，或者用命令：
#      pnpm new-post 我的文章名
#  下面每一行的 # 注释在真实的文章里可以保留，也可以删掉，YAML 不会把它当内容。
# ===========================================================================

# 【必填】文章标题，会显示在卡片、正文顶部和浏览器标签页
title: 我的第一篇文章

# 【必填】发布日期。写 2026-10-23 这种短格式即可，
# 不要写成 2026/10/23（斜杠会让日期解析失败）
published: 2026-10-23

# 可选：最后更新日期，写法和 published 一样
updated: 2026-10-23

# 可选：文章摘要，显示在列表卡片上，也是搜索引擎看到的描述
description: 这里写一句话介绍这篇文章讲了什么。

# 可选：封面图。路径相对当前这个 md 文件，
# 例如文章是 posts/hello/index.md，图片放 posts/hello/cover.jpg，就写 ./cover.jpg
image: ""

# 可选：标签，数组写法，中文不需要引号（有空格或特殊符号时要加引号）
tags: [Astro, 教程]

# 可选：分类，只能写一个字符串
category: 折腾记录

# 可选：草稿开关。true = 构建时跳过，线上看不到；false 或不写 = 正式发布
draft: true

# 可选：这篇文章的语言，留空表示跟随站点设置（src/config.ts 里的 lang）
lang: ""

# 下面四个字段由构建过程自动生成，请不要手写
# prevTitle: ""   prevSlug: ""   nextTitle: ""   nextSlug: ""
---

正文从这里开始，正常写 Markdown 就行。标题用 `##`、`###`，不用写一级标题（`#`），
主题会自动把 frontmatter 里的 title 渲染成页面标题。

## 二级标题

正文段落。

### 三级标题

列表、引用、表格、图片都按标准 Markdown 写：

- 列表项一
- 列表项二

> 这是一段引用。

行内代码：`console.log("hello")`

## 代码块

```ts
// 支持行号、折叠长代码、复制按钮
function greet(name: string): string {
  return `你好，${name}`;
}
```

## 数学公式（KaTeX）

行内公式 $E = mc^2$，块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## 提示块（Admonition）

支持五种类型：note / tip / important / warning / caution。

:::note
普通提示，适合补充说明。
:::

:::tip[自定义标题]
方括号里可以改标题，这一段是「提示」样式。
:::

:::warning
需要注意的坑，比如「改完记得重启」。
:::

## GitHub 仓库卡片

会在页面加载时实时拉取仓库信息（star 数、描述）：

::github{repo="saicaca/fuwari"}

## 写作小贴士

1. **文件名就是 URL**。`posts/hello/index.md` → `/posts/hello/`。
   建议用英文小写加连字符（如 `my-first-post`），中文标题写在 `title` 里。
2. 想给文章单独建目录（放多张图和附件）就用 `posts/文章名/index.md` 的形式。
3. 写完把 `draft` 改成 `false`，或者删掉 `draft` 这一行。
4. 本地预览：`pnpm dev`，默认 http://localhost:4321 。
5. 保存后页面会自动刷新；如果没变化，检查终端里有没有报错（frontmatter 写错会红字）。
