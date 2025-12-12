<script>
	/** @type {{ label: string, name?: string, value?: Date | null, placeholder?: string, required?: boolean, class?: string }} */
	let {
		label,
		name,
		value = $bindable(),
		placeholder = '',
		required = false,
		class: className = ''
	} = $props();
</script>

<label class={className}>
	<span class="block text-sm/6 font-medium">{label}</span>
	<input
		class="mt-2 flex w-full items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-500"
		type="date"
		{name}
		{placeholder}
		value={value?.toISOString().substring(0, 'YYYY-MM-DD'.length)}
		onchange={(e) => (value = new Date(/** @type {HTMLInputElement} */ (e.target).value))}
		{required}
	/>
</label>
