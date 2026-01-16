<script>
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	let { form } = $props();

	let showRegister = $derived(page.url.hash === '#register');
</script>

<svelte:head>
	<title>{m.route_signin_title()} - {m.app_title()}</title>
</svelte:head>

{#if form?.success}
	<div class="text-green-500 dark:text-green-400">
		<p>{JSON.stringify(form.success)}</p>
	</div>
{/if}

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" data-page-full>
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img src="/favicon.svg" alt={m.app_title()} class="mx-auto h-10 w-auto not-dark:hidden" />
		<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
			{showRegister ? m.form_signin_title_sign_up() : m.form_signin_title_sign_in()}
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form action={showRegister ? '?/register' : '?/login'} method="POST" class="space-y-6">
			<div>
				<label for="email" class="label">{m.form_signin_email_label()}</label>
				<div class="mt-2">
					<input id="email" type="email" name="email" required autocomplete="email" class="input" />
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="label">{m.form_signin_password_label()}</label>
					{#if !showRegister}
						<div class="text-sm">
							<a href="#forgot" class="link">Forgot password?</a>
						</div>
					{/if}
				</div>
				<div class="mt-2">
					<input
						id="password"
						type="password"
						name="password"
						required
						autocomplete="current-password"
						class="input"
					/>
				</div>
			</div>

			{#if showRegister}
				<div transition:slide>
					<div class="flex items-center justify-between">
						<label for="confirmPassword" class="label"
							>{m.form_signin_confirm_password_label()}</label
						>
					</div>
					<div class="mt-2">
						<input
							id="confirmPassword"
							type="password"
							name="confirm_password"
							required
							autocomplete="new-password"
							class="input"
						/>
					</div>
				</div>
			{/if}

			<div>
				<button type="submit" class="btn-primary flex w-full justify-center"
					>{showRegister ? m.form_signin_button_signup() : m.form_signin_button_signin()}</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
			{showRegister
				? m.form_signin_button_already_have_account()
				: m.form_signin_button_no_account()}
			{#if showRegister}
				<a href="#signin" class="link">Sigh In</a>
			{:else}
				<a href="#register" class="link">Register</a>
			{/if}
		</p>
	</div>
</div>
