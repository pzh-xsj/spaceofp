// ============================================================================
//  站点配置文件（你最常改的就是这个文件）
// ----------------------------------------------------------------------------
//  这里集中了站点的基础信息、主题色、导航栏、个人资料卡、版权声明和代码块主题。
//  改完保存即可，`pnpm dev` 通常会热更新；如果没生效，Ctrl+C 停掉重跑一次。
//  字段类型定义在 src/types/config.ts，写错类型构建时会报错。
//  注意：字符串用英文双引号，数组/对象的逗号别漏。
// ============================================================================

import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// ---------------------------------------------------------------------------
//  1. 站点基础信息
// ---------------------------------------------------------------------------
export const siteConfig: SiteConfig = {
	// 站名：浏览器标签页、页头、SEO 标题都会用它
	title: "Space of P",

	// 副标题：显示在站名右边（可以留空字符串 ""）
	subtitle: "随便写写",

	// 站点语言，决定界面文案（日期格式、按钮文字、搜索提示等）
	// 可选：'en' | 'zh_CN' | 'zh_TW' | 'ja' | 'ko' | 'es' | 'th' | 'vi' | 'tr' | 'id'
	lang: "zh_CN",

	themeColor: {
		// 主题色相（0-360 的色环角度），决定全站主色：
		// 0 = 红，60 = 黄，120 = 绿，200 = 青，250 = 蓝（默认），300 = 紫，345 = 粉
		hue: 250,
		// true = 隐藏访客换主题色的调色按钮；false = 允许访客自选
		fixed: false,
	},

	// 顶部横幅大图（不想要就保持 enable: false）
	banner: {
		enable: false,
		// 图片路径规则：
		//   不以 / 开头 → 相对 src/ 目录，例如 "assets/images/demo-banner.png"
		//   以 / 开头   → 相对 public/ 目录，例如 "/banner.jpg"
		src: "assets/images/demo-banner.png",
		// 图片裁剪位置：'top' | 'center' | 'bottom'
		position: "center",
		// 图片出处署名（用别人的画作时建议打开）
		credit: {
			enable: false,
			text: "", // 显示的署名文字，例如 "Photo by XXX"
			url: "", // 可选的原文链接
		},
	},

	// 文章右侧的目录（Table of Contents）
	toc: {
		enable: true, // 是否显示目录
		depth: 2, // 目录收录到第几级标题：1 = 只收 h1，2 = 到 h2，3 = 到 h3
	},

	// 浏览器标签页图标（favicon）。留空数组则用主题自带图标。
	// 想换图标：把图片放到 public/favicon/ 下，再按下面的格式添加一项。
	favicon: [
		// {
		//   src: '/favicon/icon.png',    // 相对 public/ 目录的路径
		//   theme: 'light',              // 可选：仅在某一种主题下使用
		//   sizes: '32x32',              // 可选：同一图标的不同尺寸
		// }
	],
};

// ---------------------------------------------------------------------------
//  2. 顶部导航栏
//  LinkPreset 有三个内置项：Home（首页）、Archive（归档）、About（关于）。
//  想加自定义链接就照 GitHub 那条写：name 显示文字，url 地址，
//  external: true 表示外部链接（显示 ↗ 图标并在新标签页打开）。
//  站内链接不要手写 base 路径，框架会自动补上。
// ---------------------------------------------------------------------------
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/saicaca/fuwari", // ← 改成你自己的 GitHub 主页
			external: true,
		},
	],
};

// ---------------------------------------------------------------------------
//  3. 左侧个人资料卡
// ---------------------------------------------------------------------------
export const profileConfig: ProfileConfig = {
	// 头像路径（规则同 banner：不以 / 开头相对 src/，以 / 开头相对 public/）
	// 建议正方形、边长 >= 256px
	avatar: "assets/images/demo-avatar.png",
	// 昵称
	name: "彭钟宏",
	// 一句话简介（可留空 ""）
	bio: "你好啊",
	// 社交链接列表。每项三项：
	//   name —— 鼠标悬停时的提示文字
	//   icon —— 图标代码，去 https://icones.js.org/ 查
	//   url  —— 跳转地址
	// 图标格式是 "图标集:图标名"，例如 "fa6-brands:github"。
	// 用了没安装的图标集时会报错，需要先装：pnpm add @iconify-json/<图标集名>
	links: [
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://store.steampowered.com",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/saicaca/fuwari", // ← 改成你自己的 GitHub 主页
		},
	],
};

// ---------------------------------------------------------------------------
//  4. 文章版权协议（文章底部显示的小卡片）
//  enable: false 可以整个关掉；换协议改 name 和 url 即可。
// ---------------------------------------------------------------------------
export const licenseConfig: LicenseConfig = {
	enable: false,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// ---------------------------------------------------------------------------
//  5. 代码块主题
//  注意：必须选「暗色」主题（这套样式只适配暗色代码背景）。
//  可选值见 https://expressive-code.com/guides/themes/ ，
//  例如 "github-dark" / "dracula" / "one-dark-pro" / "nord"
// ---------------------------------------------------------------------------
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
