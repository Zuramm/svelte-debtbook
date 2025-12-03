<script>
	import OutlinedButton from '$components/ui/OutlinedButton.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{m.settings_title()}</title>
</svelte:head>

<form action="?/logout" method="post">
	<OutlinedButton color="danger">{m.settings_logout()}</OutlinedButton>
</form>
