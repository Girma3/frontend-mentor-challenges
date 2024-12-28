//object that hold customer information
function PersonalInfo(
  customerName = "",
  email = "",
  phoneNumber = "",
  address = "",
  zipCode = "",
  city = "",
  country = "",
  eMoney = false,
  cash = true,
  eMoneyNumber = "",
  pin = ""
) {
  return {
    customerName,
    email,
    phoneNumber,
    address,
    zipCode,
    city,
    country,
    eMoney,
    cash,
    eMoneyNumber,
    pin,
  };
}
//object that hold product information  used in reducer to add to cart and remove based on it
function PurchasedProduct(productName, inStock, demand, price) {
  return {
    productName: productName,
    demand: demand,
    inStock: inStock,
    addToCart: false,
    price: price,
    isInStock() {
      return Number(this.inStock) >= Number(this.demand);
    },
    productTotalPrice() {
      if (this.demand === 0) return 0;
      return Number(this.demand) * Number(this.price);
    },
  };
}

/**
 * function that get the product category using category input (headphone ,earphone or speaker)
 * @param {*} array - products data array
 * @param {*} category  - category
 * @returns array
 */
function getProduct(array, category) {
  return array.filter((product) => product.category === category);
}

//initial products in store used to change price and in stock to check available or not
let stockItems = [
  { productName: "yx1-earphones", inStock: 3, demand: 0, price: 599 },
  { productName: "xx59-headphones", inStock: 5, demand: 0, price: 899 },
  {
    productName: "xx99-mark-one-headphones",
    inStock: 4,
    demand: 0,
    price: 1750,
  },
  {
    productName: "xx99-mark-two-headphones",
    inStock: 4,
    demand: 0,
    price: 2999,
  },
  { productName: "zx7-speaker", inStock: 2, demand: 0, price: 3500 },
  { productName: "zx9-speaker", inStock: 8, demand: 0, price: 4500 },
];
//array of available products with there information
let productsInStore = stockItems.map((item) =>
  PurchasedProduct(item.productName, item.inStock, item.demand, item.price)
);
/**
 * function to get product object data using it's name and product slug property in data
 * @param {*} allProducts array of product data include images
 * @param {*} cartProducts array of product in stock
 * @returns
 */
function getProductData(allProducts, cartProducts) {
  return allProducts.filter((product) =>
    cartProducts.some((cartProduct) => cartProduct.productName === product.slug)
  );
}
//function to adjust name shorten it(used in chart status)
function adjustName(name) {
  const nameArray = name.split(" ");
  const limit = nameArray.length / 2;
  return nameArray.slice(0, limit).join(" ");
}
/**
 * function that check whether the products added to cart
 * @param {*} products array of in stock products
 * @returns array
 */
function cartProducts(products) {
  return products.filter((product) => product.addToCart === true);
}
/**
 * function that calculate total price for all cart products
 * @param {*} products - array of stock products
 * @returns number
 */
function calculateTotalPrice(products) {
  return products.reduce((total, product) => {
    if (product.addToCart) {
      return total + Number(product.demand) * Number(product.price);
    }
    return total;
  }, 0);
}
/**
 * function to validate form for the personal info object
 *
 */

function validateForm(obj) {
  let emptyFields = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      emptyFields.push({ key: key, value: obj[key] });
    }
  });
  return emptyFields;
}
// function to snap to top for button and link clicked
function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export {
  getProduct,
  PersonalInfo,
  PurchasedProduct,
  getProductData,
  adjustName,
  cartProducts,
  calculateTotalPrice,
  validateForm,
  scrollTop,
  productsInStore,
};
