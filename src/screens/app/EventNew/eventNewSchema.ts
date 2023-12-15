import { z } from 'zod';

export const eventNewSchema = z.object({
  visibilidade: z.string().trim(),
  data_hora_inicio: z.date({
    required_error: 'Data/hora de início é obrigatório',
    invalid_type_error: 'Data/hora de início precisa ser uma data válida',
  }),
  data_hora_final: z.date().optional().nullable().default(null),
  presencial_endereco: z.string().trim().optional().nullable().default(null),
  virtual_link: z.string().trim().optional().nullable().default(null),
  tematico_descricao: z.string().trim().optional().nullable().default(null),
  observacoes: z.string().trim().optional().nullable().default(null),
  nome: z
    .string({
      required_error: 'Nome é obrigatório',
      invalid_type_error: 'Nome precisa ser um texto',
    })
    .trim(),
});

export type EventNewType = z.infer<typeof eventNewSchema>;
