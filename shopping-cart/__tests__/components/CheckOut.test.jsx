import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckOut from "../../src/components/CheckOut";
import { it, describe, expect, beforeEach, vi } from "vitest";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PersonalInfo } from "../../src/utilityFunctions";

//Form submission with valid customer data shows confirmation modal

const validCustomer = PersonalInfo();
(validCustomer.customerName = ""),
  (validCustomer.email = "john@test.com"),
  (validCustomer.phoneNumber = "1234567890"),
  (validCustomer.address = "123 Main St"),
  (validCustomer.zipCode = "12345"),
  (validCustomer.pin = "0000"),
  (validCustomer.city = "TestCity"),
  (validCustomer.country = "TestCountry"),
  (validCustomer.cash = true),
  (validCustomer.eMoney = false),
  describe("Form", () => {
    //user side
    const onSubmit = vi.fn();
    beforeEach(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <CheckOut
                  customer={validCustomer}
                  allCartProducts={[]}
                  allProducts={[]}
                  handleInputChange={onSubmit}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      );
    });

    it("does the Form displayed", () => {
      const formElement = screen.getByRole("form");
      expect(formElement).toBeInTheDocument();
    });

    it("does the summary showed and pay button exist", () => {
      const summaryElement = screen.getByRole("heading", { name: /summary/i });
      const continueBtn = screen.getByRole("button", {
        name: /continue & pay/i,
      });
      expect(summaryElement).toBeInTheDocument();
      expect(continueBtn).toBeInTheDocument();
    });

    //dev side
    it("does the form input are there ", () => {
      const allInputs = screen.getAllByRole("textbox");
      const checkBox = screen.getAllByRole("checkbox");
      expect(allInputs).toHaveLength(6);
      expect(checkBox).toHaveLength(2);
    });
    it("input show correct value", async () => {
      const user = userEvent.setup();
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveValue("");
      await user.type(nameInput, "king");
      expect(nameInput).toBeInTheDocument();
      expect(onSubmit).toHaveBeenCalledTimes("king".length);
    });
  });
