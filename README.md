# Blog Kulinarny (Astro)

Projekt bloga kulinarnego przygotowany w Astro z przepisami autorstwa **Kacpra Borysa** oraz **Dominika Maślaka**.

## 📖 Dokumentacja

- [Wyłączone techniki optymalizacji (docs/OPTIMIZATIONS.md)](./docs/OPTIMIZATIONS.md) – szczegółowy opis i lista wszystkich wyłączonych technik optymalizacji w Astro i Vite.

### Wyłączone techniki optymalizacji w projekcie:
1. **Kompresja HTML (`compressHTML: false`)** – zachowanie pełnych odstępów, wcięć i struktury kodu HTML bez minifikacji.
2. **Optymalizacja obrazów (`passthroughImageService()`)** – wyłączone skalowanie i konwersja do WebP przez Sharp; serwowanie oryginalnych plików graficznych.
3. **Inlinowanie stylów CSS (`build.inlineStylesheets: 'never'`)** – brak wstrzykiwania CSS do tagów `<style>`; wszystkie style jako osobne pliki `.css`.
4. **Minifikacja JavaScript (`vite.build.minify: false`)** – zachowanie czytelnego kodu JS bez usuwania komentarzy i białych znaków.
5. **Minifikacja CSS (`vite.build.cssMinify: false`)** – wyłączona kompresja arkuszy stylów.
6. **Inlinowanie zasobów jako Base64 (`vite.build.assetsInlineLimit: 0`)** – brak osadzania małych plików jako Data URI.
7. **Preloading i optymalizacja czcionek** – wyłączone preloadingi oraz kalkulacje metryk CLS; tradycyjne reguły `@font-face`.
8. **Prefetching (`prefetch: false`)** – wyłączone wstępne pobieranie stron w tle.

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

| Komenda         | Działanie                                        |
| :-------------- | :----------------------------------------------- |
| `bun install`   | Instalacja zależności                            |
| `bun dev`       | Uruchomienie lokalnego serwera na `localhost:4321` |
| `bun run build` | Zbudowanie wersji produkcyjnej do katalogu `dist/` |
| `bun preview`   | Podgląd zbudowanej strony lokalnie               |
