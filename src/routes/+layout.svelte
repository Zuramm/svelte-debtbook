<script>
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import { m } from '$lib/paraglide/messages';

	import './layout.css';
	import { getLocale } from '$lib/paraglide/runtime';
	import * as z from 'zod/mini';

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

	let { children } = $props();

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});
</script>

<svelte:head>
	{@html webManifestLink}
	<title>{m.app_title()}</title>
</svelte:head>

{@render children()}
