import {useEffect, useRef, useState} from "react";
import MainMenuForeign from "../components/MainMenuForeign";

export default function QR() {
    const [stops, setStops] = useState(undefined);
    const [qr, setQR] = useState(undefined);

    const ref = useRef();

    useEffect(() => {
        fetch("/api/stops").then(data => data.json()).then(data => setStops(data));
    })

    function submit(e) {
        e.preventDefault();
        const val = ref.current.options[ref.current.selectedIndex].value;
        if (qr === val)
            return

        setQR(val)
    }

    if (stops === undefined) {
        return <div>
            <h1>Načítava sa...</h1>
        </div>
    }

    return <div>
        <h1>Generovať QR kód</h1>
        <form onSubmit={submit}>
            <select ref={ref}>
                {stops.map(stop => <option key={stop.id} value={stop.id}>{stop.name} ({stop.code}, {stop.district})</option>)}
            </select>
            <button>Generovať</button>
        </form>
        <img src={"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=mhd-stop=" + qr} />
        <p>ID: {qr}</p>
        <MainMenuForeign />
    </div>
}