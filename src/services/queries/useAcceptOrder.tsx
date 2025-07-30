import { useMutation } from "@tanstack/react-query";
import { api, apiNode } from "../api";


async function sendAcceptedOrder(orderId: string) {
    const { data } = await apiNode.post('/api/track/accepted-order', { orderId })
    return data
}

export function useAcceptOrder(orderId: string) {
    return useMutation({
        mutationKey: ['accepted-order'],
        mutationFn: sendAcceptedOrder
    })
}