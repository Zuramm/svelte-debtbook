import { z } from 'zod/v4/mini';

/**
 * @readonly
 * @enum {number}
 */
export const DEBT_COLOR = {
	RED: 0,
	GREEN: 1
};

/**
 * @readonly
 * @enum {number}
 */
export const SHOW_MINUS = {
	NEVER: 0,
	ON_DEBT: 1,
	ON_CREDIT: 2
};

export const defaultSettings = {
	debtColor: DEBT_COLOR.RED,
	precision: 2,
	showMinus: SHOW_MINUS.ON_DEBT
};

export const settingsType = z.catch(
	z.object({
		debtColor: z.catch(z.enum(DEBT_COLOR), defaultSettings.debtColor),
		precision: z.catch(z.number(), defaultSettings.precision),
		showMinus: z.catch(z.enum(SHOW_MINUS), defaultSettings.precision)
	}),
	defaultSettings
);

/**
 * @typedef {z.infer<typeof settingsType>} PageSettings
 */
