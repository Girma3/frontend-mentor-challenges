import CardLink from "./CardLink";
import propTypes from "prop-types";
const links = [
  {
    linkName: "HEADPHONES",
    productImage: "/assets/shared/image-category-thumbnail-headphones.png",
    imageAlt: "headphone",
    slug: "xx99-mark-one-headphones",
  },
  {
    linkName: "SPEAKERS",
    productImage: "/assets/shared/image-category-thumbnail-speakers.png",
    imageAlt: "speaker",
    slug: "zx9-speaker",
  },
  {
    linkName: "EARPHONES",
    productImage: "/assets/shared/image-category-thumbnail-earphones.png",
    imageAlt: "earphone",
    slug: "yx1-earphones",
  },
];
function ProductNav({ className = "productsCardNav", onCloseSelf }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <CardLink
          key={link.linkName}
          linkName={link.linkName.toLowerCase()}
          productImage={link.productImage}
          product={link.slug}
          onCloseSelf={onCloseSelf}
        />
      ))}
    </ul>
  );
}
ProductNav.propTypes = {
  className: propTypes.string,
  onCloseSelf: propTypes.func,
};
export default ProductNav;
