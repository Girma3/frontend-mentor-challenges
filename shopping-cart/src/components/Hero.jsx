import propTypes from "prop-types";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";
function Hero({ currentPage = "Home" }) {
  return (
    <>
      {currentPage === "Home" && (
        <section className={styles.hero} role="banner">
          <div className={styles.productImage}></div>
          <div className={styles.aboutProduct}>
            <p>NEW PRODUCT</p>
            <h1>xx99</h1>
            <p className={styles.productDetail}>it is good product</p>
            <Link to="/headphones/xx99-mark-two-headphones">see product</Link>
          </div>
        </section>
      )}

      {currentPage !== "Home" && (
        <h1 className={styles.currentPage}>{currentPage}</h1>
      )}
    </>
  );
}
Hero.propTypes = {
  currentPage: propTypes.string,
};
export default Hero;
