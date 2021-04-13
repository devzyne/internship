import React, { useState } from "react";
import { get } from "../../../api/api";
import Form from "react-bootstrap/Form";
import { validateEmail } from "../../../utils/validationUtils";
import "./styles/reset.css";
import think from "./images/Thinking.png";
import Spinner from "react-bootstrap/Spinner";
import MBQLogo from "../../../assets/Mlogo-Blue.svg";
import { BasePath } from "../../../globals/serviceURLs";

function Reset() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    success: false,
  });

  const handleChange = (e) => {
    setEmail(e.target.value.trim());
    setError({
      message: "",
      success: false,
    });
  };
  const reset = (event) => {
    setLoading(true);
    event.preventDefault();
    const path = "/login/rstpwd";
    const reqparam = {
      eml: email,
    };
    if (email) {
      if (validateEmail(email)) {
        get(BasePath, path, reqparam)
          .then((res) => {
            setError({
              message: "New password has been emailed",
              success: true,
            });
            setLoading(false);
          })
          .catch((err) => {
            setError({
              message: err.err,
              success: false,
            });
            setLoading(false);
          });
      } else {
        setError({
          message: "Provide a valid Email",
          success: false,
        });
        setLoading(false);
      }
    } else {
      setError({
        message: "Cannot be empty",
        success: false,
      });
      setLoading(false);
    }
  };

  return (
    <div id="reset-page" className="reset-page-root">
      <div className="left-screen">
        <img src={MBQLogo} alt="MinimumQue" className="miniq-logo" />
        <div className="retrieve-content">
          <h2>Reset Password</h2>
        </div>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>
              <div>Enter your email :</div>
            </Form.Label>
            <Form.Control value={email} onChange={handleChange} type="text" />
          </Form.Group>
          <div className="error-rg-pos">
            {error.success ? (
              <span className="error-green">{error.message}</span>
            ) : (
              <span className="error-red">{error.message}</span>
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
                onClick={reset}
                disabled={loading}
              >
                <b>Reset</b>
              </button>

              <p className="go-back">
                <b>
                  {" "}
                  Go back to <a href="/login">Login</a>
                </b>
              </p>
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

export default Reset;
