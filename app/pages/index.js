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
import AlertMenu from "../components/AlertMenu";
import Image from "next/image";

export default function Home({local_alerts, global_alerts, jams}) {
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
                return <Map vehicles={vehicles} alerts={local_alerts} jams={jams}/>;
        }
    };

    return (
        <div style={{
            overflowY: "hidden",
            position: "relative"
        }}>
            <Head>
                <title>OSD.ke</title>
                <meta name="description" content="Optimalizovaný systém dopravy mesta Košice"/>
                <link rel="icon" href="/alerts/143.svg"/>
            </Head>

            <main>
                <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render} libraries={["visualization"]} />
                {vehicles.type === "MHD" && <MhdScanner />}
            </main>

            <MainMenu setVehicles={setVehicles} />
            <AlertMenu />
            <div className={styles.alertContainer}>
                {global_alerts.map(id => <div key={id}><Image src={"/alerts/" + id + ".svg"} alt={"Weather icon"} height={60} width={60} /></div>)}
            </div>
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
    let jams = []

    res.forEach(alert => {
        if (alert.type.toString()[0] === "1") {
            local_alerts.push(alert);
            if (alert.type.toString()[1] === "1") {
                jams.push({lat: alert.lat, lng: alert.lng});
            }
        }
        else {
            if (!global_alerts.includes(alert.type)) {
                global_alerts.push(alert.type);
            }
        }
    })

    local_alerts = GroupCloseAlerts(local_alerts);

    return {
        props: { local_alerts: local_alerts, global_alerts: global_alerts, jams: jams},
        revalidate: 360, // In seconds
    }
}
