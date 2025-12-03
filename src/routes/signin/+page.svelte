<script>
	import { m } from '$lib/paraglide/messages';
	import { enhance } from '$app/forms';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import Input from '$components/ui/Input.svelte';
	import TextButton from '$components/ui/TextButton.svelte';

	let { form } = $props();

	let showSignIn = $state(true);

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	function onno_account() {
		showSignIn = false;
	}

	function onalready_have_account() {
		showSignIn = true;
	}
</script>

<svelte:head>
	<title>Sign in - Debtbook</title>
</svelte:head>

{#if form?.success}
	<div class="text-green-500 dark:text-green-400">
		<p>{JSON.stringify(form.success)}</p>
	</div>
{/if}

<form
	class="w-full max-w-lg space-y-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 dark:shadow-gray-700"
	action={showSignIn ? '?/login' : '?/register'}
	method="post"
	use:enhance
>
	{#if showSignIn}
		<h1 class="tex-black text-xl dark:text-white">{m.sign_in_dialog_title_sign_in()}</h1>
	{:else}
		<h1 class="tex-black text-xl dark:text-white">{m.sign_in_dialog_title_sign_up()}</h1>
	{/if}
	<div>
		<label for="email" class="dark:text-gray-200">{m.sign_in_dialog_email()}</label>
		<Input id="email" name="email" type="email" bind:value={email} required />
	</div>
	<div>
		<label for="password" class="dark:text-gray-200">{m.sign_in_dialog_password()}</label>
		<Input id="password" name="password" type="password" bind:value={password} required />
	</div>
	{#if !showSignIn}
		<div>
			<label for="confirmPassword" class="dark:text-gray-200"
				>{m.sign_in_dialog_confirm_password()}</label
			>
			<Input
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				bind:value={confirmPassword}
				required
			/>
		</div>
	{/if}
	{#if form?.error}
		<div class="text-red-500 dark:text-red-400">
			<p>{form.error}</p>
		</div>
	{/if}
	<div class="flex justify-end pt-1">
		{#if showSignIn}
			<FilledButton color="primary">
				{m.sign_in_dialog_signin()}
			</FilledButton>
		{:else}
			<FilledButton color="primary">
				{m.sign_in_dialog_signup()}
			</FilledButton>
		{/if}
	</div>
	{#if showSignIn}
		<p class="text-center text-sm text-gray-500 dark:text-gray-400">
			<TextButton type="button" color="secondary" onclick={onno_account}>
				{m.sign_in_dialog_no_account()}
			</TextButton>
		</p>
	{:else}
		<p class="text-center text-sm text-gray-500 dark:text-gray-400">
			<TextButton type="button" color="secondary" onclick={onalready_have_account}>
				{m.sign_in_dialog_already_have_account()}
			</TextButton>
		</p>
	{/if}
</form>
