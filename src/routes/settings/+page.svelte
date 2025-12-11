<script>
	import Navigation from '$components/Navigation.svelte';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import OutlinedButton from '$components/ui/OutlinedButton.svelte';
	import Select from '$components/ui/Select.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
</script>

<svelte:head>
	<title>{m.route_settings_title()} - {m.app_title()}</title>
</svelte:head>

<Navigation class="space-y-4 overflow-auto p-4 pb-24 md:mx-auto md:max-w-lg md:pb-12">
	<h1 class="py-2 text-4xl font-light text-green-500 dark:text-green-400">
		{m.route_settings_title()}
	</h1>

	<article class="ripped space-y-8 px-4 py-6">
		<h2 class="text-2xl font-light text-green-500 dark:text-green-400">
			{m.route_settings_account_title()}
		</h2>
		<div class="row flex items-end gap-4">
			<Select
				class="flex-1"
				label={m.route_settings_language_label()}
				name="language"
				value={getLocale()}
				onchange={(e) => {
					const locale = /** @type {HTMLSelectElement|null} */ (e.target)?.value ?? 'en';
					setLocale(/** @type {'en' | 'de'} */ (locale));
				}}
			>
				<option value="en">English</option>
				<option value="de">Deutsch</option>
			</Select>
			<FilledButton type="submit">{m.route_settings_language_save()}</FilledButton>
		</div>
		<form action="?/logout" method="post">
			<OutlinedButton class="w-full" color="danger">{m.route_settings_logout()}</OutlinedButton>
		</form>
	</article>
</Navigation>
