import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleFilter } from "../../redux/actions/uiActions";
import { authGet } from "../../api/api";
import { BasePath, GetAllCountries } from "../../globals/serviceURLs";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "../../components/button/Button";
import PlaceholderImg from "../../assets/no_job_placeholder.svg";
import StartEndDate from "../../components/startEndDate";
import "./filterpage.css";

const FilterPage = ({ showBS, toggleFilter, filter }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [serviceType, setServiceType] = useState();
  const [level, setLevel] = useState();
  const [countryList, setCountryList] = useState([]);
  const [countryCode, setCountryCode] = useState();
  const [countryName, setCountryName] = useState("");
  const [cityList, setCityList] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState();
  const [relocation, setRelocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceErrorDisplay, setServiceErrorDisplay] = useState("");
  const token = localStorage.AccessToken;

  useEffect(() => {
    setLoading(true);
    authGet(BasePath, GetAllCountries, {}, token)
      .then((res) => {
        setCountryList(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setServiceErrorDisplay(err.err);
      });
  }, []);

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
    for (let i in countryList) {
      if (countryList[i].coid === parseInt(e.target.value)) {
        setCountryName(countryList[i].nme);
        setCityList(countryList[i].cts);
        break;
      }
    }
  };

  const handleStartDate = (startdate) => {
    setStartDate(startdate);
  };

  const handleEndDate = (endDate) => {
    setEndDate(endDate);
  };

  const handleCityChange = (e) => {
    setCityCode(e.target.value);
    for (let i in cityList) {
      if (cityList[i].ctid === parseInt(e.target.value)) {
        setCityName(cityList[i].nme);
        break;
      }
    }
  };
  const handleCheck = (e) => {
    if (e.target.name === "yes") setRelocation(true);
    else if (e.target.name === "no") setRelocation(false);
  };

  const PlaceholderDisp = () => {
    return (
      <div className="placeholder-container">
        <img src={PlaceholderImg} alt="placeholder" />
        <br />
        <p>{serviceErrorDisplay}</p>
      </div>
    );
  };

  const handleReset = () => {
    setStartDate(0);
    setEndDate(0);
    setServiceType(0);
    setLevel(0);
    setCountryCode(-1);
    setCountryName(null);
    setCityName(null);
    setCityCode(-1);
    setRelocation(false);
  };

  const apply = (e) => {
    e.preventDefault();
    const filterData = {
      startDate,
      endDate,
      serviceType,
      level,
      countryCode,
      countryName,
      cityCode,
      cityName,
      relocation,
    };

    filter(filterData);
    toggleFilter();
  };
  return (
    <>
      <div className={showBS ? "scrim" : ""} onClick={toggleFilter} />
      <div
        className={showBS ? "mq-filter slides slide-up" : "mq-filter slides"}
      >
        <div className="wrapper">
          {loading && (
            <div className="loading center-loading">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {!loading && serviceErrorDisplay.length === 0 ? (
            <>
              <div className="js-filter-header">
                <h5 onClick={toggleFilter} className="show-pointer">
                  X
                </h5>
                <h5>Filters</h5>
                <h6 onClick={handleReset} className="show-pointer">
                  Reset{" "}
                </h6>
              </div>
              <Form className="form">
                <StartEndDate
                  handleStartDateChange={(date) => handleStartDate(date)}
                  selectedStartDate={startDate}
                  handleEndDateChange={(date) => handleEndDate(date)}
                  selectedEndDate={endDate}
                />

                <Form.Group controlId="servicetype">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                  >
                    <option value={null}>Select</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="chooselevel">
                  <Form.Label>Choose Level</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value={null}>Select</option>
                    <option value="1">Entry Level (0 - 2)</option>
                    <option value="2">Junior Level (2 - 4)</option>
                    <option value="3">Mid Level (4 - 6)</option>
                    <option value="4">Senior Level (6 - 8)</option>
                    <option value="5">Expert Level (8+)</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    value={countryCode}
                    custom
                    onChange={handleCountryChange}
                  >
                    <option value={null}>select</option>
                    {countryList.map((i, index) => (
                      <option value={i.coid} key={index}>
                        {i.nme}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    value={cityCode}
                    onChange={handleCityChange}
                    disabled={countryCode == 2 || countryCode == 3}
                    custom
                  >
                    <option value={null}>Select</option>
                    {cityList.map((i, index) => (
                      <option value={i.ctid}>{i.nme}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <fieldset>
                  <Form.Group className="form-radios" controlId="relocation">
                    <Row>
                      <Form.Label className="legend">Relocation</Form.Label>
                    </Row>
                    <Row className="radio-container">
                      <Form.Check
                        className="radio"
                        type="radio"
                        label="Yes"
                        name="yes"
                        id="yes"
                        checked={relocation}
                        onChange={handleCheck}
                      />
                      <Form.Check
                        className="radio"
                        type="radio"
                        label="No"
                        name="no"
                        id="no"
                        checked={!relocation}
                        onChange={handleCheck}
                      />
                    </Row>
                  </Form.Group>
                </fieldset>
                <div className="button-container">
                  <Button
                    className="button"
                    type="submit"
                    text="Apply"
                    onClick={apply}
                  />
                </div>
              </Form>
            </>
          ) : (
            <PlaceholderDisp />
          )}
        </div>
      </div>
    </>
  );
};

FilterPage.propTypes = {
  showBS: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showBS: state.UI.toggleFilter,
});
const mapActionToProps = {
  toggleFilter,
};

export default connect(mapStateToProps, mapActionToProps)(FilterPage);
