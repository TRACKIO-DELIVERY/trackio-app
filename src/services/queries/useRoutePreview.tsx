import { useMutation } from "@tanstack/react-query";
import { apiNode } from "../api";

export type LatLng = {
    latitude: number;
    longitude: number;
};
export type RouteCoordsResponse = {
    coords: {
        origin: { lat: number; lng: number };
        destination: { lat: number; lng: number };
    };
};
async function getPreview(orderId: string) {
    const { data } = await apiNode.post('/track/route-preview', { orderId })

    const coords: RouteCoordsResponse = {
        coords: data
    }
    return coords
}

export function useRoutePreview() {
    return useMutation<RouteCoordsResponse, Error, string>({
        mutationKey: ['send-coords'],
        mutationFn: getPreview
    })
}
