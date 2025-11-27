/** @import { Writable } from 'svelte/store' */
/** @import { Component } from 'svelte' */
import { writable } from 'svelte/store';

/** @type {Writable<undefined | [Component, Record<string, any>]>} */
export const modal = writable(undefined);