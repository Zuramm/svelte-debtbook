<script>
	import TransactionCard from '$components/TransactionCard.svelte';
	import { getLocale } from '$lib/paraglide/runtime';

	/** @type {{ transactions: {id: number, amount: number | null, description: string | null, occured_at: string | null}[], showFirstTitle?: boolean }} */
	let { transactions, showFirstTitle = true } = $props();

	let data = $derived(
		(() => {
			/** Group transactions by "YYYY-MM" @type {Record<string, {id: number, amount: number | null, description: string | null, occured_at: string | null}[]>} */
			const groups = {};
			if (transactions) {
				for (const transaction of transactions) {
					const monthKey = transaction.occured_at?.substring(0, 'YYYY-MM'.length) ?? '';
					if (!groups[monthKey]) groups[monthKey] = [];
					groups[monthKey].push(transaction);
				}
			}
			const pairs = Object.entries(groups);

			// Sort each group by date then description, most recent first
			const result = pairs.map(([date, months]) => {
				const sorted = [...months]
					.sort((a, b) => {
						if (a.occured_at && b.occured_at && a.occured_at < b.occured_at) return -1;
						if (!a.occured_at || !b.occured_at || a.occured_at > b.occured_at) return 1;
						// fallback to description string comparison
						if (a.description && b.description && a.description < b.description) return -1;
						if (!a.description || !b.description || a.description > b.description) return 1;
						return 0;
					})
					.reverse();
				return { date: new Date(date), data: sorted };
			});
			// Sort months by date descending (most recent first)
			result.sort((a, b) => b.date.getTime() - a.date.getTime());
			return result;
		})()
	);
</script>

{#each data as month, i}
	{#if i > 0 || showFirstTitle}
		<h2 class="border-b-2 border-green-600 pt-2 text-2xl text-green-900">
			{month.date.toLocaleDateString(getLocale(), { month: 'long' })}
		</h2>
	{/if}
	{#each month.data as transaction}
		<TransactionCard
			ref={transaction.id}
			amount={transaction.amount}
			date={transaction.occured_at ? new Date(transaction.occured_at) : null}
			description={transaction.description}
		/>
	{/each}
{/each}
