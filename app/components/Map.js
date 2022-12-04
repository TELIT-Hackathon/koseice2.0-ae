import {useEffect, useRef} from "react";
import {type_names} from "../data/alert_data";

export default function Map({center, zoom, alerts, jams}) {
    function Alert(alert) {
        const image_path = `alerts/${alert.type}.svg`;

        return new window.google.maps.Marker({
            position: { lat: alert.lat, lng: alert.lng },
            icon: image_path,
            title: `${type_names[alert.type.toString().substring(0, 2)]} ALERT`
        })
    }
    function Jam(jam) {
        return new google.maps.Polyline({
            path: jam.points,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 5,
        });
    }

    const ref = useRef();

    useEffect(() => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        const map = new window.google.maps.Map(ref.current, {
            center: { lat: 48.7150835, lng: 21.2470718 },
            zoom: 15,
            styles: [
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "color": "#F0F2F5",
                        }
                    ]
                }
            ]
        });

        jams.forEach(jam => {
            Jam(jam).setMap(map);
        })

        directionsRenderer.setMap(map);

        //[{type:"111", lat: 48.7150835, lng: 21.2470718}, {type:"220", lat: 48.7, lng: 21.2}].forEach(alert => {Alert(alert).setMap(map)});
        alerts.forEach(alert => {Alert(alert).setMap(map)});

        //const marker = new window.google.maps.Marker({
        //    position: { lat: 48.7140835, lng: 21.2470718 },
        //    icon: "https://lh3.googleusercontent.com/ogw/AOh-ky0OqjijowLJPirZh09QMvHfZQb3geTrd4ynb1Mv=s32-c-mo",
        //    title: "My MARKER"
        //})
        //marker.setMap(map);

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
