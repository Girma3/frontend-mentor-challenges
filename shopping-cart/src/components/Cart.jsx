import { useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";
import CartStatus from "./CartStatus";
import propTypes from "prop-types";
/**
 * component that return cart item selected by user
 * productsData: array of products data holds images
 * allCartProducts: array of product that is added to cart
 * stockProducts : array of all products in stock
 */
function Cart({
  productsData,
  allCartProducts,
  stockProducts,
  onIncQuantity,
  onDecQuantity,
  onRemoveAll,
}) {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);

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
        <p className={styles.itemsQuantity}>{allCartProducts.length}</p>
      </button>
      {show && (
        <>
          <button className={styles.closeBtn}>x</button>
          <dialog
            open
            ref={modalRef}
            className={`${styles.flexColumn} ${styles.statusHolder}`}
          >
            <CartStatus
              productsData={productsData}
              allCartProducts={allCartProducts}
              onIncQuantity={onIncQuantity}
              onDecQuantity={onDecQuantity}
              onRemoveAll={onRemoveAll}
            />
          </dialog>
        </>
      )}
    </div>
  );
}
Cart.propTypes = {
  productsData: propTypes.array,
  stockProducts: propTypes.array,
  allCartProducts: propTypes.array,
  onIncQuantity: propTypes.func,
  onDecQuantity: propTypes.func,
  onRemoveAll: propTypes.func,
};

export default Cart;
