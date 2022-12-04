import styles from "../../styles/Find.module.css";
import Image from "next/image";
import MainMenuForeign from "../../components/MainMenuForeign";

export default function Page() {
    return <div className={styles.container2}>
        <Image src={"/greenslides/ebike.png"} alt={"image"} height={638} width={390} />
        <MainMenuForeign />
    </div>
}