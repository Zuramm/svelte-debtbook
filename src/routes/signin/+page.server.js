import { fail } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		if (
			!(typeof email === 'string' && email.length > 0) ||
			!(typeof password === 'string' && password.length > 0)
		) {
			return fail(400, { error: 'Email and password are required' });
		}
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			return fail(400, { error: error.message });
		}
		return { success: data };
	},
	register: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm_password');
		if (
			!(typeof email === 'string' && email.length > 0) ||
			!(typeof password === 'string' && password.length > 0)
		) {
			return fail(400, { error: 'Email and password are required' });
		}
		if (password !== confirmPassword) {
			return fail(400, { error: 'Passwords do not match' });
		}
		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			return fail(400, { error: error.message });
		}
		return { success: data };
	}
};
