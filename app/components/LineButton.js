import styles from "../styles/LineButton.module.css";

export default function LineButton({line, onClick}) {
    return <button className={styles.button} type={"button"} style={{
        background: line.background,
        color: line.color,
        borderRadius: line.bus ? "10px" : "20px"
    }} onClick={onClick}>{line.name}</button>
}