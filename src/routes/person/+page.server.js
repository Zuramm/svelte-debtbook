/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const supabase = locals.supabase;

	const [peopleRes, totalDebtRes] = await Promise.all([
		supabase.rpc('get_person_debt'),
		supabase.rpc('get_total_debt')
	]);

	if (peopleRes.error) {
		console.error(peopleRes.error);
	}

	if (totalDebtRes.error) {
		console.error(totalDebtRes.error);
	}

	return {
		people: peopleRes.data ?? [],
		totalDebt: totalDebtRes.data ?? 0
	};
}
