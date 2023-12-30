import { z } from 'zod';

export const postNewSchema = z.object({
    id: z.optional(z.string().uuid().nullable().default(null)),
    codigo: z.optional(z.coerce.number().positive().nullable().default(null)),
    tipo: z.string(),
    evento_codigo: z.optional(
        z.coerce.number().positive().nullable().default(null),
    ),
    foto: z.optional(z.string().nullable().default(null)),
    titulo: z.optional(z.string().trim().nullable().default(null)),
    descricao: z.optional(z.string().trim().nullable().default(null)),
});

export type postNewType = z.infer<typeof postNewSchema>;
