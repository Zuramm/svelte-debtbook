import { error } from '@sveltejs/kit';
import { schemaId } from '..';

/** @type {import('./$types').PageLoad} */
export async function load({ parent, params }) {
	const id = schemaId.safeParse(params.id);

	if (id.error) {
		return error(404, 'Person not found');
	}

	const { supabase } = await parent();
	const peopleRes = await supabase
		.from('person')
		.select('id,name,note')
		.order('name', { ascending: true });

	if (peopleRes.error) {
		console.error(peopleRes.error);
		error(500, 'Failed to load people');
	}

	const person = peopleRes.data.find((d) => d.id == id.data);

	if (!person) {
		error(404, 'Person not found');
	}

	return {
		people: peopleRes.data,
		person
	};
}
