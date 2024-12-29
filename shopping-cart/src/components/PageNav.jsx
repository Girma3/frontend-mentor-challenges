import { Link } from "react-router-dom";
import styles from "/src/components/Header.module.css";
import propTypes from "prop-types";
import { scrollTop } from "../utilityFunctions";
function PageNav({ navClass, linkClass }) {
  return (
    <nav className={navClass}>
      <Link to="/" className={styles.logo} onClick={() => scrollTop()}>
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

      <nav className={linkClass}>
        {" "}
        <Link to="/" className={styles.pageLink} onClick={() => scrollTop()}>
          HOME
        </Link>
        <Link
          to="/speakers"
          className={styles.pageLink}
          onClick={() => scrollTop()}
        >
          {" "}
          SPEAKERS
        </Link>
        <Link
          to="/headphones"
          className={styles.pageLink}
          onClick={() => scrollTop()}
        >
          HEADPHONES
        </Link>
        <Link
          to="/earphones"
          className={styles.pageLink}
          onClick={() => scrollTop()}
        >
          EARPHONES
        </Link>
      </nav>
    </nav>
  );
}
PageNav.propTypes = {
  navClass: propTypes.string,
  linkClass: propTypes.string,
};
export default PageNav;
