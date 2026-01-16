<script>
	import { m } from '$lib/paraglide/messages';
	import Header from '$components/Header.svelte';
	import { schemaKeys } from '..';
	import { customValidation, reformat } from '$lib/form';
	import ErrorBox from '$components/ErrorBox.svelte';

	/** @type {import('./$types').PageProps} */
	let { data, form } = $props();
</script>

<svelte:head>
	<title>{m.route_person_title()} - {m.app_title()}</title>
</svelte:head>

<Header />

<main class="mx-auto max-w-2xl space-y-4 p-4">
	<h1 class="page-title">{m.route_person_title()}</h1>

	<form id="formDelete" method="post" action="?/delete"></form>

	<form method="post" action="?/update">
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
						value={data.person.name}
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
						value={data.person.note}
						onchange={reformat(schemaKeys.note)}
					></textarea>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-3">
			<button type="submit" class="btn-primary danger" form="formDelete"
				>{m.route_person_edit_button_delete()}</button
			>
			<button type="submit" class="btn-primary">{m.route_person_edit_button_update()}</button>
		</div>
	</form>

	<ErrorBox errors={form?.errors ?? []} />
</main>
