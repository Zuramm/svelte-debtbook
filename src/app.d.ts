import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from './database.ts'; // import generated types
import type { PageSettings } from './settings.js';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null, settings: PageSettings }>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
			settings: PageSettings;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
