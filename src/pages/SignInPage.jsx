import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SignInForm";

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

  return <SignInForm dispatch={dispatch} navigate={navigate} />;
};

export default SignInPage;
