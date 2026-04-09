/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals: { safeGetSession }, cookies }) => {
	const { session, user, settings } = await safeGetSession();

	return {
		session,
		user,
		cookies: cookies.getAll(),
		settings
	};
};
