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
			'transition-colors focus:outline-none rounded-full border-none px-4 py-2 focus:ring';

		switch (color) {
			case 'secondary':
				return `${base} bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300`;

			case 'danger':
				return `${base} bg-red-500 text-white hover:bg-red-600 focus:ring-red-300`;

			case 'primary':
			default:
				return `${base} bg-green-500 text-white hover:bg-green-600 focus:ring-green-300`;
		}
	});
</script>

<button class="{baseClasses} {className}" {...restProps}>
	{@render children?.()}
</button>
