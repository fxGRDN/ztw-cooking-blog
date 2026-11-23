# Blog Kulinarny (Astro)

## 📖 Dokumentacja

- [Wyłączone techniki optymalizacji (docs/OPTIMIZATIONS.md)](./docs/OPTIMIZATIONS.md) – szczegółowy opis i lista wszystkich przełączalnych technik optymalizacji w Astro i Vite.

### Przełączalne techniki optymalizacji

Wszystkie optymalizacje można niezależnie włączać i wyłączać zmiennymi środowiskowymi podczas `bun run build` (domyślnie są włączone; wyłączenie = `false`). Opis każdej techniki: [docs/OPTIMIZATIONS.md](./docs/OPTIMIZATIONS.md).

| Zmienna | Opcja Astro/Vite | Wartość przy `true` (domyślnie) | Wartość przy `false` | Input workflow |
| :-- | :-- | :-- | :-- | :-- |
| `CONVERT_WEBP` | `image.service` | `sharpImageService()` (WebP) | `passthroughImageService()` | `convert_webp` |
| `COMPRESS_HTML` | `compressHTML` | `true` | `false` | `compress_html` |
| `INLINE_STYLESHEETS` | `build.inlineStylesheets` | `'auto'` | `'never'` | `inline_stylesheets` |
| `MINIFY_JS` | `vite.build.minify` | `true` | `false` | `minify_js` |
| `MINIFY_CSS` | `vite.build.cssMinify` | `true` | `false` | `minify_css` |
| `INLINE_ASSETS` | `vite.build.assetsInlineLimit` | `4096` | `0` | `inline_assets` |
| `OPTIMIZE_FONTS` | `fonts` + `<Font preload />` | Astro Fonts API, fallback metrics, `<link rel="preload">` | zwykły `@font-face` | `optimize_fonts` |
| `ENABLE_PREFETCH` | `prefetch` | `true` | `false` | `enable_prefetch` |

Każda optymalizacja jest **domyślnie włączona** i wyłączana wyłącznie przez ustawienie zmiennej na `false` (`process.env.NAZWA !== 'false'`). Każda inna wartość (lub brak zmiennej) oznacza włączenie.

Przykłady użycia lokalnie:

```bash
# Domyślny build (wszystkie optymalizacje włączone)
bun run build

# Build bez minifikacji JS i CSS
MINIFY_JS=false MINIFY_CSS=false bun run build

# Build ze wszystkimi optymalizacjami wyłączonymi
CONVERT_WEBP=false COMPRESS_HTML=false INLINE_STYLESHEETS=false MINIFY_JS=false MINIFY_CSS=false INLINE_ASSETS=false OPTIMIZE_FONTS=false ENABLE_PREFETCH=false bun run build
```

PowerShell:

```powershell
$env:MINIFY_JS = 'false'; $env:MINIFY_CSS = 'false'; bun run build
```

W GitHub Actions (`workflow_dispatch`) te same przełączniki są dostępne jako pola typu `boolean` (domyślnie `true`).

## 🚀 Struktura projektu

```text
├── docs/
│   └── OPTIMIZATIONS.md
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   └── blog/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Polecenia

| Komenda         | Działanie                                          |
| :-------------- | :------------------------------------------------- |
| `bun install`   | Instalacja zależności                              |
| `bun dev`       | Uruchomienie lokalnego serwera na `localhost:4321` |
| `bun run build` | Zbudowanie wersji produkcyjnej do katalogu `dist/` |
| `bun preview`   | Podgląd zbudowanej strony lokalnie                 |
