import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Detail-Page.module.css";
import { useTheme } from "./ThemeContext";
import { useEffect } from "react";

function findCountry(array, name) {
  return array.find(
    (country) => (country.name.official || country.name) === name
  );
}

function findBorderCountry(countriesArray, bordersArray) {
  return countriesArray.filter((country) =>
    bordersArray.includes(country.cca3)
  );
}
function Detail({ countries, onDetail }) {
  const navigate = useNavigate();
  const { name } = useParams();
  const { theme } = useTheme();
  let country = findCountry(countries, name);

  useEffect(
    function () {
      onDetail(true);
    },
    [onDetail]
  );
  const currencyKey = Object.keys(country.currencies)[0]; // get the first currency key
  const currencyName = country.currencies[currencyKey].name;
  const langKey = Object.keys(country.languages)[0]; // get language first key
  const langName = country.languages[langKey].name;
  let boarders = findBorderCountry(countries, country.borders); // get all the boarders using 'cca3' property

  return (
    <div className={styles["wrapper"]}>
      <Button
        className={`${styles.backBtn} ${
          theme === "light" ? styles.lightMode : styles.darkMode
        }`}
        onAction={() => navigate(-1)}
      >
        <svg
          className={`${
            theme === "light" ? styles.lightArrow : styles.darkArrow
          }`}
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"></path>
        </svg>
        <span className={styles.backText}>Back</span>
      </Button>

      <div className={styles["detail-holder"]}>
        <img
          src={`${country.flags.png}`}
          className={styles.flag}
          alt={`${country.name.common || country.name} flag`}
        />
        <div className={styles["first-info"]}>
          <div className={styles["about-country"]}>
            <section>
              <h1 className={styles.name}>
                {country.name.official || country.name}
              </h1>
              <p className={styles.detail}>
                Native-Name:
                <span className={styles.info}>{country.nativeName}</span>
              </p>
              <p className={styles.detail}>
                Region: <span className={styles.info}>{country.region}</span>
              </p>
              <p className={styles.detail}>
                Sub-Region:{" "}
                <span className={styles.info}>{country.subregion}</span>{" "}
              </p>
              <p className={styles.detail}>
                Capital: <span className={styles.info}>{country.capital}</span>
              </p>
            </section>
            <section className={styles["second-info"]}>
              <p className={styles.detail}>
                Top Level Domain:{" "}
                <span className={styles.info}>{country.topLevelDomain}</span>
              </p>
              <p className={styles.detail}>
                Currencies: <span className={styles.info}>{currencyName}</span>{" "}
              </p>
              <p className={styles.detail}>
                Languages: <span className={styles.info}>{langName}</span>
              </p>
            </section>
          </div>
          <section className={styles.borderHolder}>
            <h2 className={styles.detail}>Border Countries: </h2>
            {boarders.map((border) => (
              <Button
                key={border.name.common || border.name}
                className={`${styles.borderBtn} ${
                  theme === "light" ? styles.lightMode : styles.darkMode
                }`}
                onAction={() =>
                  navigate(`/countries/${border.name.official || border.name}`)
                }
              >
                {" "}
                <span className={styles.info}>
                  {border.name.common || border.name}
                </span>{" "}
              </Button>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Detail;
