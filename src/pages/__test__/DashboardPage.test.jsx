import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import DashboardPage from "../DashboardPage";
import configureStore from "redux-mock-store";
import api from "../../api/api";

jest.mock("../../api/api");

const mockStore = configureStore();

test("WHEN singin is passed THEN Dashboard is rendered", async () => {
  const store = mockStore({
    auth: {
      isAuthenticated: true,
    },
  });

  // Mock the API response
  api.getUserData.mockResolvedValueOnce({ id: 123 });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </Provider>
  );

  // Wait for the loading indicator to disappear
  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  // Ensure rendering of DashboardPage
  expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
});
