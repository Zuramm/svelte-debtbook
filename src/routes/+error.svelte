<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let title = $derived(() => {
		if (page.status === 404) {
			return 'Page not found';
		}
		if (page.status < 400) {
			return 'Bad request';
		}
		return 'Internal server error';
	});

	let description = $derived(() => {
		if (page.status === 404) {
			return 'Sorry, we couldn’t find the page you’re looking for.';
		}
		if (page.status < 400) {
			return 'The request was invalid.';
		}
		return 'An error occurred while processing the request.';
	});

	onMount(() => {
		document.body.parentElement?.classList.add('h-full');
		document.body.classList.add('h-full');

		return () => {
			document.body.parentElement?.classList.remove('h-full');
			document.body.classList.remove('h-full');
		};
	});
</script>

<main class="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-base font-semibold text-emerald-400">{page.status}</p>
		<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
			{title()}
		</h1>
		<p class="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
			{description()}
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
				>Go back home</a
			>
			<a href="#" class="text-sm font-semibold text-white"
				>Contact support <span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div>
</main>
