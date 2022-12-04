import {ArrowPathIcon} from "@heroicons/react/24/outline";
import styles from "../styles/LoadingScreen.module.css"

export default function LoadingScreen() {
    return <div className={styles.container}>
        <div>
            <div className={styles.arrow}>
                <ArrowPathIcon />
            </div>
            <h1>Načítava sa...</h1>
        </div>
    </div>
}