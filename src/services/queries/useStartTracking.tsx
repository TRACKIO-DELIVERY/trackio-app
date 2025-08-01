import { useMutation } from "@tanstack/react-query";
import { api, apiNode } from "../api";

interface StartRouteResponse {
    message?: string
    canStartSendingLocation: boolean
}

async function startOrderTracking(orderId: string) {
    const { data } = await apiNode.post('/track/start-route', { orderId })
    return data
}
export function useStartTracking() {
    return useMutation<StartRouteResponse, Error, string>({
        mutationKey: ['start-tracking'],
        mutationFn: startOrderTracking
    })
}
