import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import propTypes from "prop-types";
function Header({ currentPage, screenSize }) {
  const [show, setShow] = useState(false);
  function handleMobileMenu() {
    setShow(() => !show);
  }
  return (
    <header>
      {screenSize < 500 && (
        <>
          {show ? (
            <button
              data-show={show}
              onClick={handleMobileMenu}
              aria-label="open menu"
            ></button>
          ) : (
            <button
              data-show={show}
              onClick={handleMobileMenu}
              aria-label="close menu"
            ></button>
          )}
          <Link to="/" className={styles.logo}>
            <span className={styles.letter}>a</span>
            <span className={styles.letter}>u</span>
            <span className={styles.letter}>d</span>
            <span className={styles.letter}>i</span>
            <span className={styles.letter}>o</span>
            <span className={styles.letter}>p</span>
            <span className={styles.letter}>h</span>
            <span className={styles.letter}>i</span>
            <span className={styles.letter}>l</span>
            <span className={styles.letter}>e</span>
          </Link>

          <button className={styles.cart}></button>
        </>
      )}
    </header>
  );
}
Header.propTypes = {
  screenSize: propTypes.number,
  currentPage: propTypes.string,
};
Header.defaultProps = {
  screenSize: 400,
  currentPage: "",
};
export default Header;
