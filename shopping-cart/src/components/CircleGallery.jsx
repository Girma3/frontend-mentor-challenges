import styles from "./CircleGallery.module.css";

function CircleGallery() {
  return (
    <section className={styles.flexColumn}>
      <div className={`${styles.circle} ${styles.firstCircle}`}></div>
      <div className={styles.topCircles}>
        <div className={`${styles.circle} ${styles.secondCircle}`}></div>
        <div className={`${styles.circle} ${styles.thirdCircle}`}></div>
      </div>
      <div className={styles.aboutProduct}>
        <picture>
          <source
            media="(min-width:760px)"
            srcSet="/assets/home/desktop/image-speaker-zx9.png"
          />
          <source
            media="(min-width:500px )"
            srcSet="/assets/home/tablet/image-speaker-zx9.png"
          />
          <img
            src="/assets/home/mobile/image-speaker-zx9.png"
            alt="zx9 speaker"
            className={styles.speakerImage}
          />
        </picture>
        <div className={styles.info}>
          <h2>ZX9 SPEAKER</h2>
          <p className={styles.aboutZx9Speaker}>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <div className={styles.btnHolder}>
            <button className={styles.seeProductBtn}>
              <span>SEE PRODUCT</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CircleGallery;
