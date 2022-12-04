import styles from "../styles/MainMenu.module.css";
import {Fragment, useState} from "react";
import Image from "next/image";
import Link from "next/link";

export default function AlertMenu() {
    const [expand, setExpand] = useState(false);

    function update(type) {
        setExpand(false)
    }

    return <Fragment>
        <div className={styles.reportButton} onClick={() => setExpand(true)}>
            <Image src={"/report_buttons/report.png"} alt={"Report button"} height={76} width={76} />
        </div>
        <div className={styles.menuBox} style={{
            bottom: expand ? "-30px" : "-359px",
            zIndex: 101
        }}>
            <div className={styles.toggleBox} onClick={() => setExpand(!expand)}>
                <div className={styles.toggleHandle}></div>
            </div>
            <div className={styles.buttonBox}>
                <div className={styles.buttonRow}>
                    <div className={styles.smallButton}>
                        <Link href={"/report?id=11"}><Image src={"/report_buttons/trafficjam.png"} height={60} width={175} alt={"Traffic jam button"} /></Link>
                    </div>
                    <div className={styles.smallButton} onClick={() => update("14")}>
                        <Image src={"/report_buttons/accident.png"} height={60} width={175} alt={"Accident button"} />
                    </div>
                </div>
                <div className={styles.buttonRow}>
                    <div className={styles.smallButton} onClick={() => update("13")}>
                        <Image src={"/report_buttons/hazard.png"} height={60} width={175} alt={"Hazard button"} />
                    </div>
                    <div className={styles.smallButton} onClick={() => update("12")}>
                        <Image src={"/report_buttons/roadwork.png"} height={60} width={175} alt={"Roadwork button"} />
                    </div>
                </div>
                <div className={styles.buttonRow}>
                    <div className={styles.smallButton} onClick={() => update("15")}>
                        <Image src={"/report_buttons/closedroad.png"} height={60} width={175} alt={"Closed road button"} />
                    </div>
                    <div className={styles.smallButton} onClick={() => update("16")}>
                        <Image src={"/report_buttons/weather.png"} height={60} width={175} alt={"Weather button"} />
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}