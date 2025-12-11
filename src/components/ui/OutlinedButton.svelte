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
</script>

<button
	class={[
		'rounded-full border-2 px-4 py-2 text-base transition-colors focus:ring focus:outline-none',
		color === 'secondary' &&
			'border-gray-500 text-gray-600 hover:bg-gray-500 hover:text-white focus:ring-gray-300 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600',
		color === 'danger' &&
			'border-red-500 text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-300 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-600 dark:focus:ring-red-600',
		color === 'primary' &&
			'border-green-500 text-green-600 hover:bg-green-500 hover:text-white focus:ring-green-300',
		className
	]}
	{...restProps}
>
	{@render children?.()}
</button>
