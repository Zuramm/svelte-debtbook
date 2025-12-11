<script>
	/** @type {{ name: string, value?: any, class?: string, label?: string, onchange?: (event: Event) => void, children: any }} */
	let {
		name,
		value = $bindable(),
		class: className = '',
		label = '',
		onchange,
		children
	} = $props();
</script>

<label class={className}>
	<span class="block text-sm/6 font-medium">{label}</span>
	<select
		class="mt-2 w-full rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-500 dark:has-[input:focus-within]:outline-green-500"
		{name}
		bind:value
		{onchange}
	>
		{@render children()}
	</select>
</label>
