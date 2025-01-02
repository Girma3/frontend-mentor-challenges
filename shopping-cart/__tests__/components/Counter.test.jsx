import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../../src/components/Counter";
import { useState } from "react";

const mockProduct = {
  productName: "yx1-earphones",
  inStock: 3,
  demand: 0,
  price: 599,
};

describe("Counter component", () => {
  let selectedProduct;
  let onIncProductQuantity;
  let onDecProductQuantity;
  let onQuantityInput;
  const onAddToCart = vi.fn();

  const Wrapper = () => {
    const [product, setProduct] = useState(mockProduct);

    onIncProductQuantity = () => {
      if (product.demand < product.inStock) {
        setProduct({ ...product, demand: product.demand + 1 });
      }
    };

    onDecProductQuantity = () => {
      if (product.demand > 0) {
        setProduct({ ...product, demand: product.demand - 1 });
      }
    };

    onQuantityInput = (e) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue) && newValue <= product.inStock) {
        setProduct({ ...product, demand: newValue });
      }
    };

    return (
      <Counter
        onIncProductQuantity={onIncProductQuantity}
        onDecProductQuantity={onDecProductQuantity}
        onQuantityInput={onQuantityInput}
        selectedProduct={product}
        disableBtn={() => product.inStock > product.demand}
        onAddToCart={onAddToCart}
        name={product.productName}
      />
    );
  };

  beforeEach(() => {
    render(<Wrapper />);
  });

  it("renders counter component", () => {
    const decBtn = screen.getByRole("button", {
      name: /decrease-product-quantity/i,
    });
    const incBtn = screen.getByRole("button", {
      name: /increase-product-quantity/i,
    });
    const result = screen.getByRole("spinbutton", {
      name: /product-demand-quantity/i,
    });

    expect(decBtn).toBeInTheDocument();
    expect(incBtn).toBeInTheDocument();
    expect(result).toBeInTheDocument();
    expect(result.value).toBe("0");
  });

  it("does increment button and input update product correctly", async () => {
    const user = userEvent.setup();
    const result = screen.getByRole("spinbutton", {
      name: /product-demand-quantity/i,
    });
    const incrementBtn = screen.getByRole("button", {
      name: /increase-product-quantity/i,
    });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    expect(result.value).toEqual("2");
  });

  it("does decrement button work correctly and not get below zero", async () => {
    const user = userEvent.setup();
    const result = screen.getByRole("spinbutton", {
      name: /product-demand-quantity/i,
    });
    const decrementBtn = screen.getByRole("button", {
      name: /decrease-product-quantity/i,
    });
    await user.click(decrementBtn);
    await user.click(decrementBtn);
    expect(result.value).toEqual("0");
  });

  it("increment then decrement works correctly", async () => {
    const user = userEvent.setup();
    const result = screen.getByRole("spinbutton", {
      name: /product-demand-quantity/i,
    });
    const incrementBtn = screen.getByRole("button", {
      name: /increase-product-quantity/i,
    });
    const decrementBtn = screen.getByRole("button", {
      name: /decrease-product-quantity/i,
    });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(decrementBtn);
    expect(result.value).toEqual("1");
  });
});
