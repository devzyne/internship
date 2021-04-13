import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserType } from "../../../globals/applicationConstants";
import Spinner from "react-bootstrap/Spinner";
function Splash() {
  const history = useHistory();
  const userType = parseInt(localStorage.UserType);
  useEffect(() => {
    if (!localStorage.userId) {
      localStorage.clear();
      history.push("/login");
    }
    switch (userType) {
      case UserType.customerAdmin:
        history.push("/customer/admin/home");
        break;
      case UserType.customerManager:
        history.push("/customer/manager/home");
        break;
      case UserType.partnerAdmin:
        history.push("/partner/admin/home");
        break;
      case UserType.miniqAdmin:
        history.push("/");
        break;
      case UserType.partnerContingentWorker:
        history.push("/gigworker/home");
        break;
      case UserType.freelancer:
        history.push("/");
        break;
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Splash;
