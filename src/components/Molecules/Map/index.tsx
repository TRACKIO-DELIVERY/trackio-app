import { useLocation } from '@/hooks/useLocation';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

export default function Map({ orderId }: { orderId: string }) {
    const { location } = useLocation();

    const [region, setRegion] = useState<Region>({
        latitude: -6.1449451423527455,
        longitude: -38.20474092658745,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });

    useEffect(() => {
        if (location) {
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005,
            });
        }
    }, [location]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Você está aqui"
                    />
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
        width: '100%',
        height: '100%'
    },
});
