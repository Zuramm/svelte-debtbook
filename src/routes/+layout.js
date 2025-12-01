import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';

import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
// export const ssr = false;

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
				global: {
					fetch
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
				global: {
					fetch
				},
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (!session && url.pathname !== '/signin') {
		return redirect(302, '/signin');
	}

	if (session && url.pathname === '/signin') {
		return redirect(302, '/person');
	}

	return { supabase, session };
};
