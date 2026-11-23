// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders, passthroughImageService, sharpImageService } from 'astro/config';

// https://astro.build/config
// Każda optymalizacja jest domyślnie WŁĄCZONA i wyłączana zmienną środowiskową = 'false':
// CONVERT_WEBP        - konwersja obrazów (Sharp -> WebP) zamiast passthroughImageService()
// COMPRESS_HTML       - compressHTML
// INLINE_STYLESHEETS  - build.inlineStylesheets: 'auto' | 'never'
// MINIFY_JS           - vite.build.minify
// MINIFY_CSS          - vite.build.cssMinify
// INLINE_ASSETS       - vite.build.assetsInlineLimit: 4096 | 0
// OPTIMIZE_FONTS      - Astro Fonts API (fallback metrics) + <Font preload /> w BaseHead.astro
// ENABLE_PREFETCH     - prefetch
const enabled = (name) => process.env[name] !== 'false';

const convertWebp = enabled('CONVERT_WEBP');
const optimizeFonts = enabled('OPTIMIZE_FONTS');

export default defineConfig({
	site: 'https://fxgrdn.github.io',
	base: '/ztw-cooking-blog',
	trailingSlash: 'always',
	compressHTML: enabled('COMPRESS_HTML'),
	build: {
		inlineStylesheets: enabled('INLINE_STYLESHEETS') ? 'auto' : 'never',
	},
	image: {
		service: convertWebp ? sharpImageService() : passthroughImageService(),
	},
	prefetch: enabled('ENABLE_PREFETCH'),
	fonts: optimizeFonts
		? [
				{
					provider: fontProviders.local(),
					name: 'Atkinson',
					cssVariable: '--font-atkinson',
					fallbacks: ['sans-serif'],
					options: {
						variants: [
							{ src: ['./src/assets/fonts/atkinson-regular.woff'], weight: 400, style: 'normal', display: 'swap' },
							{ src: ['./src/assets/fonts/atkinson-bold.woff'], weight: 700, style: 'normal', display: 'swap' },
						],
					},
				},
			]
		: [],
	vite: {
		build: {
			minify: enabled('MINIFY_JS'),
			cssMinify: enabled('MINIFY_CSS'),
			assetsInlineLimit: enabled('INLINE_ASSETS') ? 4096 : 0,
		},
	},
	integrations: [mdx(), sitemap()],
});
