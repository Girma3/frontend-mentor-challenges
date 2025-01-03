import ProductNav from "../components/ProductNav";
import SeeProductGallery from "../components/SeeProductGallery";
import AboutCompany from "../components/AboutCompany";
import Hero from "../components/Hero";
import propTypes from "prop-types";

function Home({ showMobileMenu, onCloseMobileNav }) {
  return (
    <>
      <Hero
        currentPage={"Home"}
        mobileNav={showMobileMenu}
        onCloseSelf={onCloseMobileNav}
      />
      <main>
        <nav>
          {" "}
          <ProductNav />
        </nav>
        <SeeProductGallery />
        <AboutCompany />
      </main>
    </>
  );
}
Home.propTypes = {
  showMobileMenu: propTypes.bool,
  onCloseMobileNav: propTypes.func,
};
export default Home;
