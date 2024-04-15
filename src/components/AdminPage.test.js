import React from "react";
import { render } from "@testing-library/react";
import AdminPage from "./AdminPage";

// Test to render AdminPage component and match snapshot
test("renders AdminPage correctly", () => {
  const { container } = render(<AdminPage />); // Render AdminPage component
  expect(container).toMatchSnapshot(); // Match snapshot of the rendered component
});
