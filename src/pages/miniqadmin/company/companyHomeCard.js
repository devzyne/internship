import React, { useEffect, useState } from "react";
import Archive from "../../../assets/archive.svg";
import UnArchive from "../../../assets/un-archive.svg";
import DeleteIcon from "../../../assets/delete.svg";
import RemindIcon from "../../../assets/remind.png";
// import ArchiveIcon from "../../assets/archive.svg";
import UnArchiveIcon from "../../../assets/un-archive.svg";
import ActiveIcon from "../../../assets/active.png";
import ArchiveIcon from "../../../assets/archive.png";
import DeactiveIcon from "../../../assets/deactivate.png";
import Unverified from "../../../assets/unverified.png";
import { GigWorkerStatus } from "../../../globals/applicationConstants";
import Apartment from "../../miniqadmin/images/apartment.svg";
import "./co.css";

function AdminHomeCompanyCard(props) {
  const [status, setStatus] = useState("");
  const [stsIcon, setStsIcon] = useState("");
  const [clr, setClr] = useState("");
  let freelancerData = props.freelancer;
  const token = localStorage.AccessToken;

  useEffect(() => {
    let clr = "";
    let stsIcon = "";
    switch (freelancerData.sts) {
      case 11: {
        stsIcon = ActiveIcon;
        clr = "#39b515";
        break;
      }
      case 21: {
        stsIcon = DeactiveIcon;
        clr = "#d84a4a";
        break;
      }
      case 16: {
        stsIcon = ArchiveIcon;
        clr = "#eebc18";
        break;
      }
    }
    let stsName = "";
    if (freelancerData.sts <= 11 && freelancerData.vf === false) {
      stsName = "Unverified";
      stsIcon = Unverified;
      clr = "#9de3f1";
    } else stsName = getKeyByValue(GigWorkerStatus, freelancerData.sts);
    setStatus(stsName);
    setStsIcon(stsIcon);
    setClr(clr);
  }, []);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  const statusDisp = (status, icon, colour) => {
    return (
      <div className="fl-get-sts">
        <div style={{ background: colour }} className="fl-square">
          <img src={icon} alt="stsIcon" className="fl-pos" />
        </div>

        <div className="fl-sts-txt">{status}</div>
      </div>
    );
  };

  return (
    <div id="mfl">
      <div className="mfl-manager">
        <div className="mco-update">
          <div className="mco-icon">
            <img src={Apartment} alt="icon" />
          </div>

          <div className="mco-txt">
            <p className="mco-update-style">
              <b>{freelancerData.nme}</b> Company has been added successfully
            </p>
            <div className="mco-date">{freelancerData.sd}</div>
          </div>

          <div style={{ color: clr }} className="mco-sts">
            <div style={{ border: `1px solid ${clr}` }}>
              {statusDisp(status, stsIcon, clr)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomeCompanyCard;
