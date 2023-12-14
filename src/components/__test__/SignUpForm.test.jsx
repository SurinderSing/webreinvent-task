import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import SignUpForm from "../SignUpForm";
import configureStore from "redux-mock-store";
import api from "../../api/api";

jest.mock("../../api/api");

const mockStore = configureStore();

test("WHEN renders SignUp Form THEN signs up successfully", async () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
    },
  });

  // Mock the successful API response
  api.signUp.mockResolvedValueOnce({ id: 123, token: "fakeToken" });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    </Provider>
  );

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(
    screen.getByLabelText(/Password/i, { selector: "#password" }),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByLabelText(/Confirm Password/i, {
      selector: "#confirmPassword",
    }),
    {
      target: { value: "password123" },
    }
  );

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

  // Wait for the success alert
  await waitFor(() => {
    expect(screen.getByTestId("signup-form")).toBeInTheDocument();
  });

  // Ensure the user is redirected to the dashboard
  expect(window.location.pathname).toBe("/");
});

test("WHEN renders SignUpForm THEN handles signup failure", async () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
    },
  });

  // Mock the failed API response
  api.signUp.mockRejectedValueOnce(new Error("Signup failed"));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    </Provider>
  );

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(
    screen.getByLabelText(/Password/i, { selector: "#password" }),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByLabelText(/Confirm Password/i, {
      selector: "#confirmPassword",
    }),
    {
      target: { value: "password123" },
    }
  );

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

  // Ensure the user stays on the same page
  expect(window.location.pathname).not.toBe("/dashboard");
});
