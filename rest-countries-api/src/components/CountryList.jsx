import styles from "./CountryList.module.css";
import Card from "./Card";
import { useEffect } from "react";
function CountryList({ countries = [], onDetail = null, onAction }) {
  useEffect(
    function () {
      onDetail(true);
    },
    [onDetail]
  );

  return (
    <ul className={styles["listHolder"]}>
      {countries.map((country) => {
        let countryName = country.name.common || country.name;
        return (
          <Card key={`${countryName} `} data={country} onAction={onAction} />
        );
      })}
    </ul>
  );
}

export default CountryList;
