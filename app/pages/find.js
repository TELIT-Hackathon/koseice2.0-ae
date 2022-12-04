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
        if (!router.query.stop)
            return

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
        }).then(data => data.json()).then(data => {
            setData(data)
        })
    }, [router.query.destination, router.query.line, router.query.stop]);

    if (!data || data.message) {
        return <LoadingScreen />
    }

    function minuteDiff(time) {
        const now = new Date();
        const then = new Date(now.toDateString() + " " + time);
        return Math.round((then-now) / 60000)
    }

    function minuteDiffString(time) {
        time = minuteDiff(time);
        return time === 0 ? "teraz" : "o " + time + " min"
    }

    function getFrequency() {
        const diff = data.next.map(time => minuteDiff(time));
        let sum = 0;
        for (let i = 1; i < diff.length; i++) {
            sum += diff[i] - diff[i-1]
        }
        return Math.round(sum / (diff.length - 1))
    }

    return <div className={styles.container}>
        <div className={styles.center}>
            <LineButton line={data.line} />
        </div>
        <p className={styles.centerText}>{data.stop.name} &gt; {data.destination.name}</p>

        <div className={styles.main}>
            <p>Najbližší odchod: {data.next[0]} ({minuteDiffString(data.next[0])})</p>
            <p>Frekvencia: {getFrequency()} min</p>
        </div>

        <p>Ďalšie ochody:</p>
        <ul>
            {data.next.filter(time => data.next[0] !== time).map(time => <li key={time}>{time} ({minuteDiffString(time)})</li>)}
        </ul>

        <MainMenuForeign />
    </div>
}