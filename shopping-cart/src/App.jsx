import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
//components
import CheckOut from "./components/CheckOut.jsx";
import Header from "./components/Header.jsx";
import Cart from "./components/Cart.jsx";
import AddedToCartNotification from "./components/AddedToCartNotification.jsx";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail.jsx";
import Loading from "./components/Loading.jsx";
//custom hooks
import useFetch from "./hooks/useFetch.jsx";
import useLocalStorageState from "./hooks/useLocalStorage.jsx";
//pages
import Home from "./pages/Home";
import Speakers from "./pages/Speakers";
import EarPhones from "./pages/EarPhones";
import HeadPhones from "./pages/HeadPhones";
//functions and objects
import {
  getProduct,
  PersonalInfo,
  productsInStore,
  cartProducts,
} from "./utilityFunctions.js";
import "./index.css";

//reducer action types
const ACTIONS = {
  INCREMENT_QUANTITY: "incQuantity",
  DECREMENT_QUANTITY: "decQuantity",
  PRODUCT_QUANTITY_INPUT: "quantityInput",
  ADD_TO_CART: "addToCart",
  REMOVE_FROM_CART: "removeFromCart",
  REMOVE_ALL_FROM_CART: "removeAllFromCart",
  UPDATE_CHECKOUT_FORM_FIELD: "updateCheckOutField",
  RESET_CHECKOUT_FORM: "restCheckOutForm",
};

const availableProducts = productsInStore;
const initialForm = PersonalInfo();

function customerInfoReducer(checkOutForm, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_CHECKOUT_FORM_FIELD:
      if (action.field === "eMoney") {
        const newValue = action.value;
        return { ...checkOutForm, eMoney: newValue, cash: !newValue };
      }
      if (action.field === "cash") {
        const newValue = action.value;
        return { ...checkOutForm, cash: newValue, eMoney: !newValue };
      }
      return { ...checkOutForm, [action.field]: action.value };
    case ACTIONS.RESET_CHECKOUT_FORM:
      return initialForm;
    default:
  }
}

function productReducer(allProducts, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT_QUANTITY:
      return allProducts.map((product) => {
        if (product.productName === action.productName) {
          if (product.inStock > product.demand) {
            return { ...product, demand: Number(product.demand) + 1 };
          }
          return product;
        } else {
          return product;
        }
      });
    case ACTIONS.DECREMENT_QUANTITY:
      return allProducts.map((product) => {
        if (product.productName === action.productName) {
          if (product.demand === 1) {
            return { ...product, demand: 0, addToCart: false };
          }
          if (product.demand > 0) {
            return { ...product, demand: Number(product.demand) - 1 };
          }
          return product;
        } else {
          return product;
        }
      });
    case ACTIONS.PRODUCT_QUANTITY_INPUT:
      return allProducts.map((product) => {
        if (product.productName === action.productName) {
          if (action.value < 0) return product;
          if (action.value <= product.inStock) {
            if (action.value === 0) {
              return { ...product, demand: action.value, addToChart: false };
            }
            return { ...product, demand: action.value };
          } else {
            return { ...product, demand: product.demand };
          }
        } else {
          return product;
        }
      });
    case ACTIONS.ADD_TO_CART:
      return allProducts.map((product) => {
        if (product.productName === action.productName) {
          if (product.addToCart === false && product.demand > 0) {
            return { ...product, addToCart: true };
          } else {
            return product;
          }
        } else {
          return product;
        }
      });
    case ACTIONS.REMOVE_FROM_CART:
      return allProducts.map((product) => {
        if (product.productName === action.productName) {
          if (product.addToCart === true && product.demand > 0) {
            return { ...product, addToCart: false };
          } else {
            return product;
          }
        } else {
          return product;
        }
      });
    case ACTIONS.REMOVE_ALL_FROM_CART:
      return allProducts.map((product) => {
        return { ...product, addToCart: false, demand: 0 };
      });

    default:
      return allProducts;
  }
}

