import styles from "./ProductDetail.module.css";
import AboutCompany from "./AboutCompany";
import ProductNav from "./ProductNav";
import ProductSuggestCard from "./ProductSuggestCard";
import { useNavigate, useParams } from "react-router-dom";
import propTypes from "prop-types";
import Hero from "./Hero";

function findCategory(array, name) {
  const item = array.filter((product) => product.slug === name);
  return item[0].category;
}
// component render clicked product using given product array and using it's name passed
//  list suggestion of other product using all products data array
function ProductDetail({
  productsData,
  allProductsData,
  stockProducts,
  onIncProductQuantity,
  onDecProductQuantity,
  onAddToCart,
  onQuantityInput,
  showMobileMenu,
  onCloseMobileNav,
}) {
  let { name } = useParams();
  const navigate = useNavigate();
  function handleBackBtn() {
    navigate(-1);
  }

  let product = productsData.filter((product) => product.slug === name)[0];
  let selectedProduct = stockProducts.filter(
    (product) => product.productName === name
  )[0];

  function disableBtn() {
    return selectedProduct.inStock > selectedProduct.demand;
  }

  const features = product.features;
  let index = features.indexOf("\n\n");
  let part1 = features.substring(0, index);
  let part2 = features.substring(index + 2);

  if (product === undefined) return <p>no product</p>;

  return (
    <>
      <Hero
        currentPage="product"
        mobileNav={showMobileMenu}
        onCloseSelf={onCloseMobileNav}
      />{" "}
      <main>
        <section>
          <button className={styles.backBtn} onClick={() => handleBackBtn()}>
            Go Back
          </button>
          <section className={styles.flexRow}>
            <div className={styles.image}>
              <picture>
                <source
                  media="(min-width: 760)"
                  srcSet={`${product.image.desktop}`}
                />
                <source
                  media="(min-width:500 )"
                  srcSet={`${product.image.tablet}`}
                />

                <img
                  src={`${product.image.mobile}`}
                  alt="ear"
                  className={styles.productImage}
                />
              </picture>
            </div>
            <div className={`${styles.productAddHolder} ${styles.flexColumn}`}>
              {product.isNew && (
                <h2 className={styles.productNew}>NEW PRODUCT</h2>
              )}
              <h2 className={styles.productName}>{name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.price}>$ 5678</p>

              <div className={`${styles.flexRow} ${styles.btnHolder}`}>
                <div className={`${styles.flexRow} ${styles.quantityHolder}`}>
                  <button
                    aria-label="decrease-product-quantity"
                    className={styles.decBtn}
                    onClick={() => onDecProductQuantity(name)}
                  >
                    -
                  </button>
                  <span className={styles.msgMaxValue}>
                    {Number(selectedProduct.inStock) ===
                    Number(selectedProduct.demand)
                      ? "reach max value in stock"
                      : ""}
                  </span>
                  <label
                    htmlFor="productDemand"
                    className={styles.hideLabel}
                  ></label>
                  <input
                    type="number"
                    name="productDemand"
                    id="productDemand"
                    max={Number(selectedProduct.inStock)}
                    value={Number(selectedProduct.demand)}
                    aria-label="product-demand-quantity"
                    className={styles.productQuantity}
                    onChange={(e) => onQuantityInput(e, name)}
                  />

                  <button
                    aria-label="increase-product-quantity"
                    className={styles.incBtn}
                    onClick={() => onIncProductQuantity(name)}
                  >
                    +
                  </button>
                </div>
                <div className={styles.btnHolder}>
                  <button
                    className={`${styles.addToCartBtn} ${
                      selectedProduct.inStock > selectedProduct.demand
                        ? ""
                        : styles.disableBtn
                    }`}
                    disabled={!disableBtn()}
                    onClick={() => onAddToCart(name)}
                  >
                    <span>ADD TO CART</span>{" "}
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className={`${styles.flexRow} ${styles.featHolder}`}>
            <article className={`${styles.flexColumn} ${styles.feat}`}>
              <h2 className={styles.title}>FEATURES</h2>
              <p className={`${styles.productFeat}`}>{part1}</p>
              <p className={`${styles.productFeat}`}>{part2}</p>
            </article>
            <div className={`${styles.flexColumn} ${styles.inBox}`}>
              <h2 className={styles.title}>IN THE BOX</h2>
              <ul>
                {product.includes.map((items, i) => (
                  <li key={i}>
                    <p>
                      <span className={styles.quantity}>
                        {" "}
                        {items.quantity}x
                      </span>
                      <span className={styles.itemNum}>{items.item}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.productGallery}>
            <div className={styles.productGalleryImageOne}>
              <picture>
                <source
                  media="(min-width: 760)"
                  srcSet={`${product.gallery[0].desktop}`}
                />
                <source
                  media="(min-width: 500)"
                  srcSet={`${product.gallery[0].tablet}`}
                />

                <img
                  src={`${product.gallery[0].mobile}`}
                  alt={name}
                  className={styles.galleyImage}
                />
              </picture>
            </div>
            <div className={styles.productGalleryImageTwo}>
              <picture>
                <source
                  media="(min-width: 760)"
                  srcSet={`${product.gallery[1].desktop}`}
                />
                <source
                  media="(min-width: 500)"
                  srcSet={`${product.gallery[1].tablet}`}
                />

                <img
                  src={`${product.gallery[1].mobile}`}
                  alt={name}
                  className={styles.galleyImage}
                />
              </picture>
            </div>
            <div className={styles.productGalleryImageThree}>
              <picture>
                <source
                  media="(min-width: 760)"
                  srcSet={`${product.gallery[2].desktop}`}
                />
                <source
                  media="(min-width: 500)"
                  srcSet={`${product.gallery[2].tablet}`}
                />

                <img
                  src={`${product.gallery[2].mobile}`}
                  alt={name}
                  className={`${styles.galleyImage} ${styles.gallerySecondImage}`}
                />
              </picture>
            </div>
          </section>
          <section>
            <h2 className={styles.suggestTitle}>YOU MAY ALSO LIKE</h2>
            <ul className={`${styles.flexRow} ${styles.suggestProducts}`}>
              {product.others.map((item, i) => (
                <ProductSuggestCard
                  key={i}
                  suggestedProduct={item}
                  category={findCategory(allProductsData, item.slug)}
                />
              ))}
            </ul>{" "}
            <ul>
              <ProductNav />
            </ul>
          </section>
          <AboutCompany />
        </section>
      </main>
    </>
  );
}

ProductDetail.propTypes = {
  productsData: propTypes.array,
  allProductsData: propTypes.array,
  stockProducts: propTypes.array,
  onIncProductQuantity: propTypes.func,
  onDecProductQuantity: propTypes.func,
  onAddToCart: propTypes.func,
  onQuantityInput: propTypes.func,
  showMobileMenu: propTypes.bool,
  onCloseMobileNav: propTypes.func,
};
export default ProductDetail;
