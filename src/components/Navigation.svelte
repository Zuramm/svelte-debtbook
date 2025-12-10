<script>
	import { page } from '$app/state';

	import { m } from '$lib/paraglide/messages';

	/** @type {{ children?: any, extra?: any, class?: string }} */
	let { children, extra, class: className = '' } = $props();
</script>

<!-- <div
	class="bg-arrows relative h-screen overflow-auto bg-green-100 pb-24 text-black md:pb-12 dark:bg-gray-900 dark:text-white"
>
	<Header isAuthenticated={data.session != null} {active} />
	<div class="mx-auto max-w-lg space-y-4 p-4"> -->

<div
	class="bg-arrows flex h-screen flex-col bg-emerald-100 font-mono text-black md:flex-row-reverse dark:bg-gray-900 dark:text-white"
>
	<main class="relative flex-1 shrink-0 {className}">
		{@render children?.()}
	</main>
	<nav
		class="flex flex-row space-x-2 bg-emerald-50 p-2 shadow-xl shadow-emerald-50 md:flex-col md:space-y-2 dark:bg-gray-800 dark:shadow-gray-950"
	>
		{#snippet navItem(
			/** @type {string} */ href,
			/** @type {string} */ label,
			/** @type {string} */ icon
		)}
			{@const isActive = page.url.pathname.startsWith(href)}
			<a
				{href}
				class={[
					'flex flex-1 flex-col items-center justify-center space-y-1 rounded-md p-2 text-center font-medium transition-colors md:flex-0 md:flex-row md:justify-start md:space-x-2',
					isActive
						? 'bg-emerald-100 text-green-500 dark:bg-gray-900 dark:text-green-400'
						: 'text-gray-900 hover:bg-emerald-50 dark:text-gray-200 dark:hover:bg-gray-700'
				]}
			>
				<span class={[`hio hio-${icon} text-2xl`, !isActive && 'text-gray-500 dark:text-gray-400']}
				></span>
				<span class="text-sm">{label}</span>
			</a>
		{/snippet}
		<h1 class="mt-2 mb-4 hidden text-2xl font-bold text-green-900 md:block dark:text-green-300">
			{m.app_title()}
		</h1>
		{@render navItem('/person', m.nav_label_person(), 'user')}
		{@render navItem('/transaction', m.nav_label_transaction(), 'arrows-up-down')}
		{@render navItem('/settings', m.nav_label_settings(), 'adjustments-horizontal')}
		{@render extra?.()}
	</nav>
</div>
