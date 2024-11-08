import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
function Card({ data = {}, onAction }) {
  const { theme } = useTheme();

  let countryName = "";
  function checkData() {
    if (data.name.common === undefined) {
      countryName = data.name;
    } else {
      countryName = data.name.common;
    }
  }
  checkData();

  return (
    <li
      className={` ${theme === "light" ? styles.lightMode : styles.darkMode} 
     ${styles["card-holder"]}
      `}
      onClick={onAction}
    >
      <Link to={`/countries/${countryName}`}>
        <img
          src={`${data.flags.png}`}
          alt={`${data.flags.alt}`}
          className={styles.flag}
        />
        <div className={`flex-column ${styles["detail-holder"]}`}>
          <h1 className={styles.name}>{data.name.common || data.name}</h1>
          <p className={styles.detail}>
            population: <span className={styles.info}>{data.population}</span>{" "}
          </p>
          <p className={styles.detail}>
            Region: <span className={styles.info}>{data.region}</span>{" "}
          </p>
          <p className={styles.detail}>
            capital: <span className={styles.info}>{data.capital}</span>
          </p>
        </div>{" "}
      </Link>
    </li>
  );
}

export default Card;
