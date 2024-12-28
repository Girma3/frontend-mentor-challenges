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
          <div className={`${styles.flexRow} ${styles.socialIcons}`}>
            <div>
              <svg
                viewBox="0 0 32 32"
                className={styles.tgLogo}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="14" fill="inherit" />
                <path
                  d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_87_7225"
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#37BBFE" />
                    <stop offset="1" stopColor="#007DBB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <svg
                width="64"
                height="64"
                viewBox="0 0 512 509.64"
                fill="none"
                className={styles.xLogo}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="512" height="509.64" rx="115.61" ry="115.61" />
                <path
                  fill="#fff"
                  fillRule="nonzero"
                  d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z"
                />
              </svg>
            </div>
          </div>{" "}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
