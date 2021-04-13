import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { put, get, authGet } from "../../../api/api";
import "./Freelance.css";
import { freelancerType } from "../../../globals/applicationConstants";
import Sidenav from "../../../components/sidenav/Sidenav.js";
import BottomNav from "../../../components/bottomNav/BottomNav";
import { BasePath } from "../../../globals/serviceURLs";

const Freelance = (props) => {
  const [status, seStatus] = useState();
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [regNo, setRegNo] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [postal, setPostal] = useState("");
  const [loading, setLoading] = useState(false);

  //  const token = localStorage.AccessToken;

  return (
    <div id="edit-pro">
      <div className="edit-profile">
        <Sidenav />
        <div className="right-screen">
          <div className="edit-profile-content">
            <div className="edit-head-profile">
              <h2>Freelancer Company</h2>
            </div>
            <br />

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Registration Number</label>
              <input
                type="text"
                className="form-control"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>
                State <span>(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Company address line 1</label>
              <input
                type="text"
                className="form-control"
                value={addressOne}
                onChange={(e) => setAddressOne(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>
                Company address line 2 <span>(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={addressTwo}
                onChange={(e) => setAddressTwo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                className="form-control"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
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

export default Freelance;
