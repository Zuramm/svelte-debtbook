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
		'group rounded-full border-none px-4 py-2 shadow-md transition-shadow hover:shadow-lg focus:ring focus:outline-none',
		color === 'primary' && 'bg-emerald-500 text-white shadow-emerald-300/50 focus:ring-emerald-500',
		color === 'secondary' &&
			'bg-gray-500 text-white shadow-gray-300/50 hover:bg-gray-600 focus:ring-gray-300',
		color === 'danger' &&
			'bg-red-500 text-white shadow-red-300/50 hover:bg-red-600 focus:ring-red-300',
		className
	]}
	{...restProps}
>
	{@render children?.()}
</button>
