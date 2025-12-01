/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const supabase = locals.supabase;
	const personId = parseInt(params.person);

	const [transactionsRes, totalDebtRes] = await Promise.all([
		supabase
			.from('transaction')
			.select('id,amount,description,occured_at')
			.eq('person_id', personId),
		supabase.rpc('get_debt', { person_id_param: personId })
	]);

	if (transactionsRes.error) {
		console.error(transactionsRes.error);
	}

	if (totalDebtRes.error) {
		console.error(totalDebtRes.error);
	}

	return {
		transactions: transactionsRes.data ?? [],
		totalDebt: totalDebtRes.data ?? 0
	};
}
