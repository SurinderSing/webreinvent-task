import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return <SignUpForm dispatch={dispatch} navigate={navigate} />;
};

export default SignUpPage;
