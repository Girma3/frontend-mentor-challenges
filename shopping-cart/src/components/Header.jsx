import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import propTypes from "prop-types";
import ProductNav from "./ProductNav";

function Header({ deviceSize = window.innerWidth }) {
  const [show, setShow] = useState(false);

  function handleMobileMenu() {
    setShow(() => !show);
  }
  const [screenSize, setScreenSize] = useState(deviceSize);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={styles.header} aria-live="polite">
      {screenSize < 760 && (
        <section className={styles.navHolder}>
          {show ? (
            <>
              <button
                data-show={show}
                onClick={handleMobileMenu}
                aria-label="open-menu"
              ></button>
            </>
          ) : (
            <button
              data-show={show}
              onClick={handleMobileMenu}
              aria-label="close-menu"
            ></button>
          )}
          <div to="/" className={styles.logo}>
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
          </div>
          <button className={styles.cart}></button>{" "}
        </section>
      )}
      {screenSize > 760 && (
        <section className={styles.nav}>
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
          <nav className={styles.links}>
            {" "}
            <Link to="/" className={styles.pageLink}>
              Home
            </Link>
            <Link to="/speakers" className={styles.pageLink}>
              {" "}
              speakers
            </Link>
            <Link to="/headPhones" className={styles.pageLink}>
              headphones
            </Link>
            <Link to="/earPhones" className={styles.pageLink}>
              earPhones
            </Link>
          </nav>
        </section>
      )}

      {show && screenSize < 760 && (
        <ul className={`${styles.cardLinks} ${styles.flexRow}`}>
          <ProductNav />
        </ul>
      )}
    </nav>
  );
}

Header.propTypes = {
  deviceSize: propTypes.number,
};

export default Header;
