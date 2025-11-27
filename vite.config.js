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
				name: 'My Offline App',
				short_name: 'OfflineApp',
				start_url: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: [
					// Icons removed - add them to static/ folder if needed
					// {
					// 	src: 'pwa-192x192.png',
					// 	sizes: '192x192',
					// 	type: 'image/png'
					// },
					// {
					// 	src: 'pwa-512x512.png',
					// 	sizes: '512x512',
					// 	type: 'image/png'
					// }
				]
			},
			workbox: {
				// This is the most important setting.
				// It tells the service worker to cache EVERYTHING in the build folder.
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				// Configure navigation fallback to use index.html for SPA routing
				navigateFallback: '/index.html',
				navigateFallbackDenylist: [/^\/_/]
			}
		})
	]
});
