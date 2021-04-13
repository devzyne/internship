import React, { useState, useRef, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Sidenav from "../../../components/sidenav/Sidenav.js";
import "./ratecard.css";
import BottomNav from "../../../components/bottomNav/BottomNav";
import Layout from "../../../containers/layout/Layout.js";
import { BasePath, UpdateRateCard } from "../../../globals/serviceURLs";
import { authPost, downloadFile } from "../../../api/api.js";
import XLSX from "xlsx";

function AddRateCard() {
  const token = localStorage.AccessToken;
  const [fileUpload, setFileUpload] = useState(false);
  const hiddenFileInput = useRef(null);
  const [fileName, setFileName] = useState("");
  let configdata = [];
  const [file, setFile] = useState({});
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [error, setError] = useState({
    message: "",
    success: false,
  });
  function emptycard() {
    debugger;
    downloadFile(BasePath, "/cmpny/gtbrate", {}, "blankratecard.xlsx", token)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }
  function existingcard() {
    downloadFile(BasePath, "/cmpny/gtrate", { cid: 7 }, "ratecard.xlsx", token)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }
  const handleFile = (e) => {
    setError({
      message: "",
      success: false,
    });
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) setFile(files[0]);

    const filename = e.target.value.split("\\");
    setFileName(filename[2]);
  };
  const handleFileUpload = (e) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    console.log("yes1");
    reader.onload = function (e) {
      console.log("yes2");
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: "A" });

      const levels = [data[1].F, data[1].G, data[1].H, data[1].I, data[1].J];
      data.splice(0, 2);
      const n = data.length;
      console.log(n);

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < n; j++) {
          if (i === 0) {
            if (data[j].F > 0 || data[j].K > 0) {
              configdata = [
                ...configdata,
                {
                  lvl: i + 1,
                  tid: data[j].B ? data[j].B : -1,
                  rid: data[j].D ? data[j].D : -1,
                  rph: data[j].F,
                  sprte: data[j].K,
                },
              ];
            }
          } else if (i === 1) {
            if (data[j].G > 0 || data[j].L > 0) {
              configdata = [
                ...configdata,
                {
                  lvl: i + 1,
                  tid: data[j].B ? data[j].B : -1,
                  rid: data[j].D ? data[j].D : -1,
                  rph: data[j].G,
                  sprte: data[j].L,
                },
              ];
            }
          } else if (i === 2) {
            if (data[j].H > 0 || data[j].M > 0) {
              configdata = [
                ...configdata,
                {
                  lvl: i + 1,
                  tid: data[j].B ? data[j].B : -1,
                  rid: data[j].D ? data[j].D : -1,
                  rph: data[j].H,
                  sprte: data[j].M,
                },
              ];
            }
          } else if (i === 3) {
            if (data[j].I > 0 || data[j].N > 0) {
              configdata = [
                ...configdata,
                {
                  lvl: i + 1,
                  tid: data[j].B ? data[j].B : -1,
                  rid: data[j].D ? data[j].D : -1,
                  rph: data[j].I,
                  sprte: data[j].N,
                },
              ];
            }
          } else {
            if (data[j].J > 0 || data[j].O > 0) {
              configdata = [
                ...configdata,
                {
                  lvl: i + 1,
                  tid: data[j].B ? data[j].B : -1,
                  rid: data[j].D ? data[j].D : -1,
                  rph: data[j].J,
                  sprte: data[j].O,
                },
              ];
            }
          }
        }
      }
      console.log(JSON.stringify(configdata));

      //console.log(data._1)
      const parsedData = {
        cid: localStorage.CompanyId,
        rtdt: configdata,
      };
      authPost(BasePath, UpdateRateCard, parsedData, token)
        .then((res) => {
          console.log(res);
          console.log("done");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Layout>
      <div>
        <div className="add-manager-content rate-card">
          <div className="add-manager-header">
            <h2>Rate card of company</h2>
          </div>
          <div className="ratecard-input">
            <input
              placeholder="browse"
              className="form-control"
              value={fileName}
              accept=".xlsx"
            ></input>
          </div>
          <div className="download-link">
            <a href="#" onClick={emptycard}>
              {" "}
              Download Empty Rate Card{" "}
            </a>
            <a href="#" onClick={existingcard}>
              {" "}
              Download Existing Rate Card{" "}
            </a>
          </div>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
            accept=".xlsx"
          />
          <div className=" rate-card-button button-div">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleFile}
            >
              {" "}
              Browse{" "}
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleFileUpload}
            >
              {" "}
              Upload{" "}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddRateCard;
