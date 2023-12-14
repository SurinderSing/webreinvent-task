import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "../PrivateRoute";
import configureStore from "redux-mock-store";
import SignInPage from "../../pages/SignInPage"; // Update the path accordingly

const mockStore = configureStore();

test("WHEN user is not authorised THEN redirect to sighin page and the page is rendered", async () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          {/* Use the Route component for PrivateRoute */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div data-testid="private-content">Private Content</div>
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Wait for redirection to /signin
  await waitFor(() => {
    expect(screen.getByTestId("signin-page")).toBeInTheDocument();
  });
});

