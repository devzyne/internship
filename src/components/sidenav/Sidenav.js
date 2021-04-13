import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/uiActions";
import "./Sidenav.css";
import Logo from "../../assets/logo.png";
import TncIcon from "../../assets/tnc sidenav.svg";
import EditCredIcon from "../../assets/Edit Credentials.svg";
import EditProIcon from "../../assets/Edit Profile.svg";
import LogoutIcon from "../../assets/Logout.svg";
import { authGet } from "../../api/api";
import {
  adminSidenav,
  managerSidenav,
  PartnerAdminSidenav,
  contingentWorkerSidenav,
} from "./SidenavList";
import { UserType } from "../../globals/applicationConstants";
import { BasePath, Logout } from "../../globals/serviceURLs";

function Sidenav({ logout }) {
  const [sidenavContent, setSidenavContent] = useState([]);

  const logoutClick = () => {
    const params = {};
    const token = localStorage.AccessToken;
    authGet(BasePath, Logout, params, token)
      .then(() => {})
      .catch(() => {});
    logout();
  };

  function display() {
    const userType = parseInt(localStorage.UserType);
    if (userType === UserType.customerAdmin) return adminSidenav;
    else if (userType === UserType.customerManager) return managerSidenav;
    else if (userType === UserType.miniqAdmin) return adminSidenav;
    else if (userType === UserType.partnerAdmin) return PartnerAdminSidenav;
    else if (userType === UserType.partnerContingentWorker)
      return contingentWorkerSidenav;
    else return adminSidenav;
  }

  useEffect(() => {
    setSidenavContent(display());
  }, []);
  return (
    <div>
      <div className="sidenav">
        <div className="sidenav-logo">
          <div className="logo-border">
            <img src={Logo} className="logo-img" alt="MinimumQue" />
          </div>
        </div>

        <div className="sidenav-content">
          <p className="sidenav-title">NAVIGATE</p>
          <ul className="sidenav-list">
            {sidenavContent.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <li className="sidenav-list-item">
                  <img src={item.icon} alt="icon" />
                  <p>{item.title}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="sidenav-content">
          <p className="sidenav-title">SETTINGS</p>

          <ul className="sidenav-list">
            <Link
              to="/edit-credentials"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidenav-list-item">
                <img src={EditCredIcon} style={{ width: "22px" }} alt="icon" />
                <p>Edit Credentials</p>
              </li>
            </Link>
            <Link
              to="/edit-profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidenav-list-item">
                <img src={EditProIcon} style={{ width: "22px" }} alt="icon" />
                <p>Edit Profile</p>
              </li>
            </Link>
            <Link to="/tnc" style={{textDecoration: "none", color: "inherit"}}>
            <li className="sidenav-list-item">
              <img src={TncIcon} style={{ width: "25px" }} alt="icon" />
              <p>Terms and conditions</p>
            </li>
            </Link>
            <li className="sidenav-list-item" onClick={logoutClick}>
              <img src={LogoutIcon} style={{ width: "22px" }} alt="icon" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
Sidenav.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Sidenav);
