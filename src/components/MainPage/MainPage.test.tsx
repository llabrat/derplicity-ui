import React from "react";
import { render, screen } from "@testing-library/react";
import { MainPage, PAGES } from "./MainPage";
import { mocked } from "jest-mock";
import { useAuth0 } from "@auth0/auth0-react";

/* eslint-disable @typescript-eslint/no-var-requires */
const mediaQuery = require("css-mediaquery"); // skipcq: JS-0359

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

const standardUser = {
  name: "john doe",
  picture: "https://example.com/johndoe.jpg",
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0, true);

describe("AppHeader", () => {
  const mockGetAccessTokenSilently = jest.fn().mockResolvedValue("TOKEN");

  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      user: standardUser,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getAccessTokenWithPopup: jest.fn(),
      getAccessTokenSilently: mockGetAccessTokenSilently,
      getIdTokenClaims: jest.fn(),
      loginWithPopup: jest.fn(),
      isLoading: false,
      buildAuthorizeUrl: jest.fn(),
      buildLogoutUrl: jest.fn(),
      handleRedirectCallback: jest.fn(),
    });
  });

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
