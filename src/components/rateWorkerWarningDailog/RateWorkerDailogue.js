import React, { useEffect, useState } from "react";
import { authGet } from "../../api/api";
import { BasePath, GetRatedWorkers } from "../../globals/serviceURLs";

//redux
import { connect } from "react-redux";
import {
  toggleRateWorkerWarning,
  addRateWorkerList,
  addRateWorkerTime,
} from "../../redux/actions/uiActions";

//components
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import "./RateWorkerDailogue.css";
import JobIcon from "../../assets/job_icon.png";
import { useHistory } from "react-router-dom";

function JobsCard({ job, onClick }) {
  return (
    <div className="dashboard-card" onClick={() => onClick(job)}>
      <div className="card-icon">
        <img src={JobIcon} alt="icon" />
      </div>
      <div className="card-content">
        <p>ID: {job.jid}</p>
        <p>{job.nme}</p>
      </div>
    </div>
  );
}

function Dailog({
  toggleRateWorkerWarning,
  addRateWorkerList,
  addRateWorkerTime,
  rateWorkerData,
}) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);
  const cmid = localStorage.userId;
  const token = localStorage.AccessToken;
  const buffer = 15 * 60 * 1000;

  const getData = () => {
    toggleRateWorkerWarning(true);
    setLoading(true);
    const config = {
      cmid: cmid,
    };

    authGet(BasePath, GetRatedWorkers, config, token)
      .then((res) => {
        setJobList(res);
        setLoading(false);
        const timeStamp = Date.parse(new Date());
        addRateWorkerList(res);
        addRateWorkerTime(timeStamp);
        if (res.length > 0) {
          setShowModal(true);
        } else {
          toggleRateWorkerWarning(false);
        }
      })
      .catch((err) => {
        alert(err.err);
      });
  };

  useEffect(() => {
    getData(); //todo optimise
    // const currentTime = Date.parse(new Date());
    // const prevTime = rateWorkerData.time;
    // if (currentTime - prevTime < buffer) {
    //   setJobList(rateWorkerData.list);
    // } else {
    //   getData();
    // }
  }, []);

  const handleClick = (job) => {
    setShowModal(false);
    history.push("/customer/manager/associated-gig-worker?jid=" + job.jid);
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Attention !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-dailog">
            <p>
              You must Rate workers for the following jobs before continuing
            </p>
            <div className="job-cards-list">
              {loading && (
                <div className="loading">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {jobList.map((i, index) => (
                <JobsCard job={i} key={index} onClick={handleClick} />
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary modal-button"
            onClick={() => setShowModal(false)}
          >
            Dismiss
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showModal: state.UI.rateWorkerWarning,
  rateWorkerData: state.UI.rateWorkerData,
});

const mapActionToProps = {
  toggleRateWorkerWarning,
  addRateWorkerTime,
  addRateWorkerList,
};

export default connect(mapStateToProps, mapActionToProps)(Dailog);
