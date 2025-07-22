import { OrderDTO } from "@/dtos/orderDTO";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


export function useOrders () {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getOrders
    })
}

async function getOrders() : Promise<OrderDTO[]>{
    const {data} = await api.get('/orders')
    return data
  
}