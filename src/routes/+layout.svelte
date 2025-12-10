<script>
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';

	import './layout.css';

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

	let { children, data } = $props();

	/** @type {'people' | 'settings' | undefined} */
	let active = $derived(
		page.url.pathname === '/person'
			? 'people'
			: page.url.pathname === '/settings'
				? 'settings'
				: undefined
	);

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
