import { Direction } from '$lib/transaction';
import * as z from 'zod/mini';

export const schemaId = z.coerce.number();

export const schemaKeys = {
	person_id: z.optional(z.coerce.number().check(z.minimum(0))),
	direction: z._default(z.coerce.number().check(z.minimum(0), z.maximum(1)), Direction.received),
	amount: z._default(z.coerce.number().check(z.minimum(-1_000_000), z.maximum(1_000_000)), 0),
	occured_at: z._default(z.coerce.date(), new Date()),
	description: z._default(z.string().check(z.maxLength(1_000)), '')
};

export const schema = z.object(schemaKeys);
