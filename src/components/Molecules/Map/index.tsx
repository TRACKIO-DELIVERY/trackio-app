import { LatLng } from "@/@types/location";
import { MapMarker } from "@/components/Atoms/MapMarker";
import { THEME } from "@/constants/theme";
import { useLocation } from "@/hooks/useLocation";
import { socket } from "@/services/socket";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import MapView, { Region } from "react-native-maps";

export default function Map({ orderId }: { orderId: number }) {
  const [cameraRegion, setCameraRegion] = useState<Region>({
    latitude: -6.1449451423527455,
    longitude: -38.20474092658745,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [deliveryPosition, setDeliveryPosition] = useState<LatLng | null>(null);

  const mapRef = React.useRef<MapView>(null);
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    function handleReceiveLocation(data: { lat: number; lng: number }) {
      console.log("📍 Localização recebida:", data);
      const position = {
        latitude: data.lat,
        longitude: data.lng,
      };

      setDeliveryPosition(position);

      mapRef.current?.animateToRegion(
        {
          ...position,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500,
      );
    }

    socket.on("receive_location", handleReceiveLocation);

    return () => {
      socket.off("receive_location", handleReceiveLocation);
    };
  }, [orderId]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={cameraRegion}
        onRegionChangeComplete={setCameraRegion}
      >
        {deliveryPosition && <MapMarker coordinate={deliveryPosition} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  markerAura: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.primary[700],
  },

  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.primary[800],
  },
});
