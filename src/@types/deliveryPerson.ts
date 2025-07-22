import { User } from "./user"

export type DeliveryPerson = User & {
    availability: string,
    vehicle: string,
    license_plate: string
}
