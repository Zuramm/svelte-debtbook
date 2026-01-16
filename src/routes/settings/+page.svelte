<script>
	import Header from '$components/Header.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
</script>

<svelte:head>
	<title>{m.route_settings_title()} - {m.app_title()}</title>
</svelte:head>

<Header />

<main class="mx-auto max-w-2xl space-y-4 p-4">
	<h1 class="page-title">{m.route_settings_title()}</h1>

	<div
		class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12 sm:grid-cols-6 dark:border-white/10"
	>
		<div class="md:col-span-6">
			<select
				class="input"
				onchange={(e) => {
					const locale = /** @type {HTMLSelectElement|null} */ (e.target)?.value ?? 'en';
					setLocale(/** @type {'en' | 'de'} */ (locale));
				}}
				value={getLocale()}
			>
				<option value="en">English</option>
				<option value="de">Deutsch</option>
			</select>
		</div>

		<form class="md:col-span-6" action="?/logout" method="post">
			<button class="btn-primary danger w-full">{m.route_settings_logout()}</button>
		</form>
	</div>
</main>
