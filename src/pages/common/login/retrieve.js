import React, { useState } from "react";
import { get } from "../../../api/api";
import Form from "react-bootstrap/Form";
import { validateEmail } from "../../../utils/validationUtils";
import think from "./images/Thinking.png";
import Spinner from "react-bootstrap/Spinner";
import MBQLogo from "../../../assets/Mlogo-Blue.svg";
import { BasePath } from "../../../globals/serviceURLs";
import "./styles/reset.css";

function Retrieve() {
  const [email, setEmail] = useState();
  const [error, setError] = useState({
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError({
      message: "",
      type: "",
    });
    setEmail(e.target.value.trim());
  };

  const retrieve = async (event) => {
    setLoading(true);
    event.preventDefault();
    const path = "/login/rtvunme";
    const reqparam = {
      eml: email,
    };
    if (email) {
      if (validateEmail(email)) {
        get(BasePath, path, reqparam)
          .then((res) => {
            setError({
              message: "An email has been sent to respective email id",
              type: "success",
            });

            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setError({
              message: err.err,
              type: "failure",
            });
          });
      } else {
        setError({
          message: "Enter a valid Email",
          type: "failure",
        });
        setLoading(false);
      }
    } else {
      setError({
        message: "Cannot be empty",
        type: "failure",
      });
      setLoading(false);
    }
  };

  return (
    <div id="reset-page" className="reset-page-root">
      <div className="left-screen">
        <img src={MBQLogo} alt="MinimumQue" className="miniq-logo" />
        <div className="retrieve-content">
          <h2>Retrieve Username</h2>
        </div>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>
              <div>Enter your email :</div>
            </Form.Label>
            <Form.Control value={email} onChange={handleChange} type="text" />
          </Form.Group>

          <div className="error-rg-pos">
            {error.type === "failure" ? (
              <span className="error-red">{error.message}</span>
            ) : (
              <span className="error-green">{error.message}</span>
            )}
          </div>

          <div className="retrieve-down">
            <div>
              <div className="ret-spin-pos">
                {loading && <Spinner animation="border" variant="primary" />}
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={retrieve}
                disabled={loading}
              >
                <b>Retrieve</b>
              </button>

              <div className="go-back">
                <p>
                  <b>
                    {" "}
                    Go back to <a href="/login">Login</a>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="right-screen">
        <img src={think} alt="thinkicon" />
      </div>
    </div>
  );
}

export default Retrieve;
