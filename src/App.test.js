import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("WHEN renders App component with Routes", () => {
  // Render the component
  const { getByText } = render(<App />);
  expect(getByText(/dashboard/i)).toBeInTheDocument();
});

test("WHEN renders Header component", () => {
  // Render the component
  const { getByText } = render(<App />);
  expect(getByText("WebReinvent Task")).toBeInTheDocument();
});
