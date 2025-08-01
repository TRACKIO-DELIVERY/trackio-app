export default {
    name: "trackio-app",
    slug: "trackioapp",
    plugins: [
        [
            "@rnmapbox/maps",
            {
                RNMapboxMapsDownloadToken: "pk.eyJ1Ijoia2FyZW5kYW50YXMiLCJhIjoiY21kcmdlOGs0MDI5MjJqb243aWdvZWgzMyJ9.O9ClHDi4U9FuRqfcb4T6aQ"
            }
        ]
    ],
    android: {
        permissions: [
            "ACCESS_FINE_LOCATION",
            "ACCESS_COARSE_LOCATION"
        ]
    }
};
