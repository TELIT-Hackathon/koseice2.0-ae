import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LineButton from "../components/LineButton";
import LoadingScreen from "../components/LoadingScreen";
import styles from "../styles/Find.module.css";
import MainMenuForeign from "../components/MainMenuForeign";

export default function Find() {
    const [data, setData] = useState(undefined);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/find", {
            method: "POST",
            body: JSON.stringify({
                stop: +router.query.stop,
                destination: +router.query.destination,
                line: +router.query.line
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(data => data.json()).then(setData)
    }, [router.query.destination, router.query.line, router.query.stop]);

    if (!data) {
        return <LoadingScreen />
    }

    return <div className={styles.container}>
        <div className={styles.center}>
            <LineButton line={data.line} />
        </div>
        <p className={styles.centerText}>{data.stop.name} &gt; {data.destination.name}</p>

        <div className={styles.main}>
            <p>Najbližší odchod: {data.next[0]} min</p>
            <p>Frekvencia: {data.diff} min</p>
        </div>

        <p>Ďalšie ochody:</p>
        <ul>
            {data.next.map(time => <li key={time}>{time} min</li>)}
        </ul>

        <MainMenuForeign />
    </div>
}