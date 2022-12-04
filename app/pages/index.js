import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import Map from "../components/Map";
import {getAlerts} from "../database/Connector";

export default function Home({local_alerts, global_alerts}) {
    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return <h1>Loading...</h1>;
            case Status.FAILURE:
                return <h1>Error, please try again.</h1>;
            case Status.SUCCESS:
                return <Map alerts={local_alerts}/>;
        }
    };

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render} />
            </main>
        </div>
    )
}

export async function getStaticProps() {
    function RemoveCloseAlerts(alerts, start_index){
        let filtered_alerts = alerts.slice(0, start_index+1);
        let radius = 0.005;
        const self = alerts[start_index];
        let i = start_index + 1;
        while (i < alerts.length) {
            const alert = alerts[i];
            if (alert.type === self.type && Math.abs(alert.lat - self.lat) < radius && Math.abs(alert.lng - self.lng) < radius) {
                // console.log(Math.abs(alert.lat - self.lat));
                // if (!(Math.abs(alert.lat - self.lat) < radius && Math.abs(alert.lng - self.lng) < radius)) {
                //     filtered_alerts.push(alert);
                // }
                // else {
                //     i++;
                // }
            }
            else {
                filtered_alerts.push(alert);
            }
            i++;
        }

        return filtered_alerts;
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

    let i = 0;
    // console.log(local_alerts.length);
    while (i < local_alerts.length) {
        // console.log(local_alerts.length);
        local_alerts = RemoveCloseAlerts(local_alerts, i);
        i++;
    }
    // console.log(local_alerts.length);

    // console.log(res)

    // Pass data to the page via props
    return {
        props: { local_alerts: local_alerts },
        revalidate: 360, // In seconds
    }
}
