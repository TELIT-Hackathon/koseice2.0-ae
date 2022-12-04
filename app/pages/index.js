import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import Map from "../components/Map";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import MainMenu from "../components/MainMenu";
import {useState} from "react";
import MhdScanner from "../components/MhdScanner";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
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
                return <Map vehicles={vehicles} />;
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
