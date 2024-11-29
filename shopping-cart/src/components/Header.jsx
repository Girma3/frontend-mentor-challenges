import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import propTypes from "prop-types";
function Header({ currentPage = "home", screenSize = 500 }) {
  const [show, setShow] = useState(false);
  function handleMobileMenu() {
    setShow(() => !show);
  }
  return (
    <header className={styles.header}>
      {screenSize < 760 && (
        <section className={styles.navHolder}>
          {show ? (
            <button
              data-show={show}
              onClick={handleMobileMenu}
              aria-label="open-menu"
            ></button>
          ) : (
            <button
              data-show={show}
              onClick={handleMobileMenu}
              aria-label="close-menu"
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
            <Link to="/headphones" className={styles.pageLink}>
              headphones
            </Link>
            <Link to="/speakers" className={styles.pageLink}>
              earphones
            </Link>
          </nav>
          <button className={styles.cart}></button>
        </section>
      )}
      <Hero />
    </header>
  );
}
function Hero() {
  return (
    <section className={styles.hero} role="banner">
      <div className={styles.productImage}></div>
      <div className={styles.aboutProduct}>
        <p>NEW PRODUCT</p>
        <h1>xx99</h1>
        <p className={styles.productDetail}>it is good product</p>
        <button>see product</button>
      </div>
    </section>
  );
}
Header.propTypes = {
  screenSize: propTypes.number,
  currentPage: propTypes.string,
};

export default Header;
