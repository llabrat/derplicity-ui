import { render, screen } from "@testing-library/react";
import App, { PAGES, SETTINGS } from "./App";
import React from "react";
import AppHeader from "./AppHeader";

describe("AppHeader", () => {
  it("renders title", async () => {
    render(<App />);
    const title = await screen.findByText(/DERPLICITY/i);
    expect(title).toBeInTheDocument();
  });

  it("shows page links on screens at least 900px wide", () => {
    render(<AppHeader smallScreen={false} pages={PAGES} settings={SETTINGS} />);

    PAGES.forEach((page) => {
      const productsButton = screen.getByRole("button", { name: page.name });

      expect(productsButton).toBeVisible();
    });
  });

  it("hides page links on screens less than 900 px wide", () => {
    render(<AppHeader smallScreen={true} pages={PAGES} settings={SETTINGS} />);

    PAGES.forEach((page) => {
      const productsButton = screen.queryByRole("button", { name: page.name });

      expect(productsButton).not.toBeInTheDocument();
    });
  });
});
