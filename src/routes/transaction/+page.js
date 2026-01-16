import { error } from '@sveltejs/kit';
import { schemaKeys } from '.';

/** @type {import('./$types').PageLoad} */
export async function load({ parent, url }) {
	const { data: personId, error: personIdError } = schemaKeys.person_id.safeParse(
		url.searchParams.get('person')
	);

	// Validate personId is a valid number
	if (personIdError) {
		console.log(personIdError);
	}

	const { supabase } = await parent();

	const [
		{ data: people, error: peopleError },
		{ data: transactions, error: transactionsError },
		{ data: totalDebt, error: totalDebtError }
	] = await Promise.all([
		supabase.from('person').select('id,name').order('name'),
		((query) => (personId ? query.eq('person_id', personId) : query))(
			supabase
				.from('transaction')
				.select('id,person_id,amount,description,occured_at')
				.order('occured_at', { ascending: false })
		),
		personId
			? supabase.rpc('get_debt', { person_id_param: personId })
			: supabase.rpc('get_total_debt')
	]);

	if (peopleError) {
		console.error(peopleError);
		throw error(500, 'Failed to load people');
	}

	if (transactionsError) {
		console.error(transactionsError);
		throw error(500, 'Failed to load transactions');
	}

	if (totalDebtError) {
		console.error(totalDebtError);
		throw error(500, 'Failed to load transactions');
	}

	return {
		people: people ?? [],
		transactions: transactions ?? [],
		totalDebt: totalDebt ?? 0
	};
}
