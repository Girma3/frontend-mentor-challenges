import { Link, useNavigate } from "react-router-dom";
import styles from "./CardLink.module.css";
import propTypes from "prop-types";
function CardLink({
  linkName = "earphones",
  productImage = "/assets/shared/image-category-thumbnail-earphones.png",
  product = "yx1-earphones",
  onCloseSelf
}) {
  const navigate = useNavigate();

  function handleRedirectPage() {
    navigate(`/${linkName}`);
    onCloseSelf()
  }
  return (
    <button className={styles.linkButton} onClick={handleRedirectPage}>
      <li className={styles.card}>
        <div className={styles.productLinkImage}>
          <img src={`${productImage}`} alt={product} />
        </div>
        <div className={styles.linkHolder}>
          <h2 className={styles.productName}>{linkName}</h2>
          <Link to={`/${linkName}/${product}`} className={styles.link}>
            <span>SHOP</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.shopSvg}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </li>
    </button>
  );
}
CardLink.propTypes = {
  linkName: propTypes.string.isRequired,
  productImage: propTypes.string,
  productImageAlt: propTypes.string,
  product: propTypes.string,
  onCloseSelf:propTypes.func
};

export default CardLink;
