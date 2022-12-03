import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function validateId(id) {
    return id && !isNaN(id) && id > 0
}

export default function Register() {
    const router = useRouter();
    const [stops, setStops] = useState(undefined);
    const [connections, setConnections] = useState(undefined);
    const [selected, setSelected] = useState(undefined);

    const stop = router.query.stop;

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

    if (!validateId(stop)) {
        return <div>
            <h1>Malformed input. Please read a valid QR code.</h1>
        </div>
    }

    if (!connections || !stops) {
        return <div>
            <h1>Načítava sa...</h1>
        </div>
    }

    const stopObj = stops[stop]

    return <div>
        <h1>{stopObj.name}, {stopObj.district}</h1>
        <div>
            {stopObj.connections.map(connection => <button key={connection} onClick={() => setSelected(+connection)}>{connections[+connection].name}</button>)}
        </div>

        {selected && <div>
            <p>Kam cestujete?</p>
            <ul>
                {connections[selected].stops.map(stop => <li key={stop}>{stops[+stop].name}</li>)}
            </ul>
        </div>}
    </div>
}