<script>
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import { page } from '$app/state';
	import Header from '$components/Header.svelte';
	import Modal from '$components/Modal.svelte';

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
</svelte:head>

<div
	class="bg-arrows relative h-screen overflow-auto bg-green-100 pb-24 font-mono text-black md:pb-12 dark:bg-gray-900 dark:text-white"
>
	<Header isAuthenticated={data.session != null} {active} />
	<div class="mx-auto max-w-lg space-y-4 p-4">
		{@render children()}
	</div>
</div>

<Modal />
