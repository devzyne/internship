import React, { useState, useRef } from "react";
import Tabs from "../../components/tabs/Tabs";
import Spinner from "react-bootstrap/Spinner";
import { put } from "../../api/api";
import Sidenav from "../../components/sidenav/Sidenav.js";
import "./add.css";
import file from "./emails/emails.csv";
import BottomNav from "../../components/bottomNav/BottomNav";
import { BasePath } from "../../globals/serviceURLs";

function AddCompanyAdmin() {
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    success: false,
  });
  const cid = localStorage.CompanyId;
  const uid = localStorage.userId;

  const hiddenFileInput = useRef(null);
  let mainCSVData = [];

  const processData = (csv) => {
    let allTextLines = csv.split(/\r\n|\n/);
    let col = [];

    for (let i = 1; i < allTextLines.length; i++) {
      col.push(allTextLines[i]);
    }
    mainCSVData.push(col);
    setEmail(mainCSVData.toString());
  };

  const add = () => {
    setError({
      message: "",
      success: false,
    });
    setLoading(true);
    const path = "/usr/add";
    const token = localStorage.AccessToken;
    const params = {
      emls: email.trim().split(","),
      cid: cid,
      ruid: uid,
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
    } else {
      setError({
        message: "Cannot be empty",
        success: false,
      });
      setLoading(false);
    }
  };

  const handleBrowseClick = () => {
    setError({
      message: "",
      success: false,
    });
    console.log(hiddenFileInput.current);
    hiddenFileInput.current.click();
  };

  const handleFileUpload = (e) => {
    let input = e.target;
    let file = input.files[0];
    let fr = new FileReader();
    fr.readAsText(file);
    fr.onloadend = (e) => {
      let csv = e.target.result;
      processData(csv);
    };
    const filename = e.target.value.split("\\");
    console.log(filename);
  };
  const changePage = (p) => {
    setError({
      message: "",
      success: false,
    });
    setPage(p);
    setEmail("");
  };

  const display = () => {
    if (page === 0) return FewMarkup();
    else return BulkMarkup();
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
  const BulkMarkup = () => (
    <div className="few-manager">
      <div className="add-manager-input">
        <input
          placeholder="Browse to upload a CSV file"
          type="text"
          className="form-control"
          value={email}
        ></input>
        <div className="error-msg">
          {error.success ? (
            <span className="error-green ">{error.message}</span>
          ) : (
              <span className="error-red">{error.message}</span>
            )}
          <a href={file} download="emails.csv">
            Download Template
          </a>
        </div>
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        style={{ display: "none" }}
        accept=".csv"
      />
      <div className="add-manager-loading">
        {loading && <Spinner animation="border" variant="primary" />}
      </div>
      <div className="btn-bulk">
        <button
          className="btn btn-primary add-manager-button bulk"
          type="button"
          onClick={handleBrowseClick}
        >
          Browse
        </button>{" "}
        <button
          className="btn btn-primary add-manager-button bulk"
          type="button"
          onClick={add}
        >
          Add
        </button>
      </div>
    </div>
  );
  return (
    <div id="add-manager">
      <div className="add-manager-class">
        <Sidenav />
        <div className="right-screen">
          <div className="add-manager-content">
            <div className="add-manager-header">
              <h2>Add Admin</h2>
            </div>
            <div className="add-manager-toggle">
              <Tabs tab1="Few" tab2="Bulk" setPage={changePage} />
            </div>
            <div className="add-manager-main">{display()}</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default AddCompanyAdmin;
