import { UserDTO } from "./userDTO"

export type DeliveryPersonDTO = UserDTO & {
    availability: string,
    vehicle: string,
    licensePlate: string
}
