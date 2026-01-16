<script>
	import { customValidation, reformat } from '$lib/form';
	import { m } from '$lib/paraglide/messages';
	import ErrorBox from '$components/ErrorBox.svelte';
	import Header from '$components/Header.svelte';

	import { schemaKeys } from '..';

	/** @type {import('./$types').PageProps} */
	let { data, form } = $props();
</script>

<svelte:head>
	<title>{m.route_person_add_title()} - {m.app_title()}</title>
</svelte:head>

<Header />

<main class="mx-auto max-w-2xl space-y-4 p-4">
	<h1 class="page-title">{m.route_person_add_title()}</h1>

	<form method="post">
		<div
			class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12 sm:grid-cols-6 dark:border-white/10"
		>
			<div class="sm:col-span-3">
				<label for="name" class="label">{m.form_person_name_label()}</label>
				<div class="mt-2">
					<input
						id="name"
						type="text"
						name="name"
						required
						minlength="3"
						maxlength="255"
						autocomplete="given-name"
						class="input"
						oninput={customValidation(
							schemaKeys.name,
							(value) =>
								data.people.some((person) => person.name === value) && 'Name already exists'
						)}
						onchange={reformat(schemaKeys.name)}
					/>
				</div>
			</div>

			<div class="col-span-full">
				<label for="about" class="label">{m.form_person_note_label()}</label>
				<div class="mt-2">
					<textarea
						id="note"
						name="note"
						rows="3"
						maxlength="1000"
						class="input"
						onchange={reformat(schemaKeys.note)}
					></textarea>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-3">
			<button type="submit" class="btn-primary">{m.route_person_add_button()}</button>
		</div>
	</form>

	<ErrorBox errors={form?.errors ?? []} />
</main>
