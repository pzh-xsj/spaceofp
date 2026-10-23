# 操作指南

这个文件夹放的是**日常操作说明**，和站点内容无关，不会被构建进网站（Astro 只处理 `src/` 和 `public/`）。

| 文档 | 讲什么 | 什么时候看 |
|---|---|---|
| [publish.md](./publish.md) | 写完文章/改完东西后，怎么发布到线上 | 每次要上线的时候 |
| [writing.md](./writing.md) | Markdown 写法 + 文章开头（frontmatter）每个字段的含义 | 第一次写文章，或者忘了某个字段怎么写 |

## 三条铁律

1. **改完必须 `git push`**，只 `git commit` 不会上线。
2. **用 pnpm**，别用 npm / yarn（仓库有 `only-allow pnpm` 限制）。
3. **别升级 Astro**，主题锁定 5.13.10。

## 一分钟版

```powershell
cd "E:\DS\聊天\blog-SpaceofP"
pnpm new-post 文章名          # 新建
pnpm dev                      # 本地看，Ctrl+C 结束
git add -A
git commit -m "新文章：文章名"
git push                      # 2~3 分钟后自动上线
```

线上地址：<https://blog.spaceofp.xyz>
