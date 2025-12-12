<script>
	import { getLocale } from '$lib/paraglide/runtime';
	import { today } from '$lib/stores';
	import CurrencyValue from '$components/CurrencyValue.svelte';

	/** @typedef {{
	 		id: number, 
			person_id: number | null,
			amount: number | null, 
			description: string | null, 
			occured_at: string,
		}} Transaction */

	/** @type {{ transactions: Transaction[], showFirstTitle?: boolean, ontransactionclick?: (transaction: Transaction) => void }} */
	let { transactions, showFirstTitle = true, ontransactionclick } = $props();

	let data = $derived(
		(() => {
			/** Group transactions by "YYYY-MM" @type {Record<string, Transaction[]>} */
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

{#each data as month, i (month.date.getTime())}
	<article class="focus:ring-opacity-20 ripped divide-y divide-gray-200 py-4 dark:divide-gray-700">
		{#if i > 0 || showFirstTitle}
			<h2 class="p-2 text-xl">
				{month.date.toLocaleDateString(getLocale(), { month: 'long' })}
			</h2>
		{/if}
		{#each month.data as transaction (transaction.id)}
			{@const isInFuture =
				!transaction.occured_at ||
				transaction.occured_at > $today.toISOString().substring(0, 'YYYY-MM-DD'.length)}
			<button
				class={[
					'grid w-full grid-cols-[2fr_auto_1fr_auto] items-center p-2 hover:bg-gray-100 sm:grid-cols-[3fr_auto_1fr_auto] md:grid-cols-[4fr_auto_1fr_auto] dark:hover:bg-gray-700',
					isInFuture
						? 'bg-white text-gray-600 italic opacity-70 dark:bg-gray-800 dark:text-gray-400'
						: 'bg-white dark:bg-gray-800'
				]}
				onclick={() => ontransactionclick?.(transaction)}
			>
				<span class="text-left dark:text-gray-200">
					{#if transaction.description}
						{transaction.description}
					{:else}
						--
					{/if}
				</span>
				<span class={['text-right text-gray-400 dark:text-gray-500']}
					>{transaction.occured_at
						? new Date(transaction.occured_at).toLocaleDateString(getLocale())
						: '--'}</span
				>
				<CurrencyValue amount={transaction.amount} {isInFuture} />
			</button>
		{/each}
	</article>
{/each}
