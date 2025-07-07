import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Preencha o campo!" })
    .email("Insira um email válido"),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