function App() {
  const [allStockProducts, setStockProducts] = useLocalStorageState(
    availableProducts,
    "allStockProducts"
  );
  const [allProducts, dispatch] = useReducer(productReducer, allStockProducts);
  const [productsDataArray, setProductsDataArray] = useLocalStorageState(
    [],
    "productsDataArray"
  );
  const { data, isLoading, error } = useFetch("/data/data.json");
  const [pageLoad, setPageLoad] = useState(false);

  // console.log(allProducts);
  useEffect(() => {
    setStockProducts(() => allProducts);
  }, [allProducts, setStockProducts]);

  const [notification, setNotification] = useLocalStorageState(
    0,
    "notification"
  );

  const [cartMsg, setCartMsg] = useState("");
  const [customerInfo, dispatchCustomerInfo] = useReducer(
    customerInfoReducer,
    initialForm
  );

  function handleIncProductQuantity(name) {
    dispatch({ type: ACTIONS.INCREMENT_QUANTITY, productName: name });
  }
  function handleDecProductQuantity(name) {
    dispatch({ type: ACTIONS.DECREMENT_QUANTITY, productName: name });
  }
  function handleQuantityInput(e, name) {
    dispatch({
      type: ACTIONS.PRODUCT_QUANTITY_INPUT,
      productName: name,
      value: e.target.value,
    });
  }
  function handleAddToCart(name) {
    dispatch({ type: ACTIONS.ADD_TO_CART, productName: name });
  }
  function handleRemoveAllFromCart() {
    dispatch({ type: ACTIONS.REMOVE_ALL_FROM_CART });
  }
  function handelCheckOutForm(e) {
    const { name, value, type, checked } = e.target;

    dispatchCustomerInfo({
      type: ACTIONS.UPDATE_CHECKOUT_FORM_FIELD,
      field: name,
      value: type === "checkbox" ? checked : value,
    });
  }
  function handleResetAll() {
    dispatchCustomerInfo({ type: ACTIONS.RESET_CHECKOUT_FORM });
    dispatch({ type: ACTIONS.REMOVE_ALL_FROM_CART });
  }

  //store products data
  useEffect(() => {
    if (productsDataArray.length > 0) return;
    setPageLoad(() => !pageLoad);
    setProductsDataArray([...data]);
    setPageLoad(() => !pageLoad);
  }, [data, pageLoad, productsDataArray.length, setProductsDataArray]);

  const headPhones = getProduct(productsDataArray, "headphones");
  const earPhones = getProduct(productsDataArray, "earphones");
  const speakers = getProduct(productsDataArray, "speakers");
  let itemsAddedToCart = cartProducts(allStockProducts);

  // notification when cart item quantity changed

  useEffect(() => {
    setNotification((prevState) => {
      const newValue = itemsAddedToCart.length;
      let msg = "";

      if (prevState === undefined || newValue === 0 || prevState === newValue)
        return newValue;

      if (prevState !== undefined) {
        if (prevState > newValue) {
          msg = `1 item removed from cart ,you have ${newValue} ${
            newValue > 1 ? "items" : "item"
          } in cart`;
        } else if (newValue > prevState) {
          msg = `1 item added to cart, you have ${newValue}  ${
            newValue > 1 ? "items" : "item"
          } in cart`;
        }
        setCartMsg(() => msg);
      }
      return newValue;
    });
  }, [itemsAddedToCart.length, setNotification]);

  // screen size to adjust styles
  const [showMenu, setShowMenu] = useState(false);
  function handleMobileMenu() {
    setShowMenu(() => !showMenu);
  }
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //hide mobile menu on large screen if it is open
  useEffect(() => {
    if (screenSize < 760) return;
    setShowMenu(false);
  }, [screenSize, setShowMenu]);
  if (isLoading || !productsDataArray.length || pageLoad) return <Loading />;
  if (error === true) return <p>Please,reload again.</p>;

  return (
    <>
      <BrowserRouter>
        <header className="header">
          <Header
            show={showMenu}
            deviceSize={screenSize}
            onMobileMenu={handleMobileMenu}
          />

          {notification !== 0 && cartMsg && (
            <AddedToCartNotification message={cartMsg} />
          )}
          <Cart
            productsData={productsDataArray}
            allCartProducts={itemsAddedToCart}
            stockProducts={allStockProducts}
            onIncQuantity={handleIncProductQuantity}
            onDecQuantity={handleDecProductQuantity}
            onRemoveAll={handleRemoveAllFromCart}
          />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                requestedProduct={allProducts}
                showMobileMenu={showMenu}
                onCloseMobileNav={handleMobileMenu}
              />
            }
          ></Route>
          <Route
            path="/headphones"
            element={
              <HeadPhones
                productsData={headPhones}
                showMobileMenu={showMenu}
                onCloseMobileNav={handleMobileMenu}
              />
            }
          ></Route>
          <Route
            path="/headphones/:name"
            element={
              <ProductDetail
                productsData={headPhones}
                allProductsData={productsDataArray}
                stockProducts={allStockProducts}
                onIncProductQuantity={handleIncProductQuantity}
                onDecProductQuantity={handleDecProductQuantity}
                onQuantityInput={handleQuantityInput}
                onAddToCart={handleAddToCart}
                showMobileMenu={showMenu}
              />
            }
          />
          <Route
            path="/speakers"
            element={
              <Speakers
                productsData={speakers}
                showMobileMenu={showMenu}
                onCloseMobileNav={handleMobileMenu}
              />
            }
          ></Route>
          <Route
            path="/speakers/:name"
            element={
              <ProductDetail
                productsData={speakers}
                allProductsData={productsDataArray}
                stockProducts={allStockProducts}
                onIncProductQuantity={handleIncProductQuantity}
                onDecProductQuantity={handleDecProductQuantity}
                onQuantityInput={handleQuantityInput}
                onAddToCart={handleAddToCart}
                showMobileMenu={showMenu}
              />
            }
          />
          <Route
            path="/earphones"
            element={
              <EarPhones
                productsData={earPhones}
                showMobileMenu={showMenu}
                onCloseMobileNav={handleMobileMenu}
              />
            }
          ></Route>
          <Route
            path="/earphones/:name"
            element={
              <ProductDetail
                productsData={earPhones}
                allProductsData={productsDataArray}
                stockProducts={allStockProducts}
                onIncProductQuantity={handleIncProductQuantity}
                onDecProductQuantity={handleDecProductQuantity}
                onQuantityInput={handleQuantityInput}
                onAddToCart={handleAddToCart}
                showMobileMenu={showMenu}
              />
            }
          />
          <Route
            path="checkOut"
            element={
              <CheckOut
                customer={customerInfo}
                handleInputChange={handelCheckOutForm}
                allProducts={productsDataArray}
                allCartProducts={itemsAddedToCart}
                onConfirm={handleResetAll}
                showMobileMenu={showMenu}
                onCloseMobileNav={handleMobileMenu}
              />
            }
          ></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
