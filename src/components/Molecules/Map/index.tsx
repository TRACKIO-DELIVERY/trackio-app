import { Loading } from '@/components/Atoms/Loading'
import { useLocation } from '@/hooks/useLocation'
import {
    MapView,
    Camera,
    PointAnnotation,
    setAccessToken,
    ShapeSource,
    LineLayer,
    Annotation,
    MarkerView
} from '@rnmapbox/maps'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY!)

export default function MapScreen() {
    const { location } = useLocation()

    const [routeGeoJSON, setRouteGeoJSON] = useState<any | null>(null)

    const origin = [-38.200454206964835, -6.133675412307443] // lng, lat
    const destination = [-38.207374420670845, -6.130710284566526]


    useEffect(() => {
        const fetchRoute = async () => {
            const accessToken = process.env.EXPO_PUBLIC_MAPBOX_KEY!
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${accessToken}`

            const res = await fetch(url)
            const json = await res.json()

            const route = json.routes[0].geometry.coordinates

            const geojson = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        id: 'route-line',
                        geometry: {
                            type: 'LineString',
                            coordinates: route
                        },
                        properties: {}
                    }
                ]
            }

            setRouteGeoJSON(geojson)
        }

        fetchRoute()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }}>
                <Camera
                    zoomLevel={14}
                    followUserLocation
                    followZoomLevel={14}
                    centerCoordinate={[-46.57421, -21.785741]} // lng, lat
                />

                <ShapeSource id="orderRoute" shape={routeGeoJSON} >
                    <LineLayer id="lineRoute" />
                </ShapeSource>

                {
                    location && (

                        <PointAnnotation
                            id="delivery-marker"
                            coordinate={[location?.coords.longitude, location?.coords.latitude]}

                        >
                            <View />
                        </PointAnnotation>
                    )
                }
            </MapView>
        </View>
    )
}
