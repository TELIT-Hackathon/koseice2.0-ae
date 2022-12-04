import styles from "../../styles/Find.module.css";
import styles2 from "../../styles/MainMenu.module.css";
import LineButton from "../../components/LineButton";
import MainMenuForeign from "../../components/MainMenuForeign";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return <div className={styles.container}>
        <div className={styles.center}>
            <h1>Green Page</h1>
        </div>

        <div className={styles.center}>
            <div className={styles2.buttonBox}>
                <div className={styles2.buttonRow}>
                    <div className={styles2.smallButton}>
                        <Link href={"/green/ebike"}><Image src={"/menu_btns/btnBike.png"} alt={"Image"} height={60} width={175} /></Link>
                    </div>
                    <div className={styles2.smallButton}>
                        <Link href={"/green/emoped"}><Image src={"/menu_btns/btnMoped.png"} alt={"Image"} height={60} width={175} /></Link>
                    </div>
                </div>
                <div className={styles2.buttonRow}>
                    <div className={styles2.smallButton}>
                        <Link href={"/green/escooter"}><Image src={"/menu_btns/btnScooter.png"} alt={"Image"} height={60} width={175} /></Link>
                    </div>
                    <div className={styles2.smallButton}>
                        <Link href={"/green/mhd"}><Image src={"/greenslides/mhd_btn.png"} alt={"Image"} height={60} width={175} /></Link>
                    </div>
                </div>
            </div>
        </div>

        <MainMenuForeign />
    </div>
}