<script>
	import { m } from '$lib/paraglide/messages';
	import Header from '$components/Header.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<svelte:head>
	<title>{m.route_person_title()} - {m.app_title()}</title>
</svelte:head>

<Header />

<main class="mx-auto max-w-2xl space-y-4 p-4">
	<div class="flex flex-row items-center justify-between">
		<h1 class="page-title">{m.route_person_title()}</h1>
		<a href="/person/add" class="btn-primary">{m.route_person_button_add()}</a>
	</div>

	<ul role="list" class="divide-y divide-gray-100 dark:divide-white/5">
		{#each data.people as person}
			<li class="relative flex justify-between gap-x-6 py-5">
				<div class="min-w-0 flex-auto">
					<p class="text-sm/6 font-semibold text-gray-900 dark:text-white">
						<a href={`/person/${person.id}`} class="hover:underline">
							<span class="absolute inset-0 z-10"></span>
							{person.name}
						</a>
					</p>
					{#if person.note}
						<p class="mt-1 truncate text-xs/5 text-gray-500 dark:text-gray-400">{person.note}</p>
					{/if}
				</div>
				<div class="hio hio-chevron-right text-2xl text-gray-400 dark:text-gray-500"></div>
			</li>
		{/each}
	</ul>
</main>
