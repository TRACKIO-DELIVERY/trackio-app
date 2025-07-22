import { User } from "@/@types/user";

export type UserDTO = {
    id: string,
    fullName: string,
    cpf: string,
    birthDate: string,
    email:string,
};

export function toUserDTO (user: User) : UserDTO {
    return {
        id: user.id,
        birthDate: user.birth_date,
        cpf: user.cpf,
        email: user.email,
        fullName: user.full_name,
    }
}