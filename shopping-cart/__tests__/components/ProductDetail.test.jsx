import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Routes, Route, ErrorBoundary } from "react-router-dom";
import { productsInStore } from "../../src/utilityFunctions";

const productStore = [
  { productName: "yx1-earphones", inStock: 3, demand: 0, price: 599 },
];
const productData = [{ features: "cool stuff", slug: "yx1-earphones" }];
const stockProduct = [{ productName: "yx1-earphones" }];

describe("", () => {
  const onFun = vi.fn();
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProductDetail
                productsData={productData}
                allProductsData={stockProduct}
                stockProducts={[productStore]}
                onDecProductQuantity={onFun}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  });
  it("renders ProductDetail component", () => {
    const productName = screen.getByText(/yx1-earphones/i);
    expect(productName).toBeInTheDocument();
  });
  /* it("does increment button works correctly", async () => {
    const user = userEvent.setup();
    const result = screen.getByLabelText("input", { name: /productDemand/i });
    const incrementBtn = screen.getByLabelText("button", {
      name: /increase-product-quantity/i,
    });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    // expect(result.textContent).toEqual("2");
  });
  it("does decrement button works correctly and  not get below zero", async () => {
    const user = userEvent.setup();
    const result = screen.getByLabelText("input", { name: /productDemand/i });
    const decrementBtn = screen.getByLabelText("button", {
      name: /decrease-product-quantity/i,
    });
    await user.click(decrementBtn);
    await user.click(decrementBtn);
    //  expect(result.textContent).toEqual("0");
  });
  it("increment then  decrement works correctly", async () => {
    const user = userEvent.setup();
    const result = screen.getByLabelText("input", {
      name: /productDemand/i,
    });
    const incrementBtn = screen.getByLabelText("button", {
      name: /increase-product-quantity/i,
    });
    const decrementBtn = screen.getByLabelText("button", {
      name: /decrease-product-quantity/i,
    });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(decrementBtn);
    //  expect(result.textContent).toEqual("1");
  });
  */
});
