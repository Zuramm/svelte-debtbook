<script>
	import CurrencyInput from '$components/ui/CurrencyInput.svelte';
	import DateInput from '$components/ui/DateInput.svelte';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import OutlinedButton from '$components/ui/OutlinedButton.svelte';
	import Select from '$components/ui/Select.svelte';
	import TextButton from '$components/ui/TextButton.svelte';
	import TextInput from '$components/ui/TextInput.svelte';
	import { m } from '$lib/paraglide/messages';

	/** @type {{ id: number, personId?: number, people: { id: number, name: string }[], amount?: number, date?: Date, description?: string, onclose?: () => void }} */
	let {
		id,
		personId = $bindable(),
		people = [],
		amount = $bindable(),
		date = $bindable(),
		description = $bindable(),
		onclose
	} = $props();
</script>

<form class="grid gap-4 sm:grid-cols-2" method="post">
	<input type="hidden" name="id" value={id} />
	<Select label={m.form_transaction_person_label()} name="person_id" bind:value={personId}>
		<option value="">{m.form_transaction_person_empty()}</option>
		{#each people as person}
			<option value={person.id}>{person.name}</option>
		{/each}
	</Select>
	<div class="hidden sm:block"></div>
	<TextInput
		class="sm:col-span-2"
		label={m.form_transaction_description_label()}
		name="description"
		bind:value={description}
	/>
	<CurrencyInput
		label={m.form_transaction_amount_label()}
		type="number"
		name="amount"
		bind:value={amount}
	/>
	<DateInput label={m.form_transaction_date_label()} type="date" name="date" bind:value={date} />
	<div class="flex flex-row justify-between sm:col-span-2">
		<OutlinedButton color="danger" type="submit" formaction="/transaction?/delete"
			>{m.form_transaction_update_button_delete()}</OutlinedButton
		>

		<div class="flex flex-row justify-end">
			{#if onclose}
				<TextButton type="button" onclick={onclose}
					>{m.form_transaction_update_button_cancel()}</TextButton
				>
			{/if}
			<FilledButton type="submit" formaction="/transaction?/update"
				>{m.form_transaction_update_button_update()}</FilledButton
			>
		</div>
	</div>
</form>
