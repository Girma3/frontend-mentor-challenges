import styles from "./Header.module.css";
function Header() {
  return (
    <div className={styles["flex-row"]}>
      <h1 className={styles.logo}>Where in the world ?</h1>
      <div>
        <button className={styles.dark}>
          <span>C</span>Dark Mode
        </button>
      </div>
    </div>
  );
}

export default Header;
