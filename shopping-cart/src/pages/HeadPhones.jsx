import ListProducts from "../components/ListProducts";
import ProductNav from "../components/ProductNav";
import propTypes from "prop-types";
import AboutCompany from "../components/AboutCompany";
import Hero from "../components/Hero";

function HeadPhones({ productsData, showMobileMenu, onCloseMobileNav }) {
  return (
    <>
      <Hero
        currentPage={"HEADPHONES"}
        mobileNav={showMobileMenu}
        onCloseSelf={onCloseMobileNav}
      />
      <main>
        <ListProducts productsData={productsData} />
        <ProductNav />
        <AboutCompany />
      </main>
    </>
  );
}
HeadPhones.propTypes = {
  productsData: propTypes.array,
  showMobileMenu: propTypes.bool,
  onCloseMobileNav: propTypes.func,
};

export default HeadPhones;
