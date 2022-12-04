import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LineButton from "../../components/LineButton";

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

export default function Register() {
    const router = useRouter();
    const [stops, setStops] = useState(undefined);
    const [connections, setConnections] = useState(undefined);
    const [selected, setSelected] = useState({
        connection: undefined,
        stop: undefined
    });
    const [state, setState] = useState(STATE.WAITING);
    const stop = +router.query.stop;

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
        }).then(res => res.json()).then(data => {
            setState(STATE.FINISHED)
        })
    }

    if (!connections || !stops) {
        return <div>
            <h1>Načítava sa...</h1>
        </div>
    }

    if (!validateId(stop)) {
        return <div>
            <h1>Malformed input. Please read a valid QR code.</h1>
        </div>
    }

    if (state === STATE.SUBMITTING) {
        return <div>
            <h1>Odosielam...</h1>
        </div>
    }

    if (state === STATE.FINISHED) {
        return <div>
            <h1>Ďakujeme</h1>
        </div>
    }

    const stopObj = stops[stop]

    return <form onSubmit={submit}>
        <h1>{stopObj.name}, {stopObj.district}</h1>

        <div>
            <p>Na ktorú linku čakáte?</p>
            <div>
                {stopObj.connections.sort().map(connection => <LineButton key={connection} line={connections[+connection]} onClick={() => setSelectedData("connection", +connection)} />)}
            </div>
        </div>

        {selected.connection && <div>
            <p>Kam cestujete?</p>
            <div>
                {connections[selected.connection].stops.filter(s => +s !== stop).map(stop => <button key={stop} type={"button"} onClick={() => setSelectedData("stop", +stop)}>{stops[+stop].name}</button>)}
            </div>
        </div>}

        {selected.stop && <div>
            <button>Odoslať</button>
        </div>}
    </form>
}