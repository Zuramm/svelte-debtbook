<script>
	/** @type {{ label: string, type?: string, name?: string, class?: string, value?: any, placeholder?: string }} */
	let { label, name, value = $bindable(), placeholder = '', class: className = '' } = $props();
</script>

<label class={className}>
	<span class="block text-sm/6 font-medium">{label}</span>
	<input
		class="mt-2 flex w-full items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-500"
		type="number"
		{name}
		{placeholder}
		bind:value
		min="0"
		max="1000000"
		step="0.01"
	/>
</label>
