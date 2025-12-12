<script>
	import { getLocale } from '$lib/paraglide/runtime';

	/** @type {{ amount: number | null, isInFuture?: boolean }} */
	let { amount, isInFuture = false } = $props();
</script>

<span
	class={[
		'mr-0 text-right break-keep whitespace-nowrap',
		!isInFuture && amount && amount < 0 && 'text-red-600 dark:text-red-400',
		!isInFuture && amount && amount > 0 && 'text-green-600 dark:text-green-400'
	]}
>
	{(amount ? amount / 100 : 0).toLocaleString(getLocale(), {
		style: 'currency',
		currency: 'EUR'
	})}
</span>
<span
	class={[
		'hio hio-arrow-up ml-2',
		amount && amount < 0 && 'hio-arrow-up',
		amount && amount > 0 && 'hio-arrow-down',
		(!amount || amount === 0) && 'hio-arrow-equals',
		!isInFuture && amount && amount < 0 && 'text-red-600 dark:text-red-400',
		!isInFuture && amount && amount > 0 && 'text-green-600 dark:text-green-400',
		(isInFuture || !amount || amount === 0) && 'text-gray-400 dark:text-gray-500'
	]}
></span>
