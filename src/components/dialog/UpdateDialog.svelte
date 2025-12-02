<script>
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import TransactionForm from '$components/TransactionForm.svelte';
	import { m } from '$lib/paraglide/messages';
	import { modal } from '$lib/stores';

	/** @type {{ ref: number, personId?: number, amount: number, date: Date, description: string }} */
	let { ref, personId = undefined, amount, date, description } = $props();

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
	<h1 class="tex-black text-xl dark:text-white">Update a Debt Entry</h1>

	<form action="?/update" method="post">
		<input type="hidden" name="id" value={ref} />
		<input type="hidden" name="person_id" value={personId} />

		<TransactionForm bind:amount bind:date bind:description />

		<div class="flex justify-between pt-1">
			<button
				class="rounded-full px-4 py-2 transition hover:bg-gray-100 focus:ring focus:ring-green-300 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-green-600"
				type="button"
				onclick={oncancel}
			>
				{m.update_dialog_cancel()}
			</button>
			<div class="space-x-2">
				<button
					class="rounded-full border-2 border-red-500 px-4 py-2 text-base text-red-600 transition hover:bg-red-500 hover:text-white focus:ring focus:ring-red-300 focus:outline-none dark:border-red-400 dark:text-red-400 dark:hover:bg-red-600 dark:focus:ring-red-600"
					formaction="?/delete"
				>
					{m.update_dialog_delete()}
				</button>
				<button
					class="rounded-full border-none bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none"
				>
					{m.update_dialog_update()}
				</button>
			</div>
		</div>
	</form>
</div>
