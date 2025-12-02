<script>
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import TransactionForm from '$components/TransactionForm.svelte';
	import { m } from '$lib/paraglide/messages';
	import { modal } from '$lib/stores';

	/** @type {{ personId?: number, amount: number, date: Date, description: string }} */
	let { personId, amount = $bindable(), date = $bindable(), description = $bindable() } = $props();

	function oncancel() {
		$modal = undefined;
	}
</script>

<div
	class="w-full max-w-lg space-y-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 dark:shadow-gray-700"
	onclick={(e) => e.stopPropagation()}
	onkeydown={(e) => e.stopPropagation()}
	role="dialog"
	tabindex="0"
	in:scale={{ duration: 125, start: 0.75, opacity: 0, easing: cubicOut }}
	out:scale={{ duration: 100, start: 0.75, opacity: 0, easing: cubicIn }}
>
	<h1 class="tex-black text-xl dark:text-white">Create a Debt Entry</h1>

	<form action="?/create" method="post">
		<input type="hidden" name="person_id" value={personId} />

		<TransactionForm bind:amount bind:date bind:description />

		<div class="flex justify-between pt-1">
			<button
				class="rounded-full px-4 py-2 transition hover:bg-gray-100 focus:ring focus:ring-green-300 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-green-600"
				type="button"
				onclick={oncancel}
			>
				{m.create_dialog_cancel()}
			</button>
			<button
				class="rounded-full border-none bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none"
			>
				{m.create_dialog_create()}
			</button>
		</div>
	</form>
</div>
