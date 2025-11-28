<script>
	import { getContext } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import { m } from '$lib/paraglide/messages';
	import { modal } from '$lib/stores';

	import TransactionForm from '$components/TransactionForm.svelte';

	/** @type {{ amount: number, date: Date, description: string }} */
	let { amount = $bindable(), date = $bindable(), description = $bindable() } = $props();

	/** @type {import("$lib/api").Repository} */
	const debtbook = getContext('debtbook');

	function oncancel() {
		$modal = undefined;
	}

	function oncreate() {
		debtbook.transactionCreate({
			person_id: 1,
			amount: Math.round(amount * 100),
			timestamp: date.getTime(),
			description
		});
		$modal = undefined;
	}
</script>

<div
	class="w-full max-w-lg space-y-4 rounded-xl bg-white p-4 shadow-sm"
	onclick={(e) => e.stopPropagation()}
	onkeydown={(e) => e.stopPropagation()}
	role="dialog"
	tabindex="0"
	in:scale={{ duration: 125, start: 0.75, opacity: 0, easing: cubicOut }}
	out:scale={{ duration: 100, start: 0.75, opacity: 0, easing: cubicIn }}
>
	<h1 class="tex-black text-xl">Create a Debt Entry</h1>

	<TransactionForm bind:amount bind:date bind:description />

	<div class="flex justify-between pt-1">
		<button
			class="rounded-full px-4 py-2 transition hover:bg-gray-100 focus:ring focus:ring-green-300 focus:outline-none"
			onclick={oncancel}
		>
			{m.create_dialog_cancel()}
		</button>
		<button
			class="rounded-full border-none bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none"
			onclick={oncreate}
		>
			{m.create_dialog_create()}
		</button>
	</div>
</div>
