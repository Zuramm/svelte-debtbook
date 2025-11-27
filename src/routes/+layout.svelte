<script>
	import { onMount } from 'svelte';
	import './layout.css';
	import { pwaInfo } from 'virtual:pwa-info';
	import { Repository } from '$lib/api';
	import { setContext } from 'svelte';
	import Modal from '../components/Modal.svelte';

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')
	
	let { children } = $props();

	setContext('debtbook', new Repository());

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register')
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`)
				},
				onRegisterError(error) {
					console.log('SW registration error', error)
				}
			})
		}
	})
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<div
    class="h-screen bg-green-100 overflow-auto relative font-mono bg-arrows pb-24 md:pb-12"
  >
    <div class="bg-green-50 sticky top-0">
      <div class="max-w-lg mx-auto p-4 space-y-4">
        <div class="flex justify-between flex-row">
          <div class="flex-1 flex">
            <h1 class="w-100 flex-none font-bold text-4xl text-green-900">
              Debtbook
            </h1>
            <!-- {#if queryClient.isFetching()}
              <Spinner className="mx-4 w-5 text-green-600" />
            {/if} -->
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-lg mx-auto p-4 space-y-4">
		{@render children()}
    </div>
  </div>

  <Modal />
