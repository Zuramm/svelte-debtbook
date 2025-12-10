<script>
	/** @type {{ name: string, value?: any, class?: string, label?: string, children: any }} */
	let { name, value = $bindable(), class: className = '', label = '', children } = $props();
</script>

<label class={className}>
	<span class="block text-sm/6 font-medium">{label}</span>
	<select
		class="mt-2 flex w-full items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-500"
		name="person_id"
		bind:value
	>
		{@render children()}
	</select>
</label>
