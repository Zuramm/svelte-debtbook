<script>
	/**
	 * @typedef {'primary' | 'secondary' | 'danger'} ButtonColor
	 */

	/** 
     * @type {{
            color?: ButtonColor, 
            type?: 'button' | 'submit' | 'reset', 
            class?: string, 
            formaction?: string, 
            onclick?: ((event:MouseEvent) => void) | null, 
            children?: import('svelte').Snippet<[]> 
        }} 
     */
	let { color = 'primary', class: className = '', children, ...restProps } = $props();

	let baseClasses = $derived.by(() => {
		const base =
			'transition-colors focus:outline-none rounded-full border-2 px-4 py-2 text-base focus:ring';

		switch (color) {
			case 'secondary':
				return `${base} border-gray-500 text-gray-600 hover:bg-gray-500 hover:text-white focus:ring-gray-300 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600`;

			case 'danger':
				return `${base} border-red-500 text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-300 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-600 dark:focus:ring-red-600`;

			case 'primary':
			default:
				return `${base} border-red-500 text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-300`;
		}
	});
</script>

<button class="{baseClasses} {className}" {...restProps}>
	{@render children?.()}
</button>
