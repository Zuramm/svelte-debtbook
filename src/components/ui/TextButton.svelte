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
	let { color = 'primary', class: className = '', onclick, children, ...restProps } = $props();

	const baseClasses =
		'transition-colors focus:outline-none rounded-full border-none px-4 py-2 hover:text-green-600 focus:ring focus:ring-green-300 dark:hover:text-green-400 dark:focus:ring-green-600';
</script>

<button class="{baseClasses} {className}" {onclick} {...restProps}>
	{@render children?.()}
</button>
