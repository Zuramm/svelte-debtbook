<script>
	import { onMount } from 'svelte';

	/** @type {HTMLDialogElement | null} */
	let dialog = $state(null);

	let { open = $bindable(), children, title = '' } = $props();

	onMount(() => {
		if (open) {
			dialog?.showModal();
		}
	});

	$effect(() => {
		if (open) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});
</script>

<dialog
	bind:this={dialog}
	class="ripped m-auto w-full max-w-lg space-y-4 overflow-auto bg-transparent px-4 py-6 transition-all backdrop:bg-gray-900/50 backdrop:backdrop-blur-md backdrop:backdrop-saturate-50"
>
	{#if title}
		<h1 class="text-xl text-green-500 dark:text-green-400">{title}</h1>
	{/if}
	{@render children()}
</dialog>
