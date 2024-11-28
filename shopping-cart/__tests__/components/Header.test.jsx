import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import App from "../../src/App";
import Header from "../../src/components/Header";
import userEvent from "@testing-library/user-event";
/*
 *from developer side the header should  do this
   - 4 links(home(logo),speaker,earphone,headphone)
   - the cart should display modal
   - on mobile when menu click show 3 links
   - see the modal when cart clicked
  *from user side test
   -all the links direct to correct page
   
 */
//dev perspective
describe("Header", () => {
  it("does the logo used as link", () => {
    render(<Header />);
    expect(screen.getByText(/audiophile/i)).toBeInTheDocument();
  });
  it("the hamburger button toggle", async () => {
    const user = userEvent.setup();
    render(<Header screenSize={400} />);
    const hamBtn = screen.getByLabelText("open-menu");
    await user.click(hamBtn);
    expect(hamBtn).toHaveAttribute("data-show", "true");
  });

  it("the hamburger button show links for mobile screen", async () => {
    //logo and other 3 links total 4 links
    const user = userEvent.setup();
    render(<Header screenSize={400} />);
    const hamBtn = screen.getByLabelText("open-menu");
    await user.click(hamBtn);
    const links = screen.getByRole("link");
    expect(links).toBeGreaterThan(3);
  });
  it("cart show modal or status", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const cartBtn = screen.getByLabelText("cart");
    await user.click(cartBtn);
    const modal = screen.getByLabelText("dialog");
    expect(modal).toBeInTheDocument();
  });
});
//user perspective does the Header links direct to correct pages
describe("App", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(
      <Router>
        <App />
      </Router>
    );
    //verify homepage using hero section new product promotion
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("direct to headphones page", async () => {
    const headPhonesLink = screen.getByRole("link", { name: /headphones/i });
    await user.click(headPhonesLink);
    expect(screen.getByRole("heading").textContent).toMatch(/headphones/i);
  });
  it("direct to speakers page", async () => {
    const speakersLink = screen.getByRole("link", { name: /speakers/i });
    await user.click(speakersLink);
    expect(screen.getByRole("heading").textContent).toMatch(/speakers/i);
  });
  it("direct to earphones page", async () => {
    const earPhonesLink = screen.getByRole("link", { name: /earphones/i });
    await user.click(earPhonesLink);
    expect(screen.getByRole("heading").textContent).toMatch(/earphones/i);
  });
});
