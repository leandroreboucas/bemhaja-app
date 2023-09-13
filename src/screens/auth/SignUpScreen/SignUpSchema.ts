import { z } from "zod";

export const signUpSchema = z
  .object({
    nome: z
      .string({
        required_error: "Nome é obrigatório",
        invalid_type_error: "Nome precisa ser um texto",
      })
      .trim()
      .transform((value) => {
        return value
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
      }),
    email: z
      .string({
        required_error: "E-mail é obrigatório",
        invalid_type_error: "E-mail precisa ser um texto",
      })
      .trim()
      .toLowerCase()
      .email({ message: "E-mail inválido" }),
    data_nascimento: z.date({
      required_error: "Data de nascimento é obrigatório",
      invalid_type_error: "Data de nascimento precisa ser uma data válida",
    }),
    senha: z
      .string({
        required_error: "Senha é obrigatório",
        invalid_type_error: "Senha precisa ser um texto",
      })
      .trim(),
    confirma_senha: z
      .string({
        required_error: "Confirmar senha é obrigatório",
        invalid_type_error: "Senha precisa ser um texto",
      })
      .trim(),
  })
  .refine(({ senha, confirma_senha }) => senha === confirma_senha, {
    message: "Senhas não conferem",
    path: ["confirma_senha"],
  });

export type SignUpType = z.infer<typeof signUpSchema>;
