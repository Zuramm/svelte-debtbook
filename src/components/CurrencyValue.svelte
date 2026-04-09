<script module>
	import { z } from 'zod/v4/mini';
	import { browser } from '$app/environment';

	/**
	 * @readonly
	 * @enum {number}
	 */
	export const SHOW_MINUS = {
		NEVER: 0,
		ON_DEBT: 1,
		ON_CREDIT: 2
	};

	/**
	 * @param {SHOW_MINUS} showMinus
	 * @param {number} value
	 * @returns {number}
	 */
	function applyShowMinus(showMinus, value) {
		switch (showMinus) {
			case SHOW_MINUS.NEVER:
				return Math.abs(value);
			case SHOW_MINUS.ON_DEBT:
				return value;
			case SHOW_MINUS.ON_CREDIT:
				return -value;
			default:
				return NaN;
		}
	}

	const defaultSettings = {
		redDebt: true,
		precision: 2,
		showMinus: SHOW_MINUS.ON_DEBT
	};

	const settingsType = z.catch(
		z.object({
			redDebt: z.catch(z.boolean(), defaultSettings.redDebt),
			precision: z.catch(z.number(), defaultSettings.precision),
			showMinus: z.catch(z.enum(SHOW_MINUS), defaultSettings.precision)
		}),
		defaultSettings
	);

	function getSettings() {
		if (!browser) return defaultSettings;

		const asString = localStorage.getItem('settings');

		if (!asString) return defaultSettings;

		try {
			const unverified = JSON.parse(asString);
			return settingsType.parse(unverified);
		} catch (e) {
			return defaultSettings;
		}
	}

	export const settings = $state(getSettings());

	/**
	 * @readonly
	 * @enum {number}
	 */
	const ARROW = {
		UP: 0,
		DOWN: 1,
		EQUAL: 2
	};

	/**
	 * @readonly
	 * @enum {number}
	 */
	const COLOR = {
		GREEN: 0,
		RED: 1,
		GREY: 2
	};

	/**
	 * @param {number} value
	 * @returns {ARROW}
	 */
	function arrowDirection(value) {
		if (value < 0) {
			return ARROW.UP;
		} else if (value > 0) {
			return ARROW.DOWN;
		} else {
			return ARROW.EQUAL;
		}
	}

	/**
	 * @param {number} value
	 * @param {boolean} isInFuture
	 * @returns {COLOR}
	 */
	function color(value, isInFuture) {
		if (!settings.redDebt) {
			value = -value;
		}
		if (isInFuture) {
			return COLOR.GREY;
		} else if (value < 0) {
			return COLOR.RED;
		} else if (value > 0) {
			return COLOR.GREEN;
		} else {
			return COLOR.GREY;
		}
	}
</script>

<script>
	import { getLocale } from '$lib/paraglide/runtime';

	/** @type {{ amount: number | null, isInFuture?: boolean }} */
	let { amount, isInFuture = false } = $props();
</script>

<span
	class={[
		'mr-0 text-right break-keep whitespace-nowrap',
		{
			[COLOR.RED]: 'text-red-600 dark:text-red-400',
			[COLOR.GREEN]: 'text-green-600 dark:text-green-400',
			[COLOR.GREY]: ''
		}[color(amount ?? 0, isInFuture)]
	]}
>
	{applyShowMinus(settings.showMinus, amount ? amount / 100 : 0).toLocaleString(getLocale(), {
		minimumFractionDigits: settings.precision,
		maximumFractionDigits: settings.precision
	})}
</span>
<span
	class={[
		'hio hio-arrow-up ml-2',
		{
			[ARROW.UP]: 'hio-arrow-up',
			[ARROW.DOWN]: 'hio-arrow-down',
			[ARROW.EQUAL]: 'hio-arrow-equals'
		}[arrowDirection(amount ?? 0)],
		{
			[COLOR.RED]: 'text-red-600 dark:text-red-400',
			[COLOR.GREEN]: 'text-green-600 dark:text-green-400',
			[COLOR.GREY]: 'text-gray-400 dark:text-gray-500'
		}[color(amount ?? 0, isInFuture)]
	]}
></span>
