import { error } from '@sveltejs/kit';
import { schemaId } from '..';

/** @type {import('./$types').PageLoad} */
export async function load({ parent, params }) {
	const { data: id, error: idError } = schemaId.safeParse(params.id);

	if (idError) {
		return error(404, 'Transaction not found');
	}

	const { supabase } = await parent();
	const [{ data: people, error: peopleError }, { data: transaction, error: transactionError }] =
		await Promise.all([
			supabase.from('person').select('id,name,note').order('name', { ascending: true }),
			supabase.from('transaction').select('id,person_id,amount,occured_at,description').eq('id', id)
		]);

	if (peopleError) {
		console.error(peopleError);
		error(500, 'Failed to load people');
	}

	if (transactionError) {
		console.error(transactionError);
		error(404, 'Failed to load transaction');
	}

	return {
		people,
		transaction
	};
}
