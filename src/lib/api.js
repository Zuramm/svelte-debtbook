/**
 * Delay for a given number of milliseconds
 * @param {number} ms
 * @returns {Promise<void>}
 */
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const PAGE_SIZE = 100;

export class Person {
	/**
	 * Create a new person
	 * @param {object} person
	 * @param {number} person.id
	 * @param {string} person.name
	 */
	constructor(person) {
		this.id = person.id;
		this.name = person.name;
	}
}

export class Transaction {
	/**
	 * Create a new transaction
	 * @param {object} transaction
	 * @param {number} transaction.id
	 * @param {number} transaction.amount in cents
	 * @param {number} transaction.person_id
	 * @param {string} transaction.description
	 * @param {number} transaction.timestamp in milliseconds since epoch
	 */
	constructor(transaction) {
		this.id = transaction.id;
		this.amount = transaction.amount;
		this.person_id = transaction.person_id;
		this.description = transaction.description;
		this.timestamp = transaction.timestamp;
	}
}

export class Repository extends EventTarget {
	constructor() {
		super();
		this._counters = {
			transaction: 77,
			person: 2
		};
		this._people = [
			{ id: 1, name: 'Alex' },
			{ id: 2, name: 'Dani' }
		];
		this._transaction = [
			{ id: 1, amount: -100000, person_id: 1, description: '', timestamp: 1706271391388 },
			{ id: 3, amount: 60000, person_id: 1, description: '', timestamp: 1706699224691 },
			{ id: 4, amount: -25000, person_id: 2, description: '', timestamp: 1683158400000 },
			{ id: 5, amount: 5000, person_id: 2, description: '', timestamp: 1685577600000 },
			{ id: 6, amount: -20000, person_id: 2, description: '', timestamp: 1706699363518 },
			{ id: 7, amount: -10000, person_id: 1, description: 'Weed ', timestamp: 1706707435451 },
			{
				id: 8,
				amount: -8000,
				person_id: 1,
				description: 'Monatliche Kosten ',
				timestamp: 1706745600000
			},
			{ id: 9, amount: -5000, person_id: 1, description: 'Sideshop ', timestamp: 1707149643156 },
			{ id: 10, amount: -20000, person_id: 1, description: 'Weed ', timestamp: 1708300800000 },
			{ id: 11, amount: -4000, person_id: 1, description: 'Rent ', timestamp: 1706745600000 },
			{ id: 12, amount: -10000, person_id: 2, description: 'PayPal', timestamp: 1709939882092 },
			{
				id: 13,
				amount: -5000,
				person_id: 2,
				description: 'bar in Berlin ',
				timestamp: 1710457047869
			},
			{ id: 14, amount: 60000, person_id: 1, description: '', timestamp: 1708992000000 },
			{ id: 15, amount: -4000, person_id: 1, description: 'Rent', timestamp: 1709251200000 },
			{
				id: 16,
				amount: -5000,
				person_id: 1,
				description: 'monatliche Kosten ',
				timestamp: 1710602622602
			},
			{ id: 17, amount: 10000, person_id: 2, description: '', timestamp: 1710374400000 },
			{ id: 18, amount: -10000, person_id: 1, description: 'Einkauf', timestamp: 1710616309057 },
			{
				id: 19,
				amount: -20000,
				person_id: 2,
				description: 'Geburtstagswoche ',
				timestamp: 1710028800000
			},
			{
				id: 20,
				amount: -10000,
				person_id: 1,
				description: 'For PayPal ',
				timestamp: 1710886291446
			},
			{ id: 21, amount: -10000, person_id: 1, description: 'Weed ', timestamp: 1711211805243 },
			{
				id: 22,
				amount: -5000,
				person_id: 1,
				description: 'Dinner with sister ',
				timestamp: 1716681600000
			},
			{
				id: 24,
				amount: -5000,
				person_id: 1,
				description: 'monthly payments ',
				timestamp: 1711929600000
			},
			{
				id: 25,
				amount: -8000,
				person_id: 1,
				description: 'monthly payments ',
				timestamp: 1714521600000
			},
			{ id: 26, amount: -20000, person_id: 1, description: 'Weed ', timestamp: 1716911943817 },
			{ id: 27, amount: 89000, person_id: 1, description: '', timestamp: 1717027200000 },
			{ id: 28, amount: -4300, person_id: 1, description: 'Lieferando ', timestamp: 1717027200000 },
			{ id: 29, amount: -4800, person_id: 1, description: 'MyHeritage', timestamp: 1716595200000 },
			{ id: 30, amount: -30000, person_id: 1, description: 'Weed', timestamp: 1718449899421 },
			{ id: 31, amount: -9000, person_id: 1, description: 'monatlich', timestamp: 1717200000000 },
			{ id: 32, amount: 15000, person_id: 1, description: '', timestamp: 1714435200000 },
			{ id: 33, amount: -10000, person_id: 1, description: 'Weed money', timestamp: 1720310400000 },
			{ id: 34, amount: -9000, person_id: 1, description: 'monatlich ', timestamp: 1719792000000 },
			{ id: 35, amount: -20000, person_id: 1, description: 'weed money', timestamp: 1721347200000 },
			{ id: 36, amount: -5000, person_id: 2, description: '', timestamp: 1721742360621 },
			{ id: 37, amount: -9000, person_id: 1, description: 'monthly ', timestamp: 1722470400000 },
			{ id: 38, amount: 40000, person_id: 1, description: '', timestamp: 1722038400000 },
			{ id: 39, amount: -10000, person_id: 1, description: 'Shopping', timestamp: 1724284800000 },
			{ id: 40, amount: -10000, person_id: 1, description: 'Shopping', timestamp: 1723593600000 },
			{
				id: 41,
				amount: -4000,
				person_id: 1,
				description: 'Essen Bestellen',
				timestamp: 1724613952353
			},
			{ id: 42, amount: -5000, person_id: 1, description: 'Weed', timestamp: 1730747142268 },
			{ id: 43, amount: -10000, person_id: 1, description: 'shopping', timestamp: 1731715200000 },
			{ id: 44, amount: -9000, person_id: 1, description: 'monthly', timestamp: 1725148800000 },
			{ id: 45, amount: -9000, person_id: 1, description: 'monthly', timestamp: 1727740800000 },
			{ id: 46, amount: -9000, person_id: 1, description: 'monthly', timestamp: 1730419200000 },
			{ id: 47, amount: 100000, person_id: 1, description: '', timestamp: 1732665600000 },
			{ id: 48, amount: -2000, person_id: 1, description: 'Snacks', timestamp: 1733184000000 },
			{ id: 49, amount: -9000, person_id: 1, description: 'monthly', timestamp: 1733397385234 },
			{ id: 50, amount: -14000, person_id: 2, description: '', timestamp: 1734617639673 },
			{ id: 51, amount: -15000, person_id: 2, description: '', timestamp: 1745498651037 },
			{ id: 52, amount: 33100, person_id: 1, description: '', timestamp: 1735516800000 },
			{ id: 53, amount: 20000, person_id: 1, description: '', timestamp: 1743033600000 },
			{ id: 54, amount: -9500, person_id: 1, description: 'monthly', timestamp: 1736294400000 },
			{ id: 55, amount: -9500, person_id: 1, description: 'monthly', timestamp: 1738540800000 },
			{ id: 56, amount: -15500, person_id: 1, description: 'monthly', timestamp: 1744675200000 },
			{ id: 57, amount: -10500, person_id: 1, description: 'monthly', timestamp: 1746144000000 },
			{ id: 58, amount: -10500, person_id: 1, description: 'monthly', timestamp: 1750966115379 },
			{
				id: 59,
				amount: -13000,
				person_id: 1,
				description: 'My Heritage',
				timestamp: 1719532800000
			},
			{ id: 60, amount: -10500, person_id: 1, description: 'monthly', timestamp: 1751450335821 },
			{ id: 61, amount: 15000, person_id: 1, description: 'Rundfunk', timestamp: 1751450719560 },
			{ id: 62, amount: -5000, person_id: 1, description: 'cash', timestamp: 1751452396114 },
			{ id: 63, amount: -10000, person_id: 1, description: 'weed', timestamp: 1752624000000 },
			{ id: 64, amount: 10000, person_id: 1, description: '', timestamp: 1752796800000 },
			{ id: 65, amount: -2000, person_id: 1, description: '', timestamp: 1752969600000 },
			{ id: 66, amount: -10000, person_id: 1, description: 'Weed', timestamp: 1753142400000 },
			{
				id: 67,
				amount: -5000,
				person_id: 1,
				description: 'Errand money',
				timestamp: 1755085537082
			},
			{ id: 68, amount: -10000, person_id: 1, description: 'weed', timestamp: 1754265600000 },
			{ id: 70, amount: -10000, person_id: 1, description: '', timestamp: 1758672000000 },
			{ id: 71, amount: 30000, person_id: 1, description: '', timestamp: 1756339200000 },
			{ id: 72, amount: -11000, person_id: 1, description: 'monthly', timestamp: 1756684800000 },
			{ id: 73, amount: 2754, person_id: 1, description: '', timestamp: 1759411069591 },
			{ id: 74, amount: 30000, person_id: 1, description: '', timestamp: 1759190400000 },
			{ id: 75, amount: -8200, person_id: 1, description: '', timestamp: 1759276800000 },
			{ id: 76, amount: -10000, person_id: 1, description: '', timestamp: 1761495528163 },
			{ id: 77, amount: -1000, person_id: 1, description: 'weed', timestamp: 1763769600000 }
		].map((data) => new Transaction(data));
	}

