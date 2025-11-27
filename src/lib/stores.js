/** @import { Writable, Readable } from 'svelte/store' */
/** @import { Component } from 'svelte' */
import { writable, readable } from 'svelte/store';

/** @type {Writable<undefined | [Component, Record<string, any>]>} */
export const modal = writable(undefined);

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
        interval = setInterval(() => {
            set(getToday());
        }, 24 * 60 * 60 * 1000);
	}, tomorrow.getTime() - Date.now());

	return () => {
        if (timeout) clearTimeout(timeout);
        if (interval) clearInterval(interval);
    };
});