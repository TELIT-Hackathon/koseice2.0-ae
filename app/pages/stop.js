import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LineButton from "../components/LineButton";
import LoadingScreen from "../components/LoadingScreen";
import styles from "../styles/Stop.module.css"
import Image from "next/image";
import {Autocomplete, TextField} from "@mui/material";
import {MagnifyingGlassIcon, MapPinIcon} from "@heroicons/react/24/outline";
import MainMenuForeign from "../components/MainMenuForeign";

function validateId(id) {
    return id && !isNaN(id) && id > 0
}

const STATE = {
    "LOADING": 0,
    "WAITING": 1,
    "SUBMITTING": 2,
    "FINISHED": 3,
    "MALFORMED": 4
}

export default function Stop() {
    const router = useRouter();
    const [stops, setStops] = useState(undefined);
    const [connections, setConnections] = useState(undefined);
    const [selected, setSelected] = useState({
        connection: undefined,
        stop: undefined
    });
    const [state, setState] = useState(STATE.WAITING);
    const stop = +router.query.id;

    useEffect(() => {
        if (!validateId(stop))
            return
        
        fetch("/api/stops").then(data => data.json()).then(data => {
            const obj = {}
            for (const entry of data) {
                obj[entry.id] = entry;
                entry.connections = entry.connections.split(",")
            }
            setStops(obj);
        })

        fetch("/api/connections").then(data => data.json()).then(data => {
            const obj = {}
            for (const entry of data) {
                obj[entry.id] = entry;
                entry.stops = entry.stops.split(",")
            }
            setConnections(obj);
        });
    }, [stop]);

    function setSelectedData(name, value) {
        setSelected(selected => {
            const newData = {...selected}
            newData[name] = value;
            return newData;
        })
    }

    function submit(e) {
        e.preventDefault();

        setState(STATE.SUBMITTING)

        fetch("/api/addrecord", {
            method: "POST",
            body: JSON.stringify({
                stop: stop,
                connection: selected.connection,
                destination: selected.stop
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(data => router.push("/find?stop=" + stop + "&destination=" + selected.stop + "&line=" + selected.connection))
    }

    if (!connections || !stops || state === STATE.SUBMITTING) {
        return <LoadingScreen />
    }

    if (!validateId(stop)) {
        return <div>
            <h1>Malformed input. Please read a valid QR code.</h1>
        </div>
    }

    const stopObj = stops[stop]
    const conns = stopObj.connections.sort();
    const buses = conns.filter(conn => connections[+conn].bus), trams = conns.filter(conn => !connections[+conn].bus)
    const shownStops = selected.connection ? connections[selected.connection].stops.map(s => +s).filter(s => s !== stop) : [];

    return <form onSubmit={submit} className={styles.container}>
        <div className={styles.stopTitle}>
            <h1>{stopObj.name}</h1>
            <p>{stopObj.district}</p>
        </div>


        <div>
            {trams && <div className={styles.lineBoxWrapper}>
                <div className={styles.lineBox}>
                    <div>
                        <Image src={"/pt_icons/tram.svg"} height={40} width={40} alt={"Tram icon"} />
                    </div>
                    <div>
                        <p>Električky</p>
                    </div>
                </div>
                {trams.map(connection => <LineButton key={connection} line={connections[+connection]} onClick={() => setSelected({
                    connection: +connection,
                    stop: undefined
                })} />)}
            </div>}
            {buses && <div className={styles.lineBoxWrapper}>
                <div className={styles.lineBox}>
                    <div>
                        <Image src={"/pt_icons/bus.svg"} height={40} width={40} alt={"Bus icon"} />
                    </div>
                    <div>
                        <p>Autobusy</p>
                    </div>
                </div>
                {buses.map(connection => <LineButton key={connection} line={connections[+connection]} onClick={() => setSelected({
                    connection: +connection,
                    stop: undefined
                })} />)}
            </div>}
        </div>

        {selected.connection && <div className={styles.lineBoxWrapper}>
            <p style={{fontWeight: "500", fontSize: "17px", marginTop: "40px"}}>Kam cestujete?</p>
            <div className={styles.stopButtons}>
                {connections[selected.connection].stops.filter(s => +s !== stop).map(stop => <button style={{border: selected.stop === +stop ? "1px solid green" : ""}} key={stop} type={"button"} onClick={() => setSelectedData("stop", +stop)} className={styles.stopButton}><MapPinIcon /> {stops[+stop].name}</button>)}
            </div>
        </div>}

        {selected.stop && <div className={styles.searchButton}>
            <button><MagnifyingGlassIcon /> Hľadať odchody</button>
        </div>}

        <MainMenuForeign />
    </form>
}