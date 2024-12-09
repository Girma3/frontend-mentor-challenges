import { Link, useNavigate } from "react-router-dom";
import styles from "./CardLink.module.css";
import propTypes from "prop-types";
function CardLink({
  linkName = "HOME",
  productImage = "/assets/shared/image-category-thumbnail-earphones.png",
  productImageAlt = "EARPHONE",
}) {
  const navigate = useNavigate();
  function handleRedirectPage() {
    navigate(`/${linkName}`);
  }
  return (
    <Link to={`/${linkName.toLowerCase()}`}>
      <li className={styles.card}>
        <div className={styles.productLinkImage}>
          <img src={`${productImage}`} alt={productImageAlt} />
        </div>
        <div className={styles.linkHolder}>
          <h2 className={styles.productName}>{linkName}</h2>
          <button className={styles.shopBtn} onClick={handleRedirectPage}>
            shop &gt;{" "}
          </button>
        </div>
      </li>
    </Link>
  );
}
CardLink.propTypes = {
  linkName: propTypes.string.isRequired,
  productImage: propTypes.string,
  productImageAlt: propTypes.string,
};

export default CardLink;