	async personGetPage(page = 0) {
		await delay(200);
		const people = this._people.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
		this.dispatchEvent(
			new CustomEvent('people-page', { detail: { page: people, pageIndex: page } })
		);
		return people;
	}

	/**
	 * Get a person by id
	 * @param {number} id
	 * @returns {Promise<Person|undefined>}
	 */
	async personGet(id) {
		await delay(200);
		const person = this._people.find((item) => item.id === id);
		this.dispatchEvent(new CustomEvent('person-get', { detail: { person } }));
		return person;
	}

	/**
	 * Create a new person
	 * @param {object} data
	 * @param {string} data.name
	 * @returns {Promise<Person>}
	 */
	async personCreate(data) {
		await delay(200);
		const newPerson = new Person({ id: this._counters.person++, ...data });
		this._people.push(newPerson);
		this.dispatchEvent(new CustomEvent('person-create', { detail: { person: newPerson } }));
		return newPerson;
	}

	/**
	 * Update a person
	 * @param {object} data
	 * @param {number} data.id
	 * @param {string} data.name
	 * @returns {Promise<Person>}
	 */
	async personUpdate(data) {
		await delay(200);
		const index = this._people.findIndex((item) => item.id === data.id);
		const newPerson = new Person(data);
		this._people[index] = newPerson;
		this.dispatchEvent(new CustomEvent('person-update', { detail: { person: newPerson } }));
		return newPerson;
	}

