import styles from "../../styles/Find.module.css";
import LineButton from "../../components/LineButton";
import MainMenuForeign from "../../components/MainMenuForeign";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return <div className={styles.container}>
        <div className={styles.center}>
            <h1>Green Page</h1>
        </div>

        <div>
            <div>
                <Link href={"/green/ebike"}>Ebike</Link>
            </div>

            <div>
                <Link href={"/green/emoped"}>Emoped</Link>
            </div>

            <div>
                <Link href={"/green/escooter"}>Escooter</Link>
            </div>

            <div>
                <Link href={"/green/mhd"}>MHD</Link>
            </div>

        </div>

        <MainMenuForeign />
    </div>
}