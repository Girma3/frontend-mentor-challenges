import ListProducts from "../components/ListProducts";
import ProductNav from "../components/ProductNav";
import propTypes from "prop-types";

import AboutCompany from "../components/AboutCompany";
import Hero from "../components/Hero";

function EarPhones({ productsData, showMobileMenu, onCloseMobileNav }) {
  return (
    <>
      <Hero
        currentPage={"EARPHONES"}
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
EarPhones.propTypes = {
  productsData: propTypes.array,
  showMobileMenu: propTypes.bool,
  onCloseMobileNav: propTypes.func,
};

export default EarPhones;
