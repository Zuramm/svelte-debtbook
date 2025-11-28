<script>
	import { fly } from 'svelte/transition';

	import UpdateDialog from '$components/dialog/UpdateDialog.svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { modal } from '$lib/stores';

	/** @type {{ ref: number, amount: number, date: Date, description: string }} */
	let { ref, amount, date, description } = $props();

	let isInFuture = $derived(date > new Date());

	function openUpdateDialog() {
		$modal = [
			UpdateDialog,
			{
				ref,
				amount: amount / 100,
				date,
				description
			}
		];
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	function onKeyDown(event) {
		if (event.key === 'Enter') {
			openUpdateDialog();
		}
	}
</script>

<div
	class="focus:ring-opacity-20 flex cursor-pointer items-center space-x-4 rounded-xl p-6 transition hover:bg-gray-100 hover:not-italic focus:ring focus:ring-black focus:outline-none {isInFuture
		? 'bg-opacity-60 bg-white text-gray-600 italic shadow-sm'
		: 'bg-white shadow-md'}"
	tabindex="0"
	onclick={openUpdateDialog}
	onkeydown={onKeyDown}
	role="button"
	in:fly={{ y: 200, duration: 200 }}
	out:fly={{ y: 200, duration: 200 }}
>
	<p class="flex-1">
		{#if description}
			{description}
		{:else}
			--
		{/if}
		<br />
		<span class="text-gray-400 {isInFuture ? 'text-gray-500' : ''}"
			>{new Date(date).toLocaleDateString(getLocale())}</span
		>
	</p>
	<p
		class="flex-shrink-0 text-right"
		class:text-red-600={!isInFuture && amount < 0}
		class:text-green-600={!isInFuture && amount > 0}
	>
		{(amount / 100).toLocaleString(getLocale(), { style: 'currency', currency: 'EUR' })}
	</p>
</div>
