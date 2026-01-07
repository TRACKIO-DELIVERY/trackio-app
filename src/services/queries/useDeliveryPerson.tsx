import { DeliveryPerson } from "@/@types/models/user";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { DeliveryPersonDTO } from "@/@types/api/userDTO";

async function getDeliveryPerson(id: string): Promise<DeliveryPerson> {
  const { data } = await api.get<DeliveryPersonDTO>("/api/delivery-people/", {
    params: { id },
  });

  const deliveryPerson: DeliveryPerson = {
    dateOfBirth: data.dateOfBirth,
    cpf: data.cpf,
    email: data.email,
    imageUrl: data.image_url,
    username: data.username,
    phone: data.phone,
    role: data.role,
    userId: data.userId,
    address: data.address,
    vehicleType: data.vehicle_type,
  };
  return deliveryPerson;
}
export function useDeliveryPerson(id: string) {
  return useQuery({
    queryKey: ["delivery-person", id],
    queryFn: () => getDeliveryPerson(id),
    enabled: !!id,
  });
}
