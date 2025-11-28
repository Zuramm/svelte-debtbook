<script>
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';

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
	<label for="transaction-description">{m.transaction_form_description()}</label>
	<input
		class="mt-1 w-full rounded-md border-none bg-gray-50 p-2 shadow-md transition focus:ring focus:ring-green-300 focus:outline-none"
		id="transaction-description"
		type="text"
		bind:value={description}
	/>
</div>

<div>
	<label for="transaction-date">{m.transaction_form_date()}</label>
	<input
		class="mt-1 w-full rounded-md border-none bg-gray-50 p-2 shadow-md transition focus:ring focus:ring-green-300 focus:outline-none"
		id="transaction-date"
		type="date"
		bind:value={dateInput}
		onchange={updateDate}
	/>
</div>

<div>
	<label for="transaction-amount">
		{m.transaction_form_amount()}
		{#if amount < 0}
			({m.transaction_form_amount_negative({ amount: formatAmount(-amount) })})
		{:else if amount > 0}
			({m.transaction_form_amount_positive({ amount: formatAmount(amount) })})
		{/if}
	</label>
	<input
		class="mt-1 w-full rounded-md border-none bg-gray-50 p-2 shadow-md transition focus:ring focus:ring-green-300 focus:outline-none"
		id="transaction-amount"
		type="number"
		bind:value={amount}
	/>
</div>
