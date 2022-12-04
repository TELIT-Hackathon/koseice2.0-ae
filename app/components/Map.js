import {useEffect, useRef} from "react";

export default function Map({center, zoom, vehicles}) {
    const ref = useRef();

    useEffect(() => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        const map = new window.google.maps.Map(ref.current, {
            center: { lat: 48.7100835, lng: 21.2470718 },
            zoom: 12,
            disableDefaultUI: true
        });
        directionsRenderer.setMap(map);

        for (const vehicle of vehicles.list) {
            new window.google.maps.Marker({
                position: { lat: vehicle.lat, lng: vehicle.lng },
                icon: "vehicle_icons/" + vehicle.type + ".svg",
                title: "Vehicle " + vehicle.id
            }).setMap(map);
        }
    });

    return <div ref={ref} id="map" style={{
        height: "100vh",
        width: "100%"
    }} />;
}