/** @import { Handle } from '@sveltejs/kit' */
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { defaultSettings } from './settings';

/** @type {Handle} */
const handleParaglide = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

/** @type {Handle} */
const handleSupabase = ({ event, resolve }) => {
	event.locals.supabase =
		/** @type {import('@supabase/supabase-js').SupabaseClient<import('./database').Database>} */ (
			createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
				cookies: {
					getAll() {
						return event.cookies.getAll();
					},
					setAll(cookiesToSet) {
						/**
						 * Note: You have to add the `path` variable to the
						 * set and remove method due to sveltekit's cookie API
						 * requiring this to be set, setting the path to an empty string
						 * will replicate previous/standard behavior (https://kit.svelte.dev/docs/types#public-types-cookies)
						 */
						cookiesToSet.forEach(({ name, value, options }) =>
							event.cookies.set(name, value, { ...options, path: '/' })
						);
					}
				}
			})
		);

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		let settings = defaultSettings;

		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null, settings };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return { session: null, user: null, settings };
		}

		if (user) {
			const { data: remoteSettings, error } = await event.locals.supabase
				.from('settings')
				.select('*')
				.eq('id', user.id);
			// language: remoteSettings?.[0]?.language ?? defaultSettings.language,
			settings.debtColor = remoteSettings?.[0]?.debt_color ?? settings.debtColor;
			settings.precision = remoteSettings?.[0]?.precision ?? settings.precision;
			settings.showMinus = remoteSettings?.[0]?.show_minus ?? settings.showMinus;
		}

		return { session, user, settings };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

export const handle = sequence(handleParaglide, handleSupabase);
