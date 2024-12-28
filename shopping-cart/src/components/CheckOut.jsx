import styles from "./CheckOut.module.css";
import CartItem from "./CartItem";
import {
  calculateTotalPrice,
  getProductData,
  scrollTop,
  validateForm,
} from "../utilityFunctions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import Hero from "./Hero";

const VAT = 0.2;
const SHIPPING_PRICE = 50;
function CheckOut({
  customer,
  handleInputChange,
  allProducts,
  allCartProducts,
  onConfirm,
  showMobileMenu,
  onCloseMobileNav,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  let navigate = useNavigate();
  function handleBack() {
    navigate("/");
  }
  function handleForSubmit(e) {
    e.preventDefault();
    let isFormEmpty = validateForm(customer);
    if (
      isFormEmpty[0].key === "eMoneyNumber" &&
      isFormEmpty[1].key === "pin" &&
      isFormEmpty.length === 2
    ) {
      setShowConfirm(() => true);
    }

    if (!isFormEmpty.length) {
      setShowConfirm(() => true);
    }
  }
  let total = calculateTotalPrice(allCartProducts);

  return (
    <>
      <Hero
        currentPage="checkout"
        mobileNav={showMobileMenu}
        onCloseSelf={onCloseMobileNav}
      />
      <main className={styles.checkoutHolder}>
        <button className={styles.backBtn} onClick={handleBack}>
          Go Back
        </button>
        <section className={`${styles.formHolder}`}>
          <form className={styles.flexRow} onSubmit={(e) => handleForSubmit(e)}>
            <section className={styles.formInputHolder}>
              <h1 className={styles.title}>CHECKOUT</h1>
              <div className={styles.flexColumn}>
                <h2 className={styles.paymentType}>BILLING DETAILS</h2>
                <div className={styles.flexRow}>
                  <label htmlFor="customerName" className={styles.flexColumn}>
                    Name
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      minLength={2}
                      maxLength={50}
                      value={customer.customerName}
                      onChange={(e) => handleInputChange(e)}
                      autoComplete="true"
                      required
                    />
                  </label>

                  <label htmlFor="email" className={styles.flexColumn}>
                    Email Address
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customer.email}
                      onChange={(e) => handleInputChange(e)}
                      autoComplete="true"
                      required
                    />
                  </label>
                </div>

                <label htmlFor="phoneNumber" className={styles.flexColumn}>
                  Phone Number
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    min={5}
                    value={customer.phoneNumber}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </label>
              </div>
              <div>
                <h2 className={styles.paymentType}>SHIPPING INFO</h2>
                <label htmlFor="address" className={styles.flexColumn}>
                  Address
                  <input
                    type="text"
                    id="address"
                    name="address"
                    minLength={3}
                    value={customer.address}
                    onChange={(e) => handleInputChange(e)}
                    autoComplete="true"
                    required
                  />
                </label>
                <div className={styles.flexRow}>
                  <label htmlFor="zipCode" className={styles.flexColumn}>
                    ZIP Code
                    <input
                      type="number"
                      id="zipCode"
                      name="zipCode"
                      min={4}
                      value={customer.zipCode}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </label>

                  <label htmlFor="city" className={styles.flexColumn}>
                    City
                    <input
                      type="text"
                      id="city"
                      name="city"
                      minLength={3}
                      value={customer.city}
                      onChange={(e) => handleInputChange(e)}
                      autoComplete="true"
                      required
                    />
                  </label>
                </div>

                <label htmlFor="country" className={styles.flexColumn}>
                  Country
                  <input
                    type="text"
                    id="country"
                    name="country"
                    minLength={4}
                    value={customer.country}
                    onChange={(e) => handleInputChange(e)}
                    autoComplete="true"
                    required
                  />
                </label>
              </div>
              <div>
                <h2 className={styles.paymentType}>PAYMENT DETAILS</h2>
                <div>
                  <div className={`${styles.flexRow} ${styles.paymentHolder}`}>
                    <h2 className={styles.paymentMethod}>Payment Method</h2>
                    <div className={styles.flexColumn}>
                      <label htmlFor="eMoney" className={styles.radioLabel}>
                        <input
                          type="checkbox"
                          name="eMoney"
                          id="eMoney"
                          checked={customer.eMoney}
                          onChange={(e) => handleInputChange(e)}
                        />
                        e-Money
                      </label>

                      <label htmlFor="cash" className={styles.radioLabel}>
                        <input
                          type="checkbox"
                          name="cash"
                          id="cash"
                          checked={customer.cash}
                          onChange={(e) => handleInputChange(e)}
                        />
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                  {customer.eMoney && (
                    <div className={`${styles.flexRow} ${styles.eMoneyHolder}`}>
                      <label
                        htmlFor="eMoneyNumber"
                        className={styles.flexColumn}
                      >
                        e-Money Number
                        <input
                          type="number"
                          name="eMoneyNumber"
                          id="eMoneyNumber"
                          min={2}
                          value={customer.eMonyNumber}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </label>

                      <label htmlFor="pin" className={styles.flexColumn}>
                        e-Money PIN
                        <input
                          type="number"
                          name="pin"
                          id="pin"
                          min={2}
                          value={customer.pin}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </label>
                    </div>
                  )}
                  {customer.cash ? (
                    <div className={styles.cashPay}>
                      <img
                        src="/assets/checkout/icon-cash-on-delivery.svg"
                        alt="pay in cash"
                      />
                      <p className={styles.cashDeliver}>
                        The Cash on Delivery option enables you to pay in cash
                        when our delivery courier arrives at your residence.
                        Just make sure your address is correct so that your
                        order will not be cancelled.
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
            <Summary
              allProducts={allProducts}
              allCartProducts={allCartProducts}
              handleSubmit={handleForSubmit}
            />
          </form>
          {showConfirm && (
            <div className={styles.modalHolder}>
              <ConfirmOrderMessage
                allCartProducts={allCartProducts}
                cartProductData={allProducts}
                total={total}
                onConfirm={onConfirm}
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
}
function Summary({ allProducts, allCartProducts, handleSubmit }) {
  let totalPrice = calculateTotalPrice(allCartProducts);
  let priceWithVat = (totalPrice * VAT).toFixed();
  let grandTotal = (totalPrice + SHIPPING_PRICE).toFixed();
  let cartProductData = getProductData(allProducts, allCartProducts);

  return (
    <section className={styles.summaryHolder}>
      <h2 className={styles.summary}>SUMMARY</h2>
      <ul className={styles.productList}>
        {cartProductData.map((product, i) => (
          <CartItem
            key={i}
            product={product}
            quantity={allCartProducts[i].demand}
            showButton={false}
          />
        ))}
      </ul>
      <section className={styles.flexColumn}>
        <div className={styles.flexRow}>
          <p className={styles.paymentName}>TOTAL</p>
          <p className={styles.price}>$ {totalPrice}</p>
        </div>
        <div className={styles.flexRow}>
          <p className={styles.paymentName}>SHIPPING</p>
          <p className={styles.price}> $ {SHIPPING_PRICE}</p>
        </div>
        <div className={styles.flexRow}>
          <p className={styles.paymentName}>VAT(INCLUDED)</p>
          <p className={styles.price}>$ {priceWithVat}</p>
        </div>

        <div className={styles.flexRow}>
          <p className={styles.paymentName}>GRAND TOTAL</p>
          <p className={styles.grandTotal}>$ {grandTotal}</p>
        </div>
        <button
          type="submit"
          onSubmit={(e) => handleSubmit(e)}
          onClick={() => scrollTop()}
          className={styles.payBtn}
        >
          CONTINUE & PAY
        </button>
      </section>
    </section>
  );
}
function ConfirmOrderMessage({
  allCartProducts,
  cartProductData,
  total,
  onConfirm,
}) {
  let navigate = useNavigate();
  function handleBackHome() {
    navigate("/");
    onConfirm();
  }
  //when reset on confirm return
  if (!allCartProducts.length) {
    return;
  }

  let firstItemAddedName = allCartProducts[0].productName;
  let firstItemAdded = cartProductData.filter(
    (product) => product.slug === firstItemAddedName
  );
  let cartProductsLength = allCartProducts.length;

  return (
    <dialog open className={`${styles.flexColumn} ${styles.confirmModal} `}>
      <div className={styles.flexColumn}>
        <img
          src="/assets/checkout/icon-order-confirmation.svg"
          alt="right check mark"
          className={styles.checkMark}
        />
        <h3 className={styles.orderTitle}>
          THANK YOU <br /> FOR YOUR ORDER
        </h3>
        <p className={styles.confirmPar}>
          You will receive email confirmation shortly.
        </p>
      </div>
      <section>
        <div className={`${styles.flexRow} ${styles.confirmMsgHolder}`}>
          <div className={styles.flexColumn}>
            <ul>
              {
                <CartItem
                  key={"first-Item"}
                  product={firstItemAdded[0]}
                  quantity={allCartProducts[0].demand}
                  showButton={false}
                />
              }
            </ul>
            <hr className={styles.horizontalLine} />
            {cartProductsLength - 1 > 0 && (
              <p style={{ textAlign: "center" }}>
                and {cartProductsLength - 1} other
                {cartProductsLength - 1 >= 2 ? " items added" : " item added"}.
              </p>
            )}
          </div>

          <div className={styles.orderTotal}>
            <div className={styles.flexColumn}>
              <p className={styles.orderTotal}>GRAND TOTAL</p>
              <p className={styles.totalPrice}>{total}</p>
            </div>
          </div>
        </div>
        <button className={styles.confirmBtn} onClick={handleBackHome}>
          BACK TO HOME
        </button>
      </section>{" "}
    </dialog>
  );
}
CheckOut.propTypes = {
  customer: propTypes.object,
  allProducts: propTypes.array,
  allCartProducts: propTypes.array,
  handleInputChange: propTypes.func,
  onConfirm: propTypes.func,
  showMobileMenu: propTypes.bool,
  onCloseMobileNav: propTypes.func,
};
Summary.propTypes = {
  allProducts: propTypes.array,
  allCartProducts: propTypes.array,
  handleSubmit: propTypes.func,
};
ConfirmOrderMessage.propTypes = {
  allCartProducts: propTypes.array,
  cartProductData: propTypes.array,
  total: propTypes.number,
  onConfirm: propTypes.func,
};
export default CheckOut;
