import styles from "./Header.module.css";
import Button from "./Button";
import { useTheme } from "./ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={`${styles["flexRow"]}  ${
        theme === "light" ? styles.lightMode : styles.darkMode
      }`}
    >
      <h1 className={styles.logo}>Where in the world ?</h1>
      <section>
        <Button
          className={`${styles.themeBtn} ${
            theme === "light" ? styles.lightMode : styles.darkMode
          }`}
          onAction={toggleTheme}
        >
          <svg
            className={`${
              theme === "light" ? styles.lightMoon : styles.darkMoon
            }`}
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={`${
                theme === "light" ? styles.lightMoon : styles.darkMoon
              }`}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
            ></path>
          </svg>
          Dark Mode
        </Button>
      </section>
    </header>
  );
}

export default Header;
