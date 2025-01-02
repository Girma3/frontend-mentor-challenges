import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { Counter } from "../../src/components/ProductDetail";
import userEvent from "@testing-library/user-event";

const products = [
  { productName: "yx1-earphones", inStock: 3, demand: 0, price: 599 },
];
const selectedProduct = products[0];
const disableBtn = () => {
  return selectedProduct.inStock >= selectedProduct.demand;
};

describe("", () => {
  const onClicked = vi.fn();
  beforeEach(() => {
    render(
      <Counter
        onDecQuantity={onClicked}
        onIncQuantity={onClicked}
        selectedProduct={selectedProduct}
        disableBtn={disableBtn}
      />
    );
  });
  it("renders counter component", () => {
    const decBtn = screen.getByRole("button", {
      name: /decrease-product-quantity/i,
    });
    const incBtn = screen.getByRole("button", {
      name: /increase-product-quantity/i,
    });
    expect(decBtn).toBeInTheDocument();
    expect(incBtn).toBeInTheDocument();
  });
  it("does increment button and input update product correctly", async () => {
    const user = userEvent.setup();
    const result = screen.getByRole("input", {
      name: /productDemand/i,
    });
    const incrementBtn = screen.getByLabelText("button", {
      name: /increase-product-quantity/i,
    });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    expect(result.value).toEqual("2");
    expect(selectedProduct.demand).toBe(2);
  });
  it("does decrement button works correctly and  not get below zero", async () => {
    const user = userEvent.setup();
    const result = screen.getByLabelText("input", {
      name: /product-demand-quantity/i,
    });
    const decrementBtn = screen.getByLabelText("button", {
      name: /decrease-product-quantity/i,
    });
    await user.click(decrementBtn);
    await user.click(decrementBtn);
    expect(result.value).toEqual("0");
    expect(selectedProduct.demand).toBe(0);
  });
  it("increment then  decrement works correctly", async () => {
    const user = userEvent.setup();
    const result = screen.getByRole("input", {
      name: /product-demand-quantity/i,
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
    expect(result.value).toEqual("1");
  });
});
