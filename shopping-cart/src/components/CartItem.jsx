import styles from "./CartItem.module.css";
import { adjustName } from "../utilityFunctions";
import propTypes from "prop-types";
function CartItem({
  product,
  quantity = 2,
  inStock,
  showButton = true,
  onIncQuantity,
  onDecQuantity,
}) {
  return (
    <li className={`${styles.productHolder} ${styles.flexRow}`}>
      <div className={styles.imageHolder}>
        <img src={product.image.mobile} alt={product.name} />
      </div>

      <div className={`${styles.productDetail} ${styles.flexColumn}`}>
        <p className={styles.productName}>{adjustName(product.name)}</p>
        <p className={styles.price}>${product.price}</p>
      </div>
      {showButton && (
        <div className={`${styles.btnHolder} ${styles.flexRow}`}>
          <button className={styles.decBtn} onClick={onDecQuantity}>
            -
          </button>
          <h3 className={styles.quantity}>{quantity}</h3>
          <button className={styles.incBtn} onClick={onIncQuantity}>
            +
          </button>
          {inStock <= quantity && (
            <span className={styles.msgMax}>max value in stock {inStock}</span>
          )}
        </div>
      )}
      {!showButton && <h3 className={styles.quantity}>x{quantity}</h3>}
    </li>
  );
}
CartItem.propTypes = {
  product: propTypes.object,
  quantity: propTypes.number,
  inStock: propTypes.number,
  onIncQuantity: propTypes.func,
  onDecQuantity: propTypes.func,
  showButton: propTypes.bool,
};
export default CartItem;
