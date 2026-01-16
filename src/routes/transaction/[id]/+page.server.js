import { fail, redirect } from '@sveltejs/kit';
import { schema, schemaId } from '..';
import { directionToAmount } from '$lib/transaction';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	update: async ({ request, locals: { supabase }, params }) => {
		const id = schemaId.safeParse(params.id);

		if (id.error) {
			return fail(404, 'Transaction not found');
		}

		const formData = await request.formData();

		const { data: form, error: formError } = schema.safeParse({
			person_id: formData.get('person_id'),
			direction: formData.get('direction'),
			amount: formData.get('amount'),
			occured_at: formData.get('occured_at'),
			description: formData.get('description')
		});

		if (formError) {
			return fail(400, { errors: formError.issues.map((e) => e.message) });
		}

		const { error } = await supabase.from('transaction').update({
			person_id: form.person_id,
			amount: directionToAmount(form.direction, form.amount),
			occured_at: form.occured_at.toISOString(),
			description: form.description,
		}).eq('id', id.data);

		if (error) {
			console.error(error);
			return fail(400, { errors: [error.message] });
		}

		redirect(303, '/transaction');
	},
	delete: async ({ locals: { supabase }, params }) => {
		const id = schemaId.safeParse(params.id);

		if (id.error) {
			return fail(404, 'Transaction not found');
		}

		const { error } = await supabase.from('transaction').delete().eq('id', id.data);

		if (error) {
			console.error(error);
			return fail(400, { errors: [error.message] });
		}

		redirect(303, '/transaction');
	}
};
