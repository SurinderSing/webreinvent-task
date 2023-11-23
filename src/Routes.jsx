import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import NoMatch from "./pages/NoMatch";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
const Router = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({
    loading: state.global.loading,
  }));

  useEffect(() => {
    dispatch({
      type: "global/setLoading",
      payload: false,
    });
  }, []);

  const privateRoutes = [
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/", element: <DashboardPage /> },
  ];

  return (
    <>
      {loading && (
        <div
          style={{
            background: "#c7c7c787",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zindex: "999",
            display: "grid",
            placeItems: "center",
            fontSize: 30,
          }}
        >
          Loading...
        </div>
      )}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {privateRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route?.path}
                element={<PrivateRoute>{route?.element}</PrivateRoute>}
              />
            );
          })}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
