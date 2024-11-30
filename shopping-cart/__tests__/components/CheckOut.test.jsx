import {
  getAllByRole,
  getByLabelText,
  getByRole,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckOut from "../../src/components/CheckOut";
import { it, describe, expect, beforeEach } from "vitest";
/*
for checkout test on the user side test
- show form 
- correct input show
- show summary  

for dev side test
- are there  11 inputs
- does it display correct input
- does all input are required 
- continue and pay button show message after form submitted correctly else disabled

*/
describe("Form", () => {
  //user side
  beforeEach(() => {
    render(<CheckOut />);
  });

  it("does the Form displayed", () => {
    const formElement = getByRole("form");
    expect(formElement).toBeInTheDocument();
  });
  it("does the summary showed and pay button exist", () => {
    const summaryElement = getByRole("heading", { name: /summary/i });
    const continueBtn = getByRole("button", { name: /continue & pay/i });
    expect(summaryElement).toBeInTheDocument();
    expect(continueBtn).toBeInTheDocument();
  });
  //dev side
  it("does the form input are there ", () => {
    const allInputs = getAllByRole("textbox");
    const checkBox = getByRole("checkbox");
    expect(allInputs).length.toBe(9);
    expect(checkBox).length.toBe(2);
    expect(allInputs);
  });
  it("invalid form disabled pay button", async () => {
    const user = userEvent.setup();
    const payBtn = getByRole("button", { name: /continue & pay/i });
    await user.click(payBtn);
    expect(payBtn).toBeDisabled();
  });
  it("input show correct value", async () => {
    const user = userEvent.setup();
    const nameInput = getByLabelText(/name/i);
    expect(nameInput).toBe(false);
    await user.change(nameInput, { target: { value: "king" } });
    expect(nameInput).value.length.toBe(4);
    expect(nameInput).toBe(true);
  });
});
