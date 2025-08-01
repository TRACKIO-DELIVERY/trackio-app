import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { socket } from "@/services/socket";

interface LocationContextType {
  location: Location.LocationObject | null;
  permissionStatus: string | null;
  requestPermission: () => Promise<void>;
  startGetPositions: (orderId: string) => Promise<void>;
  stopTracking: () => void;
  isTracking: boolean
}
export const LocationContext = createContext<LocationContextType>(
  {} as LocationContextType,
);

export function LocationProvider({ children }: { children: ReactNode }) {

  const [isTracking, setIsTraking] = useState(false)
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
    setIsTraking(false)
  }

  async function startGetPositions(orderId: string) {
    if (permissionStatus !== "granted") {
      await requestPermission();
    }

    stopTracking(); //verifica se já tem outra instancia da ref
    setIsTraking(true)
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 3000,
        distanceInterval: 0,
      },
      (newLocation) => {
        setLocation(newLocation);
        const coords = {
          latitude: newLocation?.coords.latitude,
          longitude: newLocation?.coords.longitude
        }
        socket.emit("location_update", {
          orderId,
          coords

        })
      },
    );

    subscriptionRef.current = subscription;
  }

  useEffect(() => {
    requestPermission();
    return () => {
      stopTracking(); // Evita GPS ativo se sair da tela sem finalizar
      setIsTraking(false)
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
        isTracking
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
