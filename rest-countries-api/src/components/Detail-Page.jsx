import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Detail-Page.module.css";
import { Link } from "react-router-dom";

function findCountry(array, name) {
  console.log(array, "hey");
  const result = array.find((country) => country.name === name);
  console.log();
  return result;
}

function findBorderCountry(countriesArray, bordersArray) {
  return countriesArray.filter((country) =>
    bordersArray.includes(country.alpha3Code)
  );
}
function Detail({ countries }) {
  const navigate = useNavigate();

  const x = useParams();

  console.log(x, x.name);
  console.log(countries);

  let country = findCountry(countries, x.name);
  console.log(country);

  return (
    <div className={styles["wrapper"]}>
      <Button className={"back-btn"} onAction={() => navigate(-1)}>
        Back
      </Button>

      <div className={styles["detail-holder"]}>
        <img
          src={`${country.flag}`}
          className={styles.flag}
          alt="country-flag"
        />
        <div className={styles["first-info"]}>
          <div className={styles["about-country"]}>
            <section>
              <h1 className={styles.name}>{country.name}</h1>
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
                Currencies:{" "}
                <span className={styles.info}>
                  {country.currencies[0].name}
                </span>{" "}
              </p>
              <p className={styles.detail}>
                Languages:{" "}
                <span className={styles.info}>{country.languages[0].name}</span>
              </p>
            </section>
          </div>
          <section>
            <h2 className={styles.detail}>Border Countries: </h2>
            {findBorderCountry(countries, country.borders).map((border) => (
              <button
                key={border.name}
                className={"border"}
                onClick={() => navigate(`/countries/${border.name}`)}
              >
                {" "}
                <span className={styles.info}>{border.name}</span>{" "}
              </button>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Detail;
