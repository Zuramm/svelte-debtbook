<script>
	/**
	 * @typedef {'standard' | 'transaction'} InputVariant
	 */

	/** @type {{ type?: string, id?: string, name?: string, class?: string, [key: string]: any }} */
	let { value = $bindable(), class: className = '', ...restProps } = $props();

	const baseClasses =
		'w-full rounded-md border-none p-2 shadow-md transition focus:ring focus:outline-none bg-gray-50 focus:ring-green-300 dark:bg-gray-700 dark:text-white dark:focus:ring-green-600';
</script>

<input bind:value class="{baseClasses} {className}" {...restProps} />
