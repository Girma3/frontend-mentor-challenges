import AboutCompany from "./AboutCompany";
import CardLink from "./CardLink";
import styles from "./ProductDetail.module.css";
import ProductSuggestCard from "./ProductSuggestCard";
import { useNavigate, useParams } from "react-router-dom";
function ProductDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  function handleBackBtn() {
    navigate(-1);
  }
  console.log(name);
  return (
    <>
      <section>
        <button className={styles.backBtn} onClick={handleBackBtn}>
          Go Back
        </button>
        <section className={styles.flexRow}>
          <div className={styles.image}>
            <img
              src="/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg"
              alt="ear"
              className={styles.productImage}
            />
          </div>
          <div className={`${styles.productAddHolder} ${styles.flexColum}`}>
            <h2 className={styles.productNew}>NEW PRODUCT</h2>
            <h2 className={styles.productNAme}>xx99 mark II headphones</h2>
            <p className={styles.productDescription}>
              {" "}
              The new XX99 Mark II headphones is the pinnacle of pristine audio.
              It redefines your premium headphone experience by reproducing the
              balanced depth and precision of studio-quality sound.,
            </p>
            <p className={styles.price}>$ 5678</p>

            <div className={`${styles.flexRow} ${styles.btnHolder}`}>
              <div className={styles.flexRow}>
                <button className={styles.decBtn}>-</button>
                <h2>0</h2>
                <button className={styles.incBtn}>+</button>
              </div>
              <div className={styles.btnHolder}>
                <button className={styles.addToCartBtn}>
                  <span>ADD TO CART</span>{" "}
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.flexRow} ${styles.featHolder}`}>
          <div className={styles.flexColum}>
            <h2>FEATURES</h2>
            <p className={styles.productFeat}>
              Featuring a genuine leather head strap and premium earcups, these
              headphones deliver superior comfort for those who like to enjoy
              endless listening. It includes intuitive controls designed for any
              situation. Whether you’re taking a business call or just in your
              own personal space, the auto on/off and pause features ensure that
              you’ll never miss a beat.
            </p>
            <p className={styles.productFeat}>
              The advanced Active Noise Cancellation with built-in equalizer
              allow you to experience your audio world on your terms. It lets
              you enjoy your audio in peace, but quickly interact with your
              surroundings when you need to. Combined with Bluetooth 5. 0
              compliant connectivity and 17 hour battery life, the XX99 Mark II
              headphones gives you superior sound, cutting-edge technology, and
              a modern design aesthetic.
            </p>
          </div>
          <div className={`${styles.flexColum} ${styles.inBox}`}>
            <h2>IN THE BOX</h2>
            <p>
              <span>x1</span> <span>unit</span>
            </p>
            <p>
              <span>x1</span> <span>unit</span>
            </p>
            <p>
              <span>x1</span> <span>unit</span>
            </p>
            <p>
              <span>x1</span> <span>unit</span>
            </p>
            <p>
              <span>x1</span> <span>unit</span>
            </p>
          </div>
        </section>
        <section className={styles.productGallery}>
          <div className={styles.productGalleryImageOne}>
            <img
              src="/assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg"
              alt="er"
              className={styles.galleyImage}
            />
          </div>
          <div className={styles.productGalleryImageTwo}>
            <img
              src="/assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg"
              alt="yu"
              className={styles.galleyImage}
            />
          </div>
          <div className={styles.productGalleryImageThree}>
            <img
              src="/assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg"
              alt="a"
              className={`${styles.galleyImage} ${styles.gallerySecondImage}`}
            />
          </div>
        </section>
        <section>
          <ul>
            <CardLink />
          </ul>
          <ul>
            <ProductSuggestCard />
          </ul>
        </section>
        <AboutCompany />
      </section>
    </>
  );
}
export default ProductDetail;
