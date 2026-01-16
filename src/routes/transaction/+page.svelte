<script>
	import { page } from '$app/state';
	import CurrencyValue from '$components/CurrencyValue.svelte';
	import Header from '$components/Header.svelte';

	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { amountFromRemote, getDateFomatters, group } from '$lib/transaction';

	/** @type {import('./$types').PageProps} */
	const { data } = $props();

	let personId = $derived(
		((person) => (person ? parseInt(person) : null))(page.url.searchParams.get('person'))
	);

	let personMap = $derived(Object.fromEntries(data.people.map((person) => [person.id, person])));

	let personName = $derived(data.people.find((p) => p.id === personId)?.name);

	let formatters = $derived(getDateFomatters(getLocale()));

	let dateFormat = $derived(
		new Intl.DateTimeFormat(getLocale(), { day: '2-digit', month: '2-digit', year: 'numeric' })
	);

	let grouped = $derived(group(data.transactions, formatters));
</script>

<svelte:head>
	<title
		>{personName ? `${personName} - ` : ''}{m.route_transaction_title()} - {m.app_title()}</title
	>
</svelte:head>

<Header />

<main class="mx-auto max-w-2xl space-y-6 p-4">
	<div class="flex flex-row items-center justify-between">
		<h1 class="page-title">{m.route_transaction_title()}</h1>
		<a href="/transaction/create" class="btn-primary">{m.route_transaction_button_create()}</a>
	</div>

	<article class="flex justify-between gap-x-6">
		<p class="text-sm/6 font-semibold text-gray-900 dark:text-white">
			{m.route_transaction_total()}
		</p>
		<p class="text-sm/6 text-white">
			<CurrencyValue amount={amountFromRemote(data.totalDebt)} />
		</p>
	</article>

	{#each grouped as { month, transactions }}
		<h2 class="mb-3 text-base font-semibold text-gray-900 dark:text-white">{month}</h2>
		<article
			class="rounded-lg bg-white shadow dark:border dark:border-white/10 dark:bg-gray-800 dark:shadow-none"
		>
			<ul class="divide-y divide-gray-100 dark:divide-white/5">
				{#each transactions as transaction}
					{@const person = transaction.person_id ? personMap[transaction.person_id] : null}
					<li class="realtive flex justify-between gap-x-6 px-4 py-4">
						<a href="/transaction/{transaction.id}" class="min-w-0 flex-auto">
							<span class="absolute inset-0 z-10"></span>
							<p class="text-sm/6 font-semibold text-gray-900 dark:text-white">
								{transaction.description ?? 'No Description'}
							</p>
							{#if person && !personId}
								<p class="mt-1 truncate text-xs/5 text-gray-500 dark:text-gray-400">
									{person.name}
								</p>
							{/if}
						</a>
						<div class="flex shrink-0 flex-col items-end">
							<p class="text-sm/6 text-white">
								<CurrencyValue amount={amountFromRemote(transaction.amount)} />
							</p>
							<p class="mt-1 text-xs/5 text-gray-400">
								<time datetime={transaction.occured_at}
									>{dateFormat.format(new Date(transaction.occured_at))}</time
								>
							</p>
						</div>
						<div
							class="hio hio-chevron-right align-self-center text-2xl text-gray-400 dark:text-gray-500"
						></div>
					</li>
				{/each}
			</ul>
		</article>
	{/each}
</main>
