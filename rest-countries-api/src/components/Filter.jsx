import styles from "./Filter.module.css";
import Button from "./Button";
import { useTheme } from "./ThemeContext";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";

function Filter({ onFilter, show, setShow }) {
  const { theme } = useTheme();
  function handleFilter(e) {
    onFilter(e);
    setShow(() => !show);
  }

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
              <Button className={styles["filter-btn"]} onAction={handleFilter}>
                Africa
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={handleFilter}>
                America
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={handleFilter}>
                Asia
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={handleFilter}>
                Europe
              </Button>
            </li>
            <li className={styles["filter-li"]}>
              <Button className={styles["filter-btn"]} onAction={handleFilter}>
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
