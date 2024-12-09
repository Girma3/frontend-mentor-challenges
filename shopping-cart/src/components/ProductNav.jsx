import CardLink from "./CardLink";
import styles from "./ProductNav.module.css";
const links = [
  {
    linkName: "HEADPHONES",
    productImage: "/assets/shared/image-category-thumbnail-headphones.png",
    imageAlt: "headphone",
  },
  {
    linkName: "SPEAKERS",
    productImage: "/assets/shared/image-category-thumbnail-speakers.png",
    imageAlt: "speaker",
  },
  {
    linkName: "EARPHONES",
    productImage: "/assets/shared/image-category-thumbnail-earphones.png",
    imageAlt: "earphone",
  },
];
function ProductNav() {
  return (
    <nav>
    <ul className={styles.flexRow}>
      {links.map((link) => (
        <CardLink
          key={link.linkName}
          linkName={link.linkName}
          productImage={link.productImage}
          productImageAlt={link.productImageAlt}
        />
      ))}
    </ul>
    </nav>
  );
}

export default ProductNav;
