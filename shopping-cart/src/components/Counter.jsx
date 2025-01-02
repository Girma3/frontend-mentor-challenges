import propTypes from "prop-types";
import styles from "./ProductDetail.module.css";
function Counter({
  onDecProductQuantity,
  onIncProductQuantity,
  selectedProduct,
  onQuantityInput,
  onAddToCart,
  name,
}) {
  return (
    <>
      <section className={`${styles.flexRow} ${styles.quantityHolder}`}>
        <button
          aria-label="decrease-product-quantity"
          className={styles.decBtn}
          onClick={() => onDecProductQuantity(name)}
        >
          -
        </button>
        <span className={styles.msgMaxValue}>
          {Number(selectedProduct.inStock) === Number(selectedProduct.demand)
            ? "reach max value in stock"
            : ""}
        </span>
        <label htmlFor="productDemand" className={styles.hideLabel}></label>
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
        <div className={styles.btnHolder}>
          <button
            className={`${styles.addToCartBtn} ${
              selectedProduct.inStock > selectedProduct.demand
                ? ""
                : styles.disableBtn
            }`}
            disabled={selectedProduct.inStock < selectedProduct.demand}
            onClick={() => onAddToCart(name)}
          >
            <span>ADD TO CART</span>{" "}
          </button>
        </div>{" "}
      </section>
    </>
  );
}
Counter.propTypes = {
  selectedProduct: propTypes.object,
  onIncProductQuantity: propTypes.func,
  onDecProductQuantity: propTypes.func,
  onAddToCart: propTypes.func,
  onQuantityInput: propTypes.func,
  disableBtn: propTypes.func,
  name: propTypes.string,
};
export default Counter;
