export type Coords = {
  latitude: string;
  longitude: string;
};

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
