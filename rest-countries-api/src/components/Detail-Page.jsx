import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Detail-Page.module.css";
import { useTheme } from "./ThemeContext";
import { useEffect } from "react";

function findCountry(array, name, msg) {
  if (msg === "api") {
    return array.find((country) => country.name.common === name);
  } else if (msg === "local" || msg === null) {
    return array.find((country) => country.name === name);
  }
}

function findBorderCountry(countriesArray, bordersArray, msg) {
  if (bordersArray === undefined || bordersArray === null) return [];
  let nameProperty = "";
  if (msg === "api") {
    nameProperty = "cca3";
  } else if (msg === "local" || msg === null) {
    nameProperty = "alpha3Code";
  }
  return countriesArray.filter((country) =>
    bordersArray.includes(country[nameProperty])
  );
}
function Detail({ countries, onDetail, msg }) {
  const { name } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  let country = findCountry(countries, name, msg);

  useEffect(
    function () {
      onDetail(false);
    },
    [onDetail]
  );

  useEffect(
    function () {
      if (!name) return;
      document.title = `${name}`;
    },
    [name]
  );

  if (country === undefined) return <span> sorry, refresh again.</span>;
  let boarders = findBorderCountry(countries, country.borders, msg); // get all the borders
  let currencyName,
    langName,
    nativeName = "";
  langName = "";
  let currencyKey,
    langKey,
    nativeNameKey = "";
  //function to check the data coming from local json file or api call and get appropriate property
  function checkData(msg) {
    if (msg === "local" || msg === null) {
      langName = country.languages[0].name;
      nativeName = country.nativeName;
    } else if (msg === "api") {
      currencyKey = Object.keys(country.currencies)[0]; // get the first currency key
      currencyName = country.currencies[currencyKey].name;
      langKey = Object.keys(country.languages)[0]; // get language first key
      langName = country.languages[langKey];
      nativeNameKey = Object.keys(country.name.nativeName)[0];
      nativeName = `${nativeNameKey}: ${country.name.nativeName[nativeNameKey].common}`;
    }
  }
  checkData(msg);

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
        <div className={styles.flagContainer}>
          <img
            src={`${country.flags.png}`}
            alt={`${country.name.common || country.name} flag`}
            className={styles.flag}
          />
        </div>
        <div className={styles["first-info"]}>
          <div className={styles["about-country"]}>
            <section>
              <h1 className={styles.name}>
                {country.name.common || country.name}
              </h1>
              <p className={styles.detail}>
                Native-Name:
                <span className={styles.info}>{nativeName}</span>
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
                <span className={styles.info}>
                  {country.topLevelDomain || country.tld[0]}
                </span>
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
            <ul className={styles.borderList}>
              {" "}
              {boarders.map((border, i) => (
                <li key={border.name.common || i}>
                  <Button
                    key={border.name.common || border.name}
                    className={`${styles.borderBtn} ${
                      theme === "light" ? styles.lightMode : styles.darkMode
                    }`}
                    onAction={() =>
                      navigate(
                        `/countries/${border.name.common || border.name}`
                      )
                    }
                  >
                    {" "}
                    <span className={styles.info}>
                      {border.name.common || border.name}
                    </span>{" "}
                  </Button>{" "}
                </li>
              ))}
              {boarders.length === 0 && <span>none</span>}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Detail;
