import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleSettings, logout } from "../../redux/actions/uiActions";
import TermAndCondition from "../../assets/tnc.svg";
import EditCredentialsIcon from "../../assets/Edit Credentials.svg";
import EditProfileIcon from "../../assets/Edit Profile.svg";
import LogoutIcon from "../../assets/Logout.svg";
import "./settingsPage.css";

function BottomNavList({ image, labeltext, onClick, link }) {
  const disp = () => {
    if (link) {
      return (
        <div className="settings-card" onClick={onClick}>
          <Link to={link} className="align" style={{ color: "black" }}>
            <img src={image} alt="icon" />
            <label>{labeltext}</label>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="settings-card" onClick={onClick}>
          <img src={image} alt="icon" />
          <label>{labeltext}</label>
        </div>
      );
    }
  };
  return disp();
}

function SettingsPage({ settings, toggleSettings, logout }) {
  const listarray = [
    {
      labelName: "Profile",
      iconImg: EditProfileIcon,
      onClick: function () {
        toggleSettings();
      },
      link: "/edit-profile",
    },
    {
      labelName: "Credentials",
      iconImg: EditCredentialsIcon,
      onClick: function () {
        toggleSettings();
      },
      link: "/edit-credentials",
    },
    {
      labelName: "T&C",
      iconImg: TermAndCondition,
      onClick: function () {
        toggleSettings();
      },
      link: "/tnc",
    },
    {
      labelName: "Logout",
      iconImg: LogoutIcon,
      onClick: function () {
        logout();
      },
      link: null,
    },
  ];
  const className = settings
    ? "container-fluid settings up"
    : "container-fluid settings";
  return (
    <div className="settings-page">
      <div className={className}>
        <Row>
          <Row className="exit-row">
            <Col className="exit" onClick={toggleSettings}>
              X
            </Col>
          </Row>
          <div className="set-card-area">
            <Row>
              {listarray.map((i, index) => (
                <BottomNavList
                  image={i.iconImg}
                  labeltext={i.labelName}
                  onClick={i.onClick}
                  link={i.link}
                  key={index}
                />
              ))}
            </Row>
          </div>
        </Row>
      </div>
    </div>
  );
}

SettingsPage.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  settings: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  settings: state.UI.settings,
});

const mapActionsToProps = {
  toggleSettings,
  logout,
};

export default connect(mapStateToProps, mapActionsToProps)(SettingsPage);