	/**
	 * Delete a person
	 * @param {number} id
	 * @returns {Promise<Person>}
	 */
	async personDelete(id) {
		await delay(200);
		const index = this._people.findIndex((item) => item.id === id);
		const person = this._people.splice(index, 1)[0];
		this.dispatchEvent(new CustomEvent('person-delete', { detail: { person } }));
		return person;
	}

	/**
	 * Get the total debt
	 * @returns {Promise<number>}
	 */
	async transactionGetTotalDebt() {
		await delay(200);
		const now = Date.now();
		const totalDebt = this._transaction
			.filter((item) => item.timestamp <= now)
			.reduce((acc, item) => acc + item.amount, 0);
		this.dispatchEvent(new CustomEvent('transaction-total-debt', { detail: { totalDebt } }));
		return totalDebt;
	}

	/**
	 * Get the total debt by person
	 * @param {number} person_id
	 * @returns {Promise<number>}
	 */
	async transactionGetTotalDebtByPerson(person_id) {
		await delay(200);
		const now = Date.now();
		const totalDebt = this._transaction
			.filter((item) => item.person_id === person_id && item.timestamp <= now)
			.reduce((acc, item) => acc + item.amount, 0);
		this.dispatchEvent(
			new CustomEvent('transaction-total-debt-by-person', { detail: { totalDebt } })
		);
		return totalDebt;
	}

	/**
	 * Get a page of transactions
	 * @param {number} page
	 * @param {number} person_id
	 * @returns {Promise<Transaction[]>}
	 */
	async transactionGetPageByPerson(person_id, page = 0) {
		await delay(200);
		const transactions = this._transaction
			.filter((item) => item.person_id === person_id)
			.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
		this.dispatchEvent(
			new CustomEvent('transactions-page', { detail: { transactions, page, person_id } })
		);
		return transactions;
	}

	/**
	 * Get a transaction by id
	 * @param {number} id
	 * @returns {Promise<Transaction|undefined>}
	 */
	async transactionGet(id) {
		await delay(200);
		const transaction = this._transaction.find((item) => item.id === id);
		this.dispatchEvent(new CustomEvent('transaction-get', { detail: { transaction } }));
		return transaction;
	}

	/**
	 * Create a new transaction
	 * @param {object} data
	 * @param {number} data.amount in cents
	 * @param {number} data.person_id
	 * @param {string} data.description
	 * @param {number} data.timestamp in milliseconds since epoch
	 * @returns {Promise<Transaction>}
	 */
	async transactionCreate(data) {
		await delay(200);
		const newTransaction = new Transaction({ id: this._counters.transaction++, ...data });
		this._transaction.push(newTransaction);
		this.dispatchEvent(
			new CustomEvent('transaction-create', { detail: { transaction: newTransaction } })
		);
		return newTransaction;
	}

	/**
	 * Update a transaction
	 * @param {object} data
	 * @param {number} data.id
	 * @param {number} data.amount in cents
	 * @param {number} data.person_id
	 * @param {string} data.description
	 * @param {number} data.timestamp in milliseconds since epoch
	 * @returns {Promise<Transaction>}
	 */
	async transactionUpdate(data) {
		await delay(200);
		const index = this._transaction.findIndex((item) => item.id === data.id);
		const newTransaction = new Transaction(data);
		this._transaction[index] = newTransaction;
		this.dispatchEvent(
			new CustomEvent('transaction-update', { detail: { transaction: newTransaction } })
		);
		return newTransaction;
	}

	/**
	 * Delete a transaction
	 * @param {number} id
	 * @returns {Promise<Transaction>}
	 */
	async transactionDelete(id) {
		await delay(200);
		const index = this._transaction.findIndex((item) => item.id === id);
		const transaction = this._transaction.splice(index, 1)[0];
		this.dispatchEvent(new CustomEvent('transaction-delete', { detail: { transaction } }));
		return transaction;
	}
}
