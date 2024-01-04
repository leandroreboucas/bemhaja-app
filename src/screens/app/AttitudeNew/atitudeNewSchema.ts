import { z } from 'zod';

export const atitudeNewSchema = z.object({
  // id: z.string().uuid().nullable().default(null),
  // codigo: z.coerce.number().positive().nullable().default(null),
  tipo: z.string(),
  evento_codigo: z.coerce.number().positive(),
  atitude_codigo: z.coerce.number().positive(),
  midia_link: z.optional(z.string().nullable().default(null)),
  titulo: z.optional(z.string().trim().nullable().default(null)),
  texto: z.optional(z.string().max(250).trim().nullable().default(null)),
});

export type AtitudeNewType = z.infer<typeof atitudeNewSchema>;
