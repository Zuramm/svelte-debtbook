/**
 * @param {import('zod/mini').ZodMiniType<string>} schema
 * @returns {import('svelte/elements').ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
 */
export function reformat(schema) {
	return (event) => {
		const result = schema.safeParse(event.currentTarget.value);
		if (result.success) {
			event.currentTarget.value = result.data;
		}
	};
}

/**
 * @param {import('zod/mini').ZodMiniType<string>} schema
 * @param {(value: string) => string | false | undefined | null | void} validation
 * @returns {import('svelte/elements').ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
 */
export function customValidation(schema, validation) {
	return (event) => {
		let validity = '';

		const result = schema.safeParse(event.currentTarget.value);
		if (result.success) {
			validity = validation(result.data || '') || '';
		}

		event.currentTarget.setCustomValidity(validity);
	};
}
