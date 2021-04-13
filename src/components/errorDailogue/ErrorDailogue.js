import React from "react";
import Modal from "react-bootstrap/Modal";

function ErrorDailogue({ show, onHide, message, button, onClick }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Attention !</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="preview-dailog">
          <p>{message}</p>
        </div>
      </Modal.Body>
      {button && (
        <Modal.Footer>
          <button className="btn btn-primary modal-button" onClick={onClick}>
            {button}
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default ErrorDailogue;
