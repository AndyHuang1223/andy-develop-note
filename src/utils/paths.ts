const legacyTaxonomySlugs: Record<string, string> = {
	"C#": "C",
	"C#學習筆記": "C-學習筆記",
};

export function taxonomySlug(label: string): string {
	return (
		legacyTaxonomySlugs[label] ??
		label.replace(/#/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim()
	);
}

export function taxonomyHref(type: "categories" | "tags", label: string): string {
	return `/${type}/${encodeURIComponent(taxonomySlug(label))}/`;
}

export function postHref(slug: string): string {
	return `/posts/${encodeURIComponent(slug)}/`;
}

export function legacyRedirects(): Record<string, string> {
	return {
		"/archives/": "/posts/",
		"/archives/2022/": "/posts/",
		"/archives/2022/06/": "/posts/",
		"/archives/2022/07/": "/posts/",
	};
}
