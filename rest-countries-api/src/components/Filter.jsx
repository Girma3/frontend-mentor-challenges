import styles from "./Filter.module.css";
import Button from "./Button";
import { useTheme } from "./ThemeContext";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";

function Filter({ onFilter, show, setShow }) {
  const { theme } = useTheme();

  return (
    <div className={styles.wrapper}>
      <div>
        <Button
          className={`${styles.filter}  ${
            theme === "light" ? styles.lightMode : styles.darkMode
          }`}
          onAction={() => setShow(() => !show)}
        >
          Filter by Region{" "}
          <span>{show ? <MdKeyboardArrowUp /> : <IoIosArrowDown />}</span>
        </Button>

        {show && (
          <ul
            className={`${styles["dropdown-content"]}  ${
              theme === "light" ? styles.lightMode : styles.darkMode
            }`}
          >
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
