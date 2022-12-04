import {useRouter} from "next/router";
import styles from "../styles/Find.module.css";
import MainMenuForeign from "../components/MainMenuForeign";
import {type_names, available_severities, severity_descriptions} from "../data/alert_data";
import Image from "next/image";
import {useState} from "react";
import LoadingScreen from "../components/LoadingScreen";

const STATES = {
    WAITING: 0,
    SUBMITTING: 1,
    FINISHED: 2
}

export default function Report() {
    const [state, setState] = useState(STATES.WAITING);

    const router = useRouter();
    const id = router.query.id;

    if (!id) {
        return <div></div>
    }

    function submit(id) {
        let position = undefined;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((data) => {
                position = {lat: data.coords.latitude, lng: data.coords.longitude};
                setState(STATES.SUBMITTING)

                fetch("/api/addalert", {
                    method: "POST",
                    body: JSON.stringify({
                        type: +id,
                        lat: position.lat,
                        lng: position.lng
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then(data => data.json()).then(data => {
                    setState(STATES.FINISHED)
                })
            });

        } else {
            console.log("Location Not Available");
        }
    }

    if (state === STATES.SUBMITTING) {
        return <LoadingScreen />
    }
    if (state === STATES.FINISHED) {
        return <div className={styles.container}>
            <div className={styles.center}>
                <h1>Thank you for helping us make Košice a safer place.</h1>
            </div>
            <MainMenuForeign />
        </div>
    }

    return <div className={styles.container}>
        <div className={styles.center}>
            <h1>Report {type_names[id].toLowerCase()}</h1>
        </div>

        <div className={styles.alertMenu}>
            {(id === "16" ? ["210", "220", "230", "240", "250"] : available_severities[type_names[id]].map(el => id+el)).map(id => <div key={id} onClick={() => submit(id)}>
                <Image src={"/alerts/" + id + ".svg"} alt={"Alert button"} height={88} width={88} />
                <p style={{color: severity_descriptions[id].color, textAlign: "center", margin: "0"}}>{severity_descriptions[id].name}</p>
            </div> )}
        </div>
        <MainMenuForeign />
    </div>
}