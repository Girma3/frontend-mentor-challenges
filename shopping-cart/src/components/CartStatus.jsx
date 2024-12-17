import { useNavigate } from "react-router-dom";
import styles from "./CartStatus.module.css";

function CartStatus({ show, cartProducts, allProducts }) {
  const navigate = useNavigate();
  function handleCheckout() {
    navigate("/checkOut");
  }

  let allCartProducts = cartProducts;

  function getProductData(allProducts, cartProducts) {
    return allProducts.filter((product) =>
      cartProducts.some((cartItem) => cartItem.productName === product.slug)
    );
  }

  let cartProductData = getProductData(allProducts, allCartProducts);
  console.log(allCartProducts);
  console.log(allProducts);
  console.log(cartProductData);
  return (
    <div className={`${styles.flexColumn} ${styles.statusHolder}`}>
      <div className={`${styles.cartInfo} ${styles.flexRow}`}>
        <h2 className={styles.cartItems}>CART({cartProducts.length})</h2>
        <button className={styles.removeAllBtn}>Remove All</button>
      </div>
      <div className={`${styles.productHolder} ${styles.flexRow}`}>
        <div className={styles.imageHolder}></div>
        <div className={`${styles.productDetail} ${styles.flexColumn}`}>
          <p className={styles.productName}>xx</p>
          <p className={styles.price}>$123</p>
        </div>
        <div className={`${styles.btnHolder} ${styles.flexRow}`}>
          <button className={styles.decBtn}>-</button>
          <h3 className={styles.quantity}>12</h3>
          <button className={styles.incBtn}>+</button>
        </div>
      </div>
      <div className={`${styles.flexColumn} ${styles.totalHolder}`}>
        <div className={`${styles.flexRow} ${styles.totalHolder}`}>
          <h2 className={styles.total}>TOTAL</h2>
          <p className={styles.totalPrice}>$ 2345</p>
        </div>
        <button className={styles.checkOutBtn} onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default CartStatus;
