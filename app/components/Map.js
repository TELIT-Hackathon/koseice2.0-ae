import {useEffect, useRef} from "react";

export default function Map({center, zoom}) {
    const ref = useRef();

    useEffect(() => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        const map = new window.google.maps.Map(ref.current, {
            center: { lat: 48.7150835, lng: 21.2470718 },
            zoom: 15
        });
        directionsRenderer.setMap(map);

        const marker = new window.google.maps.Marker({
            position: { lat: 48.7140835, lng: 21.2470718 },
            icon: "https://lh3.googleusercontent.com/ogw/AOh-ky0OqjijowLJPirZh09QMvHfZQb3geTrd4ynb1Mv=s32-c-mo",
            title: "My MARKER"
        })
        marker.setMap(map);

        directionsService.route({
            origin: {
                query: "Alejova 1, Kosice"
            },
            destination: {
                query: "Univerzitna kniznica technicka univerzita Kosice"
            },
            travelMode: window.google.maps.TravelMode.DRIVING,
        }).then(response => {
            directionsRenderer.setDirections(response);
        }).catch((e) => {
            window.alert("Directions request failed due to " + e.message);
        })
    });

    return <div ref={ref} id="map" style={{
        height: "100vh",
        width: "100%"
    }} />;
}