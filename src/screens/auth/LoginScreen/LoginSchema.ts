import {z} from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
      invalid_type_error: 'E-mail precisa ser um texto'
    })
    .trim()
    .toLowerCase()
    .email({message: 'E-mail inválido'}),
  senha: z
    .string({
      required_error: 'Senha é obrigatório',
      invalid_type_error: 'Senha precisa ser um texto'
    })
    .trim()
})

export type LoginType = z.infer<typeof loginSchema>
