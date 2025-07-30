import { useMutation } from "@tanstack/react-query";
import { apiNode } from "../api";


export function useSendCoords(coords: { lat: number, lng: number }) {
    return useMutation({
        mutationKey: ['send-coords'],
        mutationFn: () => sendAcceptedOrder(coords)
    })
}

async function sendAcceptedOrder(coords: { lat: number, lng: number }) {
    const { data } = await apiNode.post('/api/track/send-coords', { coords })
    return data
}