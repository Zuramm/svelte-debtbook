<script>
	import { m } from '$lib/paraglide/messages';

	/** @type { HTMLDialogElement | null } */
	let dialog = $state(null);
</script>

<header class="bg-gray-100 dark:bg-gray-900">
	<nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">{m.app_title()}</span>
				<img src="/favicon.svg" alt="" class="h-8 w-auto" />
			</a>
		</div>
		<div class="flex lg:hidden">
			<button
				type="button"
				onclick={() => dialog?.showModal()}
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
			>
				<span class="sr-only">Open main menu</span>
				<div class="hio hio-bars-3 text-2xl"></div>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-x-12">
			{#snippet navItem(/** @type {string} */ href, /** @type {string} */ label)}
				<a {href} class="text-sm/6 font-semibold text-gray-900 dark:text-white">{label}</a>
			{/snippet}
			{@render navItem('/person', m.nav_label_person())}
			{@render navItem('/transaction', m.nav_label_transaction())}
			{@render navItem('/settings', m.nav_label_settings())}
		</div>
	</nav>
	<dialog bind:this={dialog} class="backdrop:bg-transparent lg:hidden">
		<div
			class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">{m.app_title()}</span>
					<img src="/favicon.svg" alt="" class="h-8 w-auto" />
				</a>
				<button
					type="button"
					onclick={() => dialog?.close()}
					class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
				>
					<span class="sr-only">Close menu</span>
					<div class="hio hio-x-mark text-2xl"></div>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
					<div class="space-y-2 py-6">
						{#snippet navItem(/** @type {string} */ href, /** @type {string} */ label)}
							<a
								{href}
								class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
								>{label}</a
							>
						{/snippet}
						{@render navItem('/person', m.nav_label_person())}
						{@render navItem('/transaction', m.nav_label_transaction())}
						{@render navItem('/settings', m.nav_label_settings())}
					</div>
				</div>
			</div>
		</div>
	</dialog>
</header>
