import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
		SvelteKitPWA({
			registerType: 'autoUpdate', // Auto-update the worker when new builds are deployed
			manifest: {
				name: 'Debtbook',
				short_name: 'Debtbook',
				start_url: '/person',
				display: 'standalone',
				theme_color: '#6EE7B7',
				background_color: '#dcfce7',
				icons: [
					{ src: '/favicon.svg', type: 'image/svg+xml' },
					{ src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
					{ src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
					{
						src: '/icon-192-maskable.png',
						type: 'image/png',
						sizes: '192x192',
						purpose: 'maskable'
					},
					{
						src: '/icon-512-maskable.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'maskable'
					}
				]
			},
			workbox: {
				// This is the most important setting.
				// It tells the service worker to cache EVERYTHING in the build folder.
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				// Configure navigation fallback to use index.html for SPA routing
				navigateFallback: '/person/index.html',
				navigateFallbackDenylist: [/^\/_/]
			}
		})
	]
});
