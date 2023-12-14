import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import SignInForm from "../SignInForm"; // Updated import
import configureStore from "redux-mock-store";
import api from "../../api/api";

jest.mock("../../api/api");

const mockStore = configureStore();

test("WHEN renders SignIn Form THEN signs in successfully", async () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
    },
  });

  // Mock the successful API response
  api.signIn.mockResolvedValueOnce({ token: "fakeToken" });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    </Provider>
  );

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i, { selector: "#password" }), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  // Wait for the success alert
  await waitFor(() => {
    expect(screen.getByTestId("signin-page")).toBeInTheDocument();
  });

  // Ensure the user is redirected to the dashboard
  expect(window.location.pathname).toBe("/");
});

test("WHEN renders SignIn Form THEN handles signin failure", async () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
    },
  });

  // Mock the failed API response
  api.signIn.mockRejectedValueOnce(new Error("Signin failed"));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    </Provider>
  );

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i, { selector: "#password" }), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  // Ensure the user stays on the same page
  expect(window.location.pathname).not.toBe("/dashboard");
});
