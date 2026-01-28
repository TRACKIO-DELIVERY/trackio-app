import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { socket } from "@/services/socket";
import { Order } from "@/@types/models/order";

interface LocationContextType {
  location: Location.LocationObject | null;
  permissionStatus: string | null;
  requestPermission: () => Promise<void>;
  startGetPositions: (orders: Order[]) => Promise<void>;
  stopTracking: () => void;
  isTracking: boolean;
}
export const LocationContext = createContext<LocationContextType>(
  {} as LocationContextType,
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [isTracking, setIsTraking] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  async function requestPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
  }

  function stopTracking() {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    setIsTraking(false);
  }

  async function startGetPositions(orders: Order[]) {
    // if (permissionStatus !== "granted") {
    //   await requestPermission();
    // }

    if (!socket.connected) {
      socket.connect();
    }

    orders.forEach((order) => {
      socket.emit("join_order", order.id);
    });

    stopTracking(); //verifica se já tem outra instancia da ref
    setIsTraking(true);
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 3000,
        distanceInterval: 0,
      },
      (newLocation) => {
        setLocation(newLocation);
        const lat = newLocation?.coords.latitude;
        const lng = newLocation?.coords.longitude;

        socket.emit("send_location", {
          orders,
          lat,
          lng,
        });
      },
    );

    console.log(subscription);
    subscriptionRef.current = subscription;
  }

  useEffect(() => {
    requestPermission();
    return () => {
      stopTracking(); // Evita GPS ativo se sair da tela sem finalizar
      setIsTraking(false);
    };
  }, []);
  return (
    <LocationContext.Provider
      value={{
        location,
        permissionStatus,
        requestPermission,
        startGetPositions,
        stopTracking,
        isTracking,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
