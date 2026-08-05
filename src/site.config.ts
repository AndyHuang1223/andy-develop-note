import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	url: "https://andyhuang1223.github.io/",
	title: "Andy's Blog",
	author: "Andy Huang",
	description: "PM、Software Engineer、以及 Build School Student Coach Andy Huang 的開發筆記。",
	lang: "zh-TW",
	ogLocale: "zh_TW",
	showLogo: false,
	date: {
		options: {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		},
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "首頁",
	},
	{
		path: "/about/",
		title: "關於",
	},
	{
		path: "/posts/",
		title: "文章",
	},
	{
		path: "/categories/",
		title: "分類",
	},
	{
		path: "/tags/",
		title: "標籤",
	},
];

// Fill repoId and categoryId after enabling Discussions and configuring Giscus.
export const giscusConfig = {
	enabled: false,
	repo: "AndyHuang1223/andy-develop-note",
	repoId: "",
	category: "Announcements",
	categoryId: "",
	mapping: "pathname",
	lang: "zh-TW",
} as const;

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
