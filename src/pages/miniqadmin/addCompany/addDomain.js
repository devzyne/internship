import React, { useState, useRef } from "react";
// import Tabs from "../../components/tabs/Tabs";
import Spinner from "react-bootstrap/Spinner";
import { put } from "../../api/api";
import Sidenav from "../../components/sidenav/Sidenav.js";
import "./add.css";
import BottomNav from "../../components/bottomNav/BottomNav";
import { BasePath } from "../../globals/serviceURLs";

function AddCompanyDomain() {
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    success: false,
  });
  const cid = localStorage.CompanyId;
  const uid = localStorage.userId;

  const add = () => {
    setError({
      message: "",
      success: false,
    });
    setLoading(true);
    const path = "/cmpny/domain/add";
    const token = localStorage.AccessToken;
    const params = {
      dmns: email.trim().split(","),
      cid: cid,
    };

    if (email) {
      put(BasePath, path, params, token)
        .then((res) => {
          setError({
            message: "Request has been sent to the users",
            success: true,
          });
          setLoading(false);
        })
        .catch((err) => {
          setError({
            message: err.err,
            success: false,
          });
          setLoading(false);
        });
      console.log(email);
    } else {
      setError({
        message: "Cannot be empty",
        success: false,
      });
      setLoading(false);
    }
  };


  const changePage = (p) => {
    setError({
      message: "",
      success: false,
    });
    setPage(0);
    setEmail("");
  };

  const FewMarkup = () => (
    <div className="few-manager">
      <div className="add-manager-input">
        <input
          placeholder="add email separated with commas"
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="error-msg">
          {error.success ? (
            <span className="error-green">{error.message}</span>
          ) : (
              <span className="error-red">{error.message}</span>
            )}
        </div>
      </div>
      <div className="add-manager-loading">
        {loading && <Spinner animation="border" variant="primary" />}
      </div>
      <button
        className="btn btn-primary add-manager-button"
        onClick={add}
        disabled={loading}
      >
        Add
      </button>
    </div>
  );

  return (
    <div id="add-manager">
      <div className="add-manager-class">
        <Sidenav />
        <div className="right-screen">
          <div className="add-manager-content">
            <div className="add-manager-header">
              <h2>Add Domain</h2>
            </div>
            {/* <div className="add-manager-toggle">
              <Tabs tab1="Few" tab2="Few" setPage={changePage} Reset={true} />
            </div> */}
            <div className="add-manager-main">{FewMarkup()}</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default AddCompanyDomain;
