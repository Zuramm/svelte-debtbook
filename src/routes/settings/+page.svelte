<script>
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{m.settings_title()}</title>
</svelte:head>

<form action="?/logout" method="post">
	<button
		class="rounded-full border-none bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 focus:ring focus:ring-red-300 focus:outline-none"
		>{m.settings_logout()}</button
	>
</form>
