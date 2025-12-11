import { fail, error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
	const supabase = locals.supabase;
	const personId = ((raw) => (raw ? parseInt(raw) : null))(url.searchParams.get('person'));

	// Validate personId is a valid number
	if (personId && isNaN(personId)) {
		throw error(404, 'Person not found');
	}

	const [personRes, transactionsRes, totalDebtRes] = await Promise.all([
		supabase.from('person').select('id,name'),
		((query) => (personId ? query.eq('person_id', personId) : query))(
			supabase.from('transaction').select('id,person_id,amount,description,occured_at')
		),
		personId
			? supabase.rpc('get_debt', { person_id_param: personId })
			: supabase.rpc('get_total_debt')
	]);

	if (personRes.error) {
		console.error(personRes.error);
		throw error(404, 'Person not found');
	}

	if (transactionsRes.error) {
		console.error(transactionsRes.error);
	}

	if (totalDebtRes.error) {
		console.error(totalDebtRes.error);
	}

	return {
		people: personRes.data ?? [],
		transactions: transactionsRes.data ?? [],
		totalDebt: totalDebtRes.data ?? 0
	};
}

/**
 * Validate the id
 * @param {FormDataEntryValue | null} id
 * @returns {[number | null, string[]]}
 */
function validateId(id) {
	/** @type {number | null} */
	let idInt = null;
	if (!id) {
		return [null, ['Id is required']];
	}
	if (typeof id !== 'string') {
		return [null, ['Id must be a string']];
	}
	idInt = parseInt(id);
	if (isNaN(idInt)) {
		return [null, ['Id must be a valid number']];
	}
	return [idInt, []];
}

/**
 * Validate the amount
 * @param {FormDataEntryValue | null} amount
 * @returns {[number | null, string[]]}
 */
function validateAmount(amount) {
	/** @type {number | null} */
	let amountInt = null;

	if (amount) {
		if (typeof amount !== 'string') {
			return [null, ['Amount must be a string']];
		}
		amountInt = Math.round(parseFloat(amount) * 100);
		if (isNaN(amountInt)) {
			return [null, ['Amount must be a valid number']];
		}
	}
	return [amountInt, []];
}

/**
 * Validate the description
 * @param {FormDataEntryValue | null} description
 * @returns {[string | null, string[]]}
 */
function validateDescription(description) {
	/** @type {string | null} */
	let descriptionStr = null;

	if (description) {
		if (typeof description !== 'string') {
			return [null, ['Description must be a string']];
		}
		descriptionStr = description.trim();
	}
	return [descriptionStr, []];
}

/**
 * Validate the occured at
 * @param {FormDataEntryValue | null} occured_at
 * @returns {[Date | null, string[]]}
 */
function validateOccuredAt(occured_at) {
	/** @type {Date | null} */
	let occuredAtDate = null;

	if (occured_at) {
		if (typeof occured_at !== 'string') {
			return [null, ['Occured at must be a string']];
		}
		if (occured_at.length === 0) {
			occuredAtDate = null;
		} else {
			occuredAtDate = new Date(occured_at);
			if (isNaN(occuredAtDate.getTime())) {
				return [null, ['Occured at must be a valid date']];
			}
		}
	}
	return [occuredAtDate, []];
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const [personId, personIdErrors] = validateId(formData.get('person_id'));
		const [amount, amountErrors] = validateAmount(formData.get('amount'));
		const [description, descriptionErrors] = validateDescription(formData.get('description'));
		const [occuredAt, occuredAtErrors] = validateOccuredAt(formData.get('occured_at'));

		const errors = [...personIdErrors, ...amountErrors, ...descriptionErrors, ...occuredAtErrors];
		if (errors.length > 0) {
			return fail(400, { errors });
		}

		const { data, error } = await supabase.from('transaction').insert([
			{
				person_id: personId,
				amount: amount,
				description: description,
				occured_at: occuredAt?.toISOString().substring(0, 'YYYY-MM-DD'.length)
			}
		]);
		if (error) {
			console.error(error);
			return fail(400, { error: error.message });
		}
		return { success: data };
	},
	update: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const [id, idErrors] = validateId(formData.get('id'));
		const [personId, personIdErrors] = validateId(formData.get('person_id'));
		const [amount, amountErrors] = validateAmount(formData.get('amount'));
		const [description, descriptionErrors] = validateDescription(formData.get('description'));
		const [occuredAt, occuredAtErrors] = validateOccuredAt(formData.get('occured_at'));

		const errors = [
			...idErrors,
			...personIdErrors,
			...amountErrors,
			...descriptionErrors,
			...occuredAtErrors
		];
		if (errors.length > 0) {
			return fail(400, { errors });
		}

		const { data, error } = await supabase
			.from('transaction')
			.update({
				person_id: personId,
				amount: amount,
				description: description,
				occured_at: occuredAt?.toISOString().substring(0, 'YYYY-MM-DD'.length)
			})
			.eq('id', /** @type {number} */ (id));
		if (error) {
			console.error(error);
			return fail(400, { error: error.message });
		}
		return { success: data };
	},
	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const [id, idErrors] = validateId(formData.get('id'));

		const errors = [...idErrors];
		if (errors.length > 0) {
			return fail(400, { errors });
		}

		const { data, error } = await supabase
			.from('transaction')
			.delete()
			.eq('id', /** @type {number} */ (id));
		if (error) {
			console.error(error);
			return fail(400, { error: error.message });
		}
		return { success: data };
	}
};
