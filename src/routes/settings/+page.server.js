import { fail, redirect } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			return fail(500, { error: error.message });
		}
		return redirect(302, '/signin');
	}
};
