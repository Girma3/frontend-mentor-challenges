import { useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";
import CartStatus from "./CartStatus";
import propTypes from "prop-types";
function Cart({ products, stockProducts }) {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  function cartProducts() {
    return products.filter((product) => product.addToCart === true);
  }
  let addedToCart = cartProducts();
  function handleShowStatus() {
    setShow((prevShow) => !prevShow);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    if (show) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  return (
    <div className={styles.cartHolder}>
      <button
        aria-label="cart items"
        className={styles.cart}
        onClick={(e) => {
          e.stopPropagation();
          handleShowStatus();
        }}
      >
        <p className={styles.itemsQuantity}>{addedToCart.length}</p>
      </button>
      {show && (
        <dialog open ref={modalRef}>
          <CartStatus
            show={show}
            allProducts={stockProducts}
            cartProducts={addedToCart}
          />
        </dialog>
      )}
    </div>
  );
}
Cart.propTypes = {
  products: propTypes.array,
};

export default Cart;
