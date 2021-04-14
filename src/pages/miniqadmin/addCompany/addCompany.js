import React, { useEffect, useState, useRef } from 'react';
import "./addCompany.css";
import Button from "../../../components/button/Button";
import Sidenav from "../../../components/sidenav/Sidenav";
import { Container, Form, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import countryCode from "../../../utils/countryCodeUtils";
import Bottomnav from '../../../components/bottomNav/BottomNav';
import plusIcon from "../../../assets/plus.png";
import { BasePath } from "../../../globals/serviceURLs";
import { get, uploadLogo } from "../../../api/api";


function AddCompany(props) {
  const [industryList, setIndustryList] = useState([]);
  const [ind, setInd] = useState([{
    industry: "",
  }]);
  const [logo, setLogo] = useState({});
  const [logoUrl, setLogoUrl] = useState("");

  const hiddenFileInput = useRef(null);
  const userData = JSON.parse(localStorage.UserData);

  const token = localStorage.AccessToken;

  const handleAdd = () => {
    const values = [...ind];
    values.push({ industry: "" });
    setInd(values);
  }

  const handleLogo = (e) => {
    hiddenFileInput.current.click();
  }
  let file = {};

  const handleUploadLogo = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    const formData = new FormData();
    file = e.target.files;
    // formData.append("logo", file[0]);
    console.log(formData);
    let reader = new FileReader();

    reader.onloadend = () => {
      setLogoUrl(reader.result);
      console.log(reader.result);
      formData.append("logo", new Blob([], { type: "form-data" }));
      fetch("https://minimumque.herokuapp.com/cmpny/logo?cid=8", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }).catch(console.error);
    }
    reader.readAsDataURL(file[0])
    console.log(formData);
    // fetch("https://minimumque.herokuapp.com/cmpny/logo?cid=8", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: "Bearer " + token,
    //   },
    // }).catch(console.error);
  }


  const handleSubmitLogo = (e) => {
    e.preventDefault();
    const path = "/cmpny/logo";
    // const params = {
    //   cid: userData.cid,
    // }
    // uploadLogo(BasePath, path, formData, params, token)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    // fetch(" https://minimumque.herokuapp.com/cmpny/logo?cid=8", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    // }).catch(console.error);

  }

  useEffect(() => {
    const path = "/indsec/all";
    get(BasePath, path, {})
      .then(res => {
        setIndustryList(res);
      })
  }, [])

  return (
    <>
      <div id="addCompany">
        <Sidenav />
        <form onSubmit={handleSubmitLogo} className="contain">
          {/* <Container fluid > */}

          <h1>Add Company</h1>

          <input type="file" onChange={handleUploadLogo} hidden={true} ref={hiddenFileInput} accept="image/*" />
          <div type="file" className="uploadLogo" onClick={handleLogo}>
            {logoUrl.length > 0 ? <img className="logoImg" src={logoUrl} alt="yeah" /> : <><p>+</p> <p>UPLOAD LOGO</p></>}
          </div>

          <Form.Group className="form-radios" controlId="relocation">
            <div className="radio-container">
              <Form.Check
                className="radio"
                type="radio"
                checked={props.ctyp}
                onClick={props.handleCompanyType}
                label="Customer"
                name="customer"
                id="customer"
              />
              <Form.Check
                className="radio"
                type="radio"
                checked={!props.ctyp}
                onClick={props.handleCompanyType}
                label="Partner"
                name="partner"
                id="partner"
              />
            </div>
          </Form.Group>


          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleCompanyName}
            // required="true"
            />
            <span className="errata-style">
              {props.errors && props.Enme}
            </span>
          </div>

          <div className="form-group">
            <label>Company Simple Name</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleSimpleName}

            />
            <span className="errata-style">
              {props.errors && props.Esnme}
            </span>
          </div>

          <div className="form-group">
            <label>Registration No</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleRegNo}
            // required={true}
            />
            <span className="errata-style">
              {props.errors && props.Erno}
            </span>
          </div>


          <div className="form-group">
            <label>Contract Owner</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleOwner}
            />
            <span className="errata-style">
              {props.errors && props.Ecown}
            </span>
          </div>


          <div className="form-group">
            <label>Company Email</label>
            <input
              type="email"
              className="form-control"
              onChange={props.handleEmail}
            // required={true}
            />
            <span className="errata-style">
              {props.errors && props.Eeml}
            </span>
          </div>

          <div className="form-group">
            <label>MinimumQue Contact Id</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleMiniqid}
            // required={true}
            />
            <span className="errata-style">
              {props.errors && props.Emcid}
            </span>
          </div>



          <Form.Group>
            <Form.Label>
              <div className="style-icons">Contact No</div>
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Form.Control
                  as="select"
                  id="countryCode"
                  onChange={props.handleIsdCode}
                  custom
                >
                  {countryCode.map((code, i) => (
                    <option value={code.value} key={i}>
                      {code.code}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup.Prepend>
              <Form.Control
                type="tel"
                id="contact"
                onChange={props.handleContact}
              />
            </InputGroup>
            <span className="errata-style">{props.errors && props.Ephone}</span>
          </Form.Group>




          <div className="form-group">
            <label>Address Line 1</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleAdd1}
            />
            <span className="errata-style">
              {props.errors && props.Ea1}
            </span>
          </div>

          <div className="form-group">
            <label>Address Line 2</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleAdd2}
            />
            <span className="errata-style">
              {props.errors && props.Ea2}
            </span>
          </div>



          <Form.Group controlId="country">
            <Form.Label>
              <div className="style-icons">Country</div>
            </Form.Label>
            <Form.Control as="select" onChange={props.handleCountry}>
              <option value={null} selected hidden>Select</option>
              {props.countryList.map((country) => (
                <option value={country.coid}>{country.nme}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="city" >
            <Form.Label>
              <div className="style-icons">City</div>
            </Form.Label>
            <Form.Control as="select" onChange={props.handleCity} disabled={props.cityList.length ? false : true}>
              <option value={null} selected hidden>Select</option>
              {props.cityList.map((city) => (
                <option value={city.ctid}>{city.nme}</option>
              ))}
            </Form.Control>
          </Form.Group>


          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handlePincode}
            />
            <span className="errata-style">
              {props.errors && props.Epc}
            </span>
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleWebsite}
            />
            <span className="errata-style">
              {props.errors && props.Eweb}
            </span>
          </div>

          <div className="form-group">
            <label>Weight</label>
            <input
              type="number"
              className="form-control"
              onChange={props.handleWeight}
            />
            <span className="errata-style">
              {props.errors && props.Ewt}
            </span>
          </div>

          {ind.map((industry, index) => {
            return (
              <>{index < 5 ?
                <Form.Group controlId="country">
                  {!index ?
                    <div className="indAdd">
                      <Form.Label>
                        <div className="style-icons">Industry Sector</div>
                      </Form.Label>
                      <img src={plusIcon} alt="plusIcon" onClick={handleAdd} />

                    </div> : null}

                  <Form.Control as="select" onChange={e => props.handleInd(e, index)} required="true">
                    <option value={null} selected hidden required>Select</option>
                    {industryList.map((ind) => (
                      <option value={ind.isid}>{ind.nme}</option>
                    ))}
                  </Form.Control>

                  <span className="errata-style">
                    {props.errors && props.Eind}
                  </span>
                </Form.Group> : null}
              </>
            )
          })}


          <div className="form-group">
            <label>Contact Name</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleCName}
            />
            <span className="errata-style">
              {props.errors && props.Ecnme}
            </span>
          </div>


          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              className="form-control"
              onChange={props.handleCEmail}
            />
            <span className="errata-style">
              {props.errors && props.Eceml}
            </span>
          </div>

          <Form.Group>
            <Form.Label>
              <div className="style-icons">Contact No</div>
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Form.Control
                  as="select"
                  id="countryCode"
                  onChange={props.handleCIsdCode}
                  custom
                >
                  {countryCode.map((code, i) => (
                    <option value={code.value} key={i}>
                      {code.code}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup.Prepend>
              <Form.Control
                type="tel"
                id="contact"
                onChange={props.handleCContact}
              />
            </InputGroup>
            <span className="errata-style">{props.errors && props.Ecno}</span>
          </Form.Group>

          <div className="form-group">
            <label>Communication Address Line 1</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleCAdd1}
            />
            <span className="errata-style">
              {props.errors && props.Eca1}
            </span>
          </div>

          <div className="form-group">
            <label>Communication Address Line 2</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleCAdd2}
            />
            <span className="errata-style">
              {props.errors && props.Eca2}
            </span>
          </div>

          <Form.Group controlId="city" >
            <Form.Label>
              <div className="style-icons">City</div>
            </Form.Label>
            <Form.Control as="select" onChange={props.handleCCity} disabled={props.cityList.length ? false : true}>
              <option value={null} selected hidden>Select</option>
              {props.cityList.map((city) => (
                <option value={city.ctid}>{city.nme}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              className="form-control"
              onChange={props.handleCPincode}
            />
            <span className="errata-style">
              {props.errors && props.Ecapc}
            </span>
          </div>






          <div className="form-group">
            <label>
              Synopsis
            </label>
            <div className="desc-box-pos">
              <textarea
                name="Description"
                rows="5"
                cols="35"
                maxLength={6000}
                onChange={props.handleSynopsis}
              />
            </div>
          </div>

          <div className="signup-loading">
            {props.loading && <Spinner animation="border" variant="primary" />}
          </div>

          <Row>
            <Col className="button-col">
              <Button
                className="button"
                type="submit"
                text="Add"
               //onClick={props.handleSubmit}
              />
            </Col>
          </Row>
          {/* </Container> */}
        </form>
        <Bottomnav />
      </div>
    </>
  )
}

export default AddCompany;