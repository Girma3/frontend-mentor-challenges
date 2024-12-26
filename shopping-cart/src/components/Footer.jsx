import PageNav from "./PageNav";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer>
      <PageNav navClass={styles.nav} linkClass={styles.links} />
      <div></div>
      <div className={`${styles.flexRow} ${styles.companyInfo}`}>
        <div className={styles.companyParHolder}>
          <p className={styles.aboutCompany}>
            Audiophile is an all in one stop to fulfill your audio
            needs.We&apos;re a small team of music lovers and sound specialists
            who are devoted to helping you get the most out of personal
            audio.Come and visit our demo facility - We&apos;re open 7 days a
            week.{" "}
          </p>
          <p className={styles.aboutCompany}>
            copyright 2024 ALL RIGHT RESERVED.
          </p>
        </div>
        <div className={styles.socialMedia}>
          <p className={`${styles.flexRow} ${styles.socialIcons}`}>telegram</p>{" "}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
