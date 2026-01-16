import { fail, redirect } from '@sveltejs/kit';
import { schema } from '..';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const result = schema.safeParse({ name: formData.get('name'), note: formData.get('note') });

		if (result.error) {
			return fail(400, { errors: result.error.issues.map((e) => e.message) });
		}

		const { error } = await supabase.from('person').insert(result.data);

		if (error) {
			console.error(error);
			return fail(400, { errors: [error.message] });
		}

		return redirect(303, '/person');
	}
};
