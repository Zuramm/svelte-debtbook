/** @import { Component } from 'svelte' */
/** @import { Readable } from 'svelte/store' */
import { readable, writable } from 'svelte/store';

/** @type {Readable<Date>} */
export const today = readable(new Date(), (set) => {
	const getToday = () => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), now.getDate());
	};

	const getTomorrow = () => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
	};

	const tomorrow = getTomorrow();

	set(getToday());

	/** @type {NodeJS.Timeout | null} */
	let interval = null;
	/** @type {NodeJS.Timeout | null} */
	let timeout = setInterval(() => {
		set(getToday());
		timeout = null;
		interval = setInterval(
			() => {
				set(getToday());
			},
			24 * 60 * 60 * 1000
		);
	}, tomorrow.getTime() - Date.now());

	return () => {
		if (timeout) clearTimeout(timeout);
		if (interval) clearInterval(interval);
	};
});

/**
 * @readonly
 * @enum {number}
 */
const ShowMinus = {
	NEVER: 0,
	ON_DEBT: 1,
	ON_CREDIT: 2
};

export const settings = writable(
	{
		debtRed: true,
		precision: 2,
		showMinus: ShowMinus.ON_DEBT,
		...JSON.parse(localStorage.getItem('settings') ?? '{}')
	},
	() => {
		localStorage.setItem('settings', JSON.stringify(settings));
	}
);
