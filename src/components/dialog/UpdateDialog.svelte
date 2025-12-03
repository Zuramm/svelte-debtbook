<script>
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import { closeModal } from '$components/Modal.svelte';
	import TransactionForm from '$components/TransactionForm.svelte';
	import TextButton from '$components/ui/TextButton.svelte';
	import OutlinedButton from '$components/ui/OutlinedButton.svelte';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import { m } from '$lib/paraglide/messages';

	/** @type {{ ref: number, personId?: number, amount: number, date: Date, description: string }} */
	let { ref, personId = undefined, amount, date, description } = $props();

	function oncancel() {
		closeModal();
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
	<h1 class="text-xl text-green-900 dark:text-green-300">Update a Debt Entry</h1>

	<form action="?/update" method="post" class="space-y-4">
		<input type="hidden" name="id" value={ref} />
		<input type="hidden" name="person_id" value={personId} />

		<TransactionForm bind:amount bind:date bind:description />

		<div class="flex justify-between pt-1">
			<TextButton color="secondary" type="button" onclick={oncancel}>
				{m.update_dialog_cancel()}
			</TextButton>
			<div class="space-x-2">
				<OutlinedButton color="danger" formaction="?/delete">
					{m.update_dialog_delete()}
				</OutlinedButton>
				<FilledButton color="primary">
					{m.update_dialog_update()}
				</FilledButton>
			</div>
		</div>
	</form>
</div>
