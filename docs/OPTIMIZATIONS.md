# Przełączalne techniki optymalizacji (Toggleable Optimization Techniques)

Każda technika optymalizacji stosowana przez Astro i Vite może być niezależnie włączona lub wyłączona zmienną środowiskową podczas budowania (`bun run build`). Domyślnie wszystkie są włączone; ustawienie zmiennej na `false` wyłącza daną technikę (w sekcjach poniżej „Stan obecny" opisuje działanie po jej wyłączeniu).

## Zmienne środowiskowe

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

## Przykłady użycia lokalnie

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

---

---

### 1. Kompresja i minifikacja HTML (`compressHTML: false`)
- **Domyślne działanie Astro**: Astro domyślnie usuwa zbędne białe znaki, zwija wielolinijkowe bloki tekstu i minifikuje wygenerowany kod HTML stron.
- **Stan obecny**: **Wyłączone**. W pliku `astro.config.mjs` ustawiono `compressHTML: false`. Wygenerowany kod HTML zachowuje pełne wcięcia, przejrzystość i oryginalne znaki nowej linii.

---

### 2. Optymalizacja obrazów Sharp/WebP (`CONVERT_WEBP`)
- **Domyślne działanie Astro**: Komponent `<Image />` domyślnie przetwarza zdjęcia silnikiem `sharp`, konwertuje je do formatu WebP lub AVIF, generuje warianty responsywne oraz kompresuje wagę plików.
- **Stan obecny**: **Wyłączone**. Zastosowano `passthroughImageService()`, dzięki czemu Astro serwuje oryginalne, nieskompresowane pliki graficzne bez przetwarzania i konwersji formatów.

---

### 3. Wstrzykiwanie stylów inline (`build: { inlineStylesheets: 'never' }`)
- **Domyślne działanie Astro**: Astro analizuje rozmiar arkuszy stylów CSS i wstrzykuje mniejsze pliki bezpośrednio do tagu `<style>` w sekcji `<head>`, aby ograniczyć liczbę zapytań HTTP.
- **Stan obecny**: **Wyłączone**. Wartość `'never'` wymusza generowanie wszystkich stylów jako osobnych plików `.css` podpinanych przez tradycyjne tagi `<link rel="stylesheet">`.

---

### 4. Minifikacja kodu JavaScript (`vite.build.minify: false`)
- **Domyślne działanie Vite**: Wszystkie skrypty klienckie są minifikowane (usuwane są komentarze, białe znaki, a nazwy zmiennych ulegają skróceniu/manglingowi).
- **Stan obecny**: **Wyłączone**. Skrypty JS są emitowane w czytelnej, niemodyfikowanej postaci.

---

### 5. Minifikacja arkuszy CSS (`vite.build.cssMinify: false`)
- **Domyślne działanie Vite**: Arkusze CSS są kompresowane i minifikowane przez LightningCSS lub esbuild.
- **Stan obecny**: **Wyłączone**. Wygenerowane pliki CSS zachowują formatowanie i komentarze.

---

### 6. Inlinowanie zasobów jako Base64 (`vite.build.assetsInlineLimit: 0`)
- **Domyślne działanie Vite**: Małe zasoby graficzne, czcionki lub ikony poniżej progu 4 KB są wstrzykiwane bezpośrednio do kodu jako ciągi znaków Base64 (`data:`).
- **Stan obecny**: **Wyłączone**. Ustawienie wartości `0` gwarantuje, że każdy plik jest zapisywany jako niezależny zasób z własnym adresem URL.

---

### 7. Automatyczna optymalizacja i preloading czcionek
- **Domyślne działanie Astro**: Mechanizm `fontProviders` w Astro generuje metryki korygujące przesunięcia układu (CLS) z użyciem `size-adjust` i `ascent-override`, a komponent `<Font preload />` dodaje tagi `<link rel="preload">`.
- **Sterowanie**: `OPTIMIZE_FONTS`. Przy włączeniu `astro.config.mjs` rejestruje lokalny provider czcionek (`fontProviders.local()`, `--font-atkinson`), a `BaseHead.astro` renderuje `<Font cssVariable="--font-atkinson" preload />`.
- **Stan po wyłączeniu (`OPTIMIZE_FONTS=false`)**: brak providera i preloadingu; `BaseHead.astro` wstawia zwykłe reguły `@font-face` wskazujące na pliki z `src/assets/fonts`.

---

### 8. Wstępne pobieranie podstron (`prefetch: false`)
- **Domyślne działanie Astro**: Mechanizm prefetching pobiera zasoby powiązanych podstron przed kliknięciem przez użytkownika (np. po najechaniu kursorem).
- **Stan obecny**: **Wyłączone**.

---

### Podsumowanie konfiguracji w `astro.config.mjs` (wszystko wyłączone)

```javascript
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  compressHTML: false,
  build: {
    inlineStylesheets: 'never',
  },
  image: {
    service: passthroughImageService(),
  },
  prefetch: false,
  vite: {
    build: {
      minify: false,
      cssMinify: false,
      assetsInlineLimit: 0,
    },
  },
  integrations: [mdx(), sitemap()],
});
```
