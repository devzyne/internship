import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Flsm from "../../miniqadmin/images/fl-sm.png";
import "./fl.css";

function AdminHomeCard(props) {
  let freelancerData = props.freelancer;

  return (
    <div id="mfl">
      <div className="mfl-manager">
        <div className="mfl-update">
          <div className="mfl-img2">
            <img src={Flsm} alt="icon" />
          </div>

          <div className="mfl-txt">
            <p className="mfl-update-style">
              Mr. <b>{freelancerData.nme}</b> has joined as freelancer
            </p>
          </div>

          <div className="mfl-date">{freelancerData.sd}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomeCard;
