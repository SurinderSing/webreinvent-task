import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: "global/setLoading",
        payload: true,
      });
      const { token } = await api.signIn(formData);
      dispatch({
        type: "global/setLoading",
        payload: false,
      });
      if (token) {
        setFormData({
          email: "",
          password: "",
        });
        dispatch({
          type: "auth/login",
          payload: {
            token,
          },
        });
        navigate("/dashboard");
        return;
      }
      alert("failed to Signin");
      return;
    } catch (error) {
      console.log(error);
      alert("failed to Signin");
    }
    return;
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border rounded-md shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
