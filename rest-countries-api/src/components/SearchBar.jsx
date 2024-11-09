import styles from "./SearchBar.module.css";
import { useTheme } from "./ThemeContext";
import { useEffect, useRef } from "react";
function SearchBar({ onAction, query, msg }) {
  const { theme } = useTheme();
  let inputEl = useRef(null);
  useEffect(function () {
    function callBack(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter" && inputEl.current) {
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", callBack);
    return () => document.addEventListener("keydown", callBack);
  }, []);

  return (
    <section className={styles.searchHolder}>
      <label htmlFor="search-country"></label>
      <input
        type="text"
        id="search-country"
        name="search-country"
        value={query}
        onChange={(e) => onAction(e)}
        ref={inputEl}
        maxLength={15}
        className={`${styles["search-input"]} ${
          theme === "light" ? styles.lightMode : styles.darkMode
        }`}
        placeholder="search for a country..."
      />
      <svg
        className={`${
          theme === "light" ? styles.lightSearch : styles.darkSearch
        } ${styles.searchGlass}`}
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
      </svg>
      <p className={styles.errorMsg}>
        {msg && (
          <span>
            with name <em>&quot;{query} &quot;</em>, {msg}
          </span>
        )}
      </p>
    </section>
  );
}

export default SearchBar;
