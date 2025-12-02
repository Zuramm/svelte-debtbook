<script>
	import CreateDialog from '$components/dialog/CreateDialog.svelte';
	import Plus from '$components/icons/Plus.svelte';
	import { modal } from '$lib/stores';

	/** @type {{personId?: number}} */
	let { personId = undefined } = $props();

	function openCreateDialog() {
		$modal = [CreateDialog, { personId }];
	}
</script>

<button
	class="focus:ring-opacity-30 fixed right-5 bottom-5 flex h-16 w-16 items-center justify-center rounded-full border-none bg-green-500 text-3xl text-white shadow-xl transition hover:bg-green-600 focus:ring focus:ring-black focus:outline-none"
	on:click={openCreateDialog}
>
	<Plus />
</button>
