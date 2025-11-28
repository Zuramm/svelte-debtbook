<script>
	import { onMount } from 'svelte';
	import './layout.css';
	import { pwaInfo } from 'virtual:pwa-info';
	import { Repository } from '$lib/api';
	import { setContext } from 'svelte';
	import Modal from '$components/Modal.svelte';
	import Header from '$components/Header.svelte';
	import { page } from '$app/state';

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

	let { children } = $props();

	/** @type {'people' | 'settings' | undefined} */
	let active = $derived(
		page.url.pathname === '/person'
			? 'people'
			: page.url.pathname === '/settings'
				? 'settings'
				: undefined
	);

	setContext('debtbook', new Repository());

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

<div class="bg-arrows relative h-screen overflow-auto bg-green-100 pb-24 font-mono md:pb-12">
	<Header {active} />
	<div class="mx-auto max-w-lg space-y-4 p-4">
		{@render children()}
	</div>
</div>

<Modal />
