import { stringUtils } from '@utils';
import { z } from 'zod';

export const myProfileSchema = z.object({
    id: z
        .string({
            required_error: 'Id é obrigatório',
            invalid_type_error: 'iD precisa ser um texto',
        })
        .trim(),
    nome: z
        .string({
            required_error: 'Nome é obrigatório',
            invalid_type_error: 'Nome precisa ser um texto',
        })
        .trim()
        .transform(stringUtils.capitalizeFirstLetter),
    email: z
        .string({
            required_error: 'E-mail é obrigatório',
            invalid_type_error: 'E-mail precisa ser um texto',
        })
        .trim()
        .toLowerCase()
        .email({ message: 'E-mail inválido' }),
    data_nascimento: z.coerce.date({
        required_error: 'Data de nascimento é obrigatório',
        invalid_type_error: 'Data de nascimento precisa ser uma data válida',
    }),
});

export type myProfileType = z.infer<typeof myProfileSchema>;
