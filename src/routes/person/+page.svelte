<script>
	import TransactionList from '$components/TransactionList.svelte';
	import TransactionCreateButton from '$components/TransactionCreateButton.svelte';
	import { getContext, onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { today } from '$lib/stores';
	import Spinner from '$components/icons/spinner.svelte';
	import { fly } from 'svelte/transition';

	/** @type {{person: number}} */
	const { person } = $props();

	/** @type {import("$lib/api").Repository} */
	const debtbook = getContext('debtbook');

	const totalDebt = debtbook.transactionGetTotalDebt();

	/** @type {import("$lib/api").Person[]} */
	let people = $state([]);
	let isLoading = $state(true);
	/** @type {string[]} */
	let errors = $state([]);

	function update() {
		isLoading = true;
		errors = [];
		debtbook
			.personGetPage()
			.then((newPeople) => {
				people = newPeople;
				isLoading = false;
			})
			.catch((error) => {
				errors.push(m.index_list_error({ message: error.message }));
				isLoading = false;
			});
	}

	onMount(() => {
		update();

		debtbook.addEventListener('person-page', update);
		debtbook.addEventListener('person-get', update);
		debtbook.addEventListener('person-create', update);
		debtbook.addEventListener('person-update', update);
		debtbook.addEventListener('person-delete', update);

		return () => {
			debtbook.removeEventListener('person-page', update);
			debtbook.removeEventListener('person-get', update);
			debtbook.removeEventListener('person-create', update);
			debtbook.removeEventListener('person-update', update);
			debtbook.removeEventListener('person-delete', update);
		};
	});
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

	{#each people as person}
		<a
			href="/transaction/{person.id}"
			class="focus:ring-opacity-20 flex cursor-pointer items-center space-x-4 rounded-xl bg-white p-6 transition hover:bg-gray-100 hover:not-italic focus:ring focus:ring-black focus:outline-none"
			in:fly={{ y: 200, duration: 200 }}
			out:fly={{ y: 200, duration: 200 }}
		>
			<p class="flex-1">
				{person.name}
			</p>
			<p>{(123.45).toLocaleString(getLocale(), { style: 'currency', currency: 'EUR' })}</p>
		</a>
	{/each}
</div>

<TransactionCreateButton />
