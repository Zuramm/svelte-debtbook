<script>
	import { fly } from 'svelte/transition';

	import TransactionCreateButton from '$components/TransactionCreateButton.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<div class="space-y-4">
	<!-- {#if errors.length > 0}
		<div class="space-y-2">
			{#each errors as error}
				<p class="rounded-md border border-red-400 bg-red-100 p-2 text-red-600">{error}</p>
			{/each}
		</div>
	{/if} -->

	<div class="mx-auto flex border-b-2 border-black px-4">
		<p class="flex-1">{m.index_total()}</p>
		<p>
			{(data.totalDebt / 100).toLocaleString(getLocale(), {
				style: 'currency',
				currency: 'EUR'
			})}
		</p>
	</div>

	{#each data.people as person}
		<a
			href="/transaction/{person.id}"
			class="focus:ring-opacity-20 flex cursor-pointer items-center space-x-4 rounded-xl bg-white p-6 transition hover:bg-gray-100 hover:not-italic focus:ring focus:ring-black focus:outline-none"
			in:fly={{ y: 200, duration: 200 }}
			out:fly={{ y: 200, duration: 200 }}
		>
			<p class="flex-1">
				{person.name}
			</p>
			<p>
				{(person.debt / 100).toLocaleString(getLocale(), { style: 'currency', currency: 'EUR' })}
			</p>
		</a>
	{/each}
</div>

<TransactionCreateButton />
