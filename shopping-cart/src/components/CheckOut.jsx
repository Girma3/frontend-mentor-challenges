import styles from "./CheckOut.module.css";
function CheckOut() {
  return (
    <section className={`${styles.formHolder}`}>
      <form className={styles.flexRow}>
        <section>
          <h1 className={styles.title}>CHECKOUT</h1>
          <div className={styles.flexColumn}>
            <h2 className={styles.paymentType}>BILLING DETAILS</h2>
            <div className={styles.flexRow}>
              <label htmlFor="name" className={styles.flexColumn}>
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
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
                autoComplete="true"
                required
              />
            </label>
            <div className={styles.flexRow}>
              <label htmlFor="zipCode" className={styles.flexColumn}>
                ZIP Code
                <input type="text" id="zipCode" name="zipCode" required />
              </label>

              <label htmlFor="city" className={styles.flexColumn}>
                City
                <input
                  type="text"
                  id="city"
                  name="city"
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
                    <input type="radio" name="eMoney" id="eMoney" />
                    e-Money
                  </label>

                  <label htmlFor="cash" className={styles.radioLabel}>
                    <input type="radio" name="cash" id="cash" />
                    Cash on Delivery
                  </label>
                </div>
              </div>
              <div className={styles.flexRow}>
                <label htmlFor="eMoneyNumber" className={styles.flexColumn}>
                  e-Money Number
                  <input
                    type="number"
                    name="eMoneyNumber"
                    id="eMoneyNumber"
                    required
                  />
                </label>

                <label htmlFor="pin" className={styles.flexColumn}>
                  e-Money PIN
                  <input type="number" name="pin" id="pin" required />
                </label>
              </div>
            </div>
          </div>
        </section>
        <Summary />
      </form>
    </section>
  );
}
function Summary() {
  return (
    <section className={styles.summaryHolder}>
      <h2 className={styles.summary}>SUMMARY</h2>
      <ul className={styles.productList}>
        <li className={styles.flexRow}>
          <div className={styles.holder}>
            <div className={styles.productImage}></div>
            <div className={`${styles.product} ${styles.flexColumn}`}>
              <div className={styles.productName}>xxx</div>
              <div className={styles.productPrice}>$23</div>
            </div>
            <div className={styles.quantity}>x1</div>
          </div>
        </li>
      </ul>
      <section className={styles.flexColumn}>
        <div className={styles.flexRow}>
          <p className={styles.paymentName}>TOTAL</p>
          <p className={styles.price}> 5398</p>
        </div>
        <div className={styles.flexRow}>
          <p className={styles.paymentName}>SHIPPING</p>
          <p className={styles.price}> 98</p>
        </div>
        <div className={styles.flexRow}>
          <p className={styles.paymentName}>VAT(INCLUDED)</p>
          <p className={styles.price}> 108</p>
        </div>

        <div className={styles.flexRow}>
          <p className={styles.paymentName}>GRAND TOTAL</p>
          <p className={styles.grandTotal}> 398</p>
        </div>
        <button type="submit" className={styles.payBtn}>
          CONTINUE & PAY
        </button>
      </section>
    </section>
  );
}

export default CheckOut;
