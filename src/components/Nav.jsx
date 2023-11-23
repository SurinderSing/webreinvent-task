import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state?.auth?.isAuthenticated,
  }));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: "auth/logout",
    });
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link to="/dashboard">
        <div style={{ marginRight: 20 }}>Dashboard</div>
      </Link>
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
        >
          Logout
        </button>
      )}
      <Link to="/signup">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Signup
        </button>
      </Link>
    </div>
  );
}
