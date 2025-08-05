import { useMutation } from "@tanstack/react-query"
import { apiNode } from "../api"

interface OrderQueueParams {
    order_id: string,
    order_status: number,
    url?: string,
    delivery_person?: string | undefined
}

async function acceptedOrder(params: OrderQueueParams) {
    const { data } = await apiNode.post('/track/queue/accepted', params)
    return data
}

export function sendAcceptedOrderToQueue() {
    return useMutation({
        mutationKey: ['accepted_queue'],
        mutationFn: acceptedOrder
    })
}

async function inRouteOrder(params: OrderQueueParams) {
    const { data } = await apiNode.post('/track/queue/in-route', params)
    return data
}

export function sendInRouteOrderQueue() {
    return useMutation({
        mutationKey: ['in_route_queue'],
        mutationFn: inRouteOrder
    })
}


async function deliveredOrder(params: OrderQueueParams) {
    const { data } = await apiNode.post('/track/queue/finished', params)
    return data
}

export function sendDeliveredOrderQueue() {
    return useMutation({
        mutationKey: ['delivered_queue'],
        mutationFn: deliveredOrder
    })
}


