<script>
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import Input from '$components/ui/Input.svelte';

	/** @type {{ amount: number, date: Date, description: string }} */
	let { amount = $bindable(), date = $bindable(), description = $bindable() } = $props();

	/**
	 * @param {Date?} date
	 * @returns {string?}
	 */
	function getDateString(date) {
		if (date) {
			const string = date.toISOString();
			if (string === 'Invalid Date') {
				return null;
			}
			return date.toISOString().substring(0, 'YYYY-MM-DD'.length);
		}
		return null;
	}

	let dateInput = $derived(getDateString(date));

	/**
	 * @param {number} amount
	 * @returns {string}
	 */
	function formatAmount(amount) {
		return amount.toLocaleString(getLocale(), {
			style: 'currency',
			currency: 'EUR'
		});
	}

	function updateDate() {
		if (dateInput) {
			date = new Date(dateInput);
		}
	}
</script>

<div>
	<label for="transaction-description" class="dark:text-gray-200"
		>{m.transaction_form_description()}</label
	>
	<Input id="transaction-description" name="description" type="text" bind:value={description} />
</div>

<div>
	<label for="transaction-date" class="dark:text-gray-200">{m.transaction_form_date()}</label>
	<Input
		id="transaction-date"
		name="occured_at"
		type="date"
		bind:value={dateInput}
		onchange={updateDate}
	/>
</div>

<div>
	<label for="transaction-amount" class="dark:text-gray-200">
		{m.transaction_form_amount()}
		{#if amount < 0}
			({m.transaction_form_amount_negative({ amount: formatAmount(-amount) })})
		{:else if amount > 0}
			({m.transaction_form_amount_positive({ amount: formatAmount(amount) })})
		{/if}
	</label>
	<Input
		id="transaction-amount"
		name="amount"
		type="number"
		step="0.01"
		min="-1000000"
		max="1000000"
		bind:value={amount}
	/>
</div>
