import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Payment.css";
import Sidenav from "../../../components/sidenav/Sidenav.js";
import BottomNav from "../../../components/bottomNav/BottomNav";

const Payment = () => {
  const [] = useState();
  const [bankName, setBankName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [loading] = useState(false);

  //  const token = localStorage.AccessToken;

  return (
    <div id="edit-pro">
      <div className="edit-profile">
        <Sidenav />
        <div className="right-screen">
          <div className="edit-profile-content">
            <div className="edit-head-profile">
              <h2>Payment Details</h2>
            </div>
            <br />

            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                className="form-control"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                className="form-control"
                value={accNo}
                onChange={(e) => setAccNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>IFSC code</label>
              <input
                type="text"
                className="form-control"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
              />
            </div>

            <div className="edit-profile-loading">
              {loading && <Spinner animation="border" variant="primary" />}
            </div>
            <div className="EP-btn-pos">
              <button
                className="btn btn-primary update-button"
                disabled={loading}
              >
                <b>Confirm</b>
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Payment;
