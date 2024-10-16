import Button from "./Button";
import styles from "./Detail-Page.module.css";
function Detail({ data }) {
  return (
    <div className={styles["wrapper"]}>
      <Button className={"back-btn"}>Back</Button>
      {/* <img src="m" alt="country-flag" /> */}

      <div className={styles["detail-holder"]}>
        <div className={styles.flag}></div>
        <div className={styles["first-info"]}>
          <div className={styles["about-country"]}>
            <section>
              <h1 className={styles.name}>{data.name}</h1>
              <p className={styles.detail}>
                Native-Name:
                <span className={styles.info}>{data.nativeName}</span>
              </p>
              <p className={styles.detail}>
                Region: <span className={styles.info}>{data.region}</span>
              </p>
              <p className={styles.detail}>
                Sub-Region:{" "}
                <span className={styles.info}>{data.subregion}</span>{" "}
              </p>
              <p className={styles.detail}>
                Capital: <span className={styles.info}>{data.capital}</span>
              </p>
            </section>
            <section className={styles["second-info"]}>
              <p className={styles.detail}>
                Top Level Domain:{" "}
                <span className={styles.info}>{data.topLevel / domain}</span>
              </p>
              <p className={styles.detail}>
                Currencies:{" "}
                <span className={styles.info}>{data.currencies[0].name}</span>{" "}
              </p>
              <p className={styles.detail}>
                Languages:{" "}
                <span className={styles.info}>{data.languages[0].name}</span>
              </p>
            </section>
          </div>
          <section>
            <h2 className={styles.detail}>Border Countries: </h2>
            {data.borders.map((border) => {
              <Button className={"border"}>
                {" "}
                <span className={styles.info}>{border}</span>{" "}
              </Button>;
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Detail;
