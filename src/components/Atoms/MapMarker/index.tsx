import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Marker } from "react-native-maps";
import { styles } from "./styles";
import { THEME } from "@/constants/theme";

interface MapMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  color?: string;
  auraColor?: string;
  size?: number;
}

export function MapMarker({
  coordinate,
  color = THEME.primary[800],
  auraColor = THEME.primary[800],
  size = 12,
}: MapMarkerProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [pulse]);

  const auraSize = size * 2.6;
  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View
        style={[
          styles.container,
          {
            width: auraSize,
            height: auraSize,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.aura,
            {
              width: auraSize,
              height: auraSize,
              borderRadius: auraSize / 2,
              backgroundColor: auraColor,
              transform: [
                {
                  scale: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.4],
                  }),
                },
              ],
              opacity: pulse.interpolate({
                inputRange: [0, 1],
                outputRange: [0.35, 0.1],
              }),
            },
          ]}
        />

        <View
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </Marker>
  );
}
