<script>
	import CurrencyInput from '$components/ui/CurrencyInput.svelte';
	import DateInput from '$components/ui/DateInput.svelte';
	import FilledButton from '$components/ui/FilledButton.svelte';
	import OutlinedButton from '$components/ui/OutlinedButton.svelte';
	import Select from '$components/ui/Select.svelte';
	import TextButton from '$components/ui/TextButton.svelte';
	import TextInput from '$components/ui/TextInput.svelte';
	import { m } from '$lib/paraglide/messages';

	/** @type {{ id: number, personId?: number | null, people: { id: number, name: string }[], direction?: string, amount?: number | null, ocurred_at: Date, description?: string | null, onclose?: () => void }} */
	let {
		id,
		personId = $bindable(),
		people = [],
		direction = $bindable('received'),
		amount = $bindable(0),
		ocurred_at = $bindable(new Date()),
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
