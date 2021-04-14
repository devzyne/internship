import React, { useEffect, useState } from "react";

import DeleteIcon from "../../../assets/delete.svg";
import RemindIcon from "../../../assets/remind.png";
import ArchiveIcon from "../../../assets/archive.svg";
import UnArchiveIcon from "../../../assets/un-archive.svg";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { BasePath } from "../../../globals/serviceURLs";

import { authPost, DELETE, authGet } from "../../../api/api";

import "./card.css";

function AdminHomeCard(props) {
  const [loading, setLoading] = useState(false);
  const [archive, setArchive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let managerData = props.manager;

  useEffect(() => {
    setArchive(props.manager.arch);
  }, []);

  const onArchive = (value) => {
    setLoading(true);
    const path = "/usr/archive";
    const uid = localStorage.userId;
    const token = localStorage.AccessToken;
    const params = {
      uid: parseInt(uid),
      uidtoa: managerData.uid,
      arch: value,
    };
    authPost(BasePath, path, params, token).then((res) => {
      setArchive(value);
      setLoading(false);
    });
  };

  const onDelete = () => {
    const path = "/usr/remove";
    const uid = parseInt(localStorage.userId);
    const token = localStorage.AccessToken;
    const params = {
      uid: uid,
      rtor: managerData.rid,
    };

    DELETE(BasePath, path, params, token).then((res) => {
      setLoading(false);
      props.onRemove();
    });
  };

  const onRemind = () => {
    setLoading(true);
    const path = "/usr/remind";
    const uid = parseInt(localStorage.userId);
    const token = localStorage.AccessToken;
    const params = {
      uid: uid,
      rid: managerData.rid,
    };
    authGet(BasePath, path, params, token).then((res) => {
      setLoading(false);
      setShowModal(true);
    });
  };

  const iconsDisplay = () => {
    if (managerData.nme && archive) {
      return (
        <div className="icons-container archive">
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <img
              src={UnArchiveIcon}
              alt="icon"
              onClick={() => onArchive(false)}
            />
          )}
        </div>
      );
    } else if (managerData.nme && !archive) {
      return (
        <div className="icons-container archive">
          <img src={ArchiveIcon} alt="icon" onClick={() => onArchive(true)} />
        </div>
      );
    } else {
      return (
        <div className="icons-container">
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <img src={RemindIcon} onClick={onRemind} alt="" />
          )}
          <img src={DeleteIcon} alt="icon" onClick={onDelete} />
        </div>
      );
    }
  };

  const initialsDisp = () => {
    if (managerData.nme) {
      const initials = managerData.nme.split(" ");
      return (
        initials[0][0].toUpperCase() +
        initials[initials.length - 1][0].toUpperCase()
      );
    } else {
      const initials = managerData.eml[0];
      return initials.toUpperCase();
    }
  };

  const onReminderSent = () => {
    return (
      <Modal
        size="sm"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Body closeButton>Reminder Email has been sent</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary modalbtn"
            onClick={() => setShowModal(false)}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="manager">
      {onReminderSent()}
      <div className="avatar">
        <text>{initialsDisp()}</text>
      </div>
      <div className="all-text">
        <div className="mail-id">
          <p className="name">{managerData.nme}</p>
          <p className="email">{managerData.eml}</p>
        </div>
        {iconsDisplay()}

        {managerData.nme ? (
          <p className="status">Signed up</p>
        ) : (
          <p className="status">Request Sent</p>
        )}
      </div>
    </div>
  );
}

export default AdminHomeCard;
