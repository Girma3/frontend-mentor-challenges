import { useNavigate } from "react-router-dom";
import styles from "./CartStatus.module.css";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { getProductData, calculateTotalPrice } from "../utilityFunctions";

function CartStatus({
  productsData,
  allCartProducts,
  onIncQuantity,
  onDecQuantity,
  onRemoveAll,
}) {
  const navigate = useNavigate();
  function handleCheckout() {
    navigate("/checkOut");
  }

  let cartProductData = getProductData(productsData, allCartProducts);
  let totalPrice = calculateTotalPrice(allCartProducts);

  return (
    <>
      <div className={`${styles.cartInfo} ${styles.flexRow}`}>
        <h2 className={styles.cartItems}>CART({allCartProducts.length})</h2>
        <button
          className={styles.removeAllBtn}
          onClick={onRemoveAll}
          disabled={allCartProducts.length ? false : true}
        >
          Remove All
        </button>
      </div>
      {!allCartProducts.length && (
        <>
          <h2>Your Cart is Empty.</h2>
          <p>
            continue shopping on the <b>audiophile</b> website{" "}
            <Link to="/">homepage</Link>{" "}
          </p>
        </>
      )}
      <ul>
        {cartProductData.map((product, i) => (
          <CartItem
            key={i}
            product={product}
            quantity={allCartProducts[i].demand}
            onDecQuantity={() => onDecQuantity(allCartProducts[i].productName)}
            onIncQuantity={() => onIncQuantity(allCartProducts[i].productName)}
            showButton={true}
          />
        ))}
      </ul>

      <div className={`${styles.flexColumn} ${styles.totalHolder}`}>
        <div className={`${styles.flexRow} ${styles.totalHolder}`}>
          <h2 className={styles.total}>TOTAL</h2>
          <p className={styles.totalPrice}>$ {totalPrice}</p>
        </div>

        <button
          className={styles.checkOutBtn}
          onClick={handleCheckout}
          disabled={allCartProducts.length ? false : true}
        >
          CHECKOUT
        </button>
      </div>
    </>
  );
}
CartStatus.propTypes = {
  productsData: propTypes.array,
  allCartProducts: propTypes.array,
  onIncQuantity: propTypes.func,
  onDecQuantity: propTypes.func,
  onRemoveAll: propTypes.func,
};
export default CartStatus;
