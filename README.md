# Andy's Blog（Astro）

這是從原 Hexo 部落格遷移而來的 Astro Cactus 版本，採用繁體中文介面，內容包含 7 篇文章、分類、標籤、舊網址轉址、Pagefind 搜尋、RSS、sitemap、OG metadata、深色模式與文章目錄。

## 本地開發

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

開發伺服器啟動後，可在 <http://localhost:4321/> 預覽。Pagefind 搜尋索引是在 build 後產生，因此要檢查完整搜尋功能時，請使用 production preview：

```bash
pnpm build
pnpm preview
```

## 內容結構

- `content/posts/`：遷移後的 7 篇 Markdown 文章。
- `content/posts/assets/`：文章引用的本地圖片，不再依賴 HackMD 圖片網址。
- `public/images/avatar.jpeg`：About 頁使用的頭像。
- `src/pages/[...legacy].astro`：舊 Hexo 文章與 archive 路徑的本地轉址頁。
- `src/site.config.ts`：網站網址、中文選單與 Giscus 設定介面。

Giscus 目前刻意保持停用，等本地內容確認後再設定 production 的 `repoId` 與 `categoryId`。目前也未設定 GitHub Actions、遠端 repository 或部署金鑰。

## 常用指令

| 指令 | 用途 |
| --- | --- |
| `pnpm dev` | 啟動開發伺服器 |
| `pnpm check` | Astro 型別檢查與 Biome 檢查 |
| `pnpm build` | 建立 `dist/` 與 Pagefind 索引 |
| `pnpm preview` | 預覽最後一次 production build |

原 Hexo 專案 `/Users/andyhuang/Documents/hexoblog-andy-develop-note` 保留為內容備份，沒有在本次遷移中修改。
