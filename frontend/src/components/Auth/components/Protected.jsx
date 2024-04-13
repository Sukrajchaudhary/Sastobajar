import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
  const { isAuth } = useAuthContext();
  if (isAuth) {
    return children;
  }
  return (
    <>
      <Navigate to="/"></Navigate>
    </>
  );
};

export default Protected;
