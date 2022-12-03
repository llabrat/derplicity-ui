import React from "react";
import { render, screen } from "@testing-library/react";
import MainPage, { PAGES } from "./MainPage";

const mediaQuery = require("css-mediaquery");

function setScreenWidthMediaMatcher(width: number) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: mediaQuery.match(query, {
        width,
      }),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

describe("AppHeader", () => {
  it("renders title", async () => {
    render(<MainPage />);
    const title = await screen.findByText(/DERPLICITY/i);
    expect(title).toBeInTheDocument();
  });

  it("shows page links on screens at least 900px wide", () => {
    setScreenWidthMediaMatcher(900);
    render(<MainPage />);

    PAGES.forEach((page) => {
      const productsButton = screen.getByRole("button", { name: page.name });

      expect(productsButton).toBeVisible();
    });
  });

  it("hides page links on screens less than 900 px wide", () => {
    setScreenWidthMediaMatcher(899);
    render(<MainPage />);

    PAGES.forEach((page) => {
      const productsButton = screen.queryByRole("button", { name: page.name });

      expect(productsButton).not.toBeInTheDocument();
    });
  });

  it("fetches articles", async () => {
    setScreenWidthMediaMatcher(900);
    render(<MainPage />);

    const article = await screen.findByText("derp derpity derp derp");
    expect(article).toBeInTheDocument();
  });
});
