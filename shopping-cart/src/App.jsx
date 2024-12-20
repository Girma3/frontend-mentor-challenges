import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HeadPhones from "./pages/HeadPhones";
import { useEffect, useState } from "react";
import Speakers from "./pages/Speakers";
import EarPhones from "./pages/EarPhones";
import ProductDetail from "./components/ProductDetail.jsx";
import CheckOut from "./components/CheckOut.jsx";
import useFetch from "./hooks/useFetch.jsx";
import useLocalStorageState from "./hooks/useLocalStorage.jsx";
import { useReducer } from "react";
import Header from "./components/Header.jsx";
import Cart from "./components/Cart.jsx";
import "./index.css";
import {
  getProduct,
  PersonalInfo,
  productsInMarket,
  cartProducts,
} from "./functions.js";
import AddedToCartNotification from "./components/AddedToCartNotification.jsx";

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

const availableProducts = productsInMarket;
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
          //  console.log(product.demand);
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
              return { ...product, product: action.value, addToChart: false };
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
  //const [allProducts, dispatch] = useReducer(productReducer, availableProducts);
  const [allCartProducts, setCartProducts] = useLocalStorageState(
    availableProducts,
    "allCartProducts"
  );
  const [allProducts, dispatch] = useReducer(productReducer, allCartProducts);
  const [products, setProducts] = useLocalStorageState([], "products");
  const { data, isLoading, error } = useFetch("data/data.json");

  // console.log(allProducts);
  useEffect(() => {
    setCartProducts(() => allProducts);
  }, [allProducts, setCartProducts]);

  console.log(allCartProducts);
  const [notification, setNotification] = useState(0);
  const [customerInfo, dispatchCustomerInfo] = useReducer(
    customerInfoReducer,
    initialForm
  );

  useEffect(() => {
    setNotification(() => allCartProducts.length);
  }, [allCartProducts.length]);
  // console.log(notification);
  // console.log(allCartProducts);
  // console.log(allCartProducts.length);

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
    setNotification(allProducts.length);
  }
  function handleRemoveFromCart(name) {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, productName: name });
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

  useEffect(() => {
    if (products.length > 0) return;

    setProducts([...data]);
  }, [products.length, data, setProducts]);

  const headPhones = getProduct(products, "headphones");
  const earPhones = getProduct(products, "earphones");
  const speakers = getProduct(products, "speakers");

  if (isLoading || !products.length) return <p>Loading...</p>;
  if (error === true) return <p>Please,reload again.</p>;

  return (
    <>
      <BrowserRouter>
        <header className="header">
          <Header />
          {notification && (
            <AddedToCartNotification message={notification.toString()} />
          )}
          <Cart
            products={products}
            allCartProducts={cartProducts(allProducts)}
            stockProducts={allCartProducts}
            onIncQuantity={handleIncProductQuantity}
            onDecQuantity={handleDecProductQuantity}
            onRemoveAll={handleRemoveAllFromCart}
          />
        </header>
        <Routes>
          <Route
            path="/"
            element={<Home requestedProduct={allProducts} />}
          ></Route>
          <Route
            path="/headPhones"
            element={<HeadPhones productArray={headPhones} />}
          ></Route>
          <Route
            path="/headPhones/:name"
            element={
              <ProductDetail
                productArray={headPhones}
                allProducts={products}
                stockProducts={allCartProducts}
                onIncProductQuantity={handleIncProductQuantity}
                onDecProductQuantity={handleDecProductQuantity}
                onQuantityInput={handleQuantityInput}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/speakers"
            element={<Speakers productArray={speakers} />}
          ></Route>
          <Route
            path="/speakers/:name"
            element={
              <ProductDetail productArray={speakers} allProducts={data} />
            }
          />
          <Route
            path="/earPhones"
            element={<EarPhones productArray={earPhones} />}
          ></Route>
          <Route
            path="/earphones/:name"
            element={
              <ProductDetail productArray={earPhones} allProducts={data} />
            }
          />
          <Route
            path="checkOut"
            element={
              <CheckOut
                customer={customerInfo}
                handleInputChange={handelCheckOutForm}
                allProducts={products}
                allCartProducts={allCartProducts}
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
