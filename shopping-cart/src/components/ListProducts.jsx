import styles from "./ListProducts.module.css";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { scrollTop } from "../utilityFunctions";
function isEven(num) {
  if (num % 2 === 0) return true;
  else {
    return false;
  }
}
//component use to list product accept number to determine class name used
// if it's even it use image left side and detail on right
//other wise it reverse it and put image on right and detail on left
function ListProducts({ productsData }) {
  productsData.sort((a, b) => b.isNew - a.isNew);
  if (productsData === undefined)
    return <p>No headphones in stock right now.</p>;
  return (
    <ul className={styles.productsHolder}>
      {productsData.map((product, i) => (
        <ProductTemplate key={product.name} productObj={product} num={i} />
      ))}
    </ul>
  );
}
function ProductTemplate({ productObj, num }) {
  return (
    <li
      className={`${isEven(num) ? styles["flexRow"] : styles["flexReverse"]} ${
        styles.productHolder
      }`}
    >
      <div className={styles.imageHolder}>
        <picture>
          <source
            media="(min-width: 760 )"
            srcSet={`${productObj.image.desktop}`}
          />
          <source
            media="(min-width: 500 )"
            srcSet={`${productObj.image.tablet}`}
          />

          <img
            src={`${productObj.image.mobile}`}
            alt={productObj.name}
            className={styles.productImage}
          />
        </picture>
      </div>
      <div className={`${styles.flexColumn} ${styles.productDetailHolder}`}>
        {productObj.isNew && <p className={styles.productNew}> NEW PRODUCT</p>}
        <h2 className={styles.productName}>{productObj.name}</h2>
        <p className={styles.productDescription}>{productObj.description}</p>
        <Link
          to={`/${productObj.category}/${productObj.slug}`}
          onClick={(e) => {
            e.stopPropagation();
            scrollTop();
          }}
        >
          <div className={styles.btnHolder}>
            <button
              className={styles.seeProductBtn}
              onClick={(e) => {
                e.stopPropagation();
                scrollTop();
              }}
            >
              <span>SEE PRODUCT</span>
            </button>
          </div>
        </Link>
      </div>
    </li>
  );
}
ListProducts.propTypes = {
  productsData: propTypes.array,
};
ProductTemplate.propTypes = {
  productObj: propTypes.object,
  num: propTypes.number,
};

export default ListProducts;
