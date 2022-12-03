import { render, screen } from "@testing-library/react";
import MainPage, { PAGES } from "../MainPage/MainPage";
import React from "react";
import AppHeader from "./AppHeader";

describe("AppHeader", () => {
  it("renders title", async () => {
    render(<MainPage />);
    const title = await screen.findByText(/DERPLICITY/i);
    expect(title).toBeInTheDocument();
  });

  it("shows page links on screens at least 900px wide", () => {
    render(<AppHeader smallScreen={false} pages={PAGES} />);

    PAGES.forEach((page) => {
      const productsButton = screen.getByRole("button", { name: page.name });

      expect(productsButton).toBeVisible();
    });
  });

  it("hides page links on screens less than 900 px wide", () => {
    render(<AppHeader smallScreen pages={PAGES} />);

    PAGES.forEach((page) => {
      const productsButton = screen.queryByRole("button", { name: page.name });

      expect(productsButton).not.toBeInTheDocument();
    });
  });
});
