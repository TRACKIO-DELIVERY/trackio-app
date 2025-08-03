import { useMutation } from "@tanstack/react-query";
import { apiNode } from "../api";


async function sendAcceptedOrder(orderId: string) {
    const { data } = await apiNode.post('/track/accepted-order', { orderId })
    return data
}

export function useAcceptOrder() {
    return useMutation({
        mutationKey: ['accepted-order'],
        mutationFn: sendAcceptedOrder
    })
}