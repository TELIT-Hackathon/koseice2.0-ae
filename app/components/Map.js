import {useEffect, useRef} from "react";
import styles from "../styles/Home.module.css";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {type_names} from "../data/alert_data";

export default function Map({center, zoom, vehicles, alerts}) {
    const ref = useRef(), destinationRef = useRef();
    function Alert(alert) {
        let image_path;
        console.log(alert.type.toString()[0]);
        if (alert.type.toString()[0] === "2"){
            image_path = `alerts/${alert.type}.svg`;
        }
        else{
            image_path = "alerts/place_holder.svg";
        }

        return new window.google.maps.Marker({
            position: { lat: alert.lat, lng: alert.lng },
            icon: image_path,
            title: `${type_names[alert.type.substring(0, 2)]} ALERT`
        })
    }

    const ref = useRef();

    useEffect(() => {
        update();
    });

    function update() {
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