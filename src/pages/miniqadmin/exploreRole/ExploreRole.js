import React, { useEffect, useState } from "react";
import { BasePath, GET_ROLES_BY_CATEGORY } from "../../../globals/serviceURLs";
import { authGet, authPost } from "../../../api/api";
import { Category } from "../../../globals/applicationConstants";

//components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "../../../components/button/Button";
import Modal from "react-bootstrap/Modal";

import TechnologyCard from "../../../components/cards/TechnologyCard";

//redux
import { connect } from "react-redux";
import { addChips } from "../../../redux/actions/uiActions";

//assets
import BackIcon from "../../../assets/back.svg";
import "../exploreTechnology/tech.css";

function ExploreRoles({ onClick, addChips, addTechnology }) {
  const [techList, setTechList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [] = useState();
  const [] = useState([]);
  const [, setIndustry] = useState();
  const [roleList, setRoleList] = useState([]);
  const [, setRole] = useState();
  const userData = JSON.parse(localStorage.UserData);
  const token = localStorage.AccessToken;

  useEffect(() => {
    const path = "/role/all";
    // const config = {
    //   caid: caid,
    //   pno: 0,
    //   psz: 10,
    // };

    authGet(BasePath, path, {}, token)
      .then((res) => {
        setTechList(res);
      })
      .catch((err) => console.log(err));

    // get(BasePath, GetAllIndustries, {})
    //   .then(res => setIndustryList(res))
    //   .catch(err => console.log(err));
  }, []);

  const addTech = (tech) => {
    addChips(tech.nme);
    addTechnology(tech);
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
    const path = "/role";
    const config = {
      caid: category,
      nme: name,
      typ: 1,
      rid: 9,
      // isid: [industry],
      // rtp: role
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
            <Modal.Title className="all-right">Add Role</Modal.Title>
          </Modal.Header>

          <Modal.Body>
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
            text="Add Role"
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

export default connect(null, mapActionToProps)(ExploreRoles);
