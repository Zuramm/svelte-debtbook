import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { supabase } = await parent();
	const { data: people, error: peopleError } = await supabase
		.from('person')
		.select('id,name,note')
		.order('name', { ascending: true });

	if (peopleError) {
		console.error(peopleError);
		error(500, 'Failed to load people');
	}

	return {
		people: people
	};
}
