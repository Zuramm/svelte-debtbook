<script>
	import { m } from '$lib/paraglide/messages';
	import { locales, setLocale } from '$lib/paraglide/runtime';

	/** @type {{ isAuthenticated: boolean, active?: 'people' | 'settings' | undefined }} */
	let { isAuthenticated = false, active = undefined } = $props();
</script>

<div class="sticky top-0 bg-green-50 dark:bg-gray-800">
	<div class="mx-auto max-w-lg space-y-4 p-4">
		<div class="flex flex-row justify-between">
			<div class="flex flex-1 space-x-2">
				<h1 class="flex-none grow text-4xl font-bold text-green-900 dark:text-green-300">
					{m.app_title()}
				</h1>
				{#if isAuthenticated}
					<a
						href="/person"
						class="rounded-md p-2 text-green-900 underline transition-colors hover:bg-green-200 dark:text-green-300 dark:hover:bg-gray-700 {active ===
						'people'
							? 'bg-green-200 decoration-wavy dark:bg-gray-700'
							: ''}">People</a
					>
					<a
						href="/settings"
						class="rounded-md p-2 text-green-900 underline transition-colors hover:bg-green-200 dark:text-green-300 dark:hover:bg-gray-700 {active ===
						'settings'
							? 'bg-green-200 decoration-wavy dark:bg-gray-700'
							: ''}">Settings</a
					>
				{/if}
				{#each locales as locale}
					<button
						onclick={() => setLocale(locale)}
						class="rounded-md bg-green-200 px-2 py-1 text-green-900 transition-colors hover:bg-green-300 dark:bg-gray-700 dark:text-green-300 dark:hover:bg-gray-600"
						>{locale}</button
					>
				{/each}
				<!-- {#if queryClient.isFetching()}
                <Spinner class="mx-4 w-5 text-green-600" />
            {/if} -->
			</div>
		</div>
	</div>
</div>
