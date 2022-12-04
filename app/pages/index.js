import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import Map from "../components/Map";
import {getAlerts} from "../database/Connector";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import MainMenu from "../components/MainMenu";
import {useState} from "react";
import MhdScanner from "../components/MhdScanner";
import LoadingScreen from "../components/LoadingScreen";

export default function Home({local_alerts, global_alerts}) {
    const [vehicles, setVehicles] = useState({
        type: "",
        list: []
    });

    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return <LoadingScreen />;
            case Status.FAILURE:
                return <h1>Error, please try again.</h1>;
            case Status.SUCCESS:
                return <Map vehicles={vehicles} alerts={local_alerts} />;
        }
    };

    return (
        <div style={{
            overflowY: "hidden",
            position: "relative"
        }}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render} />
                {vehicles.type === "MHD" && <MhdScanner />}
            </main>

            <MainMenu setVehicles={setVehicles} />
        </div>
    )
}

export async function getStaticProps() {
    function IsProximal(point1, point2, radius=0.005) {

        return Math.abs(point1.lat - point2.lat) < radius && Math.abs(point1.lng - point2.lng) < radius
    }
    function GroupCloseAlerts(alerts){
        const groups = [];
        let i = 0;
        while (i < alerts.length) {
            const current = alerts[i];
            groups.push({type: current.type, position: {lat: current.lat, lng: current.lng}, occurrences: 1})
            let j = i + 1;
            while (j < alerts.length) {
                const target = alerts[j];
                if (target.type.toString().substring(0, 2) === current.type.toString().substring(0, 2) && IsProximal(target, current)) {
                    groups[i].occurrences++;
                    alerts.splice(j, 1)
                }
                else {
                    j++;
                }
            }
            i++;
        }
        return groups;
    }

    let res = await getAlerts();
    res = res.map(packet => {return {...packet}});

    let local_alerts = [];
    let global_alerts = [];

    res.forEach(alert => {
        if (alert.type.toString()[0] === "1") {
            local_alerts.push(alert);
        }
        else {
            if (!global_alerts.includes(alert.type)) {
                global_alerts.push(alert.type);
            }
        }
    })

    local_alerts = GroupCloseAlerts(local_alerts);

    return {
        props: { local_alerts: local_alerts, global_alerts: global_alerts},
        revalidate: 360, // In seconds
    }
}
