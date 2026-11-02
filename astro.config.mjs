// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, passthroughImageService, sharpImageService } from 'astro/config';

// https://astro.build/config
// WSZYSTKIE TECHNIKI OPTYMALIZACYJNE ASTRO I VITE WYŁĄCZONE:
// 1. compressHTML: false - wyłączona kompresja i minifikacja HTML (pełne zachowanie białych znaków)
// 2. build.inlineStylesheets: 'never' - wyłączone wstrzykiwanie krytycznego CSS w tagi <style> (zawsze osobne pliki .css)
// 3. image.service: passthroughImageService() - wyłączona optymalizacja obrazów (Sharp), brak konwersji do WebP/AVIF, brak skalowania
// 4. prefetch: false - wyłączone wstępne pobieranie podstron (prefetching)
// 5. vite.build.minify: false - wyłączona minifikacja kodu JavaScript
// 6. vite.build.cssMinify: false - wyłączona minifikacja arkuszy stylów CSS
// 7. vite.build.assetsInlineLimit: 0 - wyłączone inlinowanie małych zasobów jako Base64 w HTML/CSS
// 8. fonts: [] - wyłączona automatyczna optymalizacja czcionek, preloading i generowanie fallback metrics

const convertWebp = process.env.CONVERT_WEBP !== 'false';

export default defineConfig({
	site: 'https://fxgrdn.github.io',
	base: '/ztw-cooking-blog',
	trailingSlash: 'always',
	compressHTML: false,
	build: {
		inlineStylesheets: 'never',
	},
	image: {
		service: convertWebp ? sharpImageService() : passthroughImageService(),
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
