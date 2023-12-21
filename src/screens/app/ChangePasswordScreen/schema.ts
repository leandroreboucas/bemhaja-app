import {z} from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: 'Senha antiga é obrigatório',
        invalid_type_error: 'Senha antiga precisa ser um texto',
      })
      .trim(),
    newPassword: z
      .string({
        required_error: 'Senha é obrigatório',
        invalid_type_error: 'Senha precisa ser um texto',
      })
      .trim(),
    confirmNewPassword: z
      .string({
        required_error: 'Confirmar senha é obrigatório',
        invalid_type_error: 'Senha precisa ser um texto',
      })
      .trim(),
  })
  .refine(
    ({newPassword, confirmNewPassword}) =>
      newPassword === confirmNewPassword &&
      newPassword.length >= 1 &&
      confirmNewPassword.length >= 1,
    {
      message: 'Senhas não conferem',
      path: ['confirmNewPassword'],
    },
  )
  .refine(({oldPassword, newPassword}) => oldPassword !== newPassword, {
    message: 'Nova senha não pode ser igual a antiga',
    path: ['newPassword'],
  });

export type changePasswordType = z.infer<typeof changePasswordSchema>;
