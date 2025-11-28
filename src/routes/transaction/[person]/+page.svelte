<script>
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/state';

	import Spinner from '$components/icons/spinner.svelte';
	import TransactionCreateButton from '$components/TransactionCreateButton.svelte';
	import TransactionList from '$components/TransactionList.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { today } from '$lib/stores';

	const person = parseInt(page.params.person ?? '0');

	/** @type {import("$lib/api").Repository} */
	const debtbook = getContext('debtbook');

	/**
	 * Group transactions into past and future
	 * @param {import("$lib/api").Transaction[]} transactions
	 * @param {number} today
	 * @returns {[import("$lib/api").Transaction[], import("$lib/api").Transaction[]]}
	 */
	function groupTransactions(transactions, today) {
		const past = [];
		const future = [];
		for (const transaction of transactions) {
			if (transaction.timestamp <= today) {
				past.push(transaction);
			} else {
				future.push(transaction);
			}
		}
		return [past, future];
	}

	const totalDebt = debtbook.transactionGetTotalDebtByPerson(person);

	/** @type {import("$lib/api").Transaction[]} */
	let transactions = $state([]);
	let isLoading = $state(true);
	/** @type {string[]} */
	let errors = $state([]);

	function update() {
		isLoading = true;
		errors = [];
		debtbook
			.transactionGetPageByPerson(person)
			.then((newTransactions) => {
				transactions = newTransactions;
				isLoading = false;
			})
			.catch((error) => {
				errors.push(m.index_list_error({ message: error.message }));
				isLoading = false;
			});
	}

	onMount(() => {
		update();

		debtbook.addEventListener('transaction-page', update);
		debtbook.addEventListener('transaction-get', update);
		debtbook.addEventListener('transaction-create', update);
		debtbook.addEventListener('transaction-update', update);
		debtbook.addEventListener('transaction-delete', update);

		return () => {
			debtbook.removeEventListener('transaction-page', update);
			debtbook.removeEventListener('transaction-get', update);
			debtbook.removeEventListener('transaction-create', update);
			debtbook.removeEventListener('transaction-update', update);
			debtbook.removeEventListener('transaction-delete', update);
		};
	});

	let [pastData, futureData] = $derived(groupTransactions(transactions, $today.getTime()));
</script>

<div class="space-y-4">
	{#if isLoading}
		{m.index_loading()}
		<Spinner className="mx-auto w-5 text-green-600" />
	{/if}

	{#if errors.length > 0}
		<div class="space-y-2">
			{#each errors as error}
				<p class="rounded-md border border-red-400 bg-red-100 p-2 text-red-600">{error}</p>
			{/each}
		</div>
	{/if}

	<TransactionList transactions={futureData} />

	<div class="mx-auto flex border-b-2 border-black px-4">
		<p class="flex-1">{m.index_total()}</p>
		<p>
			{#await totalDebt}
				...
			{:then total}
				{(total / 100).toLocaleString(getLocale(), {
					style: 'currency',
					currency: 'EUR'
				})}
			{:catch error}
				{m.index_currency_error(error)}
			{/await}
		</p>
	</div>

	<TransactionList transactions={pastData} showFirstTitle={futureData.length === 0} />
</div>

<TransactionCreateButton />
