import * as z from 'zod/mini';

export const schemaId = z.coerce.number();

export const schemaKeys = {
	name: z.string().check(z.minLength(1), z.maxLength(255), z.trim()),
	note: z._default(z.string().check(z.maxLength(1000), z.trim()), '')
};

export const schema = z.object(schemaKeys);
