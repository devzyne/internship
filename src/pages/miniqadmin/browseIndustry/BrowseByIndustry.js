import React, { useEffect, useState } from "react";
import { BasePath, GetAllIndustries } from "../../../globals/serviceURLs";
import { authGet, authPost } from "../../../api/api";

//components
import IndustrySectorCard from "../../../components/cards/IndustrySectorCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "../../../components/button/Button";
import Modal from "react-bootstrap/Modal";

//redux
import { connect } from "react-redux";
import { addChips } from "../../../redux/actions/uiActions";

//assets
import BackIcon from "../../../assets/back.svg";

function BrowseByIndustry({ onClick, addChips, addIndustry, data }) {
  const [indList, setIndList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();

  const token = localStorage.AccessToken;

  useEffect(() => {
    setIndList(data);
  }, []);

  const addInds = (ind) => {
    addChips(ind.nme);
    addIndustry(ind);
  };

  const addInd = () => {
    const path = "/indsec";
    const config = { nme: name };
    authPost(BasePath, path, config, token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const dailogDisp = () => {
    return (
      <div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="all-right">Add Industry</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="Name">
              <Form.Label>
                <div className="style-icons">Name</div>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-primary modal-button" onClick={addInd}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div id="miniqTech">
      <div className="explore-technology-page">
        <img
          className="back-icon"
          onClick={onClick}
          src={BackIcon}
          alt="back"
        />
        {dailogDisp()}
        <div className="button-col">
          <Button
            className="button"
            type="submit"
            text="Add Industry"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
        <Row>
          {indList.map((ind, index) => (
            <Col className="explore-tech-col">
              <IndustrySectorCard
                industry={ind}
                key={index}
                onClick={addInds}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

const mapActionToProps = {
  addChips,
};

export default connect(null, mapActionToProps)(BrowseByIndustry);
