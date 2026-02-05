import { Order } from "@/@types/models/order";
import { useLocation } from "@/hooks/useLocation";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, {
  Marker,
  Region,
  PROVIDER_GOOGLE,
  MapMarker,
} from "react-native-maps";

export default function DeliveryMap(orders: { orders: Order[] }) {
  const { location } = useLocation();

  const [region, setRegion] = useState<Region>({
    latitude: -6.1449451423527455,
    longitude: -38.20474092658745,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  const mapRef = React.useRef<MapView>(null);
  useEffect(() => {
    if (location) {
      console.log(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
      const position = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      mapRef.current?.animateToRegion(
        {
          ...position,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        },
        500,
      );
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        provider={PROVIDER_GOOGLE}
      >
        {location && (
          <Marker
            coordinate={location.coords}
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
});
