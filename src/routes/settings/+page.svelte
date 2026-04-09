<script>
	import Header from '$components/Header.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import CurrencyValue, { settings, SHOW_MINUS } from '$components/CurrencyValue.svelte';

	$effect(() => {
		localStorage.setItem('settings', JSON.stringify(settings));
	});
</script>

<svelte:head>
	<title>{m.route_settings_title()} - {m.app_title()}</title>
</svelte:head>

<Header />

<main class="mx-auto max-w-2xl space-y-4 p-4">
	<h1 class="page-title">{m.route_settings_title()}</h1>

	<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">Appearance</h2>

	<div
		class="mt-10 grid grid-cols-1 grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12 sm:grid-cols-4 dark:border-white/10"
	>
		<div class="col-span-2">
			<label for="language" class="label">Language</label>
			<div class="relative mt-2">
				<select
					id="language"
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
				<div
					class="hio hio-chevron-down absolute inset-y-2 right-2 text-gray-500 dark:text-gray-400"
				></div>
			</div>
		</div>

		<div class="col-span-2">
			<label for="precision" class="label">Decimal Places</label>
			<div class="relative mt-2 flex h-9 flex-row items-center gap-2 text-black dark:text-white">
				0
				<input
					id="precision"
					type="range"
					min="0"
					max="2"
					step="1"
					bind:value={settings.precision}
					class="slider grow-1"
				/>
				3
			</div>
		</div>

		<div class="col-span-2">
			<label for="minusSign" class="label">Minus Sign</label>
			<div class="relative mt-2">
				<select id="minusSign" name="minus_sign" bind:value={settings.showMinus} class="input">
					<option value={SHOW_MINUS.ON_CREDIT} selected>On Debt</option>
					<option value={SHOW_MINUS.ON_DEBT} selected>On Credit</option>
					<option value={SHOW_MINUS.NEVER} selected>Never</option>
				</select>
				<div
					class="hio hio-chevron-down absolute inset-y-2 right-2 text-gray-500 dark:text-gray-400"
				></div>
			</div>
		</div>

		<div class="col-span-2">
			<label for="redFor" class="label">Red Color</label>
			<div class="relative mt-2">
				<select id="redFor" name="red_for" bind:value={settings.redDebt} class="input">
					<option value={true} selected>For Debt</option>
					<option value={false} selected>For Credit</option>
				</select>
				<div
					class="hio hio-chevron-down absolute inset-y-2 right-2 text-gray-500 dark:text-gray-400"
				></div>
			</div>
		</div>

		<div class="col-span-4">
			<CurrencyValue amount={12345} />
			<CurrencyValue amount={-9990} />
			{JSON.stringify(settings)}
		</div>

		<div
			class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12 sm:grid-cols-6 dark:border-white/10"
		>
			<form class="sm:col-span-6" action="?/logout" method="post">
				<button class="btn-primary danger w-full">{m.route_settings_logout()}</button>
			</form>
		</div>
	</div>
</main>
