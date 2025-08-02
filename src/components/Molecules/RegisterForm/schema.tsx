import z from "zod";

export const RegisterSchema = z.object({
  username: z.string()
    .nonempty({ message: "Insira um username" }),
  fullname: z
    .string()
    .nonempty({ message: "Insira um nome" }),
  email: z
    .string()
    .min(1, { message: "Preencha o campo!" })
    .email("Insira um email válido"),
  birthDate: z.string().min(1, 'Preencha o campo!'),
  cpf: z.string().min(1, 'Preencha o campo!'),
  password: z
    .string()
    .min(6, { message: "Senha deve conter pelo menos 6 caracteres" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Senha deve conter pelo menos 6 caracteres" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas devem ser iguais",
  path: ["confirmPassword"],
});

export type RegisterFormType = z.infer<typeof RegisterSchema>;
