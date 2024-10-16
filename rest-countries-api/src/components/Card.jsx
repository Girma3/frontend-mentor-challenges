import styles from "./Card.module.css";

function Card({ data }) {
  return (
    <button className={styles["card-holder"]}>
      <div className={styles.flag}>image</div>
      <div className={`flex-column ${styles["detail-holder"]}`}>
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.detail}>
          population: <span className={styles.info}>{data.population}</span>{" "}
        </p>
        <p className={styles.detail}>
          Region: <span className={styles.info}>{data.region}</span>{" "}
        </p>
        <p className={styles.detail}>
          capital: <span className={styles.info}>{data.capital}</span>
        </p>
      </div>
    </button>
  );
}

export default Card;
