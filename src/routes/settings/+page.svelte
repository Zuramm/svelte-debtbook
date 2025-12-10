<script>
	import Navigation from '$components/Navigation.svelte';
	import OutlinedButton from '$components/ui/OutlinedButton.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{m.route_settings_title()} - {m.app_title()}</title>
</svelte:head>

<Navigation class="space-y-4 overflow-auto p-4 pb-24 md:mx-auto md:max-w-lg md:pb-12">
	<form action="?/logout" method="post">
		<OutlinedButton color="danger">{m.route_settings_logout()}</OutlinedButton>
	</form>
</Navigation>
