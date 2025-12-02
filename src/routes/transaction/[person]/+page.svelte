<script>
	import TransactionCreateButton from '$components/TransactionCreateButton.svelte';
	import TransactionList from '$components/TransactionList.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { today } from '$lib/stores';

	/** @type {import('./$types').PageProps} */
	const { data, params } = $props();

	let personId = $derived(parseInt(params.person));

	/**
	 * Group transactions into past and future
	 * @param {{id: number, amount: number | null, description: string | null, occured_at: string | null}[]} transactions
	 * @param {string} today
	 * @returns {[{id: number, amount: number | null, description: string | null, occured_at: string | null}[], {id: number, amount: number | null, description: string | null, occured_at: string | null}[]]}
	 */
	function groupTransactions(transactions, today) {
		const past = [];
		const future = [];
		for (const transaction of transactions) {
			if (transaction.occured_at && transaction.occured_at <= today) {
				past.push(transaction);
			} else {
				future.push(transaction);
			}
		}
		return [past, future];
	}

	let [pastData, futureData] = $derived(
		groupTransactions(
			data.transactions ?? [],
			$today.toISOString().substring(0, 'YYYY-MM-DD'.length)
		)
	);
</script>

<div class="space-y-4">
	<!-- {#if errors.length > 0}
		<div class="space-y-2">
			{#each errors as error}
				<p class="rounded-md border border-red-400 bg-red-100 p-2 text-red-600">{error}</p>
			{/each}
		</div>
	{/if} -->

	<TransactionList transactions={futureData} />

	<div class="mx-auto flex border-b-2 border-black px-4 dark:border-gray-300">
		<p class="flex-1 dark:text-gray-200">{m.index_total()}</p>
		<p class="dark:text-gray-200">
			{(data.totalDebt / 100).toLocaleString(getLocale(), {
				style: 'currency',
				currency: 'EUR'
			})}
		</p>
	</div>

	<TransactionList {personId} transactions={pastData} showFirstTitle={futureData.length === 0} />
</div>

<TransactionCreateButton {personId} />
