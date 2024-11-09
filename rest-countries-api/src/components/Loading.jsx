import styles from "./Loading.module.css";
function Loading() {
  return (
    <div className={styles["loading-holder"]}>
      <ul className={styles["dot-holder"]}>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
      </ul>
    </div>
  );
}

export default Loading;
