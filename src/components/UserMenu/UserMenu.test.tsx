import { render, screen } from "@testing-library/react";
import { UserMenu } from "./UserMenu";
import { mocked } from "jest-mock";
import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const standardUser = {
  name: "john doe",
  picture: "https://example.com/johndoe.jpg",
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0, true);

describe("Unauthenticated UserMenu", () => {
  const loginWithRedirect = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: false,
      user: standardUser,
      logout: jest.fn(),
      loginWithRedirect: loginWithRedirect,
      getAccessTokenWithPopup: jest.fn(),
      getAccessTokenSilently: jest.fn(),
      getIdTokenClaims: jest.fn(),
      loginWithPopup: jest.fn(),
      isLoading: false,
      buildAuthorizeUrl: jest.fn(),
      buildLogoutUrl: jest.fn(),
      handleRedirectCallback: jest.fn(),
    });
  });

  it("should render login button", async () => {
    render(<UserMenu />);

    const loginButton = await screen.getByRole("button", { name: "Login" });

    expect(loginButton).toBeVisible();
    expect(loginButton).toBeEnabled();
  });

  it("should call loginWithRedirect when login button clicked", async () => {
    render(<UserMenu />);

    const loginButton = await screen.getByRole("button", { name: "Login" });

    await user.click(loginButton);

    expect(loginWithRedirect).toBeCalledTimes(1);
  });
});

describe("Authenticated UserMenu", () => {
  const logout = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      user: standardUser,
      logout: logout,
      loginWithRedirect: jest.fn(),
      getAccessTokenWithPopup: jest.fn(),
      getAccessTokenSilently: jest.fn(),
      getIdTokenClaims: jest.fn(),
      loginWithPopup: jest.fn(),
      isLoading: false,
      buildAuthorizeUrl: jest.fn(),
      buildLogoutUrl: jest.fn(),
      handleRedirectCallback: jest.fn(),
    });
  });

  it("should not render login button", async () => {
    render(<UserMenu />);

    const loginButton = await screen.queryByRole("button", { name: "Login" });

    expect(loginButton).not.toBeInTheDocument();
  });

  it("should render users name", async () => {
    render(<UserMenu />);

    const userName = await screen.getByText(standardUser.name);

    expect(userName).toBeInTheDocument();
  });

  it("should render users avatar", async () => {
    render(<UserMenu />);

    const userAvatar = (await screen.getByRole("img", {
      name: standardUser.name,
    })) as HTMLImageElement;

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar.src).toEqual(standardUser.picture);
  });

  it("should render user menu with logout button when clicking avatar", async () => {
    render(<UserMenu />);

    const userAvatar = await screen.getByRole("button", {
      name: "Open user menu",
    });

    await user.click(userAvatar);

    const logoutButton = await screen.getByRole("menuitem", { name: "Logout" });

    expect(logoutButton).toBeVisible();
    expect(logoutButton).toBeEnabled();
  });

  // it("should hide user menu with logout button when menu closed", async () => {
  //
  //   TODO: Figure out how to do something like this. visibility style not being set
  //
  //   render(<UserMenu />);
  //
  //   const userAvatar = await screen.getByRole("button", {
  //     name: "Open user menu",
  //   });
  //
  //   await user.click(userAvatar);
  //
  //   const userMenu = await screen.getByRole("menu").parentElement;
  //
  //   expect(userMenu).toBeVisible();
  //
  //   await user.keyboard("{esc}");
  //
  //   expect(userMenu).not.toBeVisible();
  // });

  it("should call logout function when logout button clicked", async () => {
    render(<UserMenu />);

    const userAvatar = await screen.getByRole("button", {
      name: "Open user menu",
    });

    await user.click(userAvatar);

    const logoutButton = await screen.getByRole("menuitem", { name: "Logout" });

    await user.click(logoutButton);

    expect(logout).toBeCalledTimes(1);
  });
});
