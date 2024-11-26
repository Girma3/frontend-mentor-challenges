import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../src/App";
describe("App", () => {
  it("render header", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch(/hey/);
  });
});
