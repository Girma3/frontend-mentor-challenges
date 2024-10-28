import { Link } from "react-router-dom";
import styles from "./Filter.module.css";
import { useState } from "react";
import Button from "./Button";

function Filter({ onFilter }) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div>
        <Button onAction={() => setShow(() => !show)}>
          Filter by Region <span>^</span>
        </Button>

        {show && (
          <ul className={styles["dropdown-content"]}>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={onFilter}>
                Africa
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={onFilter}>
                America
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={onFilter}>
                Asia
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={onFilter}>
                Europe
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={onFilter}>
                Oceania
              </Button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Filter;
