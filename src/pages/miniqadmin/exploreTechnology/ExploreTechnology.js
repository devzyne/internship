import React, { useEffect, useState } from "react";
import {
  BasePath,
  GetAllTech,
  GetAllIndustries,
  GET_ROLES_BY_CATEGORY,
} from "../../../globals/serviceURLs";
import { authGet, get, authPost } from "../../../api/api";
import { Category } from "../../../globals/applicationConstants";

//components
import TechnologyCard from "../../../components/cards/TechnologyCard";
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
import "./tech.css";

function ExploreTechnology({ onClick, addChips, addTechnology, data }) {
  const [techList, setTechList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [roll, setRoll] = useState();
  const [industryList, setIndustryList] = useState([]);
  const [industry, setIndustry] = useState();
  const [roleList, setRoleList] = useState([]);
  const [role, setRole] = useState();
  const userData = JSON.parse(localStorage.UserData);
  const caid = userData.cat;
  const token = localStorage.AccessToken;

  useEffect(() => {
    const config = {
      caid: caid,
      pno: 0,
      psz: 10,
    };

    authGet(BasePath, GetAllTech, config, token)
      .then((res) => {
        setTechList(res.lst);
      })
      .catch((err) => console.log(err));

    get(BasePath, GetAllIndustries, {})
      .then((res) => setIndustryList(res))
      .catch((err) => console.log(err));
  }, []);

  const addTech = (tech) => {
    addChips(tech.nme);
    addTechnology(tech);
  };

  const handleIndustrySector = (e) => {
    setIndustry(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
    const config = {
      caid: e.target.value,
      pno: 0,
      psz: 10,
    };
    authGet(BasePath, GET_ROLES_BY_CATEGORY, config, token)
      .then((res) => setRoleList(res.lst))
      .catch((err) => console.log(err));
  };

  const addtechno = () => {
    const path = "/tech";
    const config = {
      caid: category,
      nme: name,
      isid: [industry],
      rtp: role,
    };
    console.log(config);
    authPost(BasePath, path, config, token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const dailogDisp = () => {
    return (
      <div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="all-right">Add Technology</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="industrySector">
              <Form.Label>
                <div className="style-icons">Industry Sector</div>
              </Form.Label>
              <Form.Control as="select" onChange={handleIndustrySector}>
                <option>Select</option>
                {industryList.map((industry) => (
                  <option value={industry.isid}>{industry.nme}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>
                <div className="style-icons">Category</div>
              </Form.Label>
              <Form.Control as="select" onChange={handleCategory}>
                <option>Select</option>
                {Object.entries(Category).map((key) => (
                  <option value={key[1].value}>{key[1].name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="Name">
              <Form.Label>
                <div className="style-icons">Name</div>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="industrySector">
              <Form.Label>
                <div className="style-icons">Role Type</div>
              </Form.Label>
              <Form.Control as="select" onChange={handleRole}>
                <option>Select</option>
                {roleList.map((role) => (
                  <option value={role.rid}>{role.nme}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-primary modal-button"
              onClick={addtechno}
            >
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
            text="Add Technology"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>

        <Row>
          {techList.map((tech, index) => (
            <Col className="explore-tech-col">
              <TechnologyCard technology={tech} key={index} onClick={addTech} />
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

export default connect(null, mapActionToProps)(ExploreTechnology);
