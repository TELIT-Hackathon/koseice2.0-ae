import styles from "../styles/MainMenu.module.css";
import {useState} from "react";
import Image from "next/image";

export default function MainMenu({setVehicles}) {
    const [expand, setExpand] = useState(false);

    function update(type) {
        setExpand(false)

        if (type === "MHD") {
            setVehicles({
                type: "MHD",
                list: []
            })
            return
        }

        fetch("/api/vehicles", {
            method: "POST",
            body: JSON.stringify({
                type: type
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(data => {
            setVehicles({
                type: type,
                list: data
            })
        })
    }

    return <div className={`${styles.menuBox} ${expand && styles.openMenuBox}`}>
        <div className={styles.toggleBox} onClick={() => setExpand(!expand)}>
            <div className={styles.toggleHandle}></div>
        </div>
        <div className={styles.buttonBox}>
            <div className={styles.buttonRow}>
                <div className={styles.smallButton} onClick={() => update("S")}>
                    <Image src={"/menu_btns/btnScooter.png"} height={60} width={175} alt={"Scooter button"} />
                </div>
                <div className={styles.smallButton} onClick={() => update("B")}>
                    <Image src={"/menu_btns/btnBike.png"} height={60} width={175} alt={"Bike button"} />
                </div>
            </div>
            <div className={styles.buttonRow}>
                <div className={styles.smallButton} onClick={() => update("M")}>
                    <Image src={"/menu_btns/btnMoped.png"} height={60} width={175} alt={"Moped button"} />
                </div>
                <div className={styles.smallButton}>
                    <Image src={"/menu_btns/btnCar.png"} height={60} width={175} alt={"Car button"} />
                </div>
            </div>
            <div className={styles.mhdButtonRow}>
                <div onClick={() => update("MHD")}>
                    <Image src={"/menu_btns/btnMHD.png"} height={65} width={363} alt={"MHD button"} />
                </div>
            </div>
        </div>
    </div>
}