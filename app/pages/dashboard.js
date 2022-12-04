import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import LoadingScreen from "../components/LoadingScreen";
import styles from "../styles/Find.module.css";
import MainMenuForeign from "../components/MainMenuForeign";
import {available_severities, severity_descriptions, type_names} from "../data/alert_data";
import Image from "next/image";
import LineButton from "../components/LineButton";

export default function Dashboard() {
    const [data, setData] = useState(undefined);
    const [lines, setLines] = useState(undefined);

    useEffect(() => {
        fetch("api/reportdata").then(data => data.json()).then(data => {
            let x = 0;
            data.data = JSON.parse(decodeURIComponent(data.data));
            setData(data);
            console.log(data);
        })

        fetch("/api/connections").then(data => data.json()).then(data => {
            const obj = {}
            for (const entry of data) {
                obj[entry.id] = entry;
                entry.stops = entry.stops.split(",")
            }
            setLines(obj);
        });
    }, [])

    if (!data || !lines) {
        return <LoadingScreen/>
    }

    function convert(time) {
        time = String(time)
        return time.substring(0, time.length - 2) + ":" + time.substring(time.length - 2)
    }

    return <div className={styles.container}>
        <div className={styles.center}>
            <h1>Report from {data.time}</h1>
        </div>

        <div className={styles.center}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <td>Line</td>
                    <td>Average Wait</td>
                    <td>Recommended schedule</td>
                </tr>
                </thead>
                <tbody>
                {data.data.map(el => <tr key={el.i}>
                    <td><LineButton line={lines[el.line]}/></td>
                    <td>{el.AvrageWait} min</td>
                    <td>{convert(el.DepartureTime)} &gt; {convert(el.NewDepartureTime)}</td>
                </tr>)}
                </tbody>
            </table>
        </div>

        <MainMenuForeign/>
    </div>
}