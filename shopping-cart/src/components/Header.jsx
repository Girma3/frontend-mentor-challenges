import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import propTypes from "prop-types";
function Header({
  show = false,
  deviceSize = window.innerWidth,
  onMobileMenu,
}) {
  return (
    <nav className={styles.header} aria-live="polite" role="navigation">
      {deviceSize < 760 && (
        <section className={styles.navHolder}>
          {show ? (
            <>
              <button
                data-show={show}
                onClick={onMobileMenu}
                aria-label="open-menu"
              ></button>
            </>
          ) : (
            <button
              data-show={show}
              onClick={onMobileMenu}
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
        </section>
      )}

      {deviceSize > 760 && (
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
              HOME
            </Link>
            <Link to="/speakers" className={styles.pageLink}>
              {" "}
              SPEAKERS
            </Link>
            <Link to="/headPhones" className={styles.pageLink}>
              HEADPHONES
            </Link>
            <Link to="/earPhones" className={styles.pageLink}>
              EARPHONES
            </Link>
          </nav>
        </section>
      )}
    </nav>
  );
}

Header.propTypes = {
  deviceSize: propTypes.number,
  show: propTypes.bool,
  onMobileMenu: propTypes.func,
};

export default Header;
