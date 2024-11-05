import styles from "./CountryList.module.css";
import Card from "./Card";
import { useEffect } from "react";

function CountryList({ countries, onDetail }) {
  useEffect(
    function () {
      onDetail(false);
    },
    [onDetail]
  );

  return (
    <ul className={styles["list-holder"]}>
      {countries.map((country) => (
        <Card key={country.name.common || data.name} data={country} />
        //  <h1 key={country.name.common}>{country.name.official}</h1>
      ))}
    </ul>
  );
}

export default CountryList;
