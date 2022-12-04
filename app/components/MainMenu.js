import styles from "../styles/MainMenu.module.css";
import {useState} from "react";
import Image from "next/image";

export default function MainMenu() {
    const [expand, setExpand] = useState(false);

    return <div className={`${styles.menuBox} ${expand && styles.openMenuBox}`}>
        <div className={styles.toggleBox} onClick={() => setExpand(!expand)}>
            <div className={styles.toggleHandle}></div>
        </div>
        <div className={styles.buttonBox}>
            <div className={styles.buttonRow}>
                <div className={styles.smallButton}>
                    <Image src={"/menu_btns/btnScooter.png"} height={60} width={175} alt={"Scooter button"} />
                </div>
                <div className={styles.smallButton}>
                    <Image src={"/menu_btns/btnBike.png"} height={60} width={175} alt={"Bike button"} />
                </div>
            </div>
            <div className={styles.buttonRow}>
                <div className={styles.smallButton}>
                    <Image src={"/menu_btns/btnMoped.png"} height={60} width={175} alt={"Moped button"} />
                </div>
                <div className={styles.smallButton}>
                    <Image src={"/menu_btns/btnCar.png"} height={60} width={175} alt={"Car button"} />
                </div>
            </div>
            <div className={styles.mhdButtonRow}>
                <div>
                    <Image src={"/menu_btns/btnMHD.png"} height={65} width={363} alt={"MHD button"} />
                </div>
            </div>
        </div>
    </div>
}