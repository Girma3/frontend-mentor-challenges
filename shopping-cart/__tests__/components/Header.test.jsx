import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Header from "../../src/components/Header";
import userEvent from "@testing-library/user-event";
import Hero from "../../src/components/Hero";

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
  const handleMobileMenu = vi.fn();
  beforeEach(() => {
    render(
      <Router>
        <Header
          deviceSize={800}
          show={"false"}
          onMobileMenu={handleMobileMenu}
        />
      </Router>
    );
  });
  it("does the header showed", () => {
    const header = screen.getAllByRole("link");
    expect(header).toHaveLength(5);
  });
});
describe("mobile button toggle", () => {
  const handleMobileMenu = vi.fn();
  beforeEach(() => {
    render(
      <Router>
        <Header deviceSize={400} show={true} onMobileMenu={handleMobileMenu} />
      </Router>
    );
  });
  it("the hamburger button toggle", async () => {
    const user = userEvent.setup();
    const hamBtn = screen.getByLabelText("open-menu");
    await user.click(hamBtn);
    expect(hamBtn).toHaveAttribute("data-show", "true");
  });

  it("the hamburger button show links for mobile screen", async () => {
    //logo and other 3 links total 4 links
    const user = userEvent.setup();
    const hamBtn = screen.getByLabelText("open-menu");
    await user.click(hamBtn);
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(1);
  });
});
//user perspective does the Header links direct to correct pages
describe("App", () => {
  const user = userEvent.setup();
  it("the hero and header exist", () => {
    render(
      <Router>
        <Header />
        <Hero />
      </Router>
    );
    //verify homepage using hero section new product promotion
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("direct to headphones page", async () => {
    render(
      <Router>
        <Header />
        <Hero />
      </Router>
    );
    const headPhonesLink = screen.getByRole("link", { name: /headphones/i });
    await user.click(headPhonesLink);
    expect(screen.getByRole("heading").textContent).toMatch(/headphones/i);
  });
  it("direct to speakers page", async () => {
    render(
      <Router>
        <Header />
        <Hero currentPage="speakers" />
      </Router>
    );
    const speakersLink = screen.getByRole("link", { name: /speakers/i });
    await user.click(speakersLink);
    expect(screen.getByRole("heading").textContent).toMatch(/speakers/i);
  });
  it("direct to earphones page", async () => {
    render(
      <Router>
        <Header />
        <Hero currentPage="earphones" />
      </Router>
    );
    const earPhonesLink = screen.getByRole("link", { name: /earphones/i });
    await user.click(earPhonesLink);
    expect(screen.getByRole("heading").textContent).toMatch(/earphones/i);
  });
});
