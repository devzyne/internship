import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleSettings } from "../../redux/actions/uiActions";
import SettingsPage from "../../containers/settingsPage/settingsPage";
import SettingsIcon from "../../assets/Component 30 – 1.svg";
import {
  customerAdminBottomNav,
  customerManagerBottomNav,
  PartnerAdminBottomNav,
  ContingentWorkerBottomNav,
} from "./BottomNavList";
import { UserType } from "../../globals/applicationConstants";
import "./BottomNav.css";

function BottomNav({ toggleSettings }) {
  const [bottomNavContent, setBottomNavContent] = useState([]);

  function display() {
    const userType = parseInt(localStorage.UserType);

    if (userType === UserType.customerAdmin) return customerAdminBottomNav;
    else if (userType === UserType.customerManager)
      return customerManagerBottomNav;
    else if (userType === UserType.partnerAdmin) return PartnerAdminBottomNav;
    else if (userType === UserType.partnerContingentWorker)
      return ContingentWorkerBottomNav;
    else return customerAdminBottomNav;
  }

  useEffect(() => {
    setBottomNavContent(display());
  }, []);

  return (
    <div id="bottom-nav-container">
      <div className="bottom-nav">
        {bottomNavContent.map((i, index) => (
          <div key={index}>
            <Link to={i.LinkTo}>
              <img src={i.src} alt="" />
            </Link>
          </div>
        ))}
        <img src={SettingsIcon} alt="icon" onClick={toggleSettings} />
      </div>
      <SettingsPage />
    </div>
  );
}

BottomNav.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
};

export default connect(null, { toggleSettings })(BottomNav);
