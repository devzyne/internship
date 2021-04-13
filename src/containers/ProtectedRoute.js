import React from "react";
import { Redirect } from "react-router-dom";
import Splash from "../pages/common/login/splash";
import { Route, Switch, useHistory } from "react-router-dom";


function ProtectedRoute({ children, userType }) {
  const utyp = parseInt(localStorage.UserType);
  return <>{(userType & utyp) == utyp ? 
    

    children: <Redirect to="/not-found" />}</>;
}

export default ProtectedRoute;
