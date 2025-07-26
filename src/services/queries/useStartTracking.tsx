import { useMutation } from "@tanstack/react-query";
import { api, apiNode } from "../api";

interface StartRouteResponse {
    message?: string
    canStartSendingLocation: boolean
}
export function useStartTracking(orderId: string) {
    return useMutation<StartRouteResponse>({
        mutationKey: ['start-tracking'],
        mutationFn: () => startOrderTracking(orderId)
    })
}

async function startOrderTracking(orderId: string) {
    const { data } = await apiNode.post('/api/track/start-route', {
        orderId
    })
    return data
}