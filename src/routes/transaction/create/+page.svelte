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
	<title>{m.route_transaction_create_title()} - {m.app_title()}</title>
</svelte:head>

<Header />

<main class="mx-auto max-w-2xl space-y-4 p-4">
	<h1 class="page-title">{m.route_transaction_create_title()}</h1>

	<form method="post">
		<div
			class="mt-10 grid grid-cols-1 grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12 sm:grid-cols-4 dark:border-white/10"
		>
			<div class="col-span-2">
				<label for="personId" class="label">{m.form_transaction_person_label()}</label>
				<div class="relative mt-2">
					<select id="personId" name="person_id" class="input">
						<option value="" selected>{m.form_transaction_person_empty()}</option>
						{#each data.people as person}
							<option value={person.id}>{person.name}</option>
						{/each}
					</select>
					<div
						class="hio hio-chevron-down absolute inset-y-2 right-2 text-gray-500 dark:text-gray-400"
					></div>
				</div>
			</div>

			<label class="flex items-center gap-x-3 self-end py-1.5">
				<input type="radio" name="direction" class="radio" />
				<span class="block text-sm/6 font-medium text-gray-900 dark:text-white"
					>{m.form_transaction_gave()}</span
				>
			</label>

			<label class="flex items-center gap-x-3 self-end py-1.5">
				<input type="radio" name="direction" class="radio" checked />
				<span class="block text-sm/6 font-medium text-gray-900 dark:text-white"
					>{m.form_transaction_got()}</span
				>
			</label>

			<div class="col-span-2">
				<label for="amount" class="label">{m.form_transaction_amount_label()}</label>
				<div class="relative mt-2">
					<input
						id="amount"
						type="number"
						name="amount"
						min="-1000000"
						max="1000000"
						class="input"
						value="0"
						step="0.01"
					/>
				</div>
			</div>

			<div class="col-span-2">
				<label for="occured_at" class="label">{m.form_transaction_date_label()}</label>
				<div class="relative mt-2">
					<input id="occured_at" type="date" name="occured_at" class="input" />
				</div>
			</div>

			<div class="col-span-full">
				<label for="description" class="label">{m.form_transaction_description_label()}</label>
				<div class="mt-2">
					<textarea
						id="description"
						name="description"
						rows="3"
						maxlength="1000"
						class="input"
						onchange={reformat(schemaKeys.description)}
					></textarea>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-3">
			<button type="submit" class="btn-primary">{m.route_transaction_button_create()}</button>
		</div>
	</form>

	<ErrorBox errors={form?.errors ?? []} />
</main>
