# Wyłączone techniki optymalizacji (Disabled Optimization Techniques)

W tym projekcie wszystkie domyślne techniki optymalizacyjne stosowane przez Astro i Vite zostały celowo wyłączone. Poniżej znajduje się pełna lista wraz z wyjaśnieniem ich działania oraz konfiguracji.

---

### 1. Kompresja i minifikacja HTML (`compressHTML: false`)
- **Domyślne działanie Astro**: Astro domyślnie usuwa zbędne białe znaki, zwija wielolinijkowe bloki tekstu i minifikuje wygenerowany kod HTML stron.
- **Stan obecny**: **Wyłączone**. W pliku `astro.config.mjs` ustawiono `compressHTML: false`. Wygenerowany kod HTML zachowuje pełne wcięcia, przejrzystość i oryginalne znaki nowej linii.

---

### 2. Optymalizacja obrazów Sharp/WebP (`image: { service: passthroughImageService() }`)
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
- **Stan obecny**: **Wyłączone**. Usunięto provider czcionek z konfiguracji oraz wyłączono preloading w `BaseHead.astro`. Czcionki ładowane są standardową regułą `@font-face` w `global.css`.

---

### 8. Wstępne pobieranie podstron (`prefetch: false`)
- **Domyślne działanie Astro**: Mechanizm prefetching pobiera zasoby powiązanych podstron przed kliknięciem przez użytkownika (np. po najechaniu kursorem).
- **Stan obecny**: **Wyłączone**.

---

### Podsumowanie konfiguracji w `astro.config.mjs`

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
