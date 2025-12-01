<script>
	import { getContext } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import { m } from '$lib/paraglide/messages';
	import { modal } from '$lib/stores';

	let showSignIn = $state(true);

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	/** @type {import("$lib/api").Repository} */
	const debtbook = getContext('debtbook');

	function onsignin() {
		$modal = undefined;
	}

	function onsignup() {
		$modal = undefined;
	}

	function onno_account() {
		showSignIn = false;
	}

	function onalready_have_account() {
		showSignIn = true;
	}
</script>

<div class="w-full max-w-lg space-y-4 rounded-xl bg-white p-4 shadow-sm">
	{#if showSignIn}
		<h1 class="tex-black text-xl">{m.sign_in_dialog_title_sign_in()}</h1>
	{:else}
		<h1 class="tex-black text-xl">{m.sign_in_dialog_title_sign_up()}</h1>
	{/if}
	<div>
		<label for="email">{m.sign_in_dialog_email()}</label>
		<input
			class="mt-1 w-full rounded-md border-none bg-gray-50 p-2 shadow-md transition focus:ring focus:ring-green-300 focus:outline-none"
			id="email"
			type="email"
			bind:value={email}
		/>
	</div>
	<div>
		<label for="password">{m.sign_in_dialog_password()}</label>
		<input
			class="mt-1 w-full rounded-md border-none bg-gray-50 p-2 shadow-md transition focus:ring focus:ring-green-300 focus:outline-none"
			id="password"
			type="password"
			bind:value={password}
		/>
	</div>
	{#if !showSignIn}
		<div>
			<label for="confirmPassword">{m.sign_in_dialog_confirm_password()}</label>
			<input
				class="mt-1 w-full rounded-md border-none bg-gray-50 p-2 shadow-md transition focus:ring focus:ring-green-300 focus:outline-none"
				id="confirmPassword"
				type="password"
				bind:value={confirmPassword}
			/>
		</div>
	{/if}
	<div class="flex justify-end pt-1">
		{#if showSignIn}
			<button
				class="rounded-full border-none bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none"
				onclick={onsignin}
			>
				{m.sign_in_dialog_signin()}
			</button>
		{:else}
			<button
				class="rounded-full border-none bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none"
				onclick={onsignup}
			>
				{m.sign_in_dialog_signup()}
			</button>
		{/if}
	</div>
	{#if showSignIn}
		<p class="text-center text-sm text-gray-500">
			<button
				class="rounded-full border-none px-4 py-2 transition hover:text-green-600 focus:ring focus:ring-green-300 focus:outline-none"
				onclick={onno_account}
			>
				{m.sign_in_dialog_no_account()}
			</button>
		</p>
	{:else}
		<p class="text-center text-sm text-gray-500">
			<button
				class="rounded-full border-none px-4 py-2 transition hover:text-green-600 focus:ring focus:ring-green-300 focus:outline-none"
				onclick={onalready_have_account}
			>
				{m.sign_in_dialog_already_have_account()}
			</button>
		</p>
	{/if}
</div>
