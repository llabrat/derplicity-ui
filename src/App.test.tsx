import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", async () => {
  render(<App />);
  const linkElement = await screen.findAllByText(/DERPLICITY/i);
  expect(linkElement.length).toBe(2);
});
