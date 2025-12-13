<script>
	import CurrencyInput from '$components/ui/CurrencyInput.svelte';
	import DateInput from '$components/ui/DateInput.svelte';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import Select from '$components/ui/Select.svelte';
	import TextButton from '$components/ui/TextButton.svelte';
	import TextInput from '$components/ui/TextInput.svelte';
	import { m } from '$lib/paraglide/messages';

	/** @type {{ personId?: number | null, people: { id: number, name: string }[], direction?: "gave" | "received", amount?: number, ocurred_at?: Date, description?: string, onclose?: () => void }} */
	let {
		personId = $bindable(),
		people = [],
		direction = $bindable('received'),
		amount = $bindable(),
		ocurred_at = $bindable(new Date()),
		description = $bindable(),
		onclose
	} = $props();
</script>

<form class="grid gap-4 sm:grid-cols-2" action="/transaction?/create" method="post">
	<Select label={m.form_transaction_person_label()} name="person_id" bind:value={personId}>
		<option value="">{m.form_transaction_person_empty()}</option>
		{#each people as person}
			<option value={person.id}>{person.name}</option>
		{/each}
	</Select>
	<div class="flex h-12 flex-row items-center gap-4 self-end">
		<label class="grow-1">
			<input type="radio" name="direction" value="gave" bind:group={direction} />
			{m.form_transaction_direction_gave()}
		</label>
		<label class="grow-1">
			<input type="radio" name="direction" value="received" bind:group={direction} />
			{m.form_transaction_direction_received()}
		</label>
	</div>
	<CurrencyInput
		label={m.form_transaction_amount_label()}
		type="number"
		name="amount"
		bind:value={amount}
	/>
	<DateInput
		label={m.form_transaction_date_label()}
		name="occured_at"
		bind:value={ocurred_at}
		required
	/>
	<TextInput
		class="sm:col-span-2"
		label={m.form_transaction_description_label()}
		name="description"
		bind:value={description}
	/>
	<div class="flex justify-end sm:col-span-2">
		{#if onclose}
			<TextButton type="button" onclick={onclose}
				>{m.form_transaction_create_button_cancel()}</TextButton
			>
		{/if}
		<FilledButton type="submit">{m.form_transaction_create_button_create()}</FilledButton>
	</div>
</form>
