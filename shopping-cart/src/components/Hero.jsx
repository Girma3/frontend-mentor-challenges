import propTypes from "prop-types";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";
import ProductNav from "./ProductNav";
function Hero({ currentPage = "Home", mobileNav = false, onCloseSelf }) {
  //hide page name on product detail and checkout page
  let hide =
    currentPage === "checkout" || currentPage === "product" ? "none" : "";

  return (
    <>
      {currentPage === "Home" && (
        <>
          <section className={styles.hero} role="banner">
            <div className={styles.productImage}></div>
            <div className={`${styles.aboutProduct} ${styles.flexColumn}`}>
              <p className={styles.newProduct}>NEW PRODUCT</p>
              <h1 className={styles.title}>XX99 MARK II HEADPHONES</h1>
              <p className={styles.productDetail}>
                Experience natural life like audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Link to="/headphones/xx99-mark-two-headphones">
                <div className={styles.btnHolder}>
                  <button className={styles.seeProductBtn}>
                    <span>SEE PRODUCT</span>
                  </button>
                </div>
              </Link>
            </div>
          </section>
        </>
      )}

      {currentPage !== "Home" && (
        <h1 className={styles.currentPage} style={{ display: hide }}>
          {currentPage}
        </h1>
      )}
      {mobileNav && (
        <nav className={styles.mobileNav}>
          <ProductNav className={styles.flexRow} onCloseSelf={onCloseSelf} />
        </nav>
      )}
    </>
  );
}
Hero.propTypes = {
  currentPage: propTypes.string,
  mobileNav: propTypes.bool,
  onCloseSelf: propTypes.func,
};
export default Hero;
