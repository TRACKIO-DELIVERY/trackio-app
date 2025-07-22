import { User } from "./user"

export type DeliveryPerson = {
    user: User
    availability: string,
    vehicle: string,
    license_plate: string
}