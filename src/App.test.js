import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("WHEN renders App component with Routes", () => {
  // Render the component
  const { getByText } = render(<App />);

  // Assert that the component or some of its content is rendered
  expect(getByText(/dashboard/i)).toBeInTheDocument();
});

test("WHEN renders Header component", () => {
  // Render the component
  const { getByText } = render(<App />);

  // Assert that the Header component is rendered
  expect(getByText("WebReinvent Task")).toBeInTheDocument();
});
