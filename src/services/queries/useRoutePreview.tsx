import { useMutation } from "@tanstack/react-query";
import { apiNode } from "../api";
import { RouteCoordsResponse } from "@/@types/location";

async function getPreview(orderId: string) {
  const { data } = await apiNode.post("/track/route-preview", { orderId });

  const coords: RouteCoordsResponse = {
    coords: data,
  };
  return coords;
}

export function useRoutePreview() {
  return useMutation<RouteCoordsResponse, Error, string>({
    mutationKey: ["send-coords"],
    mutationFn: getPreview,
  });
}
