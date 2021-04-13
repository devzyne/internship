import React from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MBQLogo from "../../assets/Mlogo-Blue.svg";
import CountryCode from "../../utils/countryCodeUtils";
import girl from "../customer/customerSignup/images/Girl.png";
import "../customer/customerSignup/signup.css";
import { Category, UserType } from "../../globals/applicationConstants";
import tick from "../customer/customerSignup/images/tick.svg";
import cancel from "../customer/customerSignup/images/cancel.svg";
import { validateUsername } from "../../utils/validationUtils";

const GigSignup = (props) => {
  const {
    userType,
    name,
    errorExists,
    email,
    username,
    isUsernameAvailable,
    contact,
    loading,
    companyName,
    suggestions,
    error,
    pageError,
    countryList,
    cityList,
    relocation,
    rate,
    country,
    handleNameChange,
    handleCheck,
    handleEmail,
    handleUsername,
    handleCodeChange,
    handleContactChange,
    handleCategory,
    handleSubmit,
    handleReset,
    handleCompanyName,
    handleService,
    handleCountry,
    handleCity,
    handleLocate,
    handleStartDate,
    handleEndDate,
    handleRate,
    handleDesc,
  } = props;

  const {
    nameError,
    emailError,
    usernameError,
    contactError,
    companyNameError,
  } = error;

  const autosuggest = () => {
    return companyName.length >= 3 && suggestions.length === 1 ? (
      <div className="company-name-suggestion container p-0 m-0">
        <div
          className="company-name-suggestion-item"
          onClick={() => handleReset(suggestions[0])}
        >
          {suggestions[0].nme}
        </div>
      </div>
    ) : null;
  };

  const checkUsername = () => {
    if (validateUsername(username)) {
      if (isUsernameAvailable === true) {
        return <img src={tick} className="icon-img"></img>;
      } else {
        return <img src={cancel} className="icon-img"></img>;
      }
    } else {
      return null;
    }
  };

  return (
    <div id="CS-screens">
      <div className="left-screen">
        <img src={girl} alt="MinimumQue" />
      </div>

      <div className="right-screen">
        <img src={MBQLogo} alt="MinimumQue" className="miniq-logo" />
        <Form className="main-div">
          <Form.Group controlId="accountType">
            <Form.Label>
              <div className="style-heading">Sign Up</div>
            </Form.Label>
            <div className="radio-container">
              <Form.Check
                className="radio-btn"
                type="radio"
                label="Admin"
                value={UserType.partnerAdmin}
                checked={userType == UserType.partnerAdmin}
                onChange={handleCheck}
              />
              <Form.Check
                className="radio-btn"
                type="radio"
                label="Freelancer"
                value={UserType.freelancer}
                checked={userType == UserType.freelancer}
                onChange={handleCheck}
              />
            </div>
            <div className="radio-container">
              <Form.Check
                className="radio-btn"
                type="radio"
                label="Contingent Worker"
                value={UserType.partnerContingentWorker}
                checked={userType == UserType.partnerContingentWorker}
                onChange={handleCheck}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>
              <div className="style-icons">Name</div>
            </Form.Label>
            <Form.Control
              onChange={handleNameChange}
              value={name}
              type="text"
            />
            <span className="errata-style">{errorExists && nameError}</span>
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>
              <div className="style-icons">Username</div>
            </Form.Label>
            <div className="inline">
              <Form.Control
                className="unme"
                onChange={handleUsername}
                value={username}
                type="text"
              />
              {checkUsername()}
              <span className="errata-style">
                {errorExists && usernameError}
              </span>
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <div className="style-icons">Phone Number</div>
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Form.Control
                  as="select"
                  id="countryCode"
                  onChange={handleCodeChange}
                  custom
                >
                  {CountryCode.map((code, i) => (
                    <option value={code.value} key={i}>
                      {code.code}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup.Prepend>
              <Form.Control
                type="tel"
                id="contact"
                value={contact}
                onChange={handleContactChange}
              />
            </InputGroup>
            <span className="errata-style">{errorExists && contactError}</span>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>
              <div className="style-icons">Email</div>
            </Form.Label>
            <Form.Control value={email} onChange={handleEmail} type="email" />
            <span className="errata-style">{errorExists && emailError}</span>
          </Form.Group>

          <Form.Group controlId="companyName">
            <Form.Label>
              <div className="style-icons">Company Name</div>
            </Form.Label>
            <Form.Control
              onChange={handleCompanyName}
              value={companyName}
              type="text"
            />
            {autosuggest()}
            <span className="errata-style">
              {errorExists && companyNameError}
            </span>
          </Form.Group>

          {userType == UserType.partnerAdmin || (
            <>
              {/* valid category  */}

              <Form.Group controlId="category">
                <Form.Label>
                  <div className="style-icons">Category</div>
                </Form.Label>
                <Form.Control as="select" onChange={handleCategory}>
                  <option value={null} selected hidden>
                    Select
                  </option>
                  {Object.entries(Category).map((key) => (
                    <option>{key[1].name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="service">
                <Form.Label>
                  <div className="style-icons">Service Type</div>
                </Form.Label>
                <Form.Control as="select" onChange={handleService}>
                  <option value={null} selected hidden>
                    Select
                  </option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>
                  <div className="style-icons">Country</div>
                </Form.Label>
                <Form.Control as="select" onChange={handleCountry}>
                  <option value={null} selected hidden>
                    Select
                  </option>
                  {countryList.map((country) => (
                    <option value={country.coid}>{country.nme}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>
                  <div className="style-icons">City</div>
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleCity}
                  disabled={cityList.length ? false : true}
                >
                  <option value={null} selected hidden>
                    Select
                  </option>
                  {cityList.map((city) => {
                    return <option value={city.ctid}>{city.nme}</option>;
                  })}
                </Form.Control>
              </Form.Group>

              <Row className="date-pos">
                <Col>
                  <Form.Group controlId="date" onChange={handleStartDate}>
                    <Form.Label>
                      <div className="style-icons">Start-Date</div>
                    </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="date" onChange={handleEndDate}>
                    <Form.Label>
                      <div className="style-icons">End-Date</div>
                    </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
              </Row>

              {userType == UserType.freelancer && (
                <>
                  <Form.Group controlId="rate">
                    <Form.Label>
                      <div className="style-icons">
                        Indicative Rate per Hour (in USD)
                      </div>
                    </Form.Label>
                    <Form.Control
                      value={rate}
                      onChange={handleRate}
                      type="text"
                    />
                    {/* <span className="errata-style">{errorExists && emailError}</span> */}
                  </Form.Group>
                </>
              )}

              <fieldset>
                <Form.Group className="form-radios" controlId="relocation">
                  <Row>
                    <Form.Label className="legend">
                      <div className="style-icons">Open to Relocation</div>
                    </Form.Label>
                  </Row>
                  <Row className="radio-container">
                    <Form.Check
                      className="radio"
                      type="radio"
                      checked={relocation}
                      onChange={handleLocate}
                      label="Yes"
                      name="yes"
                      id="yes"
                    />
                    <Form.Check
                      className="radio"
                      type="radio"
                      checked={!relocation}
                      onChange={handleLocate}
                      label="No"
                      name="no"
                      id="no"
                    />
                  </Row>
                </Form.Group>
              </fieldset>

              <Form.Group controlId="description">
                <label>
                  <div className="style-icons">Comments</div>
                </label>
                <div className="desc-box-pos">
                  <textarea
                    name="Comments"
                    rows="5"
                    cols="35"
                    placeholder="Type your comments here"
                    maxLength={6000}
                    onChange={handleDesc}
                  />
                </div>
              </Form.Group>
            </>
          )}
          <div className="CS-error-message" style={{ height: "60px" }}>
            {pageError && <Alert variant="danger">{pageError}</Alert>}
          </div>
          <div className="center-aligned">
            <p>
              By signing up you accept the <a href="#">terms of service</a> and{" "}
              <a href="#">privacy policy</a>
            </p>
            <div className="signup-loading">
              {loading && <Spinner animation="border" variant="primary" />}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              <b>Sign Up</b>
            </button>
            <p>
              <b>
                Already have an account? <Link to="/login">Login</Link>
              </b>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GigSignup;
