import styles from "./CartItem.module.css";
import { adjustName } from "../functions";
function CartItem({ product, quantity = 2, onIncQuantity, onDecQuantity }) {
  return (
    <li className={`${styles.productHolder} ${styles.flexRow}`}>
      <div className={styles.imageHolder}>
        <img src={product.image.mobile} alt={product.name} />
      </div>
      <div className={`${styles.productDetail} ${styles.flexColumn}`}>
        <p className={styles.productName}>{adjustName(product.name)}</p>
        <p className={styles.price}>${product.price}</p>
      </div>
      <div className={`${styles.btnHolder} ${styles.flexRow}`}>
        <button className={styles.decBtn} onClick={onDecQuantity}>
          -
        </button>
        <h3 className={styles.quantity}>{quantity}</h3>
        <button className={styles.incBtn} onClick={onIncQuantity}>
          +
        </button>
      </div>
    </li>
  );
}
export default CartItem;
