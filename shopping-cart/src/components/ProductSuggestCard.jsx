import styles from "./ProductSuggestCard.module.css";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

function ProductSuggestCard({ suggestedProduct, category }) {
  return (
    <li className={`${styles.card} ${styles.flexColumn}`}>
      <div className={`${styles.imageHolder} ${styles.flexRow}`}>
        <picture>
          <source
            media="(min-width: 760)"
            srcSet={`${suggestedProduct.image.desktop}`}
          />
          <source
            media="(min-width:500)"
            srcSet={`${suggestedProduct.image.tablet}`}
          />

          <img
            src={`${suggestedProduct.image.mobile}`}
            alt={suggestedProduct.name}
            className={styles.productImage}
          />
        </picture>
      </div>
      <h2 className={styles.productName}>{suggestedProduct.name}</h2>
      <div className={styles.btnHolder}>
        <Link
          to={`/${category}/${suggestedProduct.slug}`}
          className={styles.seeProductBtn}
        >
          <span>SEE PRODUCT</span>
        </Link>
      </div>
    </li>
  );
}
ProductSuggestCard.propTypes = {
  suggestedProduct: propTypes.object,
  category: propTypes.string,
};

export default ProductSuggestCard;
