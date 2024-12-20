import PageNav from "./PageNav";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer>
      <PageNav navClass={styles.nav} linkClass={styles.links} />
      <p className={styles.aboutCompany}>
        Audiophile is an all in one stop to fulfill your audio needs.We&apos;re
        a small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio.Come and visit our demo
        facility - We&apos;re open 7 days a week.{" "}
      </p>
    </footer>
  );
}

export default Footer;
