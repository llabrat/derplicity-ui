import { render, screen } from "@testing-library/react";
import Article from "./Article";
import React from "react";

describe("Article", () => {
  it("should render in the document", () => {
    render(<Article content={"test article"} />);
    screen.getByText("test article");
  });
});
