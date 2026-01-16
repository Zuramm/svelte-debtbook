import { fail } from '@sveltejs/kit';
import { schemaKeys, schema } from '.';
import { z } from 'zod/mini';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const result = schema.safeParse({
			email: formData.get('email'),
			password: formData.get('password')
		});

		if (result.error) {
			return fail(400, { errors: z.prettifyError(result.error) });
		}

		const { data, error } = await supabase.auth.signInWithPassword(result.data);

		if (error) {
			console.error(error);
			return fail(400, { errors: [error.message] });
		}

		return { success: data };
	},
	register: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const result = schema.safeParse({
			email: formData.get('email'),
			password: formData.get('password')
		});

		if (result.error) {
			return fail(400, { errors: z.prettifyError(result.error) });
		}

		const confirmPassword = schemaKeys.password.safeParse(formData.get('confirm_pasword'));

		if (confirmPassword.error) {
			return fail(400, { errors: z.prettifyError(confirmPassword.error) });
		}

		if (result.data.password !== confirmPassword.data) {
			return fail(400, { error: 'Passwords do not match' });
		}

		const { data, error } = await supabase.auth.signUp(result.data);

		if (error) {
			console.error(error);
			return fail(400, { errors: [error.message] });
		}

		return { success: data };
	}
};
