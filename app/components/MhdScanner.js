import QrReader from "react-qr-scanner";
import styles from "../styles/MhdSection.module.css"
import {useRouter} from "next/router";

export default function MhdScanner() {
    const router = useRouter();

    function handleScan(data){
        if (!data || !data.text || !data.text.startsWith("mhd-stop="))
            return

        router.push("/stop?id=" + data.text.substring(9))
    }

    function handleError(err){
        console.error(err)
    }

    return <main className={styles.container}>
        <div className={styles.inner}>
            <QrReader onError={handleError} onScan={handleScan} />
            <p>Use your camera to scan the QR code at your current destination to see where you can get</p>
        </div>
    </main>
}