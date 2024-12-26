import CardLink from "./CardLink";
import styles from "./ProductNav.module.css";
const links = [
  {
    linkName: "headPhones",
    productImage: "/assets/shared/image-category-thumbnail-headphones.png",
    imageAlt: "headphone",
    slug: "xx99-mark-one-headphones",
  },
  {
    linkName: "speakers",
    productImage: "/assets/shared/image-category-thumbnail-speakers.png",
    imageAlt: "speaker",
    slug: "zx9-speaker",
  },
  {
    linkName: "earPhones",
    productImage: "/assets/shared/image-category-thumbnail-earphones.png",
    imageAlt: "earphone",
    slug: "yx1-earphones",
  },
];
function ProductNav({ className = "productsCardNav" }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <CardLink
          key={link.linkName}
          linkName={link.linkName}
          productImage={link.productImage}
          product={link.slug}
        />
      ))}
    </ul>
  );
}

export default ProductNav;
