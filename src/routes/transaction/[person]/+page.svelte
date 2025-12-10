<script>
	import CurrencyValue from '$components/CurrencyValue.svelte';
	import CreateDialog from '$components/form/CreateTransactionForm.svelte';
	import UpdateDialog from '$components/form/UpdateTransactionForm.svelte';
	import Modal from '$components/Modal.svelte';
	import Navigation from '$components/Navigation.svelte';
	import TransactionList from '$components/TransactionList.svelte';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import { m } from '$lib/paraglide/messages';
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

	let isCreateModalOpen = $state(false);
	/** @type {{ id: number, amount: number | null, description: string | null, occured_at: string | null } | null} */
	let transactionToUpdate = $state(null);
</script>

<svelte:head>
	<title>{data.people.find((p) => p.id === personId)?.name ?? ''} - {m.app_title()}</title>
</svelte:head>

<Navigation class="space-y-4 overflow-auto p-4 pb-24 md:mx-auto md:max-w-xl md:pb-12">
	<!-- {#if errors.length > 0}
		<div class="space-y-2">
			{#each errors as error}
				<p class="rounded-md border border-red-400 bg-red-100 p-2 text-red-600">{error}</p>
			{/each}
		</div>
	{/if} -->
	<h2 class="py-2 text-4xl font-light text-green-500 dark:text-green-400">
		{m.route_transaction_title()}
	</h2>

	<TransactionList transactions={futureData} />

	<div
		class="mx-auto flex items-center border-b-2 border-black px-4 text-green-500 dark:border-gray-300"
	>
		<p class="flex-1 dark:text-gray-200">{m.route_transaction_total()}</p>
		<CurrencyValue amount={data.totalDebt} />
	</div>

	<TransactionList
		transactions={pastData}
		showFirstTitle={futureData.length === 0}
		ontransactionclick={(transaction) => (transactionToUpdate = transaction)}
	/>

	<Modal open={isCreateModalOpen}>
		<CreateDialog
			people={data.people}
			amount={0}
			date={new Date()}
			description=""
			onclose={() => (isCreateModalOpen = false)}
		/>
	</Modal>

	<Modal open={transactionToUpdate !== null}>
		<UpdateDialog
			id={transactionToUpdate?.id ?? 0}
			{personId}
			people={data.people}
			amount={transactionToUpdate?.amount ?? 0}
			date={transactionToUpdate?.occured_at ? new Date(transactionToUpdate.occured_at) : new Date()}
			description={transactionToUpdate?.description ?? ''}
			onclose={() => (transactionToUpdate = null)}
		/>
	</Modal>

	<FilledButton
		class="fixed right-4 bottom-24 mt-4 md:hidden"
		onclick={() => (isCreateModalOpen = true)}
	>
		<span class="hio hio-plus align-middle text-2xl" aria-labelledby="create-transaction-button"
		></span>
		<span id="create-transaction-button1" class="align-middle">{m.route_transaction_create()}</span>
	</FilledButton>

	{#snippet extra()}
		<FilledButton class="mt-4 hidden md:block" onclick={() => (isCreateModalOpen = true)}>
			<span class="hio hio-plus align-middle text-2xl" aria-labelledby="create-transaction-button2"
			></span>
			<span id="create-transaction-button2" class="align-middle"
				>{m.route_transaction_create()}</span
			>
		</FilledButton>
	{/snippet}
</Navigation>
