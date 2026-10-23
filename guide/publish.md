# 发布流程：从写完到上线

> 站点：<https://blog.spaceofp.xyz>
> 仓库：<https://github.com/pzh-xsj/spaceofp>
> 本地路径：`E:\DS\聊天\blog-SpaceofP`

发布链路只有一条：**本地写完 → push 到 GitHub → Cloudflare 自动构建 → 上线**。
推送后约 2–3 分钟自动完成，不需要去 Cloudflare 点任何按钮。

---

## 一、完整流程（写文章）

### 1. 打开项目

```powershell
cd "E:\DS\聊天\blog-SpaceofP"
```

### 2. 新建文章

```powershell
pnpm new-post my-first-post
```

会生成 `src/content/posts/my-first-post.md`，并填好文章头的骨架。

- 文件名就是网址：`my-first-post.md` → `/posts/my-first-post/`
- **用英文小写 + 连字符**，中文标题写在 `title` 字段里
- 也可以手动复制 `post-template.md`（根目录）改名

### 3. 写内容

文章头的字段含义见 [writing.md](./writing.md)。最小可用示例：

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

### 4. 本地预览

```powershell
pnpm dev
```

浏览器打开 <http://localhost:4321>。

- 改文章 → 保存后约 1 秒自动刷新
- **改 `src/config.ts` / `astro.config.mjs` 不会热更新**，要 `Ctrl + C` 停掉再 `pnpm dev`
- 端口被占用时 Astro 会自动换端口，以终端输出为准

### 5. 构建自检（推荐）

```powershell
pnpm build
```

终端里看到 `✓ Completed`、没有红字即可。这一步能提前发现 90% 的线上构建失败（通常是文章头格式错误）。

> 构建产物在 `dist/`，已被 `.gitignore` 忽略，不会提交。

### 6. 提交并推送

```powershell
git status                       # 看改了哪些文件
git add -A
git commit -m "新文章：我的第一篇文章"
git push
```

`git push` 不带参数即可（`main` 已跟踪 `mine/main`）。

### 7. 等待自动部署

Cloudflare → **Workers 和 Pages** → `spaceofp` → **部署** 标签，能看到正在进行的构建。约 2–3 分钟变成「成功」。

### 8. 验证线上

打开 <https://blog.spaceofp.xyz>，**按 `Ctrl + F5` 硬刷新**（浏览器会缓存旧页面）。

检查清单：

| 检查项 | 预期 |
|---|---|
| 首页 | 新文章出现在列表里 |
| 文章页 | 点进去 `/posts/xxx/` 正常显示 |
| 封面/头像 | 图片正常加载 |
| 搜索 | 顶部搜索框能搜到新内容 |
| RSS | `https://blog.spaceofp.xyz/rss.xml` 有新条目 |
| sitemap | `https://blog.spaceofp.xyz/sitemap-0.xml` 有新 URL |

---

## 二、改动其它内容的流程

流程完全一样（改 → 本地看 → commit → push），只有注意点不同：

| 改的东西 | 注意点 |
|---|---|
| `src/config.ts`（站名、副标题、导航栏、头像、社交链接、主题色） | 本地要重启 `pnpm dev` 才看得到 |
| `astro.config.mjs`（`site` 域名、`base` 子路径） | 同上，重启 dev；改完记得 push 才会重新生成 sitemap/RSS |
| 头像 / 横幅图片 | 放进 `src/assets/images/`，再改 `profileConfig.avatar` / `siteConfig.banner.src` |
| 「关于」页面 | 改 `src/content/spec/about.md`（纯 Markdown，没有文章头），保存即预览 |
| 新增一个页面（如「友链」） | 需要新建 `src/pages/xxx.astro` + `src/content/spec/xxx.md`，再在 `navBarConfig` 里加一项 |
| 样式 | 一般不要动；要改颜色看 `src/styles/variables.styl` |
| 这些说明文档 | 改 `guide/` 下的 md 即可，不影响站点构建 |

---

## 三、命令速查

| 目的 | 命令 |
|---|---|
| 本地预览 | `pnpm dev` |
| 新建文章 | `pnpm new-post 文件名` |
| 构建检查 | `pnpm build` |
| 预览构建结果 | `pnpm build` 然后 `pnpm preview` |
| 看改了哪些文件 | `git status` |
| 看具体改了什么 | `git diff` |
| 暂存全部改动 | `git add -A` |
| 提交 | `git commit -m "说明"` |
| 推送上线 | `git push` |
| 看提交历史 | `git log --oneline -10` |

---

## 四、提交信息怎么写

不用很正式，能一眼看懂就行：

```
新文章：用 Cloudflare 部署博客
修复：首页卡片图片不显示
配置：改站点副标题
样式：调整代码块配色
```

---

## 五、两个 remote，别搞混

```
mine     → https://github.com/pzh-xsj/spaceofp.git    ← 你的仓库，发布用这个
origin   → https://github.com/saicaca/fuwari.git      ← 上游作者的仓库，只用来参考
```

- 日常：`git push`（自动推到 `mine`）
- 明确写法：`git push mine main`
- **绝对不要** `git push origin`——没有权限，会被拒绝

---

## 六、常见问题

| 现象 | 原因 / 解决 |
|---|---|
| 推送了但线上没变 | 先看 `git status` 有没有 `[ahead N]`；没推送成功就是没发布。再确认 Cloudflare「部署」里有新记录 |
| 本地能看到，线上没有 | 检查 `draft: true`（草稿只在 `pnpm dev` 显示，`pnpm build` 会过滤掉） |
| 构建失败 | Cloudflare → 部署 → 点失败那次 → **构建日志**。多数是文章头格式错、日期写成 `2026/10/23` |
| 忘记改了配置要重启 | `src/config.ts`、`astro.config.mjs` 改动后 Ctrl+C 重跑 `pnpm dev` |
| 页面样式全乱 / 卡片错位 | 清缓存重来：删 `node_modules/.vite` 和 `.astro`，再 `pnpm build` |
| 移动/改名了项目目录 | pnpm 的链接是绝对路径，必须重跑 `pnpm install`（否则报 `Cannot find module astro`） |
| `ERR_PNPM_... only-allow` | 用了 npm/yarn，改用 `pnpm` |
| Astro 提示有新版本 | 忽略，别升级 |
| 搜不到中文文章 | Pagefind 对中文不做词形还原，只影响同词根匹配，不影响基本搜索 |

---

## 七、出问题怎么回滚

**代码层面**（安全，不改历史）：

```powershell
git log --oneline -5        # 找到要退回的那次提交
git revert <提交号>
git push
```

**Cloudflare 层面**（秒级，推荐应急用）：
项目 → 部署 → 找到上一个成功的部署 → **回滚 / Rollback**，然后再慢慢修代码。

**只想强制重新部署一次**（比如怀疑缓存）：

```powershell
git commit --allow-empty -m "触发重新部署"
git push
```

---

## 八、推荐的写作节奏

1. 起草时写 `draft: true`，随便改、随便提交（线上看不到）
2. 写完了 `pnpm dev` 通读一遍
3. 改成 `draft: false` → `pnpm build` 确认能构建
4. `git add -A` → `git commit -m "新文章：标题"` → `git push`
5. 2 分钟后硬刷新线上确认

这样线上永远只有你确认过的内容，每次发布也都有记录可查。
