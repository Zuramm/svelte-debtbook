<script>
	import { slide } from 'svelte/transition';

	/** @type {{ errors: string[] }} */
	const { errors } = $props();

	/** @type {HTMLElement | null} */
	let errorElement = $state(null);

	$effect(() => {
		if (errorElement) {
			errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	});
</script>

{#if errors.length > 0}
	<article
		class="mt-6 flex flex-row items-start gap-4 rounded-md bg-red-50 p-4 text-sm dark:bg-red-500/15 dark:outline-1 dark:outline-red-500/25"
		bind:this={errorElement}
		transition:slide
	>
		<div class="hio hio-x-circle text-xl text-red-500 dark:text-red-400"></div>
		<div class="space-y-2">
			<h1 class="font-medium text-red-800 dark:text-red-200">
				There were {errors.length} errors with your submission
			</h1>
			<ul class="list-inside list-disc space-y-1">
				{#each errors as error}
					<li class="text-sm text-red-700 dark:text-red-200/80">{error}</li>
				{/each}
			</ul>
		</div>
	</article>
{/if}
