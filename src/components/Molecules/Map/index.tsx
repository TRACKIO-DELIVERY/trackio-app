import { LatLng } from "@/@types/location";
import { THEME } from "@/constants/theme";
import { useLocation } from "@/hooks/useLocation";
import { socket } from "@/services/socket";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Image, Alert } from "react-native";
import MapView, { Region, Marker, MapMarker } from "react-native-maps";

export default function Map({ orderId }: { orderId: number }) {
  const [cameraRegion, setCameraRegion] = useState<Region>({
    latitude: -6.1449451423527455,
    longitude: -38.20474092658745,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [deliveryPosition, setDeliveryPosition] = useState<LatLng | null>(null);

  const mapRef = React.useRef<MapView>(null);
  useEffect(() => {
    console.log("aaa");
    if (orderId) {
      console.log("Entrando na sala do pedido:", orderId);
      socket.emit("join_order", orderId);
    }
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

    function handleOrderFinished() {
      console.log("🏁 Pedido entregue!");
      setDeliveryPosition(null);
      Alert.alert("Pedido Entregue", "Seu pedido foi finalizado com sucesso!");
    }

    socket.on("order_finished", handleOrderFinished);
    return () => {
      socket.emit("leave_order", orderId);
      socket.off("receive_location", handleReceiveLocation);
      socket.off("order_finished", handleOrderFinished);
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
        {deliveryPosition && (
          <Marker
            coordinate={deliveryPosition}
            style={{ width: 100, height: 100 }}
          >
            <Image
              source={require("@/assets/images/entrega.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </Marker>
        )}
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
