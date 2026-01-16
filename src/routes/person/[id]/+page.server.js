import { fail, redirect } from '@sveltejs/kit';
import { schema, schemaId } from '..';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	update: async ({ request, locals: { supabase }, params }) => {
		const id = schemaId.safeParse(params.id);

		if (id.error) {
			return fail(404, 'Person not found');
		}

		const formData = await request.formData();

		const result = schema.safeParse({ name: formData.get('name'), note: formData.get('note') });

		if (result.error) {
			return fail(400, { errors: result.error.issues.map((e) => e.message) });
		}

		const { error } = await supabase.from('person').update(result.data).eq('id', id.data);

		if (error) {
			console.error(error);
			return fail(400, { errors: [error.message] });
		}

		redirect(303, '/person');
	},
	delete: async ({ locals: { supabase }, params }) => {
		const id = schemaId.safeParse(params.id);

		if (id.error) {
			return fail(404, 'Person not found');
		}

		const { error } = await supabase.from('person').delete().eq('id', id.data);

		if (error) {
			console.error(error);
			return fail(400, { errors: [error.message] });
		}

		redirect(303, '/person');
	}
};
