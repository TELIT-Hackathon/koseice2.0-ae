import {useEffect, useRef} from "react";
import styles from "../styles/Home.module.css";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {type_names} from "../data/alert_data";

export default function Map({center, zoom, vehicles, alerts, jams}) {
    const ref = useRef(), destinationRef = useRef();
    function Alert(alert) {
        const scale = Math.sqrt(Math.sqrt(alert.occurrences))
        const image_path = `alerts/${alert.type}.svg`;
        const icon = {
            url: image_path, // url
            scaledSize: new google.maps.Size(25*scale, 25*scale), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
        let include_s = ""
        if (alert.occurrences != 1) {
            include_s = "s"
        }

        return new window.google.maps.Marker({
            position: alert.position,
            icon: icon,
            title: `${type_names[alert.type.toString().substring(0, 2)]} | ${alert.occurrences} report${include_s}`
        })
    }

    useEffect(() => {
        update();
    });

    function update() {
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
            ],
            disableDefaultUI: true
        });

        directionsRenderer.setMap(map);

        alerts.forEach(alert => {Alert(alert).setMap(map)});

        for (const vehicle of vehicles.list) {
            new window.google.maps.Marker({
                position: { lat: vehicle.lat, lng: vehicle.lng },
                icon: "vehicle_icons/" + vehicle.type + ".svg",
                title: "Vehicle " + vehicle.id
            }).setMap(map);
        }

        directionsService.route({
            origin: {
                query: "Univerzitna kniznica technicka univerzita Kosice"
            },
            destination: {
                query: destinationRef.current.value
            },
            travelMode: window.google.maps.TravelMode.DRIVING,
        }).then(response => {
            directionsRenderer.setDirections(response);
        }).catch((e) => {

        })
    }

    return <div>
        <header className={styles.searchBox}>
            <div className={styles.searchInner}>
                <input type={"text"} ref={destinationRef} className={styles.searchBar} />
                <MagnifyingGlassIcon className={styles.searchIcon} onClick={update} />
            </div>
        </header>
        <div ref={ref} id="map" style={{
            height: "100vh",
            width: "100%"
        }} />
    </div>
}