import styles from "./AboutCompany.module.css";
function AboutCompany() {
  return (
    <section className={styles.flexRow}>
      <div className={`${styles.flexColumn} ${styles.detailHolder}`}>
        <h1 className={styles.title}>
          BRINGING YOU THE <br />
          <span className={styles.best}>BEST</span> AUDIO GEAR
        </h1>
        <p className={styles.aboutCompany}>
          Located at the heart of New York City.Audiophile is the premier store
          for high end headphones,speakers,earphones and audion accessories.We
          have a large showroom and luxury demonstration rooms available for you
          to browse and experience a wide range of our products.Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className={`${styles.imageHolder} ${styles.flexRow}`}>
        <picture>
          <source
            media="(min-width: 760px)"
            srcSet="/assets/shared/desktop/image-best-gear.jpg"
          />
          <source
            media="(min-width:500px)"
            srcSet="/assets/shared/tablet/image-best-gear.jpg"
          />
          <img
            src="/assets/shared/mobile/image-best-gear.jpg"
            alt="guy wearing headphone"
          />
        </picture>
      </div>
    </section>
  );
}

export default AboutCompany;
