<script>
	import { fly } from 'svelte/transition';

	import { m } from '$lib/paraglide/messages';
	import Navigation from '$components/Navigation.svelte';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import CurrencyValue from '$components/CurrencyValue.svelte';
	import Modal from '$components/Modal.svelte';
	import CreateDialog from '$components/form/CreateTransactionForm.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	let isModalOpen = $state(false);
</script>

<svelte:head>
	<title>{m.route_person_title()} - {m.app_title()}</title>
</svelte:head>

<Navigation class="space-y-4 overflow-auto p-4 pb-24 md:mx-auto md:max-w-lg md:pb-12">
	<!-- {#if errors.length > 0}
		<div class="space-y-2">
			{#each errors as error}
				<p class="rounded-md border border-red-400 bg-red-100 p-2 text-red-600">{error}</p>
			{/each}
		</div>
	{/if} -->

	<h2 class="py-2 text-4xl font-light text-green-500 dark:text-green-400">
		{m.route_person_title()}
	</h2>

	<div
		class="mx-auto flex items-center border-b-2 border-black px-4 py-2 text-green-500 dark:border-gray-300"
	>
		<p class="flex-1 dark:text-gray-200">{m.route_person_total()}</p>
		<CurrencyValue amount={data.totalDebt} />
	</div>

	{#each data.people as person}
		<a
			href="/transaction/{person.id}"
			class="focus:ring-opacity-20 group flex cursor-pointer items-center space-x-4 rounded-xl bg-white p-6 shadow-lg shadow-emerald-50/50 transition hover:bg-gray-100 hover:not-italic focus:ring focus:ring-black focus:outline-none dark:bg-gray-800 dark:shadow-gray-950/20 dark:hover:bg-gray-700 dark:focus:ring-gray-400"
			in:fly={{ y: 200, duration: 200 }}
			out:fly={{ y: 200, duration: 200 }}
		>
			<span class="flex-1 dark:text-gray-200">
				{person.name}
			</span>
			<CurrencyValue amount={person.debt} />
			<span
				class="hio hio-chevron-right text-xl text-gray-500 transition-colors transition-transform group-hover:scale-120 group-hover:text-green-500"
				aria-label={m.route_person_transaction_show()}
			></span>
		</a>
	{/each}

	<Modal open={isModalOpen}>
		<CreateDialog
			people={data.people}
			amount={0}
			date={new Date()}
			description=""
			onclose={() => (isModalOpen = false)}
		/>
	</Modal>

	<FilledButton class="fixed right-4 bottom-24 mt-4 md:hidden" onclick={() => (isModalOpen = true)}>
		<span class="hio hio-plus align-middle text-2xl"></span>
		<span class="align-middle">{m.route_person_transaction_create()}</span>
	</FilledButton>

	{#snippet extra()}
		<FilledButton class="mt-4 hidden md:block" onclick={() => (isModalOpen = true)}>
			<span class="hio hio-plus align-middle text-2xl"></span>
			<span class="align-middle">{m.route_person_transaction_create()}</span>
		</FilledButton>
	{/snippet}
</Navigation>
