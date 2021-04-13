import React, { useEffect, useState } from "react";
import Archive from "../../../assets/archive.svg";
import UnArchive from "../../../assets/un-archive.svg";
import DeleteIcon from "../../../assets/delete.svg";
import RemindIcon from "../../../assets/remind.png";
// import ArchiveIcon from "../../../assets/archive.svg";
import UnArchiveIcon from "../../../assets/un-archive.svg";
import ActiveIcon from "../../../assets/active.png";
import ArchiveIcon from "../../../assets/archive.png";
import DeactiveIcon from "../../../assets/deactivate.png";
import Unverified from "../../../assets/unverified.png";

import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { BasePath } from "../../../globals/serviceURLs";
import Form from "react-bootstrap/Form";
import { GigWorkerStatus } from "../../../globals/applicationConstants";

function AdminHomeCard(props) {
  const [loading, setLoading] = useState(false);
  const [archive, setArchive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState();
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

    // const path = "/fl/rct";
    // const params = {
    //   pno: 0,
    //   psz: 10,
    // };
    // authGet(BasePath, path, params, token)
    //   .then(res => setFreelancer(res.lst))
    //   .catch(err => console.log(err));
    let stsName = "";
    if (freelancerData.sts <= 11 && freelancerData.vf === false) {
      stsName = " Unverified ";
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
    <div id="fl">
      <div className="fl-manager">
        <div className="fl-job">
          <p className="job">
            <b>{freelancerData.nme}</b>
          </p>
        </div>
        <div className="fl-sp2">
          <p>g</p>
        </div>
        <div className="fl-sts">
          <div style={{ border: `1px solid ${clr}` }}>
            {statusDisp(status, stsIcon, clr)}
          </div>
        </div>

        <div className="fl-sp2">
          <p>g</p>
        </div>

        <div className="fl-slct">
          <Form.Control
            as="select"
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
          >
            <option value={null}>Select action</option>
            <option>Edit</option>
            <option>View</option>
            <option>Archive/Unarchive</option>
          </Form.Control>
        </div>
      </div>
    </div>
  );
}

export default AdminHomeCard;
