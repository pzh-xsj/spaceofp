// ============================================================================
//  内容集合（Content Collections）的字段校验规则
// ----------------------------------------------------------------------------
//  这个文件不决定站点长什么样，它决定「文章头部（frontmatter）能写哪些字段」。
//  你在 src/content/posts/ 下每篇文章开头 `---` 之间的那几行，都按下面的规则校验：
//  必填字段没写、类型写错（比如把日期写成字符串）、多写了不认识的字段，构建时会报错。
//  一般不需要改这里；只有当你想给所有文章加一个新字段时才需要动它。
// ============================================================================

import { defineCollection, z } from "astro:content";

// ---------------------------------------------------------------------------
//  posts：博客文章集合，对应目录 src/content/posts/
// ---------------------------------------------------------------------------
const postsCollection = defineCollection({
	schema: z.object({
		// 【必填】文章标题
		title: z.string(),

		// 【必填】发布日期。YAML 里写 2026-10-23 或完整 ISO 时间都行，
		// 不要写成 2026/10/23（斜杠格式会解析失败）
		published: z.date(),

		// 可选：最后更新时间，写法同 published
		updated: z.date().optional(),

		// 可选：是否为草稿。true = 不会出现在构建产物里（线上看不到）
		// 不写时默认 false（即正式发布）
		draft: z.boolean().optional().default(false),

		// 可选：文章摘要。会显示在列表卡片上，也作为 SEO 的 meta description
		description: z.string().optional().default(""),

		// 可选：封面图。相对当前 md 文件写，例如 "./cover.jpg"
		image: z.string().optional().default(""),

		// 可选：标签数组，例如 [Astro, 教程]
		tags: z.array(z.string()).optional().default([]),

		// 可选：分类（单个字符串），例如 "技术"。null 会被当成空
		category: z.string().optional().nullable().default(""),

		// 可选：单篇文章的语言，会覆盖站点默认语言。留空表示跟随全局配置
		lang: z.string().optional().default(""),

		/* 下面四项由构建脚本自动填充（上一篇/下一篇的标题和链接），
		   请勿手动编写，留空即可 */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

// ---------------------------------------------------------------------------
//  spec：独立页面集合，目前只有「关于」页，对应 src/content/spec/about.md
//  schema 为空对象 = 这个目录下的 md 不需要 frontmatter，直接写正文
// ---------------------------------------------------------------------------
const specCollection = defineCollection({
	schema: z.object({}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
