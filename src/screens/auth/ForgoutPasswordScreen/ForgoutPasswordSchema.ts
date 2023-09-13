import { z } from "zod";

export const forgoutPasswordSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório",
      invalid_type_error: "E-mail precisa ser um texto",
    })
    .trim()
    .toLowerCase()
    .email({ message: "E-mail inválido" }),
});

export type ForgoutPasswordType = z.infer<typeof forgoutPasswordSchema>;
