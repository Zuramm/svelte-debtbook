import { error } from '@sveltejs/kit';

/** @satisfies {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { supabase } = await parent();
	const peopleRes = await supabase
		.from('person')
		.select('id,name,note')
		.order('name', { ascending: true });

	if (peopleRes.error) {
		console.error(peopleRes.error);
		error(500, 'Failed to load people');
	}

	return {
		people: peopleRes.data
	};
}
