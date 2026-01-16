/**
 * @param {number} value
 * @returns {number}
 */
export function amountToRemote(value) {
	return Math.round(value * 1000);
}

/**
 * @param {number} value
 * @returns {number}
 */
export function amountFromRemote(value) {
	return value / 1000;
}

/**
 * @readonly
 * @enum {number} Direction
 */
export const Direction = {
	gave: 0,
	received: 1
};

/**
 * @param {number} value
 * @returns {Direction}
 */
export function directionFromAmount(value) {
	if (value > 0) {
		return Direction.gave;
	} else {
		return Direction.received;
	}
}

/**
 * @param {Direction} direction
 * @param {number} value
 * @returns {number}
 */
export function directionToAmount(direction, value) {
	switch (direction) {
		case Direction.gave:
			return Math.abs(value);
		case Direction.received:
			return -Math.abs(value);
		default:
			throw new Error(`Invalid direction ${direction}`);
	}
}

/** @typedef {{
	 		id: number, 
			person_id: number | null,
			amount: number | null, 
			description: string | null, 
			occured_at: string,
		}} Transaction */

/** @typedef {{ month: Intl.DateTimeFormat }} Formatters */

/**
 * @param {string} locale
 * @returns {Formatters}
 */
export function getDateFomatters(locale) {
	return {
		month: new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' })
	};
}

/**
 * @param {Transaction[]} sortedTransactions
 * @param {Formatters} formatters
 * @returns {{ month: string, transactions: Transaction[] }[]}
 */
export function group(sortedTransactions, formatters) {
	/** @type {{ month: string, transactions: Transaction[] }[]} */
	const grouped = [];

	for (const transaction of sortedTransactions) {
		const occured_at = new Date(transaction.occured_at);
		const month = formatters.month.format(occured_at);

		const lastMonth = grouped[grouped.length - 1];

		if (!lastMonth || lastMonth.month != month) {
			grouped.push({ month, transactions: [transaction] });
		} else {
			lastMonth.transactions.push(transaction);
		}
	}

	return grouped;
}
