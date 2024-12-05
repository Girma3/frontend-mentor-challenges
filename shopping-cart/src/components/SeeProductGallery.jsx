import CircleGallery from "./CircleGallery";
import styles from "./SeeProductGallery.module.css";
function SeeProductGallery() {
  return (
    <section>
      <CircleGallery />
      <section className={styles.speakerHolder}>
        <section className={styles.aboutSpeaker}>
          {" "}
          <h2 className={styles.speakerName}>ZX7 SPEAKER</h2>
          <div className={styles.btnHolder}>
            <button className={styles.seeProductBtn}>
              <span>SEE PRODUCT</span>
            </button>
          </div>
        </section>
      </section>
      <section className={`${styles.earPhoneHolder} `}>
        <section className={styles.earPhoneImage}>
          <picture>
            <source
              media="(min-width:760 )"
              srcSet="/assets/home/desktop/image-earphones-yx1.jpg"
            />

            <source
              media="(min-width:500px)"
              srcSet="/assets/home/tablet/image-earphones-yx1.jpg"
            />
            <img
              src="/assets/home/mobile/image-earphones-yx1.jpg"
              alt="yx1 earphone"
              className={styles.earPhoneImage}
            />
          </picture>
        </section>
        <section className={styles.aboutEarPhone}>
          {" "}
          <h2 className={styles.earPhoneName}>ZX7 SPEAKER</h2>
          <div className={styles.btnHolder}>
            <button className={styles.seeProductBtn}>
              <span>SEE PRODUCT</span>
            </button>
          </div>
        </section>
      </section>{" "}
    </section>
  );
}

export default SeeProductGallery;
