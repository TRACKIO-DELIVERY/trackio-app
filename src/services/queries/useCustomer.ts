import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Customer } from "@/@types/models/user";

export function useCustomer(customerId: number) {
  return useQuery({
    queryKey: [`customer-${customerId}`],
    queryFn: async () => {
      const { data } = await api.get<Customer>(`/customer/${customerId}`);

      return data;
    },
  });
}
