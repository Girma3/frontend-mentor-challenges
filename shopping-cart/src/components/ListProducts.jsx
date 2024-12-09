import styles from "./ListProducts.module.css";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
function isEven(num) {
  if (num % 2 === 0) return true;
  else {
    return false;
  }
}
//component use to list product accept number to determine class name used
// if it's even it use image left side and detail on right
//other wise it reverse it and put image on right and detail on left
function ListProducts({
  productType = "headPhones",
  productName = "xx",
  num = 0,
}) {
  return (
    <section
      className={`${styles.productHolder} ${
        isEven(num) ? styles["flexRow"] : styles["flexReverse"]
      }`}
    >
      <div className={styles.imageHolder}>
        <img
          src="/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg"
          alt="name"
          className={styles.productImage}
        />
      </div>
      <div className={`${styles.productDetailHolder} ${styles.flexColumn}`}>
        <p className={styles.productNew}> NEW PRODUCT</p>
        <h2 className={styles.productName}>XX99 MARK I HEADPHONES</h2>
        <p className={styles.productDescription}>
          As the gold standard for headphones, the classic XX99 Mark I offers
          detailed and accurate audio reproduction for audiophiles, mixing
          engineers, and music aficionados alike in studios and on the go.
        </p>
        <Link to={`/${productType}/${productName}`}>
          <div className={styles.btnHolder}>
            <button className={styles.seeProductBtn}>
              <span>SEE PRODUCT</span>
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}
ListProducts.propTypes = {
  num: propTypes.number,
  productType: propTypes.string,
  productName: propTypes.string,
};

export default ListProducts;
